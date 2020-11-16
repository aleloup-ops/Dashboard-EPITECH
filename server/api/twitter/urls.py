from django.urls import path, re_path


from . import views

urlpatterns = [
    path('', views.twitterApi.connection, name='index'),
    path('callback/q', views.twitterApi.callback, name='callback'),
    path('post', views.twitterApi.postOnTwitter, name='post'),
]