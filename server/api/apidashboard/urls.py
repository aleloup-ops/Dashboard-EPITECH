from django.urls import path, re_path


from . import views

urlpatterns = [
    path('idz', views.index, name='index'),
    path('about.json', views.functionnalities, name='index'),
    re_path(r'^search/$', views.search, name='index'),
]