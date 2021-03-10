from rest_framework import serializers

from .models import Article

class ArticleSerialier(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Article
        fields = '__all__'
