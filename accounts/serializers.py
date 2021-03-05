from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_auth.models import TokenModel

from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = user
        fields = ('id', 'username', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = ('id', 'profile_picture', 'user')

class TokenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    user = UserSerializer()

    class Meta:
        model = TokenModel
        fields = ('key', 'username')
