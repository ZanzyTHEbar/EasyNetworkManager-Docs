# MDNS {.text-[var(--font-accent)]}

## What is it?

`mDNS` is a protocol that allows you to connect to a device using a name instead of an IP address. This is useful if you do not know the IP address of the device, or if you do not want to keep track of the IP address of the device. This is also useful if you are using a device that does not have a static IP address.

In the `mDNS` protocol the IP address of the device can change, but the name of the device will always be the same. This means that you can connect to the device using the name of the device, even if the IP address of the device changes.

## How to use it

### Enable mDNS

The `mDNS` is enabled by instantiating the `MDNSManager` class and calling it's `begin()` method. This will enable the `mDNS` protocol on the device.

::: info **Note**
The mDNS Manager is used to create a mDNS service for the device
The mDNS Manager constructor takes seven parameters:

1. A pointer to the config manager
2. The service name
3. The service instance name
4. The service protocol
5. The service description
6. The service port
::: warning Caution
Service name and service protocol have to be lowercase and begin with an underscore - soon we will add parsing to the class to make sure this is the case. For now you must do this manually.
:::
:::

```cpp
MDNSHandler mDNS(configHandler.config, 
                 "_easynetwork", 
                 "test", 
                 "_tcp",
                 "_api_port", 
                 "80");
mDNS.begin();
```

To use it, all you need to do is set the name of the device in the firmware config file.

```cpp
// The config manager constructor takes two (optional) parameters: 
// 1. The name of the project (used to create the config file name) 
// 2. The hostname for your device on the network(used for mDNS and OTA)
ConfigHandler configHandler("easynetwork", MDNS_HOSTNAME);
```

By default if you provide no MDNS name to the config constructor the name of the device is set to `easynetwork`, however you can change it to whatever you want using the REST API at runtime.

::: warning Change the name
If you have more than one ESP device on the same network you need to make sure that the hostname of the device is different for each device. If you do not change the name of the device, you will not be able to connect to both devices at the same time and there will be routing conflicts.
:::

### Connect to the device

To connect to the device, you need to use the name of the device followed by `.local`. For example, if the name of the device is `esp32`, you can connect to the device using `http://esp32.local`.

## Prerequisites `Bonjour`

`Bonjour` is required to use the `mDNS` protocol _for windows 10 and mac only_. If you are using Windows, you can download Bonjour from [here](https://support.apple.com/kb/DL999?locale=en_US). If you are using macOS, Bonjour is already installed.

If you are using windows 11, you should already have mdns features.

You can also get the fully tested Bonjour package from us [here](https://github.com/EyeTrackVR/SolidGUI/GUI/assets/3rdParty) (for Windows only).

## Troubleshooting

### Can not connect to the device

If you can not connect to the device, make sure that the name of the device is correct. If the name of the device is correct, make sure that the device is connected to the network.

If the device is connected to the network, try to restart the device. If the device is still not connected, try to restart the router.
