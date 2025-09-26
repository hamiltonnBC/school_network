# Django Backend Explained

This document provides a comprehensive overview of the Django backend for the Opportunities Alert System. It's designed to help new developers, especially those unfamiliar with Django, quickly understand the project's architecture, core concepts, and API structure.

## What is Django?

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It follows the "Don't Repeat Yourself" (DRY) principle.

### The MVT (Model-View-Template) Architecture

Django follows a Model-View-Template (MVT) architectural pattern, which is similar to the more widely known Model-View-Controller (MVC) pattern. Here's how it breaks down:

-   **Model**: The data access layer. This describes your data, typically a database table, and handles how to interact with it. Django provides an Object-Relational Mapper (ORM) that allows you to interact with your database using Python objects, abstracting away SQL.
-   **View**: The business logic layer. This receives web requests and returns web responses. A view retrieves data from the Model, processes it, and passes it to a Template.
-   **Template**: The presentation layer. This defines how the data is displayed to the user. Django's template language allows you to create dynamic HTML, XML, or other output formats.

In a typical web application flow:

1.  A user's browser sends a request to the Django server.
2.  Django's URL dispatcher matches the request URL to a specific View.
3.  The View processes the request, interacting with Models to retrieve or manipulate data.
4.  The View then renders a Template (if applicable) with the processed data.
5.  Django sends the rendered response back to the user's browser.

## Project Structure

Let's look at the key directories and files in the backend:

```
backend/
├── main.py             # Entry point for the application (e.g., Uvicorn for ASGI)
├── manage.py           # Django's command-line utility for administrative tasks
├── opportunities/      # Django app for managing opportunities
│   ├── __init__.py
│   ├── admin.py        # Defines how models are displayed in the Django admin interface
│   ├── apps.py         # Application configuration
│   ├── migrations/     # Database schema changes
│   ├── models.py       # Defines database models (ORM)
│   ├── tasks.py        # Celery tasks for background processing
│   ├── urls.py         # URL routing for the opportunities app
│   └── views.py        # Handles request/response logic for opportunities
├── project/            # Main Django project configuration
│   ├── __init__.py
│   ├── asgi.py         # ASGI configuration for async servers
│   ├── celery.py       # Celery configuration
│   ├── settings.py     # Main project settings
│   ├── urls.py         # Main project URL routing
│   └── wsgi.py         # WSGI configuration for traditional servers
├── users/              # Django app for user management
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations/
│   ├── models.py
│   ├── urls.py
│   └── views.py
└── documentation/      # This documentation directory
```

## Core Concepts Explained

### 1. Models (`models.py`)

In Django, a "Model" is a Python class that defines the structure of your data. Each model maps to a single database table. Django's Object-Relational Mapper (ORM) allows you to interact with your database using Python objects, eliminating the need to write raw SQL queries.

**Key features of Django Models:**

-   **Fields**: Define the types of data (e.g., `CharField` for text, `IntegerField` for numbers, `DateTimeField` for dates and times, `ForeignKey` for relationships).
-   **Relationships**: Define relationships between models (e.g., `OneToOneField`, `ForeignKey` for many-to-one, `ManyToManyField`).
-   **Methods**: You can add custom methods to your models to encapsulate business logic related to the data.

**Example (from `opportunities/models.py` - conceptual):**

```python
# opportunities/models.py
from django.db import models

class Opportunity(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    deadline = models.DateTimeField()
    # ... other fields ...

    def __str__(self):
        return self.title
```

### 2. Views (`views.py`)

"Views" are Python functions or classes that receive web requests and return web responses. They contain the logic for how to handle a particular URL. Views typically:

-   Retrieve data from the database using Models.
-   Process input from the user (e.g., form data).
-   Perform business logic.
-   Render templates or return data (e.g., JSON for API endpoints).

Django REST Framework (DRF) is used in this project to build API views, which handle HTTP requests and return JSON responses, making it easy for the frontend to consume data.

**Example (from `opportunities/views.py` - conceptual DRF view):**

```python
# opportunities/views.py
from rest_framework import generics
from .models import Opportunity
from .serializers import OpportunitySerializer

class OpportunityListCreateAPIView(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
```

### 3. URLs (`urls.py`)

The `urls.py` files define the URL routing for your Django project and individual apps. When a request comes in, Django's URL dispatcher looks at these patterns to decide which view function or class should handle the request.

-   **Project `urls.py` (`project/urls.py`)**: The main URL configuration for the entire project. It often includes URLs from individual apps.
-   **App `urls.py` (`opportunities/urls.py`, `users/urls.py`)**: Each app can have its own `urls.py` to manage its specific routes, which are then included in the main project's `urls.py`.

**Example (from `project/urls.py` and `opportunities/urls.py` - conceptual):**

```python
# project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/opportunities/', include('opportunities.urls')),
    path('api/users/', include('users.urls')),
]
```

```python
# opportunities/urls.py
from django.urls import path
from .views import OpportunityListCreateAPIView, OpportunityDetailAPIView

urlpatterns = [
    path('', OpportunityListCreateAPIView.as_view(), name='opportunity-list-create'),
    path('<int:pk>/', OpportunityDetailAPIView.as_view(), name='opportunity-detail'),
]
```

### 4. Migrations (`migrations/`)

Django's migration system allows you to make changes to your database schema (e.g., adding a field to a model) in a controlled and versioned way. When you make changes to your `models.py`, you'll run commands like `python manage.py makemigrations` to create migration files and `python manage.py migrate` to apply those changes to your database.

### 5. Admin (`admin.py`)

Django provides a powerful, automatically generated administrative interface. By registering your models in `admin.py`, you get a full-featured CRUD (Create, Read, Update, Delete) interface for your data with almost no effort. This is incredibly useful for managing content and users.

**Example (from `opportunities/admin.py` - conceptual):**

```python
# opportunities/admin.py
from django.contrib import admin
from .models import Opportunity

admin.site.register(Opportunity)
```

### 6. Serializers

While not explicitly a core Django component, "Serializers" are fundamental when building APIs with Django REST Framework. A serializer converts complex data types, like Django model instances, into native Python datatypes that can then be easily rendered into JSON, XML, or other content types. They also provide deserialization, allowing parsed data to be converted back into complex types.

**Example (conceptual):**

```python
# opportunities/serializers.py
from rest_framework import serializers
from .models import Opportunity

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = '__all__'
```

### 7. Celery Tasks (`tasks.py`)

Celery is an asynchronous task queue/job queue based on distributed message passing. It is used to execute long-running or resource-intensive tasks in the background, outside of the main request-response cycle. This keeps your web application responsive.

In this project, `tasks.py` files within apps (e.g., `opportunities/tasks.py`) define functions that can be run asynchronously by Celery. These might include sending emails, processing data, or generating reports.

## API Endpoints and URLs

The backend exposes a RESTful API. Here's a breakdown of the main endpoints, as also referenced in the frontend documentation:

### Opportunities App

-   **`GET /api/opportunities/`**
    -   **Description**: Retrieve a list of all opportunities.
    -   **Returns**: An array of opportunity objects.

-   **`POST /api/opportunities/`**
    -   **Description**: Create a new opportunity.
    -   **Requires**: Opportunity data in the request body (e.g., `title`, `description`, `deadline`).
    -   **Returns**: The newly created opportunity object.

-   **`GET /api/opportunities/:id/`**
    -   **Description**: Retrieve details of a specific opportunity by its ID.
    -   **Returns**: A single opportunity object.

-   **`PUT /api/opportunities/:id/`**
    -   **Description**: Update an existing opportunity by its ID.
    -   **Requires**: Updated opportunity data in the request body.
    -   **Returns**: The updated opportunity object.

-   **`DELETE /api/opportunities/:id/`**
    -   **Description**: Delete an opportunity by its ID.
    -   **Returns**: No content (204 status code) upon successful deletion.

### Users App

-   **`GET /api/users/profiles/`**
    -   **Description**: Retrieve a list of user profiles. (This might be restricted to authenticated users or administrators in a real application).
    -   **Returns**: An array of user profile objects.

-   **`POST /api/users/profiles/`**
    -   **Description**: Create or update a user profile. This endpoint might be used for initial profile creation or subsequent updates.
    -   **Requires**: User profile data in the request body.
    -   **Returns**: The created or updated user profile object.

-   **`GET /api/users/notes/`**
    -   **Description**: Retrieve notes associated with opportunities for the authenticated user.
    -   **Returns**: An array of user note objects.

-   **`POST /api/users/notes/`**
    -   **Description**: Add or update a user's note on a specific opportunity.
    -   **Requires**: Note data in the request body (e.g., `opportunity_id`, `note_content`).
    -   **Returns**: The created or updated user note object.

## Getting Started with Development

1.  **Prerequisites**: Ensure you have Python and Docker installed.
2.  **Clone the repository**:
    `git clone <repository_url>`
3.  **Navigate to the backend directory**:
    `cd backend`
4.  **Set up a virtual environment and install dependencies**:
    `python -m venv venv`
    `source venv/bin/activate`
    `pip install -r requirements.txt` (assuming requirements.txt exists, or use uv.lock for `uv pip install -r uv.lock`)
5.  **Run database migrations**:
    `python manage.py makemigrations`
    `python manage.py migrate`
6.  **Create a superuser** (for accessing the Django admin):
    `python manage.py createsuperuser`
7.  **Start the development server**:
    `python manage.py runserver`

Alternatively, you can use Docker Compose from the project root to run the entire stack:

```bash
# From project root
docker-compose up --build
```

This will start the Django backend, frontend, and other services (like PostgreSQL and Celery if configured).

## Further Reading

-   [Django Documentation](https://docs.djangoproject.com/en/stable/)
-   [Django REST Framework Documentation](https://www.django-rest-framework.org/)
-   [Celery Documentation](https://docs.celeryq.dev/en/stable/)
