# Njord Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the Typescript template, since almost everything is written in Typescript.

The purpose of this project is to showcase some of the popular libraries within a simple application. The app handles an user login, a listing of items from the backend and some data modifying functions.

## Install and run

In the project directory, you can run:

### `npm i` and `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Linting
The application has linting set up. Usage:\
`npm run eslint`


## About the chosen libraries

### Routing
For routing, this project uses `react-router-dom` which is React's preferred library for routing.

### State management
For state management, this project uses `apollo`. Local state management has recently been added to this library, but it looks like a solid choice for this project.

### Forms
For forms, there is a library used called Formik. While this project is not using too many forms, Formik can save a lot of time in larger projects.

### UI components
For the UI components, this projects uses Material UI's Pre-released version (5x alpha) which uses `@emotion` for styling and seems to be a solid library for the UI.

### Backend communication
For HTTP requests the app uses `axios` and `apollo-link-rest`. Apollo is mainly used for GraphQL and most of my projects are using it, so giving Apollo a try in the REST world was a nice experience and it works well with TypeScript also.

### Cache management
The cache is managed by the **Apollo Client**.

### Supporting multiple languages
For supporting multiple languages, **i18next** is being used and is set up currently with one language (English).

### Environment variables
For local development, there is an `.env` file in the root directory to maintain the needed variables.

## Functionality overview

- **Login page**: log in with email and password
- **Jobs page**: view *pending* and *rejected* jobs, and filter by location
- **Jobs page/ Selected job**: accept/reject the job
- **Header menu**: ability to log out
- **Drawer menu**: accessible from the left of the header, contains only the Jobs page as an actual link
