FROM ubuntu:16.04
RUN apt-get update -y
RUN apt-get install curl vim sudo build-essential -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install nodejs -y
RUN node -v
RUN npm -v

COPY . .
RUN mkdir temp
RUN chmod 777  /
RUN chmod 777 -R temp/
RUN adduser --disabled-password --gecos "" judge
RUN cd app && npm install
CMD cd app && sudo npm start 
