# Generated by Django 3.1.6 on 2021-04-01 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0009_usercbr_role"),
    ]

    operations = [
        migrations.AddField(
            model_name="client",
            name="last_visit_date",
            field=models.BigIntegerField(default=0),
        ),
    ]