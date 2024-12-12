using NetCoreClient.ValueObjects;
using System.Text.Json;

namespace NetCoreClient.Sensors
{
    class VirtualWaterFlowSensor : IWaterFlowSensorInterface, ISensorInterface
    {
        private readonly Random Random;

        public VirtualWaterFlowSensor()
        {
            Random = new Random();
        }

        public int WaterFlow()
        {
            return new WaterFlow(Random.Next(20)).Value;
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(WaterFlow());
        }

        public string GetSlug()
        {
            return "waterFlow";
        }
    }
}