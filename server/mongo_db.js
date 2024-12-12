const { MongoClient } = require("mongodb");
const amqp = require("amqplib");

// Configurazione MongoDB
const mongoUrl = "mongodb://127.0.0.1:27017";
const dbName = "Sensor_mqtt";
const collectionName = "Sensor_data";

// Configurazione AMQP
const amqpUrl = "amqp://127.0.0.1";  // URL del broker RabbitMQ
const amqpQueue = "sensor_data_queue"; // Nome della coda

// Funzione principale
async function connectToMongoDBAndAMQP() {
    const client = new MongoClient(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Connessione a MongoDB
        await client.connect();
        console.log("Connessione a MongoDB riuscita!");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Connessione al broker AMQP (RabbitMQ)
        const amqpConnection = await amqp.connect(amqpUrl);
        const channel = await amqpConnection.createChannel();
        console.log("Connesso al broker AMQP!");

        // Assicurarsi che la coda esista
        await channel.assertQueue(amqpQueue, {
            durable: true
        });

        // Consumatore della coda AMQP
        channel.consume(amqpQueue, async (msg) => {
            if (msg !== null) {
                try {
                    // Parsing del messaggio ricevuto
                    const data = JSON.parse(msg.content.toString());
                    console.log("Messaggio ricevuto:", data);

                    // Inserimento nel database MongoDB
                    const result = await collection.insertOne(data);
                    console.log("Dati inseriti con ID:", result.insertedId);

                    // Acknowledgment del messaggio
                    channel.ack(msg);
                } catch (err) {
                    console.error("Errore durante l'inserimento dei dati:", err);
                }
            }
        }, { noAck: false });

    } catch (err) {
        console.error("Errore generale:", err);
    }
}

connectToMongoDBAndAMQP();