const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Session
routes.post('/session', SessionController.create);

//Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.put('/ongs/:id', OngController.update);
routes.delete('/ongs/:id', OngController.delete);

//Incidents
routes.get('/incidents', IncidentsController.index);
routes.get('/incidents/page/:page', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.put('/incidents/:id', IncidentsController.update);
routes.delete('/incidents/:id', IncidentsController.delete);

//Profile
routes.get('/profile', ProfileController.index);

module.exports = routes;