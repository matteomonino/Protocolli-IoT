
using MQTTnet;
using MQTTnet.Client;

namespace NetCoreClient.Protocols
{
    internal class Mqtt : IProtocolInterface
    {
        private const string TOPIC_PREFIX = "casetta/1/sensor/";
        private IMqttClient mqttClient;
        private string endpoint;


        public Mqtt(string endpoint)
        {
            this.endpoint = endpoint;

            Connect().GetAwaiter().GetResult();
        }
        private async Task<MqttClientConnectResult> Connect()
        {
            var factory = new MqttFactory();

            var options = new MqttClientOptionsBuilder()
                .WithTcpServer(this.endpoint)
                .Build();

            mqttClient = factory.CreateMqttClient();

            return await mqttClient.ConnectAsync(options, CancellationToken.None);
        }

        public async void Send(string data, string sensor)
        {
            DateOnly currentime  = new DateOnly();
            var payload = new
            {
                currentime = DateTime.Now.ToString("yy-MM-dd/HH:mm:ss zzz"),
                sensorName = sensor,
                value = data
            };

            string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);

            var message = new MqttApplicationMessageBuilder()
                .WithTopic(TOPIC_PREFIX + sensor)
                .WithPayload(jsonPayload)
                .WithQualityOfServiceLevel(MQTTnet.Protocol.MqttQualityOfServiceLevel.ExactlyOnce)
                .Build();

            await mqttClient.PublishAsync(message, CancellationToken.None);
        }

    }
}
