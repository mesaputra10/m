FROM node:alpine

RUN apk update && apk add ca-certificates wget openssl && update-ca-certificates
