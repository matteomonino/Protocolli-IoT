const { MongoClient } = require("mongodb");
const mqtt = require("mqtt");

// Configurazione MongoDB
const mongoUrl = "mongodb://127.0.0.1:27017"; 
const dbName = "Sensor_mqtt"; 
const collectionName = "Sensor_data"; 

// Configurazione MQTT
const mqttBroker = "mqtt://127.0.0.1";
const mqttTopic = "casetta/1/sensor/#";

// Funzione principale
async function connectToMongoDBAndMQTT() {
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

        // Connessione al broker MQTT
        const mqttClient = mqtt.connect(mqttBroker);
        mqttClient.on("connect", () => {
            console.log("Connesso al broker MQTT!");
            mqttClient.subscribe(mqttTopic, (err) => {
                if (err) {
                    console.error("Errore nella sottoscrizione al topic:", err);
                } else {
                    console.log(`Sottoscritto al topic: ${mqttTopic}`);
                }
            });
        });

        // Gestione dei messaggi MQTT
        mqttClient.on("message", async (topic, message) => {
            try {
                // Parsing del messaggio ricevuto
                const data = JSON.parse(message.toString());
                console.log("Messaggio ricevuto:", data);

                // Inserimento nel database
                const result = await collection.insertOne(data);
                console.log("Dati inseriti con ID:", result.insertedId);
            } catch (err) {
                console.error("Errore durante l'inserimento dei dati:", err);
            }
        });

    } catch (err) {
        console.error("Errore generale:", err);
    }
}


connectToMongoDBAndMQTT();
