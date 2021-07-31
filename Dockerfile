FROM ubuntu:latest AS app-dev

# Installs Curl
RUN apt-get -y update && apt-get -y install curl

# Installs Nodejs 12.x
RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install nodejs
RUN npm install -g yarn
RUN node -v

# Install psql client
RUN apt install -y postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

# Installs bcrypt directly from withing the container's environment as suggested by https://stackoverflow.com/a/62445004
# The error occurs because when you install bcypt, npm installs the recommended
# version for your machine and operating system, but when you are on another machine, this doesn't work.
RUN npm uninstall bcrypt
RUN npm i bcrypt

RUN npm run build

FROM ubuntu:latest as app-prod

# Installs Curl
RUN apt-get -y update && apt-get -y install curl

# Installs Nodejs 12.x
RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install nodejs
RUN npm install -g yarn
RUN node -v

# Install psql client
RUN apt install -y postgresql-client

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=app-dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
