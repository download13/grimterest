FROM node:6.2.2

WORKDIR /app

COPY package.json package.json
RUN npm install --production
COPY dist/ dist/
COPY src/ src/

CMD ["npm", "start"]
