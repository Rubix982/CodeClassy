FROM alpine/git AS codepuller
ARG githubsecret 
ARG username
ARG repository
WORKDIR /
RUN git clone https://username:${githubsecret}@github.com/${username}/${repository}.git
# cross check the username and repository name from the GitHub clone link.

# ENTRYPOINT ["/bin/sh", "-c", "sleep 1200"] 
# To test this code pulling, uncomment entry point statement and create a container



FROM node:16.3.0-alpine AS builder
ARG repository
COPY --from=codepuller /${repository} /${repository}
WORKDIR /${repository}/editor
RUN npm install
EXPOSE 4000
CMD [ "node", "app.js" ]
