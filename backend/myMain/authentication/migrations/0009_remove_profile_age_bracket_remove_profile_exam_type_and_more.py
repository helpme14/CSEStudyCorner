# Generated by Django 5.1 on 2024-08-24 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_alter_profile_bio_alter_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='age_bracket',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='exam_type',
        ),
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='profile',
            name='full_name',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=100),
        ),
    ]
