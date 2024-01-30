// task model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignee: {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        displayName: String
    },
    priorityLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    notes: [{ type: String }],
    status: { type: String, enum: ['pending', 'in progress', 'completed', 'canceled'], default: 'pending' }
}, { versionKey: false });

module.exports = mongoose.model('Task', taskSchema);
