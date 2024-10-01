
---

### Frontend README


# Golbahar Frontend

This is the frontend of the Golbahar project, built with React.js, TypeScript, Ant Design (Antd), and Tailwind CSS for styling. It interacts with the backend API and provides the UI for users to browse products, log in, make purchases, etc.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Frontend Locally](#running-the-frontend-locally)
- [Contributing](#contributing)

## Requirements

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (optional but recommended)
  
## Installation

1. **Clone the frontend repository:**

   ```bash
   git clone https://github.com/SardarAmiri/golbahar-clien.git
   cd golbahar-frontend

2. Install dependencies:
   npm install

3. Environment Variables
   Create a .env file in the root directory of the frontend project with the following environment variables:

  VITE_FIREBASE_API_KEY=your-firebase-api-key
  VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
  VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
  VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
  VITE_FIREBASE_MESSAGING_SENDERID=your-firabase-messaging-sender-id
  VITE_FIREBASE_APP_ID=1:your-firebase-app-id
  VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
  VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

  replace all your firebase value and stripe publishable key


## Running the Frontend Locally

1. Run the frontend development server:
   npm run dev
2. Interacting with the Backend:

  The frontend will make API calls to the backend running at http://localhost:5000 (or another URL if specified in .env).
  Make sure the backend is running before accessing the frontend.

3. Authentication and Payments:

  User authentication is handled with JWT tokens. Login and register requests will hit the backend /auth endpoints.
  Payments are processed using Stripe. Ensure that your Stripe keys are correctly configured.


## Styling

We use Tailwind CSS and Ant Design for styling. The combination provides a flexible utility-first approach (Tailwind) with pre-designed components (Ant Design).


## Contributing

We welcome contributions! Please make sure to follow the code style and structure outlined in the project. Feel free to submit pull requests, open issues, or suggest new features.


---

### Running the Project Locally (Backend + Frontend)

1. **Clone both repositories** (Backend and Frontend) to your local machine:
   - Backend: `https://github.com/SardarAmiri/golbahar-server.git`
   - Frontend: `https://github.com/SardarAmiri/golbahar-clien.git`

2. **Install dependencies** for both Backend and Frontend following the steps in their respective README files.

3. **Set up environment variables**:
   - For the backend, set up MongoDB, Stripe, and JWT in the `.env` file.
   - For the frontend, configure the backend API URL and Stripe publishable key.

4. **Run the backend**:
   - Navigate to the backend folder and run `nodemon server`.
   - The backend should now be running at `http://localhost:5000`.

5. **Run the frontend**:
   - Navigate to the frontend folder and run `npm run dev`.
   - The frontend should now be running at `http://localhost:5173`.

6. **Access the application**:
   - Open your browser and go to `http://localhost:5173` to use the frontend, which will communicate with the backend at `http://localhost:5000`.

---

This setup should allow anyone to run the project locally, with clear instructions for both the backend and frontend components. Feel free to tweak any paths or add specific details based on your exact project setup.



