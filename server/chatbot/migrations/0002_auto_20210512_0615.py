# Generated by Django 3.1.7 on 2021-05-12 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatbot', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatbotstate',
            name='state',
            field=models.JSONField(null=True),
        ),
    ]