from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *

# Create your views here.

@api_view(['GET', 'POST'])
# @permission_classes([permissions.IsAuthenticated])
def pizza_list(request):
    if request.method == 'GET':
        pizzaModel = Pizza.objects.all()
        pizzaSerializer = PizzaSerializer(pizzaModel, many=True)
        return Response(pizzaSerializer.data)
    
    elif request.method == 'POST':
        pizzaSerializer = PizzaSerializer(data=request.data)
        if pizzaSerializer.is_valid():
            pizzaSerializer.save()
            return Response(pizzaSerializer.data, status=status.HTTP_201_CREATED)
        return Response(pizzaSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([permissions.IsAuthenticated])
def pizza_detail(request, pk):
    try:
        pizzaModel = Pizza.objects.get(pk=pk)
    except Pizza.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        pizzaSerializer = PizzaSerializer(pizzaModel)
        return Response(pizzaSerializer.data)

    elif request.method == 'PUT':
        pizzaSerializer = PizzaSerializer(pizzaModel, data=request.data)
        if pizzaSerializer.is_valid():
            pizzaSerializer.save()
            return Response(pizzaSerializer.data)
        return Response(pizzaSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        pizzaModel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
