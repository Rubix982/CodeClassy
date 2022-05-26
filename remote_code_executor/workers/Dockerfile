FROM alpine/git AS codepuller
ARG githubsecret 
ARG username
ARG repository
WORKDIR /
RUN git clone https://username:${githubsecret}@github.com/${username}/${repository}.git
# cross check the username and repository name from the GitHub clone link.

# ENTRYPOINT ["/bin/sh", "-c", "sleep 1200"] 
# To test this code pulling, uncomment entry point statement and create a container



FROM ubuntu:20.04 AS builder
ARG repository
COPY --from=codepuller /${repository} /${repository}
RUN apt-get update -y; \
    apt-get install curl vim sudo build-essential -y; \
    curl -sL https://deb.nodesource.com/setup_16.x | bash; \
    apt-get install nodejs -y
WORKDIR /${repository}/remote_code_executor/workers/
RUN mkdir temp; \
    chmod 700 /; \
    chmod 755 -R temp/; \
    adduser --disabled-password --gecos "" judge 

WORKDIR /${repository}/remote_code_executor/workers/app
RUN npm install
CMD ["npm","start"]

