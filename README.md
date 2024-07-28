# TurnPoint-challenge

This project is a full-stack application using Node.js, Express, React, TypeScript, and Sequelize to manage clients. To properly run this project, you need to have the following packages and tools installed globally:

- **npm** (Node Package Manager)
- **Docker**
- **Docker Desktop** (optional but recommended)

## Technology Stack

- **Backend**: Node.js, Express.js, Sequelize, MSSQL
- **Frontend**: React, TypeScript, Vite

## Installation and Execution

### 1. Clone the Repository

First, clone the repository to your local machine:

```sh
git clone https://github.com/Pepo995/TurnPoint-challenge.git
cd <TurnPoint-challenge> (path to project directory)
```

### 2. Configure and Run Docker

In the root of the project, run the following command to build and start the Docker containers:

```sh
docker-compose up --build
```

This command may take a few minutes as it will pull the mcr.microsoft.com/mssql/server image.

**Note**: This command will leave the Docker container running, so for the next steps, you will need to open another terminal.

### 3. Set Up and Run the Backend
In a new terminal, navigate to the backend directory and install the dependencies:

```sh
cd backend
npm install
```

## 4. Run Migrations and Seeds
Next, run the migrations and seeds to set up the database:

```sh
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 5. Run Tests
To verify that everything is set up correctly, run the tests:

```sh
npm test
```

## 6. Start the Backend
Start the backend and leave it running:

```sh
npm run dev
```

## 7. Set Up and Run the Frontend
In another new terminal (leaving the other two terminals running: Docker and the backend), navigate to the frontend directory and install the dependencies:

```sh
cd frontend
npm install
```

Start the frontend and access the application in your browser:

```sh
npm run dev
```

Open your browser and navigate to http://localhost:5173 to see the application running with the seeded clients
