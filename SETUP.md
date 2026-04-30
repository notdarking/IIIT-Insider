# IIIT Insider - Complete Setup Guide

## Project Structure

```
IIIT-Insider/
├── backend/                 # Spring Boot Backend (Java 21)
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
├── src/                     # React Frontend (Vite)
│   ├── Components/
│   │   ├── NotificationButton.jsx
│   │   └── SocialShare.jsx
│   ├── Pages/
│   │   └── Register.jsx
│   └── services/
│       ├── api.js
│       └── firebase.js
├── nginx/
│   └── nginx.conf           # Nginx reverse proxy config
└── public/
    └── firebase-messaging-sw.js
```

## Quick Start

### 1. Backend Setup (Spring Boot + Tomcat + MySQL)

```bash
# Install Java 21
# Windows: Download from https://adoptium.net/
# Linux: sudo apt install openjdk-21-jdk

# Install MySQL
# Windows: Download from https://dev.mysql.com/downloads/
# Linux: sudo apt install mysql-server

# Create database
mysql -u root -p
CREATE DATABASE iiit_insider;
EXIT;

# Configure database credentials
# Edit: backend/src/main/resources/application.properties
# Update: spring.datasource.password=your_password

# Build and run backend
cd backend
mvn spring-boot:run
# Backend runs on http://localhost:8080/api
```

### 2. Frontend Setup (React + Vite)

```bash
cd IIIT-Insider
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 3. Firebase Setup (For Push Notifications)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Copy the Firebase config
5. Update these files:
   - `src/services/firebase.js` - Replace `firebaseConfig`
   - `public/firebase-messaging-sw.js` - Replace Firebase config
   - `backend/src/main/resources/application.properties` - Add service account path

6. Download service account JSON from Firebase Console:
   - Project Settings > Service Accounts > Generate New Private Key
   - Save as `backend/src/main/resources/firebase-service-account.json`

### 4. Nginx Setup (Production)

```bash
# Install Nginx
# Windows: https://nginx.org/en/docs/windows.html
# Linux: sudo apt install nginx

# Configure Nginx
sudo cp nginx/nginx.conf /etc/nginx/sites-available/iiit-insider
sudo ln -s /etc/nginx/sites-available/iiit-insider /etc/nginx/sites-enabled/

# Update nginx.conf with your domain
# Replace 'yourdomain.com' with actual domain

# Start Nginx
sudo systemctl start nginx
```

## Features Implemented

### 1. User Registration & Login
- JWT-based authentication
- Secure password hashing (BCrypt)
- Protected routes
- Session management

**API Endpoints:**
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### 2. Firebase Notifications & Device Limits
- Push notifications via Firebase Cloud Messaging
- Device token management
- Maximum 5 devices per user
- Automatic oldest device removal

**API Endpoints:**
- `POST /api/notifications/register-device` - Register device
- `POST /api/notifications/unregister-device` - Unregister device
- `GET /api/notifications/devices` - List user devices
- `POST /api/notifications/send` - Send notification

### 3. Social Media Sharing
- Share to Facebook, Twitter, LinkedIn, WhatsApp, Reddit
- Dynamic share URLs generation
- Share button component

**API Endpoints:**
- `GET /api/social/share-links?url=...&title=...` - All platforms
- `GET /api/social/share/facebook?url=...` - Facebook
- `GET /api/social/share/twitter?url=...&title=...` - Twitter
- `GET /api/social/share/linkedin?url=...` - LinkedIn
- `GET /api/social/share/whatsapp?url=...&title=...` - WhatsApp
- `GET /api/social/share/reddit?url=...&title=...` - Reddit

## Testing

### Test Authentication
```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Test Social Sharing
```bash
curl "http://localhost:8080/api/social/share-links?url=https://iiitinsider.com&title=Check%20this%20out"
```

## Production Deployment

1. **Build WAR file:**
   ```bash
   cd backend
   mvn clean package
   ```

2. **Deploy to Tomcat:**
   ```bash
   cp target/iiit-insider.war /path/to/tomcat/webapps/
   ```

3. **Build React for production:**
   ```bash
   npm run build
   ```

4. **Configure Nginx to serve static files and proxy API requests**

## Security Notes

- Change JWT secret in production
- Use HTTPS in production
- Enable MySQL SSL connection
- Set strong database password
- Configure CORS properly for your domain
