# Generated by Django 4.0 on 2023-01-26 04:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0046_auto_20220331_2337"),
    ]

    operations = [
        migrations.AddField(
            model_name="client",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
    ]