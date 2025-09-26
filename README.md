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

A scheduled Celery task that runs daily to check for opportunities with deadlines. Users can select whether or not they want notifications for this, and if so, how many days ahead of the deadline for something they want to be notified. 

Setup Instructions
Prerequisites: Ensure you have Docker and Docker Compose installed on your system.

Build and Run: From the root directory of the project (where docker-compose.yml is located), run the following command:

docker-compose up --build

This will build the Docker images, start all services (Django, Postgres, Redis), and run the initial migrations.

Access the Application:

The Django backend will be available at http://localhost:8000.
http://localhost:8000/admin for admin management

The React frontend will be available at http://localhost:5173.

View Notifications:

To see the scheduled Celery task running, you can inspect the logs of the backend service. The task is configured to run daily at 7 AM. You can manually trigger the task by running:

docker-compose exec backend python manage.py shell
# Inside the shell:
from opportunities.tasks import send_deadline_alerts
send_deadline_alerts.delay()
exit()

API Endpoints (Needs updated as of Sep 26 2025)
POST /api/users/profiles/: Create or update a user profile.

Body: { "username": "JohnDoe", "preferences": ["Internship", "Job"] }

POST /api/opportunities/: Create a new opportunity.

Body: { "title": "Summer Internship", "deadline": "2026-03-15", "type": "Internship", "notes": "Optional additional details", "posted_by": "Optional poster name" }

Email service will be implemented soon, and slack messaging as well.

## Documentation

For a comprehensive understanding of the project, refer to the detailed documentation:

- [Backend Explained](backend/documentation/backend_explained_Sep26_2025.md)
- [Frontend Explained](frontend/documentation/frontend_explained_Sep26_2025.md)

## API Endpoint Mapping (Backend to Frontend)

This section illustrates how specific backend API endpoints are consumed by the frontend application.

### Opportunities

-   **Backend Endpoint**: `GET /api/opportunities/`
    -   **Description**: Retrieves a list of all opportunities.
    -   **Frontend Call**: Utilized in `src/hooks/useOpportunities.ts` (e.g., in a `fetchOpportunities` function) to populate the `OpportunitiesList.tsx` page.

-   **Backend Endpoint**: `POST /api/opportunities/`
    -   **Description**: Creates a new opportunity.
    -   **Frontend Call**: Called from `src/pages/OpportunityForm.tsx` when a user submits the form to add a new opportunity.

-   **Backend Endpoint**: `GET /api/opportunities/:id/`
    -   **Description**: Retrieves details of a specific opportunity.
    -   **Frontend Call**: Used in `src/hooks/useOpportunities.ts` (e.g., `fetchOpportunityById`) and displayed on the `OpportunityDetail.tsx` page.

### Users

-   **Backend Endpoint**: `GET /api/users/profiles/`
    -   **Description**: Retrieves a list of user profiles.
    -   **Frontend Call**: Could be used in an admin-like section or `src/hooks/useUserProfile.ts` to fetch a specific user's profile for `UserProfile.tsx` or `Settings.tsx`.

-   **Backend Endpoint**: `POST /api/users/profiles/`
    -   **Description**: Creates or updates a user profile.
    -   **Frontend Call**: Invoked from `src/pages/UserProfile.tsx` or `src/pages/Settings.tsx` when a user updates their profile information or notification preferences.

## API Endpoints

For a complete list and detailed description of all API endpoints, please refer to the [Backend Explained](backend/documentation/backend_explained_Sep26_2025.md) documentation.
