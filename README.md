# Trackr

Don't fooled by tools. Get things done.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/), [mongodb](https://docs.mongodb.com/manual/tutorial/getting-started/) and [docker](https://www.docker.com/get-started) installed on your local machine.

From root directory:
- start the dev server with backend & mongodb
  ```sh
  npm run dev
  ```

  App should now be running on [localhost:3000](http://localhost:3000/).
- debug 
  - inspect client side docker container
  ```sh
  npm run inspect-client
  ```
  - inspect node server docker container
  ```sh
  npm run inspect-server
  ```
  - inspect mongodb docker container
  ```sh
  npm run inspect-db
  ```

## Build
```sh
npm run build
```

## Resources

For docker:

- [Quick start & cheat sheet & docker compose](https://github.com/eelfonik/dev-infra/blob/master/docker.md)

For informations about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
