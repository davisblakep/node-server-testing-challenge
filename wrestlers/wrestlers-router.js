const express = require('express');
const Wrestlers = require('./wrestlers-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await Wrestlers.find());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const wrestler = await Wrestlers.findById(req.params.id);
    if (!wrestler) {
      return res.status(404).json({
        message: 'Wrestler not found',
      });
    }

    res.json(wrestler);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const wrestler = await Wrestlers.create(req.body);
    res.status(201).json(wrestler);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
