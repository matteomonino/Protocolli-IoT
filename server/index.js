var restify = require('restify');

var server = restify.createServer();
server.use(restify.plugins.bodyParser()); // Per analizzare il corpo delle richieste POST

// Endpoint per ottenere la lista dei refrigeratori
server.get('/water_coolers', function (req, res, next) {
    res.send({ message: 'List of coolers: [TODO]' });
    return next();
});

// Endpoint per ottenere i valori attuali di un refrigeratore specifico
server.get('/water_coolers/:id', function (req, res, next) {
    const coolerId = req.params['id'];
    res.send({ message: `Current values for cooler ${coolerId}: [TODO]` });
    return next();
});

// Endpoint per ricevere dati dai sensori di un refrigeratore specifico
server.post('/water_coolers/:id/sensor/:sensor', function (req, res, next) {
    const coolerId = req.params['id'];
    const sensorName = req.params['sensor'];
    const sensorData = req.body;

    // Log dei dati ricevuti
    console.log(`Data received from cooler ${coolerId}, sensor ${sensorName}:`, sensorData);

    // Risposta al client
    res.send({
        message: 'Data received successfully',
        coolerId: coolerId,
        sensorName: sensorName,
        receivedData: sensorData,
    });

    return next();
});

// Avvio del server
server.listen(8011, function () {
    console.log('%s listening at %s', server.name, server.url);
});
