# IIIT Insider

IIIT Insider is a full-stack portal built with a high-performance React front-end and a robust Spring Boot REST API backend. It includes complete user session management, Firebase-driven multi-device push notifications, and server-managed social media dynamic sharing features.

---

## Project Architecture
```
IIIT-Insider/
├── backend/                 # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/iiitinsider/
│   │       │   ├── controller/      # REST API endpoints
│   │       │   ├── service/         # Business logic
│   │       │   ├── model/           # JPA entities
│   │       │   ├── repository/      # Database repositories
│   │       │   └── config/          # Security & JWT config
│   │       └── resources/
│   │           ├── application.properties
│   │           └── schema.sql
│   └── pom.xml
├── src/                     # React Frontend
│   ├── Components/             # UI Core
│   ├── Pages/                  # Route Views 
│   └── services/               # Axios API wrappers & Firebase initializers
├── nginx/
│   └── nginx.conf           # Nginx reverse proxy configuration
└── public/
    └── firebase-messaging-sw.js  # Firebase Service Worker

```
---

## Features Implemented

### 1. Authentication & Security

* **JWT Token Validation:** Stateless user authorization through request headers.
* **Password Protections:** Client passwords encrypted securely using BCrypt hashing before persistence.
* **Endpoint Protection:** Route guarding implemented on the Spring Security engine to control access permissions.

### 2. Multi-Device Push Notifications

* **FCM Ecosystem:** Leverages Firebase Cloud Messaging to send targeted browser alerts.
* **Device Enforcement Rules:** Constrains active connections to a **maximum of 5 concurrent devices** per profile.
* **Automatic Eviction:** Detects overhead registrations and triggers an automated deletion of the oldest active device token.

### 3. Server-Generated Dynamic Sharing

* Custom backend logic translates URLs and text strings into platform-ready intent parameters for major social spaces.
* Fully out-of-the-box integrations for **Facebook, Twitter (X), LinkedIn, WhatsApp, and Reddit**.

---

## Tech Stack & Dependencies

### Frontend Core

* **React 19 & React DOM 19:** Advanced UI engine capitalizing on the automated `React Compiler` infrastructure.
* **Vite 7:** High-speed development bundler implementing Hot Module Replacement (HMR).
* **Tailwind CSS 4:** Modern utility-first CSS styling engine integrated natively into the Vite build layer.
* **React Router DOM 7:** Declarative client-side routing ecosystem.

### Backend API Core

* **Spring Boot 3.2 (Java 21):** Production-ready Java enterprise backend layer.
* **Spring Security & Validation:** Handles system boundaries, access tokens, and JSON payloads.
* **Spring Data JPA:** Object-Relational mapping wrapper over the relational data architecture.
* **MySQL Connector J:** Database abstraction driver.
* **Firebase Admin SDK (9.2.0):** Native connection library to manage cloud tasks securely from a Java thread.

---

## Quick Start Guide

### 1. Prerequisites

Ensure you have the following installed on your machine:

* **Java 21 Development Kit (JDK)**
* **Node.js (v18+) & npm**
* **MySQL Server**

### 2. Database Provisioning

Run the following commands in your MySQL environment:

```sql
CREATE DATABASE iiit_insider;

```


### 3. Firebase Configuration

1. Head over to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Register a new Web App under your project dashboard.
3. Copy your specific configuration map and replace the stubs found in:
* `src/services/firebase.js`
* `public/firebase-messaging-sw.js`


4. Navigate to **Project Settings > Service Accounts**, select **Generate New Private Key**, and download the file.
5. Relocate that JSON key file to your source tree exactly at `backend/src/main/resources/firebase-service-account.json`.

### 4. Backend Environment Launch

Open `backend/src/main/resources/application.properties` and populate your target MySQL credentials:

```properties
spring.datasource.password=your_mysql_password

```

Run the Spring Boot application using Maven:

```bash
cd backend
mvn spring-boot:run

```

The REST API will accept incoming request streams over `http://localhost:8080/api`.

### 5. Front-End Environment Launch

From the root level directory, install the required packages and spin up the Vite development server:

```bash
npm install
npm run dev

```

The client dashboard interface will stand up on `http://localhost:5173`.

---

## API Reference Checklist

### Authentication Endpoints

* `POST /api/auth/register` — Accepts user registration payloads.
* `POST /api/auth/login` — Verifies credentials and yields a valid authorization JWT.
* `GET /api/auth/me` — Fetches current user profile attributes.

### Notification & Device Endpoints

* `POST /api/notifications/register-device` — Attaches a new FCM registration token.
* `POST /api/notifications/unregister-device` — Purges target active device channels.
* `GET /api/notifications/devices` — Lists currently active device attachments.
* `POST /api/notifications/send` — Issues a push message payload out to target endpoints.

### Sharing Endpoints

* `GET /api/social/share-links?url=...&title=...` — Returns sharing link combinations for all platforms simultaneously.

---

# Team 

1. **Harshit Raj** - *Team Leader*
2. Devansh Parmar
3. Arshaan Baig
4. Divit Pandey
5. Aranya Kumar
6. Aditya Sharma
7. Daksh Soni
8. Vaibhav Jain
9. Sreyash Gaddam
10. Rohit Kumar Kuldeep
