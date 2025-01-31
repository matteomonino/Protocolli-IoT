﻿using NetCoreClient.Sensors;
using NetCoreClient.Protocols;


// define sensors
List<ISensorInterface> sensors = new();
sensors.Add(new VirtualWaterTempSensor());
sensors.Add(new VirtualWaterFlowSensor());
sensors.Add(new VirtualWaterLightSensor());

// define protocol
IProtocolInterface protocol = new HttpProtocol("localhost:8011/water_coolers/123");

// send data to server
while (true)
{
    foreach (ISensorInterface sensor in sensors)
    {
        var sensorValue = sensor.ToJson();

        protocol.Send(sensorValue, sensor.GetSlug());

        Console.WriteLine("Data sent: " + sensorValue + "  Sensor Name: " + sensor.GetSlug());

        Thread.Sleep(1000);
    }
}
