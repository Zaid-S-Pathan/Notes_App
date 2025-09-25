from django.core.management.base import BaseCommand
from django.db import connection
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Test database connection and show database info'

    def handle(self, *args, **options):
        try:
            # Test basic connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                self.stdout.write(
                    self.style.SUCCESS('✅ Database connection successful!')
                )
            
            # Show database info
            db_settings = connection.settings_dict
            self.stdout.write(f"Database Engine: {db_settings['ENGINE']}")
            self.stdout.write(f"Database Name: {db_settings['NAME']}")
            self.stdout.write(f"Database Host: {db_settings.get('HOST', 'localhost')}")
            
            # Test if tables exist
            try:
                user_count = User.objects.count()
                self.stdout.write(f"✅ User table exists with {user_count} users")
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'❌ User table issue: {e}')
                )
                self.stdout.write(
                    self.style.WARNING('Run: python manage.py migrate')
                )
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Database connection failed: {e}')
            )