# Vingo  — Food Delivery Platform

An end-to-end food delivery web app built with the MERN stack, focused on secure, production-style authentication and real-world features like restaurant management, cart handling, and order processing. **(In Progress)**

## Features

-  **Role-Based Access Control** — separate flows/permissions for customers, restaurants, and (planned) delivery riders
-  **JWT Authentication** — stateless, token-based auth
-  **Two-Factor Authentication (2FA)** — OTP verification via email using **Nodemailer**
-  **Google OAuth** — sign in with Google
-  **Image Uploads** — restaurant/menu images stored via **Cloudinary**
-  **Cart & Order Processing** — add to cart, place orders, track order status
-  **Restaurant Management** — restaurants can manage their own menus and listings
-  **Live Rider Tracking** — *in progress* — real-time order/rider location tracking

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT, Google OAuth 2.0, Nodemailer (OTP/2FA) |
| Image Storage | Cloudinary |

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB database (local or Atlas)
- Google OAuth credentials (Client ID/Secret)
- Cloudinary account (API key/secret)
- Email account/app password for Nodemailer

### Installation

```bash
git clone https://github.com/abdullahkhan53/Vingo.git
cd Vingo

# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

Create a `.env` file in the server directory with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

Run the app:

```bash
# from /backend
npm run dev

# from /frontend (in a separate terminal)
npm run dev
```

## Roadmap

- [x] Role-based authentication (JWT + 2FA + Google OAuth)
- [x] Restaurant & menu management
- [x] Cart & order processing
- [ ] Real-time rider/order tracking
- [ ] Payment gateway integration


## Author

**Abdullah Ali Khan**
[LinkedIn](https://www.linkedin.com/in/abdullah-ali-khan-626370322) · [GitHub](https://github.com/abdullahkhan53)
