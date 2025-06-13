from django.contrib import admin
from portfolio.user.models import SocialMedia, UserInfo, WhatIDoItem


class UserOwnedAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user=request.user)

    def save_model(self, request, obj, form, change):
        if not obj.pk:  # New object
            obj.user = request.user
        obj.save()



# Register with custom filtering
admin.site.register(UserInfo, UserOwnedAdmin)
admin.site.register(SocialMedia, UserOwnedAdmin)
admin.site.register(WhatIDoItem, UserOwnedAdmin)
