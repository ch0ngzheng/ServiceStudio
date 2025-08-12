# Project FinPick

## Problem Statement
How Might We boost customer engagement among digitally native users during transitional life stages by personalising investment product recommendations and providing a budgeting tool  so that they are more likely to adopt DBS services such as Digiportfolio and Unit Trusts?

## Project Overview
This project is a full-stack application designed as a proof of concept for our improvements to DBS's mobile banking platform. It features a web-based user interface, a backend API, and separate microservices for handling budget analysis and financial predictions.

## Project Features

- **Automated Budget Management:** Users can create and manage their budgets, setting spending limits, and tracking their progress.
- **Financial Predictions:** Users can receive personalized budget predictions based on their spending patterns.
- **Investment Recommendations:** Users can receive personalized investment recommendations based on their identified consumer behavior and investment goals.
- **Cross-selling Opportunities:** Users can receive personalized cross-selling recommendations based on their identified consumer behavior and investment goals.
- **Personalized Marketing:** Users can receive personalized marketing recommendations based on their identified consumer behavior and investment goals.

## Project Structure

The repository is structured as a repo containing the following services:

- `frontend/`: A React application built with Vite that serves as the user interface.
- `backend/`: A Node.js and Express.js application that provides the main API for user authentication, transactions, and communication with other services.
- `budget_service/`: A Python microservice built with Flask that handles budget-related calculations and analysis using machine learning.
- `prediction_service/`: A Python microservice built with Flask that serves a pre-trained machine learning model for financial predictions.

## Getting Started

To run this project locally, you will need to set up each service individually.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- A running [MongoDB](https://www.mongodb.com/) instance

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ch0ngzheng/ServiceStudio.git
    ```

2.  **Set up environment variables:**
    Each service (`frontend`, `backend`, `budget_service`) contains a `.env` file or a template. You will need to create and populate these files with the necessary configuration, such as database connection strings and API keys.

3.  **Install dependencies for each service:**

    *   **Frontend:**
        ```bash
        cd frontend
        npm install
        cd ..
        ```

    *   **Backend:**
        ```bash
        cd backend
        npm install
        cd ..
        ```

    *   **Budget Service:**
        ```bash
        cd budget_service
        python -m venv venv
        source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
        pip install -r requirements.txt
        cd ..
        ```

    *   **Prediction Service:**
        ```bash
        cd prediction_service
        python -m venv venv
        source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
        pip install -r requirements.txt
        cd ..
        ```

### Running the Application

Once the dependencies are installed, you can start each service in a separate terminal:

-   **Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```

-   **Backend:**
    ```bash
    cd backend
    npm start
    ```

-   **Budget Service:**
    ```bash
    cd budget_service
    gunicorn --bind 0.0.0.0:5001 app:app
    ```

-   **Prediction Service:**
    ```bash
    cd prediction_service
    gunicorn --bind 0.0.0.0:5002 app:app
    ```

The frontend will typically be available at `http://localhost:5173`.

## Project Video
![Project Video](https://github.com/jhjh0409/EduCube_SUTD/assets/124416920/990eea48-a303-4c08-ab1e-2ef0947f9f63)


## Project Design Process
![Our Design Process](https://docs.google.com/document/d/18MOwI4YNyY9gpaiDc2xSt0gREpZ2dgRA4IzS8gsjsDg/edit?usp=sharing)

![Our Final Report](placeholder-link)

## Peoject Presentation
![Our Presentation](placeholder-link)

## Project Report
![Our Report](placeholder-link)


