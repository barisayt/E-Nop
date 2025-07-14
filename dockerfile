# Use official Playwright image with browsers installed
FROM mcr.microsoft.com/playwright:focal

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Default command to run tests
CMD ["npx", "playwright", "test"]
