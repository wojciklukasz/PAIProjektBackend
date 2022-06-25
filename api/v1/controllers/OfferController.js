const offerModel = require('../models/OfferModel');
const tenderModel = require('../models/TenderModel');

const getOffersForTender = async (req, res) => {
    const budget = await tenderModel.getBudgetForTender(req.params.tenderId);
    const offers = await offerModel.getOffersForTender(req.params.tenderId, budget);
    res.status(200).json(offers);
};

const createOffer = async (req, res) => {
    const { body } = req;
    const tenderId = req.params.tenderId;
    if(
        !body.Owner ||
        !body.Price ||
        body.Price <= 0
    ) {
        if(body.Price <= 0) {
            res.status(400).json({'message': 'Budżet musi być większy od 0!'});
            return;
        }
        res.status(400).json({'message': 'Błąd w przesłanych danych!'});
        return;
    }

    const offerToAdd = {
        Owner: body.Owner,
        Price: body.Price,
        TenderId: tenderId,
    };

    const offer = await offerModel.createOffer(Object.values(offerToAdd));
    res.status(200).json(offer);
};

module.exports = {
    getOffersForTender,
    createOffer
};