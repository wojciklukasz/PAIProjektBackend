const TenderModel = require('../models/TenderModel');
const ct = require('../functions/GetCurrentTimeFunction');

const getAllActiveTenders = async (_req, res) => {
    const tenders = await TenderModel.getAllActiveTenders();
    res.status(200).json(tenders);
};

const getAllPastTenders = async (_req, res) => {
    const tenders = await TenderModel.getAllPastTenders();
    res.status(200).json(tenders);
};

const getOneTender = async (req, res) => {
    const tender = await TenderModel.getOneTender(req.params.tenderId);
    res.status(200).json(tender);
};

const createTender = async (req, res) => {
    const { body } = req;
    if(
        !body.Name ||
        !body.Owner ||
        !body.Description ||
        !body.Budget ||
        !body.StartDate ||
        !body.EndDate ||
        body.StartDate > body.EndDate ||
        body.EndDate.replace('T', ' ') <= ct.getCurrentTimeWithoutSeconds() ||
        body.Budget <= 0
    ) {
        if(body.StartDate > body.EndDate) {
            res.status(400).json({'message': 'Zakończenie przetargu musi nastąpić po jego rozpoczęciu!'});
            return;
        }
        if(body.EndDate.replace('T', ' ') <= ct.getCurrentTimeWithoutSeconds()) {
            res.status(400).json({'message': 'Data zakończenia musi być późniejsza od aktualnej daty!'});
            return;
        }
        if(body.Budget <= 0) {
            res.status(400).json({'message': 'Budżet musi być większy od 0!'});
            return;
        }
        res.status(400).json({'message': 'Błąd w przesłanych danych!'});
        return;
    }

    const tenderToAdd = {
        Name: body.Name,
        Owner: body.Owner,
        Description: body.Description,
        Budget: parseInt(body.Budget),
        StartDate: body.StartDate.replace('T', ' '),
        EndDate: body.EndDate.replace('T', ' ')
    };

    const tender = await TenderModel.createTender(Object.values(tenderToAdd));
    res.status(200).json(tender);
};

module.exports = {
    getAllActiveTenders,
    getAllPastTenders,
    getOneTender,
    createTender
};