const { MongoClient } = require("mongodb");
const restify = require("restify");

// Configurazione MongoDB
const mongoUrl = "mongodb://127.0.0.1:27017";
const dbName = "Sensor_http";
const collectionName = "Sensor_data";

// Funzione principale
async function startServer() {
    // Connessione a MongoDB
    const client = new MongoClient(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connessione a MongoDB riuscita!");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Creazione del server Restify
        const server = restify.createServer();
        server.use(restify.plugins.bodyParser()); // Per analizzare il corpo delle richieste POST

        // Endpoint POST per ricevere dati dai sensori
        server.post("/water_coolers/:id/sensor/:sensor", async (req, res, next) => {
            const coolerId = req.params.id;
            const sensorName = req.params.sensor;
            const sensorData = req.body;

            try {
                // Aggiungere ID del refrigeratore e nome del sensore al payload
                const dataToInsert = {
                    coolerId: coolerId,
                    sensorName: sensorName,
                    ...sensorData,
                    timestamp: new Date(), // Aggiungere un timestamp
                };

                // Inserire i dati nel database
                const result = await collection.insertOne(dataToInsert);
                console.log("Dati inseriti con ID:", result.insertedId);

                // Rispondere al client
                res.send({ message: "Dati ricevuti e salvati", id: result.insertedId });
                return next();
            } catch (err) {
                console.error("Errore durante l'inserimento dei dati:", err);
                res.send(500, { error: "Errore durante l'elaborazione dei dati" });
                return next();
            }
        });

        // Avviare il server
        server.listen(8011, () => {
            console.log("%s listening at %s", server.name, server.url);
        });

    } catch (err) {
        console.error("Errore generale:", err);
    }
}

// Avviare il server
startServer();
