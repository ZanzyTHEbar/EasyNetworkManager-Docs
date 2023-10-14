# REST API {.text-[var(--font-accent)]}

## What is it?

A RESTful API is a way to communicate with the Asynchronous Server hosted on an ESP device using HTTP requests. This is useful if you want to control the device from a remote location or make custom JS code to control or pass data bi-directionally with the device from a WebUI.

The [`APIServer`](https://github.com/ZanzyTHEbar/EasyNetworkManager/blob/c829234c6ce3d47fc25bfa857a0f19f8950e6748/NetworkManager/include/api/rest_api_handler.hpp#L6) class is used to create the REST API and handle the asynchronous webserver requests. The `APIServer` class is used in conjunction with the `BaseAPI` class to create and handle the REST API.

## How to use it

### REST API Client

Any REST API client can be used to communicate with the ESP devices. We recommend using [Thunder Client](https://www.thunderclient.com/) to test the REST API, as it's free and is a vscode extension.

For basic `GET` requests, you can use your browser of choice.

### Standard

The REST API follows the following standard:

```txt
http://{device_name|ip}.local:{device_port}/{custom_api_endpoint}/{builtin|custom_command_endpoint}/command/{command_name}?{param}={value}&{param}={value}
```

> For example, if the name of the device is `esp32` and the `APIServer` class was instantiated with `81` as the port number, you can connect to the device using: `http://esp32.local:81/api/builtin/command/getStoredConfig`.
> This will return the current config of the device in JSON format.

### Endpoints

#### Builtin

This library comes equipped with a set of builtin endpoints that can be used to control the device. You can also create your own custom endpoints at anytime.

::: info Note
Any endpoint marked with `**` is currently not implemented, and will be implemented in the future.

If you would like to help us implement these endpoints, please contact us.

We are also open to suggestions for new endpoints.
:::

::: info Note
Any endpoint that makes changes to the config will require a call to `/save` to write the changes to the flash.

This is to prevent the flash from being written to too often, which can cause the flash to wear out.

The device will write the changes to the flash and then restart itself after a call to `/save`.
:::

The REST API has the following endpoints:

|     Endpoint     | Method |                       Description                       |
| :--------------: | :----: | :-----------------------------------------------------: |
|      /ping       |  GET   |            Returns the status of the device.            |
|      /save       |  GET   |            Writes any changes to the flash.             |
|  /restartDevice  |  GET   |                Restarts the ESP itself.                 |
|   /resetConfig   |  GET   |       Clears the current config in memory and RAM       |
| /getStoredConfig |  GET   | Returns a _JSON_ object of the devices current config.  |
|   /setTxPower    |  POST  |         Sets the Transmission Power of the ESPs         |
|    /setDevice    |  POST  |           Sets the `OTA` and `mDNS` settings            |
|      /wifi       |  POST  | Adds a new wifi network, or writes over an existing one |
|      /wifi       | DELETE |                 Deletes a wifi network                  |

::: info Note
`/wifi` uses the `POST` method to add a new wifi network, and the `DELETE` method to delete a wifi network.
:::

### Params

The REST API has the following params:

::: danger Feature not a bug
All params for a given URL are required, even if you are not changing that params value.

If you do not supply a param, that param will be set to default settings.
:::

URL params are passed in the URL as a query string, using the following format:

`http://<device_name>.local:81/control/builtin/command/<endpoint>?<param>=<value>&<param>=<value>`

##### /wifi

::: info Note
We allow you to store up to 3 wifi networks in memory. If you try to add more than 3, the oldest network will be overwritten.
:::

|     Param     |                                    Description                                     |
| :-----------: | :--------------------------------------------------------------------------------: |
|    `ssid`     |                              The ssid of the network.                              |
|  `password`   |                            The password of the network.                            |
| `networkName` |         The unique name (given by you) to refer to that network in memory.         |
|   `channel`   | The channel for the wifi network to broadcast on <br /> only `1 - 14` are allowed. |
|    `power`    |             The Transmission power of the ESP for that network config.             |
|    `adhoc`    |                         Whether to enable AP mode or not.                          |

::: info Note - Transmission Power
You must follow the following format for the `power` param:

Using the provided enum, you pass the _number_ to the right of the `=` sign that corresponds with the power in `dBm` that you wish to use.

```cpp
typedef enum {
    WIFI_POWER_19_5dBm = 78,// 19.5dBm
    WIFI_POWER_19dBm = 76,// 19dBm
    WIFI_POWER_18_5dBm = 74,// 18.5dBm
    WIFI_POWER_17dBm = 68,// 17dBm
    WIFI_POWER_15dBm = 60,// 15dBm
    WIFI_POWER_13dBm = 52,// 13dBm
    WIFI_POWER_11dBm = 44,// 11dBm
    WIFI_POWER_8_5dBm = 34,// 8.5dBm
    WIFI_POWER_7dBm = 28,// 7dBm
    WIFI_POWER_5dBm = 20,// 5dBm
    WIFI_POWER_2dBm = 8,// 2dBm
    WIFI_POWER_MINUS_1dBm = -4// -1dBm
} wifi_power_t;
```

###### Example Post Request

```txt
http://esp32.local:81/api/builtin/command/wifi?ssid=Test&password=Test&networkName=Test_1&channel=1&power=76&adhoc=0
```

:::

##### /setDevice

|      Param      |                                                                         Description                                                                          |
| :-------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   `hostname`    |                                                  The hostname for the ESP <br /> used by `OTA` and `mDNS`.                                                   |
|    `service`    | The service to look for when scanning `mDNS` devices on the network <br /> this should be set to `openiristracker` in order to look for `EyeTrackVR` devices |
| `ota_password`  |                                                             The password for the `OTA` service.                                                              |
|   `ota_port`    |                                                               The port for the `OTA` service.                                                                |
| `firmware_name` |                                         The name of the binary file for `OTA` <br /> deprecated and will be removed                                          |

##### /setTxPower

::: info Note
You must follow the following format for the `txPower` param:

Using the following enum, you pass the _number_ to the right of the `=` sign.

```cpp
typedef enum {
    WIFI_POWER_19_5dBm = 78,// 19.5dBm
    WIFI_POWER_19dBm = 76,// 19dBm
    WIFI_POWER_18_5dBm = 74,// 18.5dBm
    WIFI_POWER_17dBm = 68,// 17dBm
    WIFI_POWER_15dBm = 60,// 15dBm
    WIFI_POWER_13dBm = 52,// 13dBm
    WIFI_POWER_11dBm = 44,// 11dBm
    WIFI_POWER_8_5dBm = 34,// 8.5dBm
    WIFI_POWER_7dBm = 28,// 7dBm
    WIFI_POWER_5dBm = 20,// 5dBm
    WIFI_POWER_2dBm = 8,// 2dBm
    WIFI_POWER_MINUS_1dBm = -4// -1dBm
} wifi_power_t;
```

###### Example Post Request

```txt
http://esp32.local:81/api/builtin/command/setTxPower?txPower=76
```

:::

|   Param   |                       Description                        |
| :-------: | :------------------------------------------------------: |
| `txPower` | The power level to set. Must be in format `wifi_power_t` |

#### Custom Endpoints

You can create your own custom endpoints at any time. To do so, you can use the `APIServer::addAPICommand()` method.

##### Examples

The `APIServer::addAPICommand()` method uses `std::function` to create a new endpoint. You can use a lambda function or a function pointer to create a new endpoint. As well as methods from a class.

**Bare Function:**

```cpp

void printHelloWorld(AsyncWebServerRequest* request) {
    Serial.println("Hello World!");
    request->send(200, "text/plain", "Hello World!");
}
// Create a new API command
server.addAPICommand("hello", printHelloWorld);
```

**Lambda:**

```cpp
// Create a new API command
server.addAPICommand("test", [](AsyncWebServerRequest *request) {
    // Get the params from the request
    String param = request->getParam("param")->value();
    // Send the response
    request->send(200, "text/plain", "Hello, World!");
});
```

**Class:**

```cpp
class Test {
public:
    void printHelloWorld(AsyncWebServerRequest* request) {
        Serial.println("Hello World!");
        request->send(200, "text/plain", "Hello World!");
    }
};

Test test;

// Create a new API command
server.addAPICommand("hello", std::bind(&Test::printHelloWorld, &test, std::placeholders::_1));
```

or

```cpp
class Test {
public:
    void printHelloWorld(AsyncWebServerRequest* request) {
        Serial.println("Hello World!");
        request->send(200, "text/plain", "Hello World!");
    }
};

Test test;

// Create a new API command
server.addAPICommand("hello", [&](AsyncWebServerRequest* request){
    test.printHelloWorld(request);
});
```

The RESTful api supports adding new root endpoints as well.

What does this mean? It means that you can create a new root endpoint, and add new endpoints to that root endpoint.

As such:

```txt
http://{device_name|ip}.local:{device_port}/{custom_api_endpoint}/{custom_command_endpoint}/command/{command_name}?{param}={value}&{param}={value}
```

Example:

```txt
http://esp32.local/api/test/command/helloWorld
```

To do so, you can use the following logic:

You have access to the `BaseAPI::route_t` interface, which is used to store the routes and their corresponding handlers.

```cpp
/* Route Command types */
using BaseAPI::route_method = void (BaseAPI::*)(AsyncWebServerRequest*);
typedef std::unordered_map<std::string, route_method> BaseAPI::route_t;
```

First inherit from the `BaseAPI` class to create a new root REST API object and add it to the `routes_map`.

Then take in a reference to the `APIServer`, which will give you access to the `addRouteMap` method of the API.

```cpp
 void addRouteMap(const std::string& index, route_t route);
```

```cpp
class Test: public BaseAPI {

    APIServer& server;

public:
    Test(APIServer& server): 
                BaseAPI(), 
                server(server) {}

    void begin() {
        // Create a new API command map
        route_t test_routes;

        // Reserve space for a select number of routes
        test_routes.reserve(2);

        // The new command endpoint and the method to call
        test_routes.emplace("helloWorld", &Test::printHelloWorld);
        test_routes.emplace("goodbyeWorld", &Test::printGoodbyeWorld);
        // Add the routes to the map (the new root endpoint)
        server.addRouteMap("test", test_routes);
    }

    void printHelloWorld(AsyncWebServerRequest* request) {
        Serial.println("Hello World!");
        request->send(200, "text/plain", "Hello World!");
    }

    void printGoodbyeWorld(AsyncWebServerRequest* request) {
        Serial.println("Goodbye World!");
        request->send(200, "text/plain", "Goodbye World!");
    }
};

APIServer server(80, 
                 configManager, 
                 "/api", 
                 "/wifimanager", 
                 "/mycommands");

Test test(server);

void setup() {

    // ..

    // Start the server as normal
    server.begin();
    // Then start the custom API object and inject the new routes
    test.begin();

    // ..
}
```

Now you can access the new endpoints using the following format:

```txt
http://esp32.local/api/test/command/helloWorld
http://esp32.local/api/test/command/goodbyeWorld
```
