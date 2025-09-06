from django.db import models

class PersonGroup(models.Model):
    name = models.CharField(max_length=100)

class Photo(models.Model):
    image = models.ImageField(upload_to="uploads/")
    group = models.ForeignKey(PersonGroup, on_delete=models.CASCADE, null=True, blank=True)
