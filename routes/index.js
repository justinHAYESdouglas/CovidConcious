const router = require('express').Router();
const homeRoutes = require('./covidRoutes');

router.use('/', homeRoutes);

module.exports = router;