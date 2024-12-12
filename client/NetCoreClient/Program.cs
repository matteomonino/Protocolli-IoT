using NetCoreClient.Sensors;
using NetCoreClient.Protocols;


class Program
{
    static void Main(string[] args)
    {
        // Definisci i sensori
        List<ISensorInterface> sensors = new();
        sensors.Add(new VirtualWaterTempSensor());
        sensors.Add(new VirtualWaterFlowSensor());
        sensors.Add(new VirtualWaterLightSensor());

        // Definisci il protocollo AMQP (RabbitMQ)
        IProtocolInterface protocol = new Amqp("127.0.0.1");

        // Invia i dati al server
        while (true)
        {
            foreach (ISensorInterface sensor in sensors)
            {
                // Ottieni il valore del sensore in formato JSON
                var sensorValue = sensor.ToJson();

                // Invia il dato al server tramite RabbitMQ
                protocol.Send(sensorValue, sensor.GetSlug());

                // Visualizza un messaggio di conferma sulla console
                Console.WriteLine("Data sent: " + sensorValue + "  Sensor Name:" + sensor.GetSlug());

                // Attendi 1 secondo prima di inviare il prossimo dato
                Thread.Sleep(1000);
            }
        }
    }
}
