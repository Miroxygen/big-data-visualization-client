# Big Data Client

A web application for displaying big data, built using Express.js with EJS templating and integrated with Chart.js for data visualization.

### Overview

This project is a client-side application designed to present big data in an intuitive and user-friendly manner. The application utilizes Express.js for server-side operations, EJS for templating, and Chart.js for rendering charts.

## Core Functionalities

  - Homepage: A welcoming homepage that encourages users to interact with the big data.
  - Error Handling: Custom error handling for undefined routes.
  - Data Visualization: Integration with Chart.js to render data visualizations.

### Technologies Used

  -  Express.js: Web framework for Node.js to handle routing and server-side logic.
 -   EJS: Embedded JavaScript templating for rendering dynamic content.
 -   Chart.js: JavaScript library for creating responsive and customizable charts.
 -   Helmet: Middleware to enhance the security of the application.
 -   dotenv: For managing environment variables.
 -   Nodemon: For automatic restarting of the server during development.
 -   Elasticsearch: For potential integration with Elasticsearch for handling big data.

## Project Structure

 -   src/server.js: Main server file to initialize and configure the Express application.
 -   routes/router.js: Handles routing for the application.
 -   views: Directory containing EJS templates.
 -   public: Directory containing static assets like CSS and JavaScript files.

## Setup

  1.  Clone the repository:

  -  git clone git@gitlab.lnu.se:mh225wi/big-data-client.git
    cd big-data-client

2. Install dependencies:

- npm install

3. Set up environment variables in a .env file.

4. Start the application:

- npm start

- For development, use: npm run devStart

## Environment Variables

   - PORT: The port on which the server will run.

## Scripts

  -  devStart: Starts the server with Nodemon for development.
 -   start: Starts the server.
 -   lint: Runs ESLint to check for code style issues.
 -   lint:fix: Runs ESLint and fixes any auto-fixable issues.

## Dependencies

-    @elastic/elasticsearch: For Elasticsearch integration.
-    chart.js: For data visualization.
-    dotenv: For managing environment variables.
-    ejs: For templating.
-    express: Web framework.
-    helmet: Security middleware.
-    node-fetch: For making HTTP requests.

### Dev Dependencies

  -  @lnu/eslint-config: ESLint configuration.
  -  nodemon: For automatic server restarts during development.

## License

This project is licensed under the ISC License.
