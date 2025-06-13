from django.contrib import admin
from portfolio.resume.models import Certificate, Skill, Experience, Education


class UserOwnedAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user=request.user)  # Filter by current logged-in user

    def save_model(self, request, obj, form, change):
        if not obj.pk:  # If creating new object
            obj.user = request.user
        obj.save()


# Register each model with the custom admin
admin.site.register(Education, UserOwnedAdmin)
admin.site.register(Experience, UserOwnedAdmin)
admin.site.register(Skill, UserOwnedAdmin)
admin.site.register(Certificate, UserOwnedAdmin)
