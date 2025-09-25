# Use Python 3.11 slim image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Install Python dependencies
COPY pyproject.toml uv.lock* /app/
RUN uv sync --frozen

# Copy project
COPY . /app/

# Make wait script executable
RUN chmod +x wait-for-db.py

# Expose port
EXPOSE 8000

# Default command (can be overridden by docker-compose)
CMD ["uv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]