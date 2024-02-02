const Task = require('../models/task.model'); 
const mongoose = require('mongoose');

const createNewTask = async (req, res) => {
    try {
        // Extract task data from req.body
        const { title, description, dueDate, assignee, priorityLevel, notes, status } = req.body;

       
        const newTask = new Task({ // Create a new task instance
            title,
            description,
            dueDate,
            assignee, 
            priorityLevel,
            notes,
            status
        });

        
        await newTask.save();// Save the new task to the database

        // Send a response back
        res.status(201).json({ message: 'New task created successfully', task: newTask });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Error creating new task', error: error.message });
    }
};


const getFilteredTasks = async (req, res, next) => {
    try {
       
        let filter = {...req.query}; // extract filter from query parameters

        if (filter['assignee.userId']) { 
            
            filter['assignee.userId'] = new mongoose.Types.ObjectId(filter['assignee.userId']);
        }
        
        
        let tasks;
        if (Object.keys(filter).length === 0) {// Check if the filter is empty (no query parameters)
            
            tasks = await Task.find();// If no filter is provided, return all tasks
        } else {
            
            tasks = await Task.find(filter); // Find tasks that match the filter
        }

        res.status(200).json(tasks);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

const updateTask = async (req, res) => { // update a single task
    try {
        const { taskId } = req.params; 
        const updateData = req.body;

        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};


const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params; // extract the task ID from the route parameters
        const task = await Task.findById(taskId); // use Mongoose's findById method

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task); // return the found task
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
};


module.exports = { createNewTask, getFilteredTasks, updateTask,  getTaskById};
