const express = require('express');
const router = express.Router();
const offerController = require('../controllers/OfferController');

router.get('/:tenderId', offerController.getOffersForTender);

router.post('/:tenderId', offerController.createOffer)

module.exports = router;