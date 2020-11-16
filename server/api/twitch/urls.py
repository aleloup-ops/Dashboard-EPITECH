from django.urls import path, re_path


from . import views

urlpatterns = [
    path('topgames', views.twitchTopGames, name='topgames'),
    path('', views.login, name='login'),
    re_path(r'^callback/q$', views.callback, name='callback'),
]