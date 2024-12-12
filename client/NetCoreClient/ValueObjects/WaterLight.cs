namespace NetCoreClient.ValueObjects
{
    internal class WaterLight
    {
        public int Value { get; private set; }

        public WaterLight(int value)
        {
            this.Value = value;
        }

    }
}

