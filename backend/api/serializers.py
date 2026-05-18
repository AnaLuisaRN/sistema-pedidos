from rest_framework import serializers
from .models import Cliente, Pedido


class ClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cliente
        fields = '__all__'


class PedidoSerializer(serializers.ModelSerializer):

    cliente_nombre = serializers.CharField(
        source='cliente.nombre',
        read_only=True
    )

    class Meta:
        model = Pedido
        fields = [
            'id',
            'fecha',
            'codigo_producto',
            'talla',
            'precio',
            'descripcion',
            'cliente',
            'cliente_nombre'
        ]