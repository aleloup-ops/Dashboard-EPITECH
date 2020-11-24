from django.urls import path, re_path

from . import views

urlpatterns = [

    path('<str:user_uid>/login', views.trelloApi.connection, name='login'),
    path('myboards', views.trelloApi.myBoards, name='boards'),
    path('getcards', views.trelloApi.getCards, name='cards'),
    path('getmembers', views.trelloApi.getMembers, name='members'),
    re_path(r'^callback/q$', views.trelloApi.callback, name='callback'),
]