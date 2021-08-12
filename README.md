# Interview Scheduler

A single page application React application that allows students to book and cancel interviews with teaching assistants. Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. Jest tests are used through the development of the project, with Cypress used for end to end testing and Storybook for isolated components.

## Project Screenshots

### Main Dashboard ⬇️

<img src ='https://github.com/emmanueletti/scheduler/blob/master/docs/scheduler%20-%20main.png'>

### Creating a new appointment ⬇️

<img src='https://github.com/emmanueletti/scheduler/blob/master/docs/%20scheduler%20-%20create.png'>

### Deleting an appointment ⬇️

<img src='https://github.com/emmanueletti/scheduler/blob/master/docs/scheduler%20-%20delete.png'>

## Getting Started

- Fork and clone project
- Install all dependencies
- [Instructions to set up the backend API](https://github.com/emmanueletti/scheduler-api)

```bash
npm install
```

## Running Webpack Development Server

```bash
npm start
```

## Running Jest Test Framework

```bash
npm test
```

## Running Storybook Visual Testbed

```bash
npm run storybook
```

## Dependencies

- Axios
- Classnames
- React
- React-dom
- React-scripts
- Normalize
