#Base Image node:12.18.4-alpine
FROM node:12.18.4-alpine
#Set working directory to /app
WORKDIR /app
#Set PATH /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package.json

#Copy the app
COPY . ./

#Install Packages
RUN npm install
RUN apk add curl
#Expose application port
EXPOSE 80

#Start the app
CMD ["node", "app.js"]
