const router = require('express').Router();
const Task = require('../models/Task');

router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

router.put('/:id/complete', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { isCompleted: true }, { new: true });
  res.json(task);
});

module.exports = router;
