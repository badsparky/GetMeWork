# Let's Get to Work! App

The "Let's Get to Work!" app is a fun little application that allows you to remotely play a sound on someone else's device. Use it to convey to your friends or colleagues the feeling of "Let's get to work!". This app uses Socket.IO for real-time, bidirectional, event-based communication and is deployed on Google Cloud Run.

## App Structure

This app is largely divided into two parts:

1. **Client-side**: The client-side code is in `client.js`. It processes user operations, plays sounds, and communicates with the server using Socket.IO.

2. **Server-side**: The server-side code is in `server.js`. It handles the configuration of the Express server and the connection and message processing of Socket.IO.

In addition, it includes several HTML files (`index.html`, `sorry.html`, `waiting.html`) for the user interface.

## Deploying to Google Cloud Run

To deploy this app to Google Cloud Run, follow these steps:

1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).

2. Authenticate with Google Cloud: 
    ```sh
    gcloud auth login
    ```

3. Move to the project directory and build the Docker image: 
    ```sh
    gcloud builds submit --tag gcr.io/PROJECT-ID/getmework
    ```
    Replace `PROJECT-ID` with your GCP project ID.