from django.contrib.auth import get_user_model
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
from django.utils import timezone

from portfolio.commons.models import UUIDBaseModel, FileUpload


class UserInfo(UUIDBaseModel):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField()
    experience = models.PositiveIntegerField(null=True, blank=True)
    project_completed = models.PositiveIntegerField(null=True, blank=True)
    happy_client = models.PositiveIntegerField(null=True, blank=True)
    main_image = models.OneToOneField(FileUpload, related_name='main_img_user_info', on_delete=models.CASCADE,
                                      null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=14)
    user_about_title = models.CharField(max_length=1000, null=True, blank=True)
    user_about_desc = models.TextField(null=True, blank=True)
    user_about_image = models.OneToOneField(FileUpload, related_name='image_user_about', on_delete=models.CASCADE,
                                            null=True, blank=True)
    what_i_do_desc = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class SocialMedia(UUIDBaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    link = models.URLField(max_length=10000)

    def __str__(self):
        return self.name


class WhatIDoItem(UUIDBaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=1000, null=True, blank=True)
    desc = models.TextField()

    def __str__(self):
        return self.title


from knox.models import AuthToken as KnoxAuthTokenModel, AuthTokenManager
from knox.settings import CONSTANTS, knox_settings
from knox import crypto

USER = get_user_model()


class KnoxAuthTokenManager(AuthTokenManager):
    def create(self, user, expiry=knox_settings.TOKEN_TTL, **kwargs):
        token = crypto.create_token_string()
        salt = crypto.create_salt_string()
        digest = crypto.hash_token(token, salt)

        if expiry is not None:
            expiry = timezone.now() + expiry

        instance = super(AuthTokenManager, self).create(
            token_key=token[:CONSTANTS.TOKEN_KEY_LENGTH], digest=digest,
            salt=salt, user=user, expiry=expiry, detail=kwargs.get('detail'))
        return instance, token


class KnoxAuthToken(KnoxAuthTokenModel):
    objects = KnoxAuthTokenManager()
    last_used = models.DateTimeField(null=True, blank=True)
    detail = models.JSONField(null=True, blank=True)

    @classmethod
    def remove_sessions(cls, user_id, exclude=None):
        if exclude is None:
            exclude = []
        return cls.objects.filter(
            user_id=user_id
        ).exclude(
            token_key__in=exclude
        ).delete()
