# Generated by Django 4.1 on 2022-08-21 17:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_delete_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='day',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='month',
        ),
    ]
