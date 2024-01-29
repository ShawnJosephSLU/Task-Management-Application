const Task = require('../models/task.model'); 

const createNewTask = async (req, res) => {
    try {
        // Extract task data from req.body
        const { title, description, dueDate, assignee, priorityLevel, notes, status } = req.body;

        // Create a new task instance
        const newTask = new Task({
            title,
            description,
            dueDate,
            assignee, 
            priorityLevel,
            notes,
            status
        });

        // Save the new task to the database
        await newTask.save();

        // Send a response back
        res.status(201).json({ message: 'New task created successfully', task: newTask });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Error creating new task', error: error.message });
    }
};

module.exports = { createNewTask };
