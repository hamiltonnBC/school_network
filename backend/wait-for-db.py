#!/usr/bin/env python3
import os
import sys
import time
import psycopg2
from psycopg2 import OperationalError

def wait_for_db():
    """Wait for database to be available"""
    db_conn = None
    while not db_conn:
        try:
            db_conn = psycopg2.connect(
                host=os.environ.get('DB_HOST', 'db'),
                port=os.environ.get('DB_PORT', '5432'),
                user=os.environ.get('DB_USER', 'admin'),
                password=os.environ.get('DB_PASSWORD', 'password'),
                database=os.environ.get('DB_NAME', 'opportunitiesdb')
            )
            print("Database connection successful!")
        except OperationalError:
            print("Database unavailable, waiting 1 second...")
            time.sleep(1)
    
    if db_conn:
        db_conn.close()

if __name__ == '__main__':
    wait_for_db()
    print("Database is ready!")