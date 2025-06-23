# Use Node.js base image with Debian
FROM node:18-bullseye

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install Node.js dependencies
RUN npm install

# Install Python dependencies if requirements.txt exists
RUN [ -f requirements.txt ] && pip3 install -r requirements.txt || true

# Build Next.js project
RUN npm run build

# Default command
CMD ["npm", "start"]
