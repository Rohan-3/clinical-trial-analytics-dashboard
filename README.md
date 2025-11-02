# 🧬 Clinical Trial Analytics Dashboard

A full-stack **MERN** analytics dashboard visualizing **global clinical trial data**.

The **backend** (Node.js, Express, MongoDB) aggregates trial demographics, locations, and facilities via REST APIs.  
The **frontend** (React, Redux, Recharts, Tailwind CSS) visualizes this data through interactive charts — showing participant demographics, country distributions, and top trial cities.

---

## 🧠 Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS  
- **Data Visualization:** Recharts  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)

---

## ⚙️ Setup Instructions

### 🖥 Backend Setup (Server)

```bash
# Navigate to the server directory
cd server

# Copy example environment variables and create a new .env file
cp .env.example .env

# Configure the .env file:
# 1. Enter PORT
# 2. Paste MongoDB URI (ensure your local IP is whitelisted in MongoDB Atlas)

# Install dependencies
npm install

# First Seed initial trial data into MongoDB
npm run seed

# After Seeding data Start the backend server
node index.js
```