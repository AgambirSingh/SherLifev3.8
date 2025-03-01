# **SherLife**

**SherLife** is a web application designed to enhance the campus experience for Sheridan students. It includes features like a marketplace for buying and selling items, an anonymous confession board, student resources, event listings, and a profile page. The app is built using **React**, **Firebase**, and **Tailwind CSS**, and is deployed on **Netlify**.

## **Features**

- **Marketplace**: A platform for students to buy and sell items.
- **Anonymous Confession Board**: Share thoughts anonymously with the Sheridan community.
- **Student Resources**: A collection of resources to assist students with their academic and campus life.
- **Events**: A page that lists upcoming campus events for students to stay informed.
- **Profile Page**: Allows users to view and update their profile information.

## **Technologies Used**

- **Frontend**: 
  - React.js
  - Tailwind CSS
  - TypeScript
- **Backend**:
  - Firebase Authentication (for user authentication)
  - Firebase Firestore (for real-time data storage)
- **Deployment**:
  - Netlify

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/Neelpatel1604/SherLife.git
   ```

2. Navigate into the project directory:
   ```bash
   cd SherLife
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Create a new project (if you haven't already).
   - Enable Firebase Authentication and Firestore Database.
   - Add your Firebase configuration to `.env`:
     ```env
     
    VITE_FIREBASE_API_KEY=your-api-key
    VITE_AUTH_DOMAIN=your-auth-domain
    VITE_PROJECT_ID=your-project-id
    VITE_STORAGE_BUCKET=your-storage-bucket
    VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_APP_ID=your-app-id
     ```

5. Run the development server:
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## **Deployment**

The app is deployed on **Netlify**. You can access the live version [here](https://sher-life.netlify.app).

## **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request.

## **License**

This project is licensed under the MIT License.
