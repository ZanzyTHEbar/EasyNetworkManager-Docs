<script setup>
import Alerts from '../../vue/alerts/Alerts.vue'
import ImageCard from '../../vue/images/ImageComponent.vue'
import { image_settings } from '../../static/image_settings'
import { alerts } from '../../static/alerts'
</script>

# Using the Library {.text-[var(--font-accent)]}

For basic usage please see the [examples](https://github.com/ZanzyTHEbar/EasyNetworkManager/tree/main/NetworkManager/examples) folder.

To use the provided wifi manager html page you don't need to do anything except for set a `define` before you include the library header (for `pio` users see the [Extras](#extras) section)

## Custom HTML and Frontend files {.text-[var(--font-accent)]}

To use you own frontend files you will need to follow the instructions for your ide. That is beyond the scope of this guide. Please see the documentation for your ide.

::: warning
SPIFFS tools **do not** work yet in the ArduinoIDE 2.0. Support is coming soon.
:::

## Using the WiFi Manager {.text-[var(--font-accent)]}

<ImageCard :options="image_settings.wifi_manager"/>

Replace the placeholder text with your correct SSID (WiFi access point name), and password respectfully.

::: warning
Special characters such as `!` and `@` are not officially supported. If you have a special character in your password or ssid, you will need to change it, or use it at your own risk.

Spaces are not supported either. If you have a space in either, you will need to change it.
:::

<Alerts :options="alerts.parts_list_one">
    <template v-slot:content>
        <p>
           Make sure your wifi router has a 2.4 GHz band. While most do, this is not always the case. Setting each band (5GHz, and 2.4GHz) to different SSIDs is recommended, though not required.
        </p>
    </template>
</Alerts>

Double check that you have correctly entered your WiFi credentials and that said wifi network has a `2.4GHz` band.

## Header Files {.text-[var(--font-accent)]}

The library is split into multiple header files. This is to make it easier to use only the features you need. The header files are as follows:

```cpp
#include <EasyNetworkManager.h> // required

//* Optional headers

// NetworkManager headers
#include <network/mDNS/MDNSManager.hpp>
#include <network/ota/OTA.hpp>
#include <utilities/network_utilities.hpp>  // various network utilities

// Development Utility headers
#include <utilities/api_utilities.hpp>
#include <utilities/enuminheritance.hpp> // used for extending enums with new values
#include <utilities/makeunique.hpp> // used with smart pointers (unique_ptr) to create unique objects
#include <utilities/helpers.hpp> // various helper functions
```

## Classes {.text-[var(--font-accent)]}

The library is split into multiple classes. This is to make it easier to use only the features you need. The classes are as follows:

```cpp
// Required classes

// The Project Config Manager is used to store and retrieve the
// configuration data
// The config manager constructor takes two (optional) parameters:
// 1. The name of the project (used to create the config file name)
// 2. The hostname for your device on the network
// (used for mDNS, OTA, etc.)
// ProjectConfig configManager; // default constructor
ProjectConfig configManager("easynetwork", "MDNS_HOSTNAME");
ConfigHandler configHandler(configManager);

// The WiFi Handler is used to manage the WiFi connection
// The WiFi Handler constructor takes four parameters:
// 1. A pointer to the config manager
// 2. A pointer to the WiFi State Manager
// 3. The SSID of the WiFi network to connect to
// 4. The password of the WiFi network to connect to
WiFiHandler network(configManager, "WIFI_SSID", "WIFI_PASSWORD", 1);

// The API Server is used to create a web server
// that can be used to send commands to the device 
// The API Server constructor takes five parameters:
// 1. The port number to use for the web server
// 2. A pointer to the config manager
// 3. The root path for the API
// 4. The path for the WiFi Manager html page
// 5. The root path for the user commands for the API
APIServer server(80, 
                 configManager, 
                 "/api", 
                 "/wifimanager", 
                 "/mycommands");

// Optional classes

OTA ota(configManager);

// The mDNS Manager is used to create a mDNS service for the device
// The mDNS Manager constructor takes seven parameters:
// 1. A pointer to the mDNS State Manager
// 2. A pointer to the config manager
// 3. The service name
// 4. The service instance name
// 5. The service protocol
// 6. The service description
// 7. The service port

//! service name and service protocol have to be
//! lowercase and begin with an underscore
MDNSHandler mDNS(configManager, 
                 "_easynetwork", 
                 "test", 
                 "_tcp", 
                 "_api_port",
                  "80");
```

### Additional configuration

#### `mDNS`

If you do not wish to manually keep track of the ESPs IP addresses and ports, you can enable the mDNS feature. This will allow you to connect to the ESPs using the following format: `http://<some_name>.local`. This will only work if you are connected to the same network as the ESPs, and if you have enabled mDNS on your computer. If you are using Windows, you can enable mDNS by following [this guide](./mdns).

#### `OTA`

This library supports Asynchronous OTA updates. This means that you can update the firmware without having to connect to the device over Serial. To enable OTA updates you need to use the `OTA` header file. More information can be found [here](/library_guide/ota).

#### `REST API`

The firmware also supports a fully featured and customizable REST API. This means that you can control the ESPs using a REST API with HTTP requests.

This feature is used more for advanced users, and is not required for basic operation.

The REST API can be used by any REST API client, you can not send POST requests to the ESPs using a browser though, so some REST API functionality can only be used by tools like [Thunder Client](https://www.thunderclient.com/) or [Postman](https://www.postman.com/), or programmatically communicating with the API.

The full REST API is documented [here](/library_guide/rest_api).

## Extras

### PlatformIO {.text-[var(--font-accent)]}

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
