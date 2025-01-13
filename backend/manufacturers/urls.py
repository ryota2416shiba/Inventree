from django.urls import path
from .views import ManufacturerListView

urlpatterns = [
    path("", ManufacturerListView.as_view(), name="manufacturer-list"),
]
