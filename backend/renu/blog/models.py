from sre_parse import CATEGORIES
from xml.sax.handler import feature_external_ges
from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify
# Create your models here.

class Categories(models.TextChoices):
    GARDENING = 'gardening'
    COMPOSTING = 'composting'
    FOOD = 'food'
    ENVIRONMENT = 'environment'

class BlogPost(models.Model):
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50, default="Author")
    slug = models.SlugField()
    category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.GARDENING)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d/')
    excerpt = models.CharField(max_length=150)
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = BlogPost.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.feaured = False
                    temp.save()

            except BlogPost.DoesNotExist:
                pass
        
        super(BlogPost, self).save(*args, **kwargs)

    def __str__(self):
        return self.title