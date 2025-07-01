# 🏭 Industrial Visit Management System (IVMS)

The **Industrial Visit Management System (IVMS)** is a full-featured web application designed to streamline and automate the coordination of industrial visits for educational institutions. It serves as a bridge between colleges and industry partners, enabling better communication, scheduling, and tracking of student visits.

---

## 🔧 Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Others:** 
  - Email Notification System
  - PDF Report Generation (optional)
  - File Upload (Images/Videos)
  - JWT-based Authentication (if applicable)

---

## 👥 User Roles

1. **Administrator**
   - Manage master data: locations, universities, states, districts, cities
   - Create colleges, set up agendas, and fees
   - Approve or reject visit requests
   - View analytics and reports

2. **College Admin**
   - Register college and request visit slots
   - Upload student and faculty data
   - Share feedback and visit media

---

## ✨ Core Features

- 🔐 User Authentication for Admin and College
- 📅 Visit Scheduling and Time Slot Booking
- 🧾 Student Registration via Excel Upload
- 💬 Notifications & Confirmation System
- 📊 Reports: Weekly, Monthly Visits, MOU Status
- 📷 Upload & Share Visit Photos/Videos
- 📝 Feedback Collection and Analysis

---

## 📁 Folder Structure (Example)

/ivms
├── backend/
│ ├── src/main/java/com/ivms
│ └── application.properties
├── frontend/
│ └── src/app/
├── database/
│ └── ivms_schema.sql
└── README.md

---

## 🛠️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/industrial-visit-management-system.git
cd industrial-visit-management-system

cd frontend
npm install
ng serve

