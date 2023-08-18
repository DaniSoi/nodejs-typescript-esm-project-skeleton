FROM node:16.14.0-alpine

WORKDIR /code/apps/server

COPY tsconfig.json .
COPY tsconfig.build.json .
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install --frozen-lockfile

# Build typescript
COPY . .
RUN yarn build

# Clean up dev dependencies
RUN yarn install --production

CMD [ "yarn", "start:prod" ]
