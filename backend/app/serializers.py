from rest_framework import serializers
from .models import User, Policy, Loan, Transaction, Savings
import calendar
from django.utils import timezone
from datetime import timedelta

# Login_User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Policy
class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = [
            'user',  # User must be authenticated and passed when creating the policy
            'policy_no',
            'policy_amount',
            'policy_start_date',  # Ensure this exists in your model
            'policy_due_date',
            'policy_method',
        ]

    def validate_policy_no(self, value):
        if Policy.objects.filter(policy_no=value).exists():
            raise serializers.ValidationError("Policy number already exists.")
        return value

    def create(self, validated_data):
        # Custom creation logic if necessary (e.g., calculating due dates)
        return super().create(validated_data)

#Loan
class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = [
            'user',
            'loan_category',
            'loan_type',
            'loan_amount',
            'loan_due_date',
            'next_due_date',
            'reminder_date',  # Include reminder_date
        ]
        read_only_fields = ['next_due_date', 'reminder_date']  # These are auto-calculated



class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields =['date', 'amount', 'description', 'transaction_type']


# serializers.py
class SavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savings
        fields = [
            # 'email',
            'savings_category',
            'savings_amount',
            'date',
            'reminder',
            'user'
        ]
        extra_kwargs = {
            'user': {'read_only': True},  # Prevent user field from being set in the request
        }
