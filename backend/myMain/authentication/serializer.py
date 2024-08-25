from authentication.models import User,Profile

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers



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

        # Add custom claims
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        
        return token
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'image', 'verified', 'age_bracket']


User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'image', 'age_bracket']

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
        profile_data = validated_data.pop('profile', {})
        
        
        # Create the User instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
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
            # Add Profile fields to the representation
            rep['bio'] = profile.bio
            rep['image'] = profile.image.url if profile.image else ''
            rep['verified'] = profile.verified
            rep['age_bracket'] = profile.age_bracket
        except Profile.DoesNotExist:
            # Handle the case where the profile does not exist
            rep['bio'] = ''
            rep['image'] = ''
            rep['verified'] = False
            rep['age_bracket'] = ''

        return rep