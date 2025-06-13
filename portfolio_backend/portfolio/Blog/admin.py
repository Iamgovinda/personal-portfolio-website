from django.contrib import admin
from portfolio.Blog.models import Blog


class BlogAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.filter(owner=request.user)  # Show only owned blogs

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.owner = request.user  # Auto-assign owner if creating
        obj.save()



admin.site.register(Blog, BlogAdmin)
