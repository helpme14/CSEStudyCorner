from authentication.models import User,Profile

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
import logging


logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        logger.info(f"Token obtained for user: {user.email}")
        # Add custom claims
        token['first_name'] = user.first_name  # Add first_name
        token['last_name'] = user.last_name    # Add last_name
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['profile_image'] = str(user.profile.profile_image)
        # token['verified'] = user.profile.verified
        
        return token
    

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    age_bracket = serializers.CharField( required=False)
    bio = serializers.CharField(allow_blank=True, required=False)
    profile_image = serializers.URLField(allow_blank=True, required=False)  
    class Meta:
        model = Profile
        fields = [ 'age_bracket','bio','profile_image']

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    profile = ProfileSerializer(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'username', 'password', 'password2', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return data

    def create(self, validated_data):
        print("Validated Data:", validated_data)  #for debugging
        profile_data = validated_data.pop('profile', {})

        # Create the User instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )


        # Generate and send OTP
        user.generate_otp()
        send_mail(
            'CSEStudyCorner-OTP_CODE',
            f"""Greetings, 
                We are informing you that your email has registered to our Website CSEStudyCorner, here is your OTP: {user.otp}""",
            'CSEStudentCorner@gmail.com', 
            [user.email],
            fail_silently=False,
        )

        # Create or update the Profile instance
        profile, created = Profile.objects.get_or_create(user=user)
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()
        return user

    def to_representation(self, instance):
        """
        Customize the representation of the User instance to include full name and profile details.
        """
        rep = super().to_representation(instance)

        # Add full name to the representation
        rep['full_name'] = f"{instance.first_name} {instance.last_name}".strip()

        # Access the profile through the user instance
        try:
            profile = instance.profile
            rep['bio'] = profile.bio
            rep['age_bracket'] = profile.age_bracket
        except Profile.DoesNotExist:
            # Handle the case where the profile does not exist
            rep['bio'] = ''
            rep['age_bracket'] = ''

        return rep
    
class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'], otp=data['otp'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid OTP or email.")

        # Check if OTP has expired (e.g., 10 minutes)
        if timezone.now() > user.otp_created_at + timedelta(minutes=10):
            raise serializers.ValidationError("OTP has expired.")

        return data

    def save(self):
        user = User.objects.get(email=self.validated_data['email'])
        user.verified = True
        user.otp = None  # Clear OTP after verification
        user.otp_created_at = None
        user.save()
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)  # Nest ProfileSerializer to include profile details

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'profile']  # Include profile in fields
        read_only_fields = ['username', 'email']  # Set read-only fields if needed

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()  # Nested serializer for profile fields

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'profile']
        extra_kwargs = {
            'email': {'required': False},  # Make email optional
            'username': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
        }

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})

        # Update User fields
        if 'username' in validated_data:
            instance.username = validated_data['username']
        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']
        if 'last_name' in validated_data:
            instance.last_name = validated_data['last_name']
        instance.save()

        # Update Profile fields
        profile = instance.profile
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance
    
