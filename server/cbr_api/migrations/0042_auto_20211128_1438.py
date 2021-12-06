# Generated by Django 3.2.9 on 2021-11-28 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0041_auto_20211121_2102"),
    ]

    operations = [
        migrations.AlterField(
            model_name="alert",
            name="id",
            field=models.AutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="alert",
            name="priority",
            field=models.CharField(
                choices=[("HI", "High"), ("ME", "Medium"), ("LO", "Low")], max_length=9
            ),
        ),
    ]