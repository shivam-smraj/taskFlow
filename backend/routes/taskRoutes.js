import express from 'express';
import Task from '../models/Task.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const { title, description, assignedTo } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            assignedTo,
            createdBy: req.user._id,
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const tasks = await Task.find({}).populate('assignedTo', 'name email').populate('createdBy', 'name');
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/tasks/employee
// @desc    Get tasks assigned to the logged-in employee
// @access  Private
router.get('/employee', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id }).populate('createdBy', 'name');
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/tasks/:id/status
// @desc    Update task status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
    const { status } = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Admins can update any task, Employees can only update their own
        if (req.user.role !== 'Admin' && task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        task.status = status;
        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
