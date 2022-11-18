const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

//importo el router de country
const countries = require('./countries')
const activities = require('./activities')

// Configurar los routers
router.use('/activities', activities);
router.use('/countries', countries);


module.exports = router;
