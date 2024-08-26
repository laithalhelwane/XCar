
# XCar RESTful API

This project is a RESTful API built with Node.js, Express.js, and TypeScript. It provides functionality for an app where users can rent cars, rate them, send messages to car owners, and schedule appointments. The API manages users, cars, rentals, and messaging features, with a MongoDB backend and additional services like Firebase for notifications.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Features

- User management: Add, update, delete, and retrieve users
- Car management: Add, update, delete, and retrieve cars with details like name, model, price, color, and images
- Renting cars: Rent a car, send a message to the car owner, request an appointment
- Rate a car and leave feedback
- JWT authentication and role-based authorization
- Firebase notifications to alert car owners
- Complete REST API documentation available via Swagger UI

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework.
- **TypeScript:** Typed superset of JavaScript.
- **MongoDB:** NoSQL database.
- **Zod** - Schema validation
- **JWT** - JSON Web Token for authentication
- **Bcrypt** - Password hashing
- **Pino** - Logging
- **Lodash** - Utility library
- **Passport.js** - Authentication middleware
- **Swagger** - API documentation
- **Firebase** - Notifications

## Prerequisites

- Node.js v14.x or higher
- MongoDB installed locally or a cloud MongoDB instance (e.g., MongoDB Atlas)
- Firebase project for notifications (optional but recommended)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/laithalhelwane/XCar.git
cd XCar
```

2. Install dependencies:

```bash
npm install
```

3. Generate the public and private keys:

Before starting the development, generate the public and private keys for JWT:

```bash
npm run build && node build/util/generateKeypair.js
```

This will generate the key files used for token signing and verification.

4. Set up your environment variables (see [Environment Variables](#environment-variables)).

5. Create Firebase project and generate a new private key and store it in ```src/serviceAccountKey.json```

## Running the Project

### Development Mode

To run the project in development mode with live reloading:

```bash
npm run start:dev
```

### Production Mode

To build and run the project for production:

```bash
npm run build
npm start
```

## Environment Variables
### Production
Create a `.env` file in the root directory of the project with the following variables:

```env
PORT=3000
privateKey=ExAmPle Key
publicKey=ExAmPle Key
SaltWorkFactor=10
dbURL=localhost:27017/car-rental
GOOGLE_APPLICATION_CREDENTIALS='../serviceAccountKey.json'
hostURL=https://grad-proj-car.onrender.com
```


## API Endpoints

The API exposes the following endpoints:


### API Documentation

Swagger API documentation is available at:

```
http://localhost:${PORT}/docs
```


## Logging

This project uses **Pino** for logging. Logs will be outputted in the console and stored in log files for further analysis. Make sure you configure your logging preferences in the configuration file.

## Firebase Notifications

Firebase is integrated for sending notifications. Make sure your Firebase credentials are set in the `.env` file, and the project is set up in the Firebase console.

Notifications are sent to car owners when:
- A car is rented
- A message is sent by a user

## Security and Authentication

The project uses **JWT** for authentication and **Passport.js** for user session management. Ensure that your JWT_SECRET is kept safe and secure in the `.env` file.
