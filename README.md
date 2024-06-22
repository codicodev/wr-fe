# Travels and bookings management system

## Architectural approach

The main idea was to separate the business logic from the framework to create a more easily scalable application and to test the business requirements more intuitively and maintainably.  
To do this, I made a BlackBox decoupled from the Vue components that contain the business logic.  
The BlackBox works from the gateway to the presenters inside the features folder.  
The role of the presenters is to prepare a precise model to pass to the UI components and make the actions connected to the Store that the Components will then emit.  
This makes it easier to create reusable components and modify them if they change in subsequent versions of Vue.  
The Store manages the application state, and it's based on Pinia.  
The tests are meticulously organized within the features folder, with a dedicated file for each feature. This structured approach enhances the clarity of the testing process and improves its efficiency, making it easier to identify and address any potential issues.

To manage Travel and Booking data, I have used "JSON server".

Possible improvements:

-   Use of dependency injection in the Store to separate the logic further.
-   Currently, the travel filters are working on the client data, but in a real scenario, they should be managed through a server-side backend API.
-   Add more component splitting, e.g., create a single Form Component to handle the Traved CRUD.

-   More strict form validation

## Requirements

You need npm version 10.7.0 or higher  
This application runs on 3000 and 8000 ports by default

## Get started

### 1 - Install dependencies

```bash
# npm
npm install

```

### 2 - Run backend

```bash
# npm
npm run serve-json

```

### 3 - Run frontend

```bash
# npm
npm run dev

```

### 4 - Visit http://localhost:3000

### Tests

To run tests:

```bash
# npm
npm run test

```

### Production

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
