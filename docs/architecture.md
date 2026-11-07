# Student Management System - Architecture Diagram

```mermaid
flowchart TD
    A["User / Web Browser"] --> B["AWS EC2"]
    B --> C["Docker Compose"]
    C --> D["Frontend - Nginx<br/>Port 8082"]
    C --> E["Backend - Node.js / Express<br/>Port 5001"]
    D --> E
    E --> F["Supabase<br/>Managed PostgreSQL"]
    E --> G["Prometheus<br/>Metrics Collection"]
    G --> H["Grafana<br/>Monitoring Dashboard"]
    I["GitHub Repository"] --> J["GitHub Actions<br/>CI/CD Pipeline"]
    J --> B
