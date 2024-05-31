# Stage 1 (Builder Stage)
FROM node:18.18-alpine as builder

# Set node environement
ENV NODE_ENV build

# Switch to the "node" user for security
USER node

# Create app directory
WORKDIR /home/node

# Copy both package.json AND package-lock.json into the Docker image
COPY package*.json ./

# Install project dependencies using the package-lock.json
RUN npm ci

# Bundle app source with node ownership
COPY --chown=node:node . .

# Build the project and prune installed packages to reduce image size
RUN npm run build && npm prune --omit=dev

# ---

# Stage 2 (Final Stage)
FROM node:18.18-alpine

# Set node environement
ENV NODE_ENV production

# Switch to the "node" user for security
USER node

# Set the working directory to /home/node
WORKDIR /home/node

# Copy specific files and directories from the builder stage to the final stage
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

# Run the Node.js application
CMD ["node", "dist/main.js"]