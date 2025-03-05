//fileName: routes.js

import express from "express";

const router = express.Router();

let tasks = [];
let Id = 1;

router.get("/", (req, res) => {
    res.render("tasks", { tasks });
});

// Show completed tasks
router.get("/completedTasks", (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.render("completedTasks", { completedTasks });
});

// Show unfinished tasks
router.get("/inCompletedTasks", (req, res) => {
    const inCompletedTasks = tasks.filter(task => !task.completed);
    res.render("inCompletedTasks", { inCompletedTasks });
});

// Show all tasks (both completed and unfinished)
router.get("/dispCatTasks", (req, res) => {
    res.render("dispCatTasks", { tasks });
});

// Add a new task
router.post("/add-task", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).send({ message: "Name and description are required" });
    }

    const newTask = { id: Id++, name, description, completed: false };
    tasks.push(newTask);
    res.redirect("/");
});

// Toggle task completion
router.post("/toggle-task/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }
    task.completed = !task.completed;
    res.redirect("/");
});

// Delete a task
router.post("/delete-task/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.redirect("/");
});



export default router; 