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
cd TurnPoint-challenge
```

After cloning the repository, open the proyect in your text editor.

### 2. Line Ending Configuration

It is crucial to ensure that the init-db.sh file (in proyect root) has the line ending set to "LF" (Line Feed) to avoid errors when running shell scripts. To set this in your text editor:

- **Visual Studio Code**: Open init-db.sh, click on "CRLF" at the bottom right, and change it to "LF".
- **Sublime Text**: Open the file and select "View" > "Line Endings" > "Unix".
- **Atom**: Open the file and select "Edit" > "Line Endings" > "LF (Unix)".

**Save the file after making this change.**

### 3. Configure and Run Docker

In the root of the project, run the following command to build and start the Docker containers:

```sh
docker-compose up --build
```

This command may take a few minutes as it will pull the mcr.microsoft.com/mssql/server image.

**Note**: This command will leave the Docker container running, so for the next steps, you will need to open another terminal.

### 4. Set Up and Run the Backend

- In a new terminal, navigate to the backend directory and install the dependencies:

```sh
cd backend
npm install
```

- Create a .env file in the backend directory with the following environment variables:

```sh
PORT=5000
DB_USER=sa
DB_HOST=localhost
DB_PORT=1434
DB_DIALECT=mssql
DB_NAME=turnPointdb
DB_PASSWORD=YourStrong!Passw0rd123
```

## 5. Run Migrations and Seeds

Next, run the migrations and seeds to set up the database:

```sh
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 6. Run Tests

To verify that everything is set up correctly, run the tests:

```sh
npm test
```

## 7. Start the Backend

Start the backend and leave it running:

```sh
npm run dev
```

## 8. Set Up and Run the Frontend

In another new terminal (leaving the other two terminals running: Docker and the backend), navigate to the frontend directory and install the dependencies:

```sh
cd frontend
npm install
```

Start the frontend and access the application in your browser:

```sh
npm run dev
```

Open your browser and navigate to http://127.0.0.1:5173 or http://localhost:5173 to see the application running with the seeded clients

## API Testing Collection

In the **Postman-Collection** folder, you will find a Postman collection for testing the API endpoints. Here are the details of the available requests:

- **GetClients**
- **CreateClient**
- **DeleteClient**
- **UpdateClient**

You can import this collection into Postman to easily test your API endpoints.

## User Scenarios

### Client Creation Scenarios

The following scenarios are handled in the UI for creating clients:

**1. Creating a Client with a Future Date of Birth:**

- **Frontend Handling**: The form will prevent submission if the date of birth is set to a future date. An error message will be displayed on the screen indicating that the Date of Birth must be in the past.

**2. Omitting an Optional Field:**

- **Frontend Handling**: All fields except **secondaryLanguage** are mandatory in the form. If any mandatory field is omitted, the form will display an error message and prevent submission until all required fields are filled.

**3. Creating a Client with a Duplicate Name:**

- **Backend Handling**: If a client with the same name already exists, the backend will respond with an error message. This will trigger a toast notification on the frontend indicating that the client name already exists.
