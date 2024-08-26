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



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # Retrieve the username from the request data
        username = request.data.get('username')
        
        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If username is unique, proceed with user creation
        return super().post(request, *args, **kwargs)

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
            user.otp_verified = True
            user.save()
            return Response({'message': 'OTP verified successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid OTP or email'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)