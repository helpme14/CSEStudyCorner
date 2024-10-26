from authentication.models import User,Profile

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
import logging
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str
from rest_framework_simplejwt.tokens import RefreshToken

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
    age_bracket = serializers.CharField( required=True)
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
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})

        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return data

    def create(self, validated_data):
   
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

    # Add fields for password change
    current_password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User  # This should be the User model
        fields = ['username', 'email', 'first_name', 'last_name', 'profile', 'current_password', 'new_password']
        extra_kwargs = {
            'email': {'required': False},  # Make email optional
            'username': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
        }

    def validate(self, validated_data):
        # Check if current_password is required based on context
        require_current_password = self.context.get('require_current_password', False)

        current_password = validated_data.get('current_password')
        new_password = validated_data.get('new_password')

        if require_current_password and (new_password or any(field in validated_data for field in ['first_name', 'last_name'])):
            if not current_password:
                raise serializers.ValidationError({"current_password": "Current password is required to change your password."})
            if not self.instance.check_password(current_password):
                raise serializers.ValidationError({"current_password": "Current password is incorrect."})
            if new_password:
                validate_password(new_password)

        return validated_data

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        current_password = validated_data.pop('current_password', None)
        new_password = validated_data.pop('new_password', None)

        if new_password and current_password:
            # Update password for the User instance
            instance.set_password(new_password)

        # Update User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update Profile fields if provided
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance  # Return the updated user instance

class UserProfileNoPasswordSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()  # Nested serializer for profile fields

    class Meta:
        model = User  # User model
        fields = ['username', 'profile']  # Only allow username and profile updates
        extra_kwargs = {
            'username': {'required': False},  # Optional username update
        }

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)

        # Update User fields (only username here)
        if 'username' in validated_data:
            instance.username = validated_data['username']
        instance.save()

        # Update Profile fields (bio) if provided
        if profile_data:
            profile = instance.profile
            if 'bio' in profile_data:
                profile.bio = profile_data['bio']
            profile.save()

        return instance  # Return the updated user instance













# Forgot password, reset
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return value

    def save(self, request):
        email = self.validated_data['email']
        user = User.objects.get(email=email)

        # Generate password reset token
        token = default_token_generator.make_token(user)
        
        # Generate OTP for verification
        user.generate_otp()

        # Generate password reset link
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_url = request.build_absolute_uri(
            reverse('password-reset-confirm', kwargs={'uidb64': uid, 'token': token})
        )

        # Context for the email template
        context = {
            'username': user.username,
            'reset_url': reset_url,
            'otp': user.otp,  # Include OTP in the email
            'year': timezone.now().year,
        }

        # Render email template and send email
        html_content = render_to_string('password_reset_email.html', context)
        text_content = strip_tags(html_content)
        send_mail(
            subject='Password Reset Request',
            message=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_content,
        )




class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        # Validate the password using Django's validators
        validate_password(data['new_password'])
        return data

    def save(self, user):
        # Set the new password for the user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user



# THIS IS FOR AUTHENTICATED USER PASSWORD CHANGE
class AuthenticatedChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def validate_new_password(self, value):
        from django.contrib.auth.password_validation import validate_password
        validate_password(value)
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()