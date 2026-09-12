# Club Website - MERN (React + Antigravity)

## Features
- Public: Home, About, Team, Events, Gallery, Contact, Join Our Team (form with photo upload)
- Admin: Login, Dashboard (stats), Applications (approve/reject/search), Members, Events, Gallery, Enquiries

## Run
1. MongoDB local start karo
2. `cd server && npm install && npm run dev`  -> http://localhost:5000
3. `cd client && npm install && npm run dev`  -> http://localhost:5173
4. First admin: POST http://localhost:5000/api/admin/init  (creates admin@club.com / admin123)

## Env server/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/clubDB
JWT_SECRET=club_secret_2024
