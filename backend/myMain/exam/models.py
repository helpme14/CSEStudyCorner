from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings

# Model to store questions with various types
class Question(models.Model):
    QUESTION_TYPES = [
        ('text', 'Text'),
        ('image', 'Image'),
        ('logic', 'Logic'),
        ('story', 'Story'),
    ]
    
    text = models.TextField(blank=True, null=True)  # For text questions
    image = models.ImageField(upload_to='question_images/', blank=True, null=True)  # For image-based questions
    question_type = models.CharField(max_length=10, choices=QUESTION_TYPES, default='text')
    story_text = models.TextField(blank=True, null=True)  # For long story questions
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text[:50]  # Display a preview of the question

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.TextField(blank=True, null=True)  # For text-based answers
    image = models.ImageField(upload_to='choice_images/', blank=True, null=True)  # For image-based answers
    is_correct = models.BooleanField(default=False)  # To mark the correct answer

    def __str__(self):
        return self.text[:50]  # Display a preview of the choice

# Model to store user's answers
class UserAnswer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_answer = models.ForeignKey(Choice, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} answered {self.selected_answer.text[:50]} for {self.question.text[:50]}'
