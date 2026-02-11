# 📊 Mini CRM – Client Lead Management System

A simple full-stack Mini CRM application built using Node.js, Express, and MySQL to manage client leads efficiently. This system helps businesses store, track, and manage leads through a secure admin dashboard.

---

## 🚀 Features

- 📝 Lead submission through website contact form  
- 🔐 Admin registration and login system  
- 📊 Dashboard to view and manage leads  
- 🔄 Update lead status (New / Contacted / Converted)  
- 🗒️ Add follow-up notes  
- 🗄️ MySQL database integration  
- 🔒 Protected admin access  

---

## 🛠️ Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend
- Node.js  
- Express.js  

### Database
- MySQL  

### Tools
- VS Code  
- GitHub  

---

## 📁 Project Structure

mini-crm/
│
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── .env
│
├── frontend/
│ ├── index.html
│ ├── login.html
│ ├── register.html
│ ├── dashboard.html
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repo-link>
cd mini-crm
2️⃣ Install Backend Dependencies
cd backend
npm install
3️⃣ Configure Environment Variables
Create a .env file inside the backend folder:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=mini_crm
Replace your_mysql_password with your MySQL password.

4️⃣ Setup Database
Login to MySQL and run:

CREATE DATABASE mini_crm;

USE mini_crm;

CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  source VARCHAR(50),
  status ENUM('New','Contacted','Converted'),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(100)
);
5️⃣ Start Backend Server
cd backend
node server.js
You should see:

MySQL Connected
Server running on port 5000
6️⃣ Run Frontend
Open the following files in browser:

frontend/index.html      → Lead Form  
frontend/register.html   → Admin Registration  
frontend/login.html      → Admin Login  
frontend/dashboard.html  → Dashboard  
🎯 Usage Flow
Admin registers and logs in

Customers submit leads using contact form

Leads are stored in MySQL database

Admin views and manages leads

Status and notes can be updated

