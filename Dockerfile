#FROM httpd:latest
#COPY APP /usr/local/apache2/htdocs/
# specify the node base image with your desired version node:<version>
#FROM node:16
# replace this with your application's default port
#EXPOSE 80
FROM node:18

WORKDIR /

COPY package*.json ./
#RUN npm ci --quiet
RUN npm install

#COPY APP/prisma prisma
#RUN npx prisma generate

#RUN npm install
#RUN npx prisma migrate deploy
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

# копируем исходный код
COPY ./ ./

WORKDIR /

#RUN npx prisma generate

EXPOSE 4000
CMD [ "node", "./server/index.js" ]
