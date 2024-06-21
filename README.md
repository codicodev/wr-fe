# Travels and bookings management system

## Architectural approach

The main idea was to separate the business logic from the framework to create a more easily scalable application and to be able to test the business requirements in a more intuitive and maintainable way. To do this I created a black box decoupled from the vue components that contains the business logic. The black box goes from the gateway to the presenters that are inside the features folder passing through the store created with pinia. The store contains the application state. The role of the presenters is to prepare a precise model to pass to the ui components and create the actions connected to the store that will then be emitted by the components.
In this way it is easier to create reusable components and modify them if they change in subsequent versions of vue.
The tests are inside the features folder a file for each feature.
Improvements: Use dependency injection in the store to further separate the logic.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

```

## Database

I used json server to manage travels and bookings data.

Run it with the following command:

```bash
# npm
npm run serve-json

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

```

## Tests

To run tests:

```bash
# npm
npm run test

```

## Production

Build the application for production:

```bash
# npm
npm run build

```

Locally preview production build:

```bash
# npm
npm run preview

```
