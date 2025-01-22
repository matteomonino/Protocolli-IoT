using System.Text;
using System.Text.Json;


namespace NetCoreClient.Protocols
{
    internal class HttpProtocol : IProtocolInterface
    {
        private const string URL_PREFIX = "http://"; // Prefix for the base URL
        private readonly HttpClient httpClient;
        private readonly string endpoint;

        public HttpProtocol(string endpoint)
        {
            this.endpoint = endpoint;
            this.httpClient = new HttpClient();
        }

        public async void Send(string data, string sensor)
        {
            var payload = new
            {
                currentTime = DateTime.Now.ToString("yy-MM-dd/HH:mm:ss zzz"),
                sensorName = sensor,
                value = data
            };

            string jsonPayload = JsonSerializer.Serialize(payload);

            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            string fullUrl = $"{URL_PREFIX}{this.endpoint}/sensor/{sensor}";

            try
            {
                var response = await httpClient.PostAsync(fullUrl, content);
                response.EnsureSuccessStatusCode(); // Lancia un'eccezione se lo stato non è di successo
                Console.WriteLine($"Data sent successfully to {fullUrl}: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending data: {ex.Message}");
            }

        }
    }
}
