# Protocolli-IoT
Componenti gruppo:
- Matteo Monino
- Matteo Santi


Questo progetto è un'applicazione Node.js che consente di raccogliere, salvare e gestire i dati provenienti da sensori. I dati vengono ricevuti tramite HTTP e memorizzati in un database MongoDB.

## **Funzionalità principali**
1. **Raccolta dei dati dai sensori**:
   - I sensori inviano i dati tramite richieste HTTP `POST` al server.
   - Supporta endpoint per identificare refrigeratori e sensori specifici.
2. **Archiviazione dei dati**:
   - I dati raccolti vengono salvati in una collezione MongoDB con informazioni aggiuntive come timestamp e identificatori.
3. **Interoperabilità**:
   - Progettato per essere compatibile con qualsiasi client che utilizzi HTTP per inviare dati in formato JSON.

---

## **Installazione**
### **Requisiti**
- **Node.js** v14 o superiore
- **MongoDB** (locale o remoto)
- **npm** (installato con Node.js)

### **Passaggi**
1. **Clona il repository**:
   ```bash
   git clone https://github.com/tuo-utente/nome-repo.git
   cd nome-repo

   {
    "_id": "64b9f2b5a7e4e09a99c8b67e",
    "coolerId": "123",
    "sensorName": "temperature",
    "currentTime": "23-01-22/15:30:45 +0200",
    "value": "22.5",
    "timestamp": "2025-01-22T15:30:45.000Z"
}


