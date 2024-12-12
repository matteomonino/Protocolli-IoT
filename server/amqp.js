const amqp = require('amqplib/callback_api');

console.log("Inizio connessione AMQP");

// Connessione al server RabbitMQ (sostituisci con l'URL del tuo server AMQP)
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    console.log("Errore connessione:", error0);
    throw error0;
  }

  console.log("Connesso al server AMQP");

  // Crea un canale per inviare e ricevere messaggi
  connection.createChannel(function(error1, channel) {
    if (error1) {
      console.log("Errore creazione canale:", error1);
      throw error1;
    }

    // Definisci il nome della coda su cui ci si iscriverà
    const queue = 'casetta_1_sensor';

    // Assicurati che la coda esista
    channel.assertQueue(queue, {
      durable: false
    });

    console.log(`In ascolto sulla coda: ${queue}`);

    // Consuma i messaggi dalla coda
    channel.consume(queue, function(msg) {
      console.log('MESSAGGIO: ' + msg.content.toString());
    }, {
      noAck: true
    });
  });
});
