from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Manufacturer
from .serializers import ManufacturerSerializer

class ManufacturerListView(generics.ListAPIView):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    permission_classes = [IsAuthenticated]
