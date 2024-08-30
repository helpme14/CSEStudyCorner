# tests.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Question, Choice, UserAnswer

class QuestionModelTests(TestCase):
    def setUp(self):
        self.question = Question.objects.create(
            text="What is the capital of France?",
            question_type='text'
        )

    def test_question_str(self):
        self.assertEqual(str(self.question), "What is the capital of France?")

class ChoiceModelTests(TestCase):
    def setUp(self):
        self.question = Question.objects.create(
            text="What is the capital of France?",
            question_type='text'
        )
        self.choice = Choice.objects.create(
            question=self.question,
            text="Paris",
            is_correct=True
        )

    def test_choice_str(self):
        self.assertEqual(str(self.choice), "Paris")

class UserAnswerModelTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email="testuser@example.com",
            password="testpassword",
            username="testuser"  # Add username since it's required in  model
        )
        self.question = Question.objects.create(
            text="What is the capital of France?",
            question_type='text'
        )
        self.choice = Choice.objects.create(
            question=self.question,
            text="Paris",
            is_correct=True
        )
        self.user_answer = UserAnswer.objects.create(
            user=self.user,
            question=self.question,
            selected_answer=self.choice
        )

    def test_user_answer_str(self):
        self.assertEqual(
            str(self.user_answer),
            f'{self.user.username} answered Paris for What is the capital of France?'
        )
