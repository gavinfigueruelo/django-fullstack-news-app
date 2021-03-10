from django.shortcuts import render
from rest_framework import generics, permissions
from .permissions import IsOwnerOrReadOnly
from .serializers import ArticleSerialier
from . import models


class ArticlesListView(generics.ListCreateAPIView):
    queryset = models.Article.objects.all()
    serializer_class = ArticleSerialier
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        # phasechoices = self.request.query_params.get('phase', 'PUB')
        return models.Article.objects.filter(published=True)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserArticlesListView(generics.ListCreateAPIView):
    serializer_class = ArticleSerialier
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        phase = self.request.query_params.get('phase', 'PUB')
        user = self.request.user
        return  models.Article.objects.filter(author=user).filter(phase=phase)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserArticlesToDoAllView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerialier
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return  models.Article.objects.filter(author=user)


class ArticlesToDoAllView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerialier
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return models.Article.objects.filter(author=user)


class StaffToDoAllView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Article.objects.all()
    serializer_class = ArticleSerialier
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser ]


class StaffArticlesListView(generics.ListCreateAPIView):
    queryset = models.Article.objects.all()
    serializer_class = ArticleSerialier
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser ]
