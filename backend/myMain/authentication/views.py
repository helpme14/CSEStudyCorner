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
from authentication.serializer import UserProfileUpdateSerializer,UserProfileSerializer


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

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congrats {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congrats your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)

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
            serializer.save()
            return Response({'message': 'OTP verified successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid OTP or email'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
class UserProfileUpdateView(generics.UpdateAPIView):
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the currently authenticated user
        return self.request.user