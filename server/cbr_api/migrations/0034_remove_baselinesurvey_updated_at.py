# Generated by Django 3.2.9 on 2021-11-14 06:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0033_baselinesurvey_server_created_at"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="baselinesurvey",
            name="updated_at",
        ),
    ]