# Generated by Django 3.2.8 on 2021-11-02 01:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cbr_api', '0024_auto_20211030_1140'),
    ]

    operations = [
        migrations.RenameField(
            model_name='client',
            old_name='created_date',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='created_by_user',
            new_name='user',
        ),
        migrations.RemoveField(
            model_name='client',
            name='modified_date',
        ),
        migrations.AddField(
            model_name='client',
            name='updated_at',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='client',
            name='id',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]
