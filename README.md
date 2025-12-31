🎓 CSCI426 Final Phase Project – Brains Platform
📌 Project Description

This project is a full-stack web-based educational platform developed for the CSCI426 Advanced Web course under the supervision of Jawad Deeb.

The platform allows users to:

Browse courses by category

View course details

Register for courses

Contact the institute

It also includes a secure admin panel that allows administrators to:

Manage courses and categories

Manage users

Review course registrations

Read and manage user messages

Receive email notifications upon new registrations

The project is implemented using React for the frontend and Node.js (Express) with MySQL for the backend.

🧩 Project Phases

Phase 1 (Frontend only):
👉 https://github.com/Jwdeeb06/72330833-CSCI426-Project-Brains

Final Phase (Full Stack – Frontend + Backend):
👉 This repository

🛠️ Tech Stack
Frontend

React (Create React App)

React Router

Axios

CSS (custom styling)

Material UI Icons

Backend

Node.js

Express.js

MySQL

Multer (image uploads)

Nodemailer (email notifications)

dotenv (environment variables)

Database

MySQL (hosted locally or on Railway)

🚀 Features
User Features

Browse courses by category

View course details

Register for courses

Send messages via contact form

Admin Features

Admin authentication

Add / edit / delete courses

Upload course images

Manage categories

Manage users (activate / deactivate)

View and approve registrations

Read user messages

Email notifications for new registrations

⚙️ Getting Started
1️⃣ Clone the repository
git clone https://github.com/Jwdeeb06/72330833-CSCI426-Final-Phase-Brains.git

▶️ Running the Frontend
cd Frontend
npm install
npm start


Runs on:
📍 http://localhost:3000

▶️ Running the Backend
cd Backend
npm install
npm start


Runs on:
📍 http://localhost:5000

🗄️ Environment Variables (Backend)

Create a .env file in the Backend root:

MYSQL_HOST=your_db_host
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_DATABASE=your_db_name
MYSQL_PORT=3306

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin_email@gmail.com

🧪 Database Setup

To create database tables, run:

node tables.js

📬 Email Notifications

Admin receives an email when a user registers for a course

Implemented using Nodemailer

Uses Gmail App Passwords for security

📝 Notes

This project was initially developed as a frontend-only application (Phase 1)

The final phase includes full backend integration, database, and admin functionality

The project is intended for educational purposes

👨‍🏫 Instructor

Dr.Ghadir Khalil
CSCI426 – Advanced Web Development

👨‍🎓 Student

Jawad Deeb
Student ID: 72330833
