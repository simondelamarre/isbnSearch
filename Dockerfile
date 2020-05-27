FROM alpine:3.6

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss

FROM node:10

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3939
CMD [ "node", "API/index.js" ]

