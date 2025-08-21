#!/bin/bash

# Retro Website Docker Startup Script

echo "🎮 Retro Website Docker Startup Script"
echo "========================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if video files exist
if [ ! -f "working/index/bong copy.mp4" ]; then
    echo "⚠️  Warning: 'bong copy.mp4' not found in working/index/"
    echo "   Please add your video files to the working/ directory"
fi

if [ ! -f "working/index/hellokittie.mp4" ]; then
    echo "⚠️  Warning: 'hellokittie.mp4' not found in working/index/"
    echo "   Please add your video files to the working/ directory"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p working/index
mkdir -p "working/main page"
mkdir -p songs

# Build and start the containers
echo "🚀 Building and starting Docker containers..."
docker-compose up --build -d

# Wait a moment for the container to start
echo "⏳ Waiting for container to start..."
sleep 5

# Check if container is running
if docker ps | grep -q retro-website; then
    echo "✅ Retro website is now running!"
    echo ""
    echo "🌐 Access the website at: http://localhost:8080"
    echo "🔑 Password: retro2024"
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop: docker-compose down"
    echo "   Restart: docker-compose restart"
    echo ""
    echo "🎮 Features:"
    echo "   - Video background with bong copy.mp4"
    echo "   - Hello Kitty interactive button"
    echo "   - Password verification system"
    echo "   - Interactive canvas drawing (Ctrl + Mouse)"
    echo "   - Video grid with audio playback"
    echo "   - Retro CRT effects and animations"
else
    echo "❌ Failed to start container. Check logs with: docker-compose logs"
    exit 1
fi 