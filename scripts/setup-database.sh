#!/bin/bash

# Database Setup Script for Design2Build.Pro
# This script creates the database and sets up the schema

echo "🔧 Setting up Design2Build.Pro database..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Default values if not in .env
DB_NAME=${DB_NAME:-design2build}
DB_USER=${DB_USER:-postgres}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}

echo "📊 Database: $DB_NAME"
echo "👤 User: $DB_USER"
echo "📍 Host: $DB_HOST:$DB_PORT"

# Check if PostgreSQL is running
if ! pg_isready -h $DB_HOST -p $DB_PORT > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running on $DB_HOST:$DB_PORT"
    echo "💡 Please start PostgreSQL first:"
    echo "   sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
echo "🔍 Checking if database exists..."
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "✅ Database '$DB_NAME' already exists"
else
    echo "📦 Creating database '$DB_NAME'..."
    createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME
    if [ $? -eq 0 ]; then
        echo "✅ Database '$DB_NAME' created successfully"
    else
        echo "❌ Failed to create database"
        echo "💡 You may need to run: sudo -u postgres createdb $DB_NAME"
        exit 1
    fi
fi

# Run database initialization
echo "🔄 Initializing database schema..."
npm run db:init

if [ $? -eq 0 ]; then
    echo "✅ Database setup complete!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update .env with your PostgreSQL password if needed"
    echo "   2. Start the backend server: npm run backend:dev"
    echo "   3. Start the frontend: npm run dev"
else
    echo "❌ Database initialization failed"
    exit 1
fi

