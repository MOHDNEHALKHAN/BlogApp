# 📝 Full Stack Blog App

A full-stack blog application built with **React (Vite)**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**. This project allows users to create, edit, save drafts, and publish blog posts with a clean and modern UI.

---

## 🚀 Features

- ✍️ Rich text blog editor (TinyMCE)
- 📝 Auto-save drafts every 5 seconds of inactivity
- 💾 Manual "Save as Draft" button
- ✅ "Publish" button to move blog to published list
- 🗂 View **Published Blogs** and **Drafts** separately
- 🔁 Edit existing drafts or published posts
- 🔔 Toast notifications for actions (save, publish, etc.)
- Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- TinyMCE (rich text editor)
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- CORS, dotenv

---

## 📂 Folder Structure

```
BlogApp/
├── |           # React frontend
│   |─ src/
│   │   ├── pages/
│   │   ├── components/
│   ├── public/
│   └── package.json
├── server/             # Node.js backend
│   ├── models/
│   ├── index.js
│   ├── package.json
├── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MOHDNEHALKHAN/BlogApp.git
cd BlogApp
npm install
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

#### ➕ Configure MongoDB

1. Create a MongoDB cluster on [MongoDB Atlas](https://cloud.mongodb.com).
2. Whitelist your IP and create a database user.
3. Create a `.env` file in `/server`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blogDB?retryWrites=true&w=majority
```

4. Start the backend server:

```bash
npm run dev
```

Backend runs at: `http://localhost:3000`

---

### 3. Setup Frontend

```bash
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---
> **Important:** Run the frontend and backend servers in separate terminal windows to ensure both are running simultaneously.
---

## 📡 API Endpoints

| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | `/api/blogs/save-draft` | Create or update a draft          |
| POST   | `/api/blogs/publish`    | Publish a blog                    |
| GET    | `/api/blogs`            | Get all blogs (draft + published) |
| GET    | `/api/blogs/:id`        | Get blog by ID                    |

---