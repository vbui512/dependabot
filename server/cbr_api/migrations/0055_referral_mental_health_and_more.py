# Generated by Django 4.0 on 2023-06-01 05:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0054_baselinesurvey_health_have_mental_condition"),
    ]

    operations = [
        migrations.AddField(
            model_name="referral",
            name="mental_health",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="referral",
            name="mental_health_condition",
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
