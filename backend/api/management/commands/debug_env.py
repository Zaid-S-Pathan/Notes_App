from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    help = 'Debug environment variables'

    def handle(self, *args, **options):
        database_url = os.getenv('DATABASE_URL')
        debug = os.getenv('DEBUG')
        
        if database_url:
            # Hide password for security
            safe_url = database_url.replace(database_url.split(':')[2].split('@')[0], '***')
            self.stdout.write(f"DATABASE_URL: {safe_url}")
        else:
            self.stdout.write("❌ DATABASE_URL not set!")
            
        self.stdout.write(f"DEBUG: {debug}")
        self.stdout.write(f"All env vars with 'DATA': {[k for k in os.environ.keys() if 'DATA' in k]}")