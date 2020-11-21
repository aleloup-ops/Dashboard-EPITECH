from django.urls import path, re_path


from . import views

urlpatterns = [
    path('<str:user_uid>', views.login, name='index'),
    re_path('getprofile', views.getProfile, name='profile'),
    path('gettracks', views.getTopTracks, name='tracks'),
    path('getplaylists', views.getPlaylists, name='playlists'),
    re_path(r'^callback/q$', views.callback, name='callback'),
]