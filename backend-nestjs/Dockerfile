FROM node:20-alpine

WORKDIR /

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 4200

RUN yarn prisma generate

CMD [ "yarn", "dev" ]