# Student Management System – Cloud & DevOps Capstone Project

A containerized Student Management System deployed on AWS EC2, using Supabase as a managed PostgreSQL database and Prometheus/Grafana for monitoring.

## Project Overview

This project demonstrates the practical implementation of Cloud Computing and DevOps concepts, including application development, Docker containerization, CI/CD automation, cloud deployment, and infrastructure monitoring.

## Technologies Used

| Area | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript, Nginx |
| Backend | Node.js, Express.js |
| Database | Supabase PostgreSQL |
| Cloud Platform | AWS EC2 (Ubuntu) |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Monitoring | Prometheus, Grafana |
| Version Control | Git, GitHub |

## Architecture

The system uses AWS EC2 to host the Dockerized frontend and backend. The backend communicates with Supabase for database operations. Prometheus collects backend metrics, while Grafana visualizes monitoring information.

Architecture diagram: `docs/architecture.md`

Draw.io diagram: `docs/Student-Management-System-Architecture.drawio`

## Project Structure

```text
student-management-system/
│
├── backend/
│   ├── package.json
│   └── ...
│
├── frontend/
│   └── ...
│
├── monitoring/
│   └── ...
│
├── docs/
│   ├── architecture.md
│   ├── Student-Management-System-Architecture.drawio
│   └── screenshots/
│
├── .github/
│   └── workflows/
│       └── docker-ci.yml
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Main Features

- Add new student records.
- View student details.
- Update existing student records.
- Delete student records.
- Store student information in Supabase PostgreSQL.
- Run frontend and backend using Docker containers.
- Automate CI checks using GitHub Actions.
- Monitor backend metrics using Prometheus.
- Visualize monitoring data using Grafana.

## Cloud Deployment

**Cloud provider:** AWS

**Server:** Ubuntu EC2 instance

**Live application:** http://54.206.27.136:8082

**Backend API:** http://54.206.27.136:5001

## Docker Deployment

Run the application using Docker Compose:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs -f
```

Stop the application:

```bash
docker compose down
```

## Database Configuration

The project uses Supabase as its managed PostgreSQL database.

Configure the following environment variables in `backend/.env`:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_api_key
```

Never upload `.env` files or secret API keys to GitHub.

## CI/CD Pipeline

GitHub Actions is used to automate the CI workflow.

Workflow file:

`.github/workflows/docker-ci.yml`

The workflow validates the Docker-based application build when changes are pushed to the GitHub repository.

## Monitoring

Prometheus collects backend application metrics through the `/metrics` endpoint.

Grafana provides monitoring dashboards for:

- Backend CPU usage
- Backend memory usage
- Backend availability/status

Monitoring services run using Docker containers.

## Testing

The following application operations were tested:

- Create student records
- Read student records
- Update student records
- Delete student records
- Backend API availability
- Supabase database connectivity
- Docker container operation
- Prometheus metrics collection
- Grafana dashboard visualization

## Screenshots

Project evidence and deployment screenshots are stored in:

`docs/screenshots/`

## GitHub Repository

https://github.com/Nethmisamartha/student-management-system1

## Learning Outcomes

This capstone project provided practical experience in:

- AWS cloud infrastructure
- Linux server administration
- Docker containerization
- Docker Compose
- Git and GitHub
- GitHub Actions CI/CD
- Supabase managed databases
- Prometheus monitoring
- Grafana dashboards
- Cloud application deployment

---

**Project:** Student Management System  
**Category:** Cloud Computing & DevOps Capstone Project