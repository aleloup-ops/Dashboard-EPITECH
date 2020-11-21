from django.urls import path, re_path


from . import views

urlpatterns = [
    path('<str:user_uid>/login', views.login, name='index'),
    path('getprofile', views.getProfile, name='index'),
    path('gettracks', views.getTopTracks, name='tracks'),
    path('getplaylists', views.getPlaylists, name='playlists'),
    re_path(r'^callback/q$', views.callback, name='callback'),
]