"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('api.apidashboard.urls')),
    path('spotify/', include('api.spotify.urls')),
    path('twitch/', include('api.twitch.urls')),
    path('twitter/', include('api.twitter.urls')),

    path('api/user/', include('api.user.urls')),
    path('api/widget/', include('api.widget.urls')),

    path('admin/', admin.site.urls),
]
