from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:user_id>', views.get_user, name='get_index')
]