# EasyNetworkManager Library

This is an in-progress library for easy network management.

This project supports the following boards:

- ESP8266
- ESP32
  
> **Note**: Full ESP32C3 support is still in development, please report any bugs in the issues section.
> Of note, this has been successfully tested on all boards except for the ESP32C3.
> This library fully supports M5Stack devices.

This library provides a WiFi Manager front-end on a customizable URL endpoint using a provided HTML file.

![WiFi Manager](/assets/images/wifimanager.png)

It also provides numerous key features such as:

- auto-discovery of saved networks
- saving networks to memory
- automatically creating an Access Point if connecting to a wifi network fails
- mDNS
- OTA
- customizable REST API
- WebSockets

And much more :smile: See the classes below.

This library implements the following classes:

- APIServer - A server that can be used to manage asynchronous REST API methods.
  - has a `handleJSON` method for handling `POST` and `GET` requests. Can send and receive JSON.
  
 > **Note**: `POST` requests for `JSON` are still in development.

- WiFiHandler - A class that can be used to manage WiFi connections.
- OTA - A basic OTA handler.
- MDNSHandler - A class that can be used to manage mDNS services.
- Config - A class that can be used to manage configuration files.
- StateManager - A class that can be used to manage the state of your project (very easy to extend).
- Utilities - A folder that has various template files that can be used to manage various utilities.

## Installation

#### Platformio (recommended)

You can install via the `Platformio Registry` by navigating to the `Libraries` section of `Platformio`.
The library is called `EasyNetworkManager` by `ZanzyTHEbar`.

if you like to install the bleeding edge, in your `platformio.ini` file add the following:

```ini
lib_deps = 
    https://github.com/ZanzyTHEbar/EasyNetworkManager.git
```

#### Arduino IDE

To install this library in your Arduino IDE, you must add all dependencies (sorry) and then download this repository as a zip file and it as any other library :smile:.

## Dependencies

All dependencies _should_ be installed automatically. If not, please make a new issue and I will fix it.

> **Note**: `ESP8266` support is still in beta, for now you manually have to install the dependencies listed below.
> `ESPAsyncTCP`
> You _may_ need to install `ESP8266WiFi` if the compiler complains about it, but you shouldn't need to.

#### Dependencies used in this project

- [ESPAsyncWebServer](https://github.com/me-no-dev/ESPAsyncWebServer.git)

`ESP32`

- [AsyncTCP](https://github.com/me-no-dev/AsyncTCP.git)

`ESP8266`

- [ESPAsyncTCP](https://github.com/me-no-dev/ESPAsyncTCP)

## Usage

For basic usage please see the [examples](/NetworkManager/examples) folder.

To use the provided [wifi manager html](/NetworkManager/ui/wifimanager.html) page you don't need to do anything except for set a `define` before you include the library header (for `pio` users see the [Extras](#extras) section)

Then, build and flash the SPIFFS image as normal.

For the ArduinoIDE you will need to follow a tutorial on `SPIFFS` and flash the provided html file using `SPIFFS`.

> **Warning**: SPIFFS tools **do not** work yet in the ArduinoIDE 2.0. Support is coming soon.

## Configuration

> **Warning**: It is **required** to add a build flag to your setup for the code to function properly.

For `platformio`

```ini
build_flags = 
  -DASYNCWEBSERVER_REGEX ; add regex support to AsyncWebServer
```

Optionally you can enable the wifi manager here as well:

```ini
build_flags = 
  -DASYNCWEBSERVER_REGEX ; add regex support to AsyncWebServer
  -DUSE_WEBMANAGER ; enable wifimanager
```

For `ArduinoIDE`:

Create, if missing, or update the `platform.local.txt` file.

The paths are:

> Windows

```bash
Windows: C:\Users\(username)\AppData\Local\Arduino15\packages\espxxxx\hardware\espxxxx\{version}\platform.local.txt
```

> Linux

```bash
Linux: ~/.arduino15/packages/espxxxx/hardware/espxxxx/{version}/platform.local.txt
```

The text to add is:

```txt
compiler.cpp.extra_flags=-DASYNCWEBSERVER_REGEX=1
```

Optionally you can enable the wifi manager here as well:

```txt
compiler.cpp.extra_flags=-DASYNCWEBSERVER_REGEX=1 -DUSE_WEBMANAGER=1
```

> **Note**: This library is still in development, if there are any bugs please report them in the issues section.

## Modification

This library is intended to be modified and extended. If you find any bugs, please make a new issue and I will fix it.

If you have any questions, please ask in the [discussions](https://github.com/ZanzyTHEbar/EasyNetworkManager/discussions).

To extend any of the enums please use the `data/utilities/enuminheritance.hpp` file.

To extend any of the config sections, simply create a namespace with the same name as the config struct is in and add your own `struct` to it.

```cpp
namespace Project_Config {
    struct NewConfig_t {
        std::string newConfig;
        int newint;
        bool newbool;
    };
}

Project_Config::NewConfig_t newConfig; // this creates a new object of your config struct.
```

## Extras

To see any of the `log` statements - you need to add this to your `platformio.ini`:

```ini
build_flags = 
  -DASYNCWEBSERVER_REGEX # add regex support to AsyncWebServer
  -DUSE_WEBMANAGER # enable wifimanager
  -DCORE_DEBUG_LEVEL=4 # add debug logging in serial monitor

; other build parameters
monitor_filters = 
 esp32_exception_decoder
build_type = debug
lib_ldf_mode = deep+
```

If you want to build in debug mode add this (it's not a build flag):

```ini
build_type = debug
```

## License

This library is licensed under the MIT License.
