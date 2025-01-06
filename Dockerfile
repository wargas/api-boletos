# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.6.0

FROM node:${NODE_VERSION}-alpine as base


WORKDIR /usr/src/app


FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

WORKDIR /usr/src/app/build

# Use production node environment by default.
ENV BUILD_TIME=$(date)
ENV NODE_ENV production
ENV PORT=3333
ENV HOST=0.0.0.0
ENV TZ=UTC
ENV PORT=3333
ENV LOG_LEVEL=info
ENV APP_KEY=Jr-_tjAL9Te8CG6GYhda_V7zbKBQZJm_
ENV DB_HOST=deltex.com.br
ENV DB_PORT=3306
ENV DB_USER=admin
ENV DB_PASSWORD=Wrgs2703!
ENV DB_DATABASE=boletos

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./


# Expose the port that the application listens on.
EXPOSE 3333

# Run the application.
CMD ["node", "./bin/server.js"]
