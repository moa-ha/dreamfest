# DreamFest

Dreamfest is a music festival, and the planning team has already built the UI and the routes, as well as having designed and seeded the initial database tables. We'll implement the database functions to be used from the routes, allowing the planning team to manage locations and events.

## Setup

### Installation and migrations

- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`

  ```
  npm i
  npm run knex migrate:latest
  npm run knex seed:run
  npm run dev
  ```

  This will create and populate the database with the existing migrations and seeds, and start the server.
  </details>

### Demo
![DreamFest](./reference-imgs/dreamfest.gif)
