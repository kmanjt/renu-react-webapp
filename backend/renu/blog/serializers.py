from .models import BlogPost
from rest_framework import  serializers

# Serializers define the API representation.
class BlogPostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'
        lookup_field = 'slug'