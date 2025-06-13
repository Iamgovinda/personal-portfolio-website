from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
from portfolio.commons.models import UUIDBaseModel, FileUpload


class Client(UUIDBaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.OneToOneField(FileUpload, on_delete=models.CASCADE, null=True, blank=True)

