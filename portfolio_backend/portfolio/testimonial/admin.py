from django.contrib import admin

# Register your models here.
from portfolio.testimonial.models import Testimonial


class UserOwnedAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user=request.user)

    def save_model(self, request, obj, form, change):
        if not obj.pk:  # New object
            obj.user = request.user
        obj.save()


admin.site.register(Testimonial, UserOwnedAdmin)
