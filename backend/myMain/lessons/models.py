from datetime import timezone
from django.db import models
from django.contrib.auth import get_user_model

# Dynamically get the user model defined in AUTH_USER_MODEL
User = get_user_model()

class Lesson(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    subject = models.CharField(max_length=100)
    difficulty_level = models.CharField(
        max_length=50, choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')]
    )
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lessons')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class Progress(models.Model):
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progresses')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='progresses')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    time_spent = models.DurationField(null=True, blank=True)  # Track the time spent on a lesson
    last_accessed = models.DateTimeField(default=timezone.now)  # Record the last accessed time
    video_time_watched = models.DurationField(null=True, blank=True)  # Time watched for video lessons

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title} - {self.status}"