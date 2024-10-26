from django.shortcuts import render
from django.conf import settings
from authentication.serializer import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, VerifyOTPSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from authentication.models import User
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
import requests
import logging
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from authentication.serializer import UserProfileNoPasswordSerializer,PasswordResetConfirmSerializer, UserProfileUpdateSerializer,UserProfileSerializer,PasswordResetSerializer,AuthenticatedChangePasswordSerializer
from rest_framework.views import APIView
from django.utils import timezone
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse

from django.utils.encoding import smart_str
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import update_session_auth_hash
from django_ratelimit.decorators import ratelimit


logger = logging.getLogger(__name__)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    
    def post(self, request, *args, **kwargs):
        logger.info(f"Request data: {request.data}")
        return super().post(request, *args, **kwargs)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        try:
            email = request.data.get('email')
            username = request.data.get('username')

            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if the email is already taken
            if User.objects.filter(email=email).exists():
                return Response({'email': 'A user with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the username is already taken
            if User.objects.filter(username=username).exists():
                return Response({'username': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

            # Proceed with the standard creation process
            return super().post(request, *args, **kwargs)

       
        except IntegrityError as e:
            logger.error(f'Database integrity error occurred: {e}')
            return Response({'error': 'Database error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except ValidationError as e:
            logger.error(f'Validation error: {e}')
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f'Unexpected error occurred: {e}')
            return Response({'error': 'An unexpected error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/authentication/token/',
        '/authentication/register/',
        '/authentication/token/refresh/'
    ]
    return Response(routes)


@api_view(['POST'])
@permission_classes([AllowAny])  # Allow access without authentication
def verify_otp(request):
    serializer = VerifyOTPSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        
        # Validate OTP
        user = User.objects.filter(email=email).first()
        if user and user.otp == otp:
            user.verified = True
            user.save()

            # Generate email context
            context = {
                'username': user.username,
                'otp_digits': list(otp),  # Split OTP into individual digits
                'verification_link': 'http://localhost:8000/authentication/verify-otp/',  # Add actual link here
                'logo_url': 'https://weomxnscbqghxfhvlixy.supabase.co/storage/v1/object/public/bucket/logo/StudyCorner-logo.png?t=2024-09-20T09%3A18%3A54.482Z',
                'email': user.email,
                'year': timezone.now().year
            }

            # Render HTML content from the template
            html_content = render_to_string('otp_email_template.html', context)
            text_content = strip_tags(html_content)  # Fallback to plain text

            # Send the email
            send_mail(
                subject='Your Verification Code',
                message=text_content,  # Plain text fallback
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                html_message=html_content
            )

            return Response({'message': 'OTP verified successfully, and email sent!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid OTP or email'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# (START) for OTP RESET PASSWORD/forgot password
@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset(request):
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email'].lower()  # Ensure case insensitivity
        user = User.objects.filter(email__iexact=email).first()

        if user:
            # Generate password reset token
            token = default_token_generator.make_token(user)

            # Generate a password reset link
            reset_url = request.build_absolute_uri(
                reverse('password-reset-confirm', kwargs={
                    'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': token
                })
            )

            # Email context
            context = {
                'username': user.username,
                'reset_url': reset_url,
                'year': timezone.now().year
            }

            # Render HTML email template
            html_content = render_to_string('password_reset_email.html', context)
            text_content = strip_tags(html_content)

            # Send reset email
            send_mail(
                subject='Password Reset Request',
                message=text_content,  # Plain text fallback
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                html_message=html_content
            )

            return Response({"message": "Password reset link sent."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request, uidb64, token):
    try:
        # Decode the user's ID from the URL-safe base64-encoded string
        uid = smart_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    # Ensuring  the user exists and the token is valid before proceeding
    if user is not None and default_token_generator.check_token(user, token):
        # Pass the user and request to the serializer
        serializer = PasswordResetConfirmSerializer(data=request.data)

        if serializer.is_valid():
            # Pass the user explicitly to the save() method
            serializer.save(user=user)  # <-- passing user here :)
            return Response({"message": "Password reset successful."}, status=200)
        return Response(serializer.errors, status=400)

    # If the user or token is invalid, return an error
    return Response({"error": "Invalid token or user ID. Please try the reset link again."}, status=400)

# (END) of OTP RESET PASSWORD/forgot password


# (START) THIS IS FOR AUTHENTICATED USER PASSWORD CHANGE
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@ratelimit(key='user', rate='5/m', method='POST', block=True)  # Limit to 5 requests per minute
def change_password(request):
    serializer = AuthenticatedChangePasswordSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        serializer.save()
        
        # Update session to keep the user logged in after password change
        update_session_auth_hash(request, request.user)
        
        return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# (END) THIS IS FOR AUTHENTICATED USER PASSWORD CHANGE




class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    


@api_view(['PUT'])
@ratelimit(key='user', rate='5/m', method='PUT', block=True)  # Limit to 5 requests per minute
def user_profile_update(request):
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

    # Pass the user instance to the serializer instead of profile
    serializer = UserProfileUpdateSerializer(request.user, data=request.data, partial=True)  # Use `partial=True` to allow partial updates

    if serializer.is_valid():
        # Check if the update includes fields that require a password
        requires_password = any(field in request.data for field in ['first_name', 'last_name', 'new_password'])

        # If the update involves sensitive fields (e.g., password or name), check the current password
        if requires_password:
            current_password = request.data.get('current_password')
            if not request.user.check_password(current_password):
                return Response({'detail': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the profile updates
        updated_user_profile = serializer.save()

        # If a new password is provided, update it
        if 'new_password' in request.data:
            updated_user_profile.set_password(request.data['new_password'])
            updated_user_profile.save()

            # Update session to keep the user logged in after password change
            update_session_auth_hash(request, updated_user_profile)

        # Generate new tokens after saving the updated user profile
        refresh = RefreshToken.for_user(updated_user_profile)

        response_data = {
            'user': {
                'username': updated_user_profile.username,
                'email': updated_user_profile.email,
                'first_name': updated_user_profile.first_name,
                'last_name': updated_user_profile.last_name,
                'profile': {
                    'age_bracket': updated_user_profile.profile.age_bracket,
                    'bio': updated_user_profile.profile.bio,
                    'profile_image': updated_user_profile.profile.profile_image,
                }
            },
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        return Response(response_data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@ratelimit(key='user', rate='5/m', method='PUT', block=True)  # Limit to 5 requests per minute
def user_profile_update_no_password(request):
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = UserProfileNoPasswordSerializer(request.user, data=request.data, partial=True)  # Use the no-password serializer

    if serializer.is_valid():
        updated_user_profile = serializer.save()

        response_data = {
            'user': {
                'username': updated_user_profile.username,
                'email': updated_user_profile.email,
                'first_name': updated_user_profile.first_name,
                'last_name': updated_user_profile.last_name,
                'profile': {
                    'age_bracket': updated_user_profile.profile.age_bracket,
                    'bio': updated_user_profile.profile.bio,
                    'profile_image': updated_user_profile.profile.profile_image,
                }
            }
        }

        return Response(response_data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserProfileImageUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = request.user.profile
        profile_data = request.data.get('profile', {})
        profile_image_url = profile_data.get('profile_image')

        if profile_image_url:
            profile.profile_image = profile_image_url
            profile.save()
            return Response({
                'profile': {
                    'profile_image': profile.profile_image
                }
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Profile image URL is required'}, status=status.HTTP_400_BAD_REQUEST)
    


# Delete account / Close
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    try:
        # Get the authenticated user
        user = request.user
        
        # Delete the user account
        user.delete()
        
        return Response({"detail": "Account deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)