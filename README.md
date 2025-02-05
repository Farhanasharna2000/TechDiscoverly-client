# 🚀 TechDiscoverly

![TechDiscoverly Banner](/public/home.png) 

TechDiscoverly is a platform where users can discover and share their favorite tech products. From web apps to AI tools, software, games, and mobile applications, this platform allows users to explore and contribute to a growing collection of innovative products.


## 🚀 Description

TechDiscoverly offers a community-driven space, enabling users to:
- Submit new tech products.
- Upvote or downvote existing products.
- Post reviews for products.
- Unlock premium features with paid subscriptions.

The platform features robust user authentication, role-based permissions (Normal Users, Moderators, Admins), and a comprehensive product moderation system.

## ✨ Main Features

1. **User Authentication**: Secure login and registration with Firebase.
2. **Role-based Access**: Features tailored for Normal Users, Moderators, and Admins.
3. **Product Discovery**: Browse, upvote, and review products.
4. **Product Moderation**: Manage product listings effectively.
5. **Premium Feature**: Unlock additional features through Stripe-based subscriptions.
6. **Responsive UI**: Built with Tailwind CSS and DaisyUI for a seamless user experience.

## 🌍 Live Demo  

Experience **TechDiscoverly** live:  
➡️ **[Click here to visit](https://techdiscoverly.web.app)**  

---
## 🛠 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **State Management:** React Query
- **Backend:** [TechDiscoverly API](https://tech-discoverly-server.vercel.app) (Node.js, Express)
- **Authentication:** Firebase
- **Payments:** Stripe
- **Database:** MongoDB
- **Deployment:** Vercel (Frontend), Firebase (Backend)

## 📦 Installation

To set up the project locally, follow these steps:

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Farhanasharna2000/TechDiscoverly-client
cd TechDiscoverly-client
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Create a `.env` file
Set up environment variables in a `.env` file at the root directory:

```ini
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=https://tech-discoverly-server.vercel.app
```

**⚠️ Never expose your API keys in public repositories.**

### 4️⃣ Start the development server
```sh
npm run dev
```

## ⚙️ Configuration

TechDiscoverly uses Firebase for authentication and Firestore for the database. Ensure you have a Firebase project set up and configured correctly.

- **Stripe Integration**: The platform uses Stripe for handling premium subscriptions. Ensure you have a Stripe account and update the `VITE_STRIPE_PUBLIC_KEY` in your `.env` file.
- **Image Uploading**: Uses [ImgBB](https://imgbb.com/) API for hosting images.

## 🚀 Usage

Once the project is running:
- Sign up or log in.
- Browse and discover tech products.
- Submit new products.
- Vote and review existing products.
- Unlock premium features through Stripe.


## 🤝 Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.


🎉 **Enjoy using TechDiscoverly!**


