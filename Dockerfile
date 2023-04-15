FROM node:16-alpine

# Include dev dependencies
ENV NODE_ENV=dev

# Create directory
WORKDIR /code

# Import dependencies
COPY package*.json ./

# Bundle app
COPY . .


# Install dependencies
RUN npm install

RUN ls -a
RUN cd node_modules && ls -a

# Ports
EXPOSE 8000

# Run
CMD ["npm","start"]
