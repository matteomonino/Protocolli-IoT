using NetCoreClient.ValueObjects;
using System.Text.Json;

namespace NetCoreClient.Sensors
{
    class VirtualWaterLightSensor : IWaterLightSensorInterface, ISensorInterface
    {
        private readonly Random Random;

        public VirtualWaterLightSensor()
        {
            Random = new Random();
        }

        public int WaterLight()
        {
            return new WaterLight(Random.Next(20)).Value;
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(WaterLight());
        }

        public string GetSlug()
        {
            return "waterLight";
        }
    }
}
