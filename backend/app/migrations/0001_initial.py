# Generated by Django 4.2.16 on 2024-12-04 10:26

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="first name"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="last name"
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                (
                    "date_joined",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                ("username", models.CharField(max_length=255, unique=True)),
                ("name", models.CharField(max_length=255)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "user",
                "verbose_name_plural": "users",
                "abstract": False,
            },
            managers=[("objects", django.contrib.auth.models.UserManager()),],
        ),
        migrations.CreateModel(
            name="AppInfo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("info_code", models.CharField(blank=True, max_length=50, null=True)),
                ("info_value", models.CharField(blank=True, max_length=255, null=True)),
                ("deleted", models.IntegerField(blank=True, default=0, null=True)),
                ("created_by", models.CharField(blank=True, max_length=100, null=True)),
                ("dtm_created", models.DateTimeField(auto_now_add=True)),
                (
                    "modified_by",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("dtm_modified", models.DateTimeField(auto_now=True)),
                ("remarks", models.TextField(blank=True, max_length=1000, null=True)),
                (
                    "dev_remarks",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Transaction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateField(blank=True, null=True)),
                ("amount", models.IntegerField(blank=True, null=True)),
                (
                    "description",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
                ("deleted", models.IntegerField(blank=True, default=0, null=True)),
                ("created_by", models.CharField(blank=True, max_length=100, null=True)),
                ("dtm_created", models.DateTimeField(blank=True, null=True)),
                (
                    "modified_by",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("dtm_modified", models.DateTimeField(blank=True, null=True)),
                ("remarks", models.TextField(blank=True, max_length=1000, null=True)),
                (
                    "dev_remarks",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
                (
                    "transaction_type",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Savings",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "savings_category",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("savings_amount", models.IntegerField(blank=True, null=True)),
                ("date", models.DateField(blank=True, null=True)),
                ("deleted", models.IntegerField(blank=True, default=0, null=True)),
                ("created_by", models.CharField(blank=True, max_length=100, null=True)),
                ("dtm_created", models.DateTimeField(blank=True, null=True)),
                (
                    "modified_by",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("dtm_modified", models.DateTimeField(blank=True, null=True)),
                ("remarks", models.TextField(blank=True, max_length=1000, null=True)),
                (
                    "dev_remarks",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
                ("reminder", models.BooleanField(default=False)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Policy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "policy_no",
                    models.CharField(
                        blank=True, max_length=255, null=True, unique=True
                    ),
                ),
                ("policy_amount", models.IntegerField(blank=True, null=True)),
                ("policy_start_date", models.DateField(blank=True, null=True)),
                ("policy_due_date", models.DateField(blank=True, null=True)),
                (
                    "policy_method",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                ("next_due_date", models.DateField(blank=True, null=True)),
                ("reminder_date", models.DateField(blank=True, null=True)),
                ("deleted", models.BooleanField(default=False)),
                ("dtm_created", models.DateTimeField(auto_now_add=True)),
                ("dtm_modified", models.DateTimeField(auto_now=True)),
                ("remarks", models.TextField(blank=True, max_length=1000, null=True)),
                (
                    "dev_remarks",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "modified_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="policy_modified",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="policies",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Loan",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "loan_category",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("loan_type", models.CharField(blank=True, max_length=50, null=True)),
                ("loan_amount", models.IntegerField(blank=True, null=True)),
                ("loan_due_date", models.DateField(blank=True, null=True)),
                ("next_due_date", models.DateField(blank=True, null=True)),
                ("reminder_date", models.DateField(blank=True, null=True)),
                ("deleted", models.IntegerField(blank=True, default=0, null=True)),
                ("created_by", models.CharField(blank=True, max_length=100, null=True)),
                ("dtm_created", models.DateTimeField(blank=True, null=True)),
                (
                    "modified_by",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("dtm_modified", models.DateTimeField(blank=True, null=True)),
                ("remarks", models.TextField(blank=True, max_length=1000, null=True)),
                (
                    "dev_remarks",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
