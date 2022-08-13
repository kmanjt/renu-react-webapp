from django.contrib import admin
from jmespath import search
from django_summernote.admin import SummernoteModelAdmin
from .models import BlogPost

# Register your models here.
class BlogPostAdmin(SummernoteModelAdmin):  # instead of ModelAdmin
    exclude = ('slug',)
    list_display = ('id', 'title', 'category', 'date_created')
    list_display_links = ('id', 'title')
    search_fields = ('title',)
    list_per_page = 25
    summernote_fields = ('content',)

admin.site.register(BlogPost, BlogPostAdmin)
