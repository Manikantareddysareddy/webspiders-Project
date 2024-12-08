const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Joi = require('joi');

// Validation schema
const taskSchema = Joi.object({
  title: Joi.string().required().max(100),
  description: Joi.string(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED'),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH'),
  dueDate: Joi.date(),
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = new Task({
      ...req.body,
    });
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const { status, priority } = req.query;
    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(parseInt(req.query.limit) || 10)
      .skip(parseInt(req.query.skip) || 0);

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true } // Return the updated document
    );

    if (!task) return res.status(404).send('Task not found');

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;