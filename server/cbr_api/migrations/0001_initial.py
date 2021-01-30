# Generated by Django 3.1.5 on 2021-01-30 23:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('client_id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('public_id', models.PositiveIntegerField(unique=True)),
                ('birth_date', models.BigIntegerField()),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('gender', models.BooleanField()),
                ('register_date', models.BigIntegerField()),
                ('contact_number', models.CharField(blank=True, max_length=200)),
                ('current_longitude', models.DecimalField(decimal_places=16, max_digits=22)),
                ('current_latitude', models.DecimalField(decimal_places=16, max_digits=22)),
                ('current_village', models.CharField(max_length=200)),
                ('current_picture', models.ImageField(blank=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Disability',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('disability_type', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('user_type', models.CharField(choices=[('WRK', 'Worker'), ('CLN', 'Clinician'), ('ADM', 'Admin')], max_length=3)),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('phone_number', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
                ('deactivated', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zone_name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Visit',
            fields=[
                ('visit_id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('caregiver_present', models.BooleanField(default=False)),
                ('caregiver_contact', models.CharField(blank=True, max_length=200)),
                ('date_visited', models.BigIntegerField()),
                ('purpose', models.CharField(choices=[('CBR', 'Community Based Rehabilitation'), ('REF', 'Disability Centre Referral'), ('FOL', 'Referral Follow-Up')], max_length=3)),
                ('health_risk', models.CharField(blank=True, choices=[('LO', 'Low'), ('ME', 'Medium'), ('HI', 'High'), ('CR', 'Critical')], max_length=2)),
                ('health_goal_met', models.CharField(blank=True, choices=[('CAN', 'Cancelled'), ('GO', 'Ongoing'), ('CON', 'Concluded')], max_length=3)),
                ('health_goal_outcome', models.CharField(blank=True, max_length=500)),
                ('social_risk', models.CharField(blank=True, choices=[('LO', 'Low'), ('ME', 'Medium'), ('HI', 'High'), ('CR', 'Critical')], max_length=2)),
                ('social_goal_met', models.CharField(blank=True, choices=[('CAN', 'Cancelled'), ('GO', 'Ongoing'), ('CON', 'Concluded')], max_length=3)),
                ('social_goal_outcome', models.CharField(blank=True, max_length=500)),
                ('education_risk', models.CharField(blank=True, choices=[('LO', 'Low'), ('ME', 'Medium'), ('HI', 'High'), ('CR', 'Critical')], max_length=2)),
                ('education_goal_met', models.CharField(blank=True, choices=[('CAN', 'Cancelled'), ('GO', 'Ongoing'), ('CON', 'Concluded')], max_length=3)),
                ('education_goal_outcome', models.CharField(blank=True, max_length=500)),
                ('visit_longitude', models.DecimalField(decimal_places=16, max_digits=22)),
                ('visit_latitude', models.DecimalField(decimal_places=16, max_digits=22)),
                ('visit_village', models.CharField(max_length=200)),
                ('visit_picture', models.ImageField(blank=True, upload_to='images/')),
                ('client_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cbr_api.client')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cbr_api.user')),
                ('visit_zone', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='cbr_api.zone')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='cbr_api.zone'),
        ),
        migrations.CreateModel(
            name='Improvement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('improvement_type', models.CharField(max_length=200)),
                ('improvement_desc', models.CharField(max_length=500)),
                ('visit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cbr_api.visit')),
            ],
        ),
        migrations.CreateModel(
            name='DisabilityJunction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cbr_api.client')),
                ('disability', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cbr_api.disability')),
            ],
        ),
        migrations.AddField(
            model_name='client',
            name='current_zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='cbr_api.zone'),
        ),
    ]
