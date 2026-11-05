const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./config/supabase");

const app = express();

app.use(cors());
app.use(express.json());

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

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
});

// Add student
app.post("/api/students", async (req, res) => {
    const { student_id, full_name, email, phone, course } = req.body;

    const { data, error } = await supabase
        .from("students")
        .insert([{ student_id, full_name, email, phone, course }])
        .select();

    if (error) return res.status(400).json({ error: error.message });

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

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Student deleted successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});