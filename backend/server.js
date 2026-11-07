
const express = require("express");
const cors = require("cors");
const client = require("prom-client");
require("dotenv").config();

const supabase = require("./config/supabase");

const app = express();

// Prometheus Monitoring
const register = new client.Registry();

client.collectDefaultMetrics({
    register: register
});

// Count HTTP requests
const httpRequestCounter = new client.Counter({
    name: "student_backend_http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestCounter);

// Measure HTTP request duration
const httpRequestDuration = new client.Histogram({
    name: "student_backend_http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [0.1, 0.5, 1, 2, 5]
});

register.registerMetric(httpRequestDuration);

// Middleware
app.use(cors());
app.use(express.json());

// HTTP monitoring middleware
app.use((req, res, next) => {
    const start = process.hrtime();

    res.on("finish", () => {
        if (req.path === "/metrics") return;

        const duration = process.hrtime(start);
        const seconds = duration[0] + duration[1] / 1e9;
        const route = req.route?.path || req.path;

        httpRequestCounter.inc({
            method: req.method,
            route: route,
            status: String(res.statusCode)
        });

        httpRequestDuration.observe(
            {
                method: req.method,
                route: route,
                status: String(res.statusCode)
            },
            seconds
        );
    });

    next();
});

// Prometheus Metrics Endpoint
app.get("/metrics", async (req, res) => {
    try {
        res.set("Content-Type", register.contentType);
        res.end(await register.metrics());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Test API
app.get("/", (req, res) => {
    res.send("Student Management System API is running!");
});

// Get all students
app.get("/api/students", async (req, res) => {
    const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

// Add student
app.post("/api/students", async (req, res) => {
    const { student_id, full_name, email, phone, course } = req.body;

    const { data, error } = await supabase
        .from("students")
        .insert([{ student_id, full_name, email, phone, course }])
        .select();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
});

// Update student
app.put("/api/students/:id", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("students")
        .update(req.body)
        .eq("id", id)
        .select();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Student deleted successfully" });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("Prometheus monitoring enabled at /metrics");
});
