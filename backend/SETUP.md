# IIIT Insider Backend - Setup Instructions

## Prerequisites

- Java 21 (or Java 17)
- Apache Tomcat 10
- MySQL 8.0+
- Maven 3.8+
- Nginx (for production)

## 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database (or run schema.sql)
CREATE DATABASE iiit_insider;
EXIT;
```

## 2. Configure Application Properties

Edit `backend/src/main/resources/application.properties`:

```properties
# Database
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

# JWT Secret (use a strong random string, min 32 chars)
jwt.secret=your-super-secret-key-change-this-in-production

# Firebase (optional - for push notifications)
firebase.credentials.path=path/to/firebase-service-account.json
```

## 3. Firebase Setup (Optional - for Push Notifications)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to Project Settings > Service Accounts
4. Generate new private key (downloads JSON file)
5. Place the JSON file at `backend/src/main/resources/firebase-service-account.json`
6. Update `application.properties` with your Firebase config

## 4. Build the Application

```bash
cd backend

# Build WAR file for Tomcat
mvn clean package

# Or run directly with embedded Tomcat
mvn spring-boot:run
```

## 5. Deploy to Tomcat

```bash
# Copy WAR to Tomcat webapps
cp target/iiit-insider.war /path/to/tomcat/webapps/

# Start Tomcat
/path/to/tomcat/bin/startup.sh  # Linux/Mac
/path/to/tomcat/bin/startup.bat # Windows

# Or for Windows, use Tomcat Manager GUI
```

## 6. Nginx Configuration

```bash
# Copy nginx.conf to Nginx sites
sudo cp nginx/nginx.conf /etc/nginx/sites-available/iiit-insider
sudo ln -s /etc/nginx/sites-available/iiit-insider /etc/nginx/sites-enabled/

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

## 7. API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notifications/register-device` | Register FCM device token |
| POST | `/api/notifications/unregister-device` | Unregister device |
| GET | `/api/notifications/devices` | Get user's devices |
| POST | `/api/notifications/send` | Send push notification |

### Social Media
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/social/share-links?url=...&title=...` | Get all share links |
| GET | `/api/social/share/facebook?url=...` | Facebook share URL |
| GET | `/api/social/share/twitter?url=...&title=...` | Twitter share URL |
| GET | `/api/social/share/linkedin?url=...` | LinkedIn share URL |
| GET | `/api/social/share/whatsapp?url=...&title=...` | WhatsApp share URL |
| GET | `/api/social/share/reddit?url=...&title=...` | Reddit share URL |

## 8. Test the API

```bash
# Register a user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get share links
curl "http://localhost:8080/api/social/share-links?url=https://iiitinsider.com&title=Check%20this%20out"
```

## Troubleshooting

### Port already in use
```bash
# Change port in application.properties
server.port=8081
```

### MySQL connection failed
- Check MySQL is running: `sudo systemctl status mysql`
- Verify credentials in application.properties
- Check database exists: `SHOW DATABASES;`

### CORS errors
- Update `app.cors.allowed-origins` in application.properties
- Add your frontend URL (e.g., `http://localhost:5173`)
