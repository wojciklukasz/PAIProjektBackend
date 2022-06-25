const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/TenderController');

router.get('/active', tenderController.getAllActiveTenders);

router.get('/past', tenderController.getAllPastTenders);

router.get('/:tenderId', tenderController.getOneTender);

router.post('/', tenderController.createTender);

module.exports = router;