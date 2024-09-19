from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from authentication import views
from . import views


urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/",TokenRefreshView.as_view()),
    path("register/",views.RegisterView.as_view()),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
    path('verify-otp/', views.verify_otp, name='verify-otp'),
    path('user/update/', views.UserProfileUpdateView.as_view(), name='user-update'),
    path('user/', views.UserProfileView.as_view(), name='user-profile'),
    path('user/profile-picture/', views.UserProfileImageUpdateView.as_view(), name='profile_picture_update'),

]