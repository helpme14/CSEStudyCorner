from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.conf import settings
from django.core.validators import MinValueValidator
from decimal import Decimal
from django.dispatch import receiver
from django.utils import timezone
import random


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    verified = models.BooleanField(default=False)  # Move verified here
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
    
    def generate_otp(self):
        self.otp = f"{random.randint(100000, 999999)}"
        self.otp_created_at = timezone.now()
        self.save()
    
class Profile(models.Model):
    AGE_BRACKET_CHOICES = [
        ('U18', 'Under 18'),
        ('18-24', '18-24'),
        ('25-34', '25-34'),
        ('35 above', '35 and above'),
    
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=300)
    bio = models.CharField(max_length=300, blank=True,null=True)
    image = models.ImageField(default="default.jpg", upload_to="user_images", blank=True)
    # verified = models.BooleanField(default=False)
    age_bracket = models.CharField(max_length=8, choices=AGE_BRACKET_CHOICES, default='U18')



    def __str__(self):
        return self.full_name

# Signals to automatically create or update the Profile when User is created or updated
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Create a profile for a newly created user
        Profile.objects.create(user=instance)
    else:
        # Update the full_name in Profile when User's first_name or last_name changes
        profile = instance.profile
        new_full_name = f"{instance.first_name} {instance.last_name}".strip()
        
        # Only update if the full_name is different
        if profile.full_name != new_full_name:
            profile.full_name = new_full_name
            profile.save()