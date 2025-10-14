# 🎓 Manaraa University Management System

## 📘 Overview
**Manaraa** is a comprehensive **University Management Platform** that unifies Student Information System (SIS) and Learning Management System (LMS) capabilities into a single, scalable solution.  
It is designed to support multiple institutions, provide robust role-based access control, and automate academic workflows with a focus on maintainability and extensibility.

---

## 👥 Team
- **Sherif Mohamed Dahy** — Developer  
- **Abdelaziz Ahmed Abdelaziz** — Developer  
- **Ebrahim Amin** — Developer  
- **Ali Essa** — Developer  
- **Omar Zaky** — Developer

---

## 🧱 Architecture Summary
Manaraa follows a modular, layered architecture to separate concerns and enable independent development, testing, and deployment of components.

Core layers typically include:
- **API Layer** — RESTful endpoints, authentication, and request validation.  
- **Application / BLL (Business Logic Layer)** — Use cases, orchestration, domain services.  
- **Data / DAL (Data Access Layer)** — Persistence, repositories, migrations.  
- **Domain / Core** — Entities, value objects, domain rules, interfaces.  
- **Shared / Infrastructure** — Logging, caching, common utilities, cross-cutting concerns.

This organization supports testability, clean boundaries, and incremental scaling.

---

## ⚙️ Key Capabilities
- Multi-tenant / multi-university support (isolated schemas per university)  
- Microsoft Identity-based authentication and role management  
- Automated request workflows (form-driven, configurable approval flows)  
- Course and scheduling management, attendance and assessments  
- Learning content: lectures, materials, quizzes, tasks  
- Surveys and feedback mechanisms (enforcement rules for access)  
- Extensible plugin points for future integrations (email, notifications, analytics)

---

## 🧠 Technology Stack (Suggested)
> Replace or expand these as your implementation choices firm up.

- **Backend:** ASP.NET Core Web API  
- **Frontend:** Angular (or React/Vue depending on team preference)  
- **Database:** Microsoft SQL Server  
- **ORM:** Entity Framework Core  
- **Auth:** Microsoft Identity  
- **CI/CD:** GitHub Actions (recommended)  
- **Containerization:** Docker (recommended for parity across environments)

---

## 🗺️ Entity Relationship Diagram (ERD)

The following diagram illustrates the main database entities and their relationships within the **Manaraa** system architecture.

> The ERD helps visualize how universities, faculties, departments, programs, and users are connected across both SIS and LMS modules.

### 📊 Diagram Preview
![Manaraa ERD](./Working%20file/Design/Diagram/diagram.png)

> 📁 *Path:* `Working file/Design/Diagram/diagram.png`

If you prefer to open it separately, you can find the full-resolution version inside:
