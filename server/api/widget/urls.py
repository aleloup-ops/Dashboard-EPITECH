from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.createOrUpdate_widget, name='index'),
    path('<str:user_id>', views.get_widget, name='get_widget'),
    path('<str:user_id>/params/<str:widget_id>', views.update_params, name='update_params'),
    path('<str:user_id>/delete/<str:widget_id>', views.delete_widget, name='delete_widget'),
    
]