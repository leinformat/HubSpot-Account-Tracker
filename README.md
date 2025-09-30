# HubSpot Tracker API

API to receive HubSpot tracking data from a Chrome extension and save it in MongoDB.

## Project Structure

```
.env
.env-example
.gitignore
package.json
src/
  server.js
  config/
    config.js
  models/
    databaseActions.js
    databaseConnection.js
  routes/
    tracker.js
```

## Installation

1. Clone the repository.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Copy `.env-example` to `.env` and fill in your environment variables:

   ```
   PORT=
   MONGO_URI=
   DB_NAME=
   ```

## Usage

### Development

```sh
npm run dev
```

### Production

```sh
npm start
```

## Endpoints

- **POST /api/tracker**  
  Save a new log.  
  Required fields: `email`, `portalName`, `portatId`, `timestamp`, `url`.

- **GET /api/tracker**  
  Retrieve all logs.

## Main Files

- [`src/server.js`](src/server.js): Starts the Express server.
- [`src/routes/tracker.js`](src/routes/tracker.js): API routes.
- [`src/models/databaseActions.js`](src/models/databaseActions.js): Database actions.
- [`src/models/databaseConnection.js`](src/models/databaseConnection.js): MongoDB connection.
- [`src/config/config.js`](src/config/config.js): Environment configuration.

## License

MIT