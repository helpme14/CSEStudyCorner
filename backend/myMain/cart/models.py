from datetime import timedelta
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class SubscriptionPlan(models.Model):
    PLAN_CHOICES = [
        ('professional', _('Professional')),
        ('sub_professional', _('Sub-Professional')),
    ]

    name = models.CharField(max_length=100, choices=PLAN_CHOICES)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)  # e.g., "Lifetime", "Yearly"
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class UserSubscription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)  # Only needed for plans with duration
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.user.username} - {self.plan.name}'

    def save(self, *args, **kwargs):
        if self.plan.duration.lower() == 'yearly':
            self.end_date = self.start_date + timedelta(days=365)
        elif self.plan.duration.lower() == 'lifetime':
            self.end_date = None
        super().save(*args, **kwargs)
