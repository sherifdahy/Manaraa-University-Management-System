# 🎓 Manaraa University Management System

## 📘 Overview
**Manaraa** is a comprehensive **University Management Platform** that unifies both **Student Information System (SIS)** and **Learning Management System (LMS)** functionalities.  
It provides a centralized solution for managing academic operations, user roles, course workflows, and digital learning environments across multiple universities.

The system focuses on scalability, flexibility, and automation — enabling institutions to handle complex academic structures while maintaining a seamless user experience for students, faculty, and administration.

---

## 👥 Team Members
| Name | Role |
|------|------|
| **Sherif Mohamed Dahy** | Developer |
| **Abdelaziz Ahmed Abdelaziz** | Developer |
| **Ebrahim Amin** | Developer |
| **Ali Essa** | Developer |
| **Omar Zaky** | Developer |

---

## 🧱 Architecture
**Manaraa** follows a modular and layered architecture designed for maintainability and scalability.  
The system separates concerns across distinct layers, enabling clean code organization and easier unit testing.

Typical layers include:
- **API Layer** – Handles client communication and RESTful endpoints.  
- **Business Logic Layer (BLL)** – Contains the application’s core logic and services.  
- **Data Access Layer (DAL)** – Responsible for database communication using ORM (Entity Framework Core).  
- **Core/Domain Layer** – Defines business models and shared abstractions.  
- **Shared Layer** – Common utilities, constants, and helpers used across the system.

---

## ⚙️ Key Features
- 🎯 **Multi-University Architecture** — Each university has its own isolated schema.  
- 🔐 **Role-Based Access Control** — Powered by Microsoft Identity for users and roles.  
- 🧾 **Automated Request Workflows** — Similar to Google Forms with dynamic approval steps.  
- 📚 **Comprehensive Academic Management** — Covers courses, scheduling, and performance tracking.  
- 🧠 **Integrated Learning Tools** — Supports quizzes, materials, lectures, and attendance tracking.  
- 📊 **Survey & Feedback System** — Students must complete surveys before accessing new features.  
- 🏛️ **Scalable Design** — Built to support future extensions for multiple institutions.  

---

## 🧠 Tech Stack
| Category | Technology |
|-----------|-------------|
| **Backend** | ASP.NET Core Web API |
| **Frontend** | Angular |
| **Database** | Microsoft SQL Server |
| **ORM** | Entity Framework Core |
| **Authentication** | Microsoft Identity |
| **Architecture** | Clean / Layered Architecture |
| **Version Control** | Git & GitHub |

---

## 🧪 Installation & Setup
Follow these steps to set up and run the project locally:

```bash
# Clone the repository
git clone https://github.com/<your-username>/Manaraa.git

# Navigate to the project directory
cd Manaraa

# Restore .NET dependencies
dotnet restore

# Build and run the backend
dotnet run

# (If Angular frontend is included)
cd ClientApp
npm install
ng serve
