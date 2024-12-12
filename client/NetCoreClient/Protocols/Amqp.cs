using RabbitMQ.Client;
using System.Text;
using System.Text.Json;


namespace NetCoreClient.Protocols
{
    internal class Amqp : IProtocolInterface
    {
        private const string QUEUE_NAME = "1"; // Nome della coda
        private IConnection connection;
        private IChannel channel;
        private string endpoint;

        // Costruttore che si connette al broker AMQP (RabbitMQ)
        public Amqp(string endpoint)
        {
            this.endpoint = endpoint;
            Connect().GetAwaiter().GetResult();
        }

        // Funzione per connettersi al broker RabbitMQ
        private async Task Connect()
        {
            var factory = new ConnectionFactory() { Uri = new Uri($"amqp://{this.endpoint}") };
            connection = await factory.CreateConnectionAsync();
            channel = await connection.CreateChannelAsync();

            // Dichiarazione della coda (se non esiste, viene creata)
            await channel.QueueDeclareAsync(queue: QUEUE_NAME,
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

            Console.WriteLine("Connesso al broker AMQP e coda pronta.");
        }

        // Funzione per inviare i dati nella coda
        public async void Send(string data, string sensor)
        {
            // Creazione del payload JSON
            var payload = new
            {
                currentime = DateTime.Now.ToString("yy-MM-dd/HH:mm:ss zzz"),
                sensorName = sensor,
                value = data
            };

            string jsonPayload = JsonSerializer.Serialize(payload);

            // Conversione del payload in byte[]
            var body = Encoding.UTF8.GetBytes(jsonPayload);

            
            // Pubblicazione del messaggio nella coda
            await channel.BasicPublishAsync(exchange: "",
                                 routingKey: QUEUE_NAME,
                                 body: body);

            Console.WriteLine($"Messaggio inviato al broker AMQP: {jsonPayload}");
        }

        // Funzione per chiudere la connessione (da chiamare quando il client non è più necessario)
        public void CloseConnection()
        {
            channel.CloseAsync();
            connection.CloseAsync();
            Console.WriteLine("Connessione chiusa.");
        }
    }
}
