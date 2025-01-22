# Protocolli-IoT
Componenti gruppo:
- Matteo Monino
- Matteo Santi


Questo progetto è un'applicazione Node.js che consente di raccogliere, salvare e gestire i dati provenienti da sensori. I dati vengono ricevuti tramite HTTP e memorizzati in un database MongoDB.

Funzionalità principali
Raccolta dei dati dai sensori:
I sensori inviano i dati tramite richieste HTTP POST al server.
Supporta endpoint per identificare refrigeratori e sensori specifici.
Archiviazione dei dati:
I dati raccolti vengono salvati in una collezione MongoDB con informazioni aggiuntive come timestamp e identificatori.
Interoperabilità:
Progettato per essere compatibile con qualsiasi client che utilizzi HTTP per inviare dati in formato JSON.
Installazione
Requisiti
Node.js v14 o superiore
MongoDB (locale o remoto)
npm (installato con Node.js)
Passaggi
Clona il repository:

bash
Copia
Modifica
git clone https://github.com/tuo-utente/nome-repo.git
cd nome-repo
Installa le dipendenze:

bash
Copia
Modifica
npm install
Avvia MongoDB:

Se stai usando un'istanza locale, assicurati che MongoDB sia in esecuzione:
bash
Copia
Modifica
mongod
Configura il progetto:

Modifica le impostazioni del database e dell'host MQTT nel file principale, se necessario:
javascript
Copia
Modifica
const mongoUrl = "mongodb://127.0.0.1:27017"; // Configurazione database
const dbName = "Sensor_http"; // Nome del database
Avvia il server:

bash
Copia
Modifica
node server.js
Utilizzo
Client HTTP
I sensori inviano dati al server tramite il seguente endpoint:

Endpoint
POST /water_coolers/:id/sensor/:sensor

:id: ID del refrigeratore.
:sensor: Nome del sensore.
Esempio di richiesta
URL: http://localhost:8011/water_coolers/123/sensor/temperature
Corpo (JSON):

json
Copia
Modifica
{
    "currentTime": "23-01-22/15:30:45 +0200",
    "value": "22.5"
}
Risposta
json
Copia
Modifica
{
    "message": "Dati ricevuti e salvati",
    "id": "64b9f2b5a7e4e09a99c8b67e"
}
Database
I dati vengono memorizzati nella collezione Sensor_data all'interno del database Sensor_http.
Ogni documento salvato include:

coolerId: ID del refrigeratore.
sensorName: Nome del sensore.
currentTime: Ora inviata dal sensore.
value: Valore del dato raccolto.
timestamp: Ora di ricezione sul server.
Struttura del progetto
plaintext
Copia
Modifica
.
├── server.js              # Server principale
├── package.json           # Configurazioni del progetto e dipendenze
└── README.md              # Documentazione del progetto
Testing
Con Postman
Configura una richiesta POST con:
URL: http://localhost:8011/water_coolers/:id/sensor/:sensor
Header: Content-Type: application/json
Corpo:
json
Copia
Modifica
{
    "currentTime": "23-01-22/15:30:45 +0200",
    "value": "22.5"
}
Invia la richiesta e verifica la risposta e i log del server.
Con il client HTTP
Usa il client HTTP fornito nel progetto per inviare i dati simulati.

Dipendenze principali
Restify: Per gestire le richieste HTTP.
MongoDB: Database NoSQL per archiviare i dati.
Node.js: Runtime per JavaScript.
Licenza
Questo progetto è rilasciato sotto la licenza MIT. Consulta il file LICENSE per maggiori dettagli.
