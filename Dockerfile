# Stage 1: Build TypeScript project
FROM node:18.17.1-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy project files
COPY . .

# Build TypeScript
RUN yarn build

# Clean up dev dependencies
RUN yarn install --production

# Stage 2: Create production image
FROM node:18.17.1-alpine

# Set working directory
WORKDIR /app

# Copy built files from previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Set user and group for non-root execution
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Command to run the application
CMD [ "yarn", "start:prod" ]
