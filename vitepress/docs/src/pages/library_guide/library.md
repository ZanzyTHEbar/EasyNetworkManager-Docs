<script setup>
import ImageCard from '../../vue/images/ImageComponent.vue'
import { image_settings } from '../../static/image_settings'
</script>

# Setting up the environment {.text-[var(--font-accent)]}

## Installation

### Platformio (recommended)

You can install this library via the `Platformio Registry` by navigating to the `Libraries` section of `Platformio`.

The library is called `EasyNetworkManager` by `ZanzyTHEbar`.

If you like to install the bleeding edge, you can also use the github repo directly in your `platformio.ini` file.

::: warning
This is optional, and is considered bad practice in production, but is useful to get the newest features. It is recommended to use the `Platformio Registry` instead.
:::

Add the following:

```ini
lib_deps = 
    https://github.com/ZanzyTHEbar/EasyNetworkManager.git
```

### Arduino IDE

To install this library in your Arduino IDE, you must add all dependencies manually (sorry) and then download this repository as a zip file and add it as any other library :smile:.

::: tip Help Wanted
If you wish to make the installation of this library more ergonomic for Arduino IDE users, please make a pull request!
:::

## Dependencies

All dependencies for `platformio` _should_ be installed automatically. If not, please make a new issue and I will fix it.

::: info **Note**:
`ESP8266` support is still in beta, for now you may manually have to install the dependencies listed below.
`ESPAsyncTCP`
You _may_ need to install `ESP8266WiFi` if the compiler complains about it, but you shouldn't need to.
:::

### Dependencies used in this project

- [ESPAsyncWebServer](https://github.com/me-no-dev/ESPAsyncWebServer.git)

`ESP32`

- [AsyncTCP](https://github.com/me-no-dev/AsyncTCP.git)

`ESP8266`

- [ESPAsyncTCP](https://github.com/me-no-dev/ESPAsyncTCP)

## Configuration

::: warning
It is **required** to add a `build flag` to your setup for the code to function properly.
:::

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

::: info **Note**:
This library is still in development, if there are any bugs please report them in the issues section.
:::
