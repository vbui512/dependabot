# Generated by Django 4.0 on 2023-05-15 23:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0049_alter_alert_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="referral",
            name="orthotic_injury_location",
            field=models.CharField(
                blank=True,
                choices=[
                    ("WEAK_LEG", "Weak Leg"),
                    ("CEREBRAL_PALSY", "Cerebral Palsy"),
                    ("SPINA_BIFIDA", "Spina Bifida"),
                    ("CLUB_FOOT", "Club Foot"),
                    ("INJECTION_NEURITIS", "Injection Neuritis"),
                    ("DROP_FOOT", "Drop Foot"),
                    ("POLIO", "Polio"),
                    ("OTHER", "Other"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="referral",
            name="prosthetic_injury_location",
            field=models.CharField(
                blank=True,
                choices=[
                    ("BELOW_KNEE", "Below Knee"),
                    ("ABOVE_KNEE", "Above Knee"),
                    ("BELOW_ELBOW", "Above Elbow"),
                    ("ABOVE_ELBOW", "Above Elbow"),
                ],
                max_length=20,
            ),
        ),
    ]
