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

### **Requisiti**
- **Node.js** v14 o superiore
- **MongoDB** (locale o remoto)
- **npm** (installato con Node.js)

---
##Project Structure
  .
├── server.js              # Server principale
├── package.json           # Configurazioni del progetto e dipendenze
├── README.md              # Documentazione del progetto
└── .gitignore             # File per ignorare specifici file nel repository





