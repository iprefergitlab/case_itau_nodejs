### Installing Dependencies

Use the following steps to install dependencies for both the frontend and backend.

1. Open a terminal window.
2. Navigate to the `frontend` folder and install dependencies:

   ```
   cd frontend
   npm install
   ```

3. In a new terminal window or tab, navigate to the `backend` folder and install dependencies:

   ```
   cd backend
   npm install
   ```

Separate installation is necessary because each app has its own dependencies and `node_modules` folder.

### Environment Configuration

Before running the backend, create a `.env` file at the root of the `backend` folder.

Add the following line to specify the port (example):

```
PORT=8080
```

You may change the port value as needed for your setup.

### Running the Applications

To launch both the frontend and backend servers:

- For the frontend, run:

  ```
  cd frontend
  npm start
  ```

- For the backend, run:

  ```
  cd backend
  npm start
  ```

Both servers will start on their configured ports, and you can interact with the full stack as intended.
