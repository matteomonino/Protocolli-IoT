const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://127.0.0.1')

client.on('connect', function () {
    console.log("Connesso");
    client.subscribe('casetta/1/sensor/#');
})

client.on('message', function (topic, message) {
  console.log('TOPIC: ' + topic + "\nMESSAGE: " + message.toString());
})
