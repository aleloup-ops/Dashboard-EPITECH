from django.urls import path, re_path


from . import views

urlpatterns = [
    path('topgames', views.twitchTopGames, name='topgames'),
    path('<str:user_uid>', views.login, name='login'),
    path('search', views.searchChannel, name='search'),
    path('getfollowers', views.getFollowers, name='followers'),
    path('getprofile', views.getProfile, name='followers'),
    re_path(r'^callback/q$', views.callback, name='callback'),
]