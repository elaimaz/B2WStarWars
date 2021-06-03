const planetsRouter = require('express').Router();

planetsRouter.get('/', (request, response) => {
    response.json({message: 'sucess'});
});

module.exports = planetsRouter;
