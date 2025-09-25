Opportunities Alert System MVP
This project is a Minimum Viable Product (MVP) for a departmental opportunities alert system. It demonstrates a full-stack application with a scheduled background task for sending deadline notifications.

Tech Stack
Backend: Django (Python)

Frontend: React with Vite and Tailwind CSS

Database: PostgreSQL

Task Queue: Celery with Redis as the broker

Containerization: Docker

Features
User profiles to store notification preferences.

A simple API for creating user profiles and opportunities.

A scheduled Celery task that runs daily to check for opportunities with deadlines in the next 7 days.

Simulated notification "sending" to the console.

Setup Instructions
Prerequisites: Ensure you have Docker and Docker Compose installed on your system.

Build and Run: From the root directory of the project (where docker-compose.yml is located), run the following command:

docker-compose up --build

This will build the Docker images, start all services (Django, Postgres, Redis), and run the initial migrations.

Access the Application:

The Django backend will be available at http://localhost:8000.

The React frontend will be available at http://localhost:5173.

View Notifications:

To see the scheduled Celery task running, you can inspect the logs of the backend service. The task is configured to run daily at 7 AM. You can manually trigger the task by running:

docker-compose exec backend python manage.py shell
# Inside the shell:
from opportunities.tasks import send_deadline_alerts
send_deadline_alerts.delay()
exit()

API Endpoints
POST /api/users/profiles/: Create or update a user profile.

Body: { "username": "JohnDoe", "preferences": ["Internship", "Job"] }

POST /api/opportunities/: Create a new opportunity.

Body: { "title": "Summer Internship", "deadline": "2026-03-15", "type": "Internship", "notes": "Optional additional details", "posted_by": "Optional poster name" }

This MVP provides a foundation for you to build upon. Next steps could include implementing a full user authentication system, a proper UI for a list of opportunities, and a real notification service (e.g., email or Slack).