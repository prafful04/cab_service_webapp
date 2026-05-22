# Namasvi Cab Services

A full-stack cab booking and fleet management platform for Maharashtra-based cab services. Built with Spring Boot 3 + React 18, featuring an interactive map-based location picker, WhatsApp integration, and a full admin dashboard.

---

## Features

### Public
- **Cab Booking** – Book local and outstation cabs via an interactive booking form
- **Map-Based Location Picker** – Click on an interactive map (OpenStreetMap) to select pickup/drop locations, or type manually with autocomplete suggestions
- **Popular Routes** – Browse and book popular routes (Nashik ↔ Mumbai, Nashik ↔ Pune, etc.)
- **Fleet Showcase** – View available vehicle types (Sedan, SUV, Innova, Tempo Traveller, Bus)
- **WhatsApp Inquiry** – Booking form opens WhatsApp with a prefilled message for quick communication
- **Gallery** – Photo gallery showcasing the fleet

### Admin Dashboard (`/login`)
- **Analytics** – Dashboard with charts and stats (total bookings, revenue, popular routes)
- **Vehicle Management** – CRUD operations for fleet vehicles
- **Driver Management** – Manage driver profiles and assignments
- **Booking Management** – View, update, and manage all bookings
- **Route Pricing** – Configure route-based pricing
- **Gallery Management** – Upload and manage fleet images
- **Customer Management** – View customer inquiries and contact data
- **Settings** – Update company name, WhatsApp number, phone, and address
- **JWT Authentication** – Secure login with JSON Web Tokens

---

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Java 21 | Runtime |
| Spring Boot 3.5 | Application framework |
| Spring Security + JWT | Authentication & authorization |
| Spring Data JPA + Hibernate | ORM & database access |
| MySQL 8 | Database |
| Lombok | Boilerplate reduction |
| SpringDoc OpenAPI (Swagger) | API documentation |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| React Router DOM 6 | Client-side routing |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Leaflet + react-leaflet | Interactive map & location picker |
| OpenStreetMap + Nominatim | Map tiles & geocoding |
| Axios | HTTP client |
| Recharts | Admin dashboard charts |
| React Icons | Icon library |
| React Hot Toast | Toast notifications |
| React Helmet Async | SEO meta tags |

### DevOps
| Technology | Purpose |
|------------|---------|
| Docker + Docker Compose | Containerization |
| Nginx | Frontend reverse proxy |
| Maven | Build & dependency management |

---

## Screenshots

| Page | Description |
|------|-------------|
| Home | Hero banner, booking form with map picker, popular routes, fleet showcase |
| Fleet | Vehicle listing with details |
| Routes | Route pricing table |
| Contact | Inquiry/contact form |
| Admin Dashboard | Analytics, charts, booking stats |
| Admin Login | Secure JWT-based login page |

---

## Project Structure

```
namasvi-cab-services/
├── backend/
│   ├── src/main/java/com/namasvi/cab/
│   │   ├── config/              # SecurityConfig, CorsConfig, SwaggerConfig, DataSeeder
│   │   ├── controller/          # REST controllers (Auth, Booking, Vehicle, Driver, Route, etc.)
│   │   ├── dto/                 # Data transfer objects (LoginRequest, RegisterRequest, etc.)
│   │   ├── entity/              # JPA entities (Admin, Booking, Vehicle, Driver, Route, etc.)
│   │   ├── exception/           # Global exception handler
│   │   ├── repository/          # JPA repositories
│   │   ├── security/            # JwtTokenProvider, JwtAuthenticationFilter, CustomUserDetailsService
│   │   ├── service/             # Business logic layer
│   │   └── util/                # Utility classes
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components (Navbar, BookingForm, LocationPicker, etc.)
│   │   ├── pages/               # Page components (Home, Fleet, Routes, Contact, Login)
│   │   │   └── admin/           # Admin pages (Dashboard, Vehicles, Drivers, Bookings, etc.)
│   │   ├── layouts/             # MainLayout, AdminLayout
│   │   ├── services/            # API service layer (api.js, authService, bookingService, etc.)
│   │   ├── context/             # React context (AuthContext, SiteSettingsContext)
│   │   ├── routes/              # Route definitions (AppRoutes.jsx)
│   │   └── assets/              # Static assets
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
├── init.sql
└── README.md
```

---

## Quick Start

### Prerequisites
- Java 21+
- Node.js 20+
- MySQL 8+
- Docker (optional, for containerized setup)

### Option 1: Docker Setup (Recommended)

```bash
docker-compose up --build
```

This starts all three services:

| Service | URL |
|---------|-----|
| Frontend | http://localhost |
| Backend (API) | http://localhost:8080 |
| MySQL | localhost:3307 |
| Swagger UI | http://localhost:8080/swagger-ui.html |

### Option 2: Local Development Setup

#### 1. Database
```sql
CREATE DATABASE namasvi_cab_db;
```

Update `backend/src/main/resources/application.properties` with your MySQL credentials if different.

#### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```
Backend starts at http://localhost:8080

#### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend starts at http://localhost:5173

---

## Default Admin Credentials

| Field | Value |
|-------|-------|
| URL | http://localhost:5173/login (or your deployed URL + `/login`) |
| Username | `admin` |
| Password | `admin123` |

> **Note:** The admin login link is intentionally hidden from the public navigation for security. Access `/login` directly in your browser.

---

## Map-Based Location Picker

The booking form features an interactive map for location selection:

1. **Manual typing** – Start typing a location; autocomplete suggestions appear via OpenStreetMap's Nominatim API
2. **Map picker** – Click the map pin icon next to the input field to open an interactive Leaflet map
3. **Click to select** – Click anywhere on the map to place a draggable marker
4. **Reverse geocoding** – The selected coordinates are automatically converted to a human-readable address
5. **Confirm** – Press "Confirm Location" to populate the field

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/register` | Register new admin | No |

### Vehicles
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/vehicles` | List all vehicles | No |
| GET | `/api/vehicles/{id}` | Get vehicle by ID | No |
| POST | `/api/vehicles` | Create vehicle | Admin |
| PUT | `/api/vehicles/{id}` | Update vehicle | Admin |
| DELETE | `/api/vehicles/{id}` | Delete vehicle | Admin |

### Drivers
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/drivers` | List all drivers | Admin |
| POST | `/api/drivers` | Create driver | Admin |
| PUT | `/api/drivers/{id}` | Update driver | Admin |
| DELETE | `/api/drivers/{id}` | Delete driver | Admin |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/bookings` | List all bookings | Admin |
| POST | `/api/bookings` | Create booking | No |
| GET | `/api/bookings/{id}` | Get booking by ID | Admin |
| PUT | `/api/bookings/{id}` | Update booking | Admin |
| PUT | `/api/bookings/{id}/status` | Update booking status | Admin |
| DELETE | `/api/bookings/{id}` | Delete booking | Admin |

### Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/routes` | List all routes | No |
| GET | `/api/routes/search` | Search routes by query | No |
| POST | `/api/routes` | Create route | Admin |
| PUT | `/api/routes/{id}` | Update route | Admin |
| DELETE | `/api/routes/{id}` | Delete route | Admin |

### Inquiries
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/inquiries` | Submit inquiry | No |
| GET | `/api/inquiries` | List inquiries | Admin |
| DELETE | `/api/inquiries/{id}` | Delete inquiry | Admin |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/dashboard/stats` | Get dashboard statistics | Admin |

### Settings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/settings` | Get site settings | No |
| PUT | `/api/settings` | Update site settings | Admin |

---

## Seed Data

On first run (or when the `admins` table is empty), the application automatically seeds:

- **Admin account** – Username: `admin`, Password: `admin123`
- **Popular routes** – Nashik ↔ Mumbai, Nashik ↔ Pune, Nashik ↔ Shirdi, Nashik ↔ Aurangabad, Nashik ↔ Nagpur, Nashik ↔ Ahmednagar, Nashik ↔ Dhule
- **Vehicle fleet** – Sedan, SUV, Luxury Sedan, Tempo Traveller (12-seater), Tempo Traveller (18-seater), Bus
- **Sample drivers** – 5 driver profiles with associated vehicles

---

## WhatsApp Integration

The booking form sends users directly to WhatsApp with a prefilled message:

```
Hello Namasvi Cab Services! I want to book a cab.
Pickup: [location]
Drop: [location]
Date: [date]
Vehicle: [type]
```

The WhatsApp number is configurable via the admin Settings page.

---

## Environment Variables

### Backend (`application.properties`)

| Property | Description | Default |
|----------|-------------|---------|
| `spring.datasource.url` | MySQL connection URL | `jdbc:mysql://localhost:3306/namasvi_cab_db` |
| `spring.datasource.username` | Database username | `root` |
| `spring.datasource.password` | Database password | `root` |
| `app.jwt.secret` | JWT signing secret (256-bit hex) | *(64-byte hex string)* |
| `app.jwt.expiration` | JWT expiration in milliseconds | `86400000` (24h) |

### Frontend (`vite.config.js`)

| Setting | Description |
|---------|-------------|
| `server.proxy` | API proxy targets `http://localhost:8080` during dev |

### Docker (`docker-compose.yml`)

| Service | Environment Variables |
|---------|----------------------|
| `mysql` | `MYSQL_ROOT_PASSWORD=root`, `MYSQL_DATABASE=namasvi_cab_db` |
| `backend` | `SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/namasvi_cab_db` |

---

## Docker Services

```yaml
mysql:
  image: mysql:8.0
  ports:
    - "3307:3306"
  volumes:
    - mysql_data:/var/lib/mysql
    - ./init.sql:/docker-entrypoint-initdb.d/init.sql

backend:
  build: ./backend
  ports:
    - "8080:8080"
  depends_on:
    mysql (condition: service_healthy)

frontend:
  build: ./frontend
  ports:
    - "80:80"
  depends_on:
    - backend
```

---

## Development Notes

### Adding a new admin
```
POST /api/auth/register
{
  "username": "newadmin",
  "password": "password123"
}
```

### Changing admin credentials
Edit the seed data in `backend/src/main/java/com/namasvi/cab/config/DataSeeder.java` or update directly in MySQL:

```sql
UPDATE admins SET password = '<bcrypt-hash>' WHERE username = 'admin';
```

### Swagger API Docs
Access interactive API documentation at http://localhost:8080/swagger-ui.html (or `/swagger-ui.html` on your backend URL).

---

## License

Private — Namasvi Cab Services. All rights reserved.
