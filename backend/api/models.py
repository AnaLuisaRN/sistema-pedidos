from django.db import models


class Cliente(models.Model):
    curp = models.CharField(max_length=18)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)

    def __str__(self):
        return self.nombre


class Pedido(models.Model):
    fecha = models.DateField()
    codigo_producto = models.CharField(max_length=30)
    talla = models.CharField(max_length=10)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.CharField(max_length=255)

    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.codigo_producto