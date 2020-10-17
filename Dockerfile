FROM node:12.18-alpine as build-env
ADD . /app
WORKDIR /app
COPY . /app
RUN npm i 
RUN npm run build 
RUN npm prune --prod
RUN rm -rf **/**.ts **/**.js.map


FROM gcr.io/distroless/nodejs:12
COPY --from=build-env /app /app
WORKDIR /app
CMD ["index.js"]