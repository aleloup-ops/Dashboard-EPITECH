from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('test_post', views.test_post, name='test_post')
]