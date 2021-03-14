# Generated by Django 3.1.7 on 2021-03-14 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cbr_api', '0008_auto_20210310_1337'),
    ]

    operations = [
        migrations.AddField(
            model_name='usercbr',
            name='role',
            field=models.CharField(choices=[('ADM', 'Admin'), ('WRK', 'CBR Worker'), ('CLN', 'Clinician')], default='WRK', max_length=3),
        ),
    ]
