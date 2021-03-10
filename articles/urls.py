from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.ArticlesListView.as_view()),
    path('edit/<int:pk>', views.ArticlesToDoAllView.as_view()),
]
