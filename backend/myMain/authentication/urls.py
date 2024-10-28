from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from authentication import views
from . import views


urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/",TokenRefreshView.as_view()),
    path("register/",views.RegisterView.as_view()),
    path('', views.getRoutes),
    path('verify-otp/', views.verify_otp, name='verify-otp'),

    # User Profile Management
    path('user/update/', views.user_profile_update, name='user-update'), 
    path('user/', views.UserProfileView.as_view(), name='user-profile'),
    path('user/profile-picture/', views.UserProfileImageUpdateView.as_view(), name='profile_picture_update'),
    path('user/profile-update/', views.user_profile_update_no_password, name='update-profile-without-password'),
    path('user/delete-account/', views.delete_account, name='delete-account'),

     # Password Management
    path('user/change-password/', views.change_password, name='change-password'),  # Authenticated user password change
    path('password-reset/', views.request_password_reset, name='password-reset'),  # Password reset request
    path('password-reset-confirm/<uidb64>/<token>/', views.password_reset_confirm, name='password-reset-confirm'),  # Password reset confirmation via token
]