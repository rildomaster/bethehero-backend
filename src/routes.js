const express = require('express');
const routes = express.Router();
 
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//Validators
const OngValidator = require('./validators/OngValidator');
const IncidentsValidator = require('./validators/IncidentsValidator');
const ProfileValidator = require('./validators/ProfileValidator');
const SessionValidator = require('./validators/SessionValidator');

//Session
routes.post('/session', SessionValidator.create(), SessionController.create);

//Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngValidator.create(), OngController.create);
routes.put('/ongs/:id', OngValidator.update(), OngController.update);
routes.delete('/ongs/:id', OngController.delete);

//Incidents
routes.get('/incidents', IncidentsController.index);
routes.get('/incidents/page/:page', IncidentsController.index);
routes.post('/incidents', IncidentsValidator.create(), IncidentsController.create);
routes.put('/incidents/:id', IncidentsValidator.update(), IncidentsController.update);
routes.delete('/incidents/:id', IncidentsValidator.delete(), IncidentsController.delete);

//Profile
routes.get('/profile', ProfileValidator.index(), ProfileController.index);

module.exports = routes;