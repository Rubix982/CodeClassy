FROM ubuntu:16.04
RUN apt-get update -y \
    apt-get install curl vim sudo build-essential -y \
    curl -sL https://deb.nodesource.com/setup_16.x | bash \
    apt-get install nodejs -y \
    node -v \
    npm -v
COPY . .
RUN mkdir temp \
    chmod 700  / \
    chmod 755 -R temp/ \
    adduser --disabled-password --gecos "" judge \
    cd app && npm install \
WORKDIR app
CMD cd app &&  npm start 
