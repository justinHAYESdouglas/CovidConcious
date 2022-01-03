const router = require('express').Router();
const postRoutes = require('./covidRoutes');

router.use('/api', postRoutes);

module.exports = router;