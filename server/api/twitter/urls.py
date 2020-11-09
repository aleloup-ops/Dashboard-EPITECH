from django.urls import path, re_path


from . import views

urlpatterns = [
    path('', views.twitchTopGames, name='index'),
    re_path(r'^callback/q$', views.callback, name='index'),
    #path('callback/q?', views.callback, name='index'),
]