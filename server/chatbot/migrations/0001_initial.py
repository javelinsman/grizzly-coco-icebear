# Generated by Django 3.1.7 on 2021-05-12 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChatbotState',
            fields=[
                ('encrypted_pk', models.TextField(primary_key=True, serialize=False)),
                ('state', models.JSONField()),
            ],
        ),
    ]
