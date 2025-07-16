# Use official Playwright image with browsers installed
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Use official Node LTS base image
#FROM node:lts

USER root

# Docker CLI kur
RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci
# Install Playwright browsers (chromium, firefox, webkit) and all dependencies
RUN npx playwright install 

# Copy all source files
COPY . .

# Default command to run tests
CMD ["npx", "playwright", "test"]
