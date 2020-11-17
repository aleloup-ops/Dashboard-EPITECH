from django.urls import path, re_path


from . import views

urlpatterns = [
    path('api/initialize', views.initialize_client, name='initialize'),
    path('about.json', views.functionnalities, name='about'),
    re_path(r'^search/$', views.search, name='index'),
    path('', views.index, name='index'),
    path('test_post', views.test_post, name='test_post')
]