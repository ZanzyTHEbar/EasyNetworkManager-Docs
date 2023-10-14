<!-- <script setup>
import Alerts from '../../vue/alerts/Alerts.vue'
import ImageCard from '../../vue/images/ImageComponent.vue'
import { image_settings } from '../../static/image_settings'
import { alerts } from '../../static/alerts'
</script> -->

# Custom HTML and Frontend files {.text-[var(--font-accent)]}

To use your own frontend files you will need to follow the instructions for your ide. That is beyond the scope of this guide. Please see the documentation for your ide.

::: warning
SPIFFS  and littleFS tools **do not** work yet in the ArduinoIDE 2.0. Support is coming soon. You can track this in [this issue](https://github.com/arduino/arduino-ide/pull/2110).
:::

## Using the API

The API is very simple. You can use the following functions to set the custom files:

::: info **Note**:
The `AsyncServer_t` is used to create an Asynchronous web server on the device. This is used to generate the WiFi Manager page, and to serve the custom files.

You can have multiple `AsyncServer_t` objects, each with it's own port and endpoints but you can only have one `APIServer` object per `AsyncServer_t`. The `APIServer` object is used to create the API endpoints, and to handle the API requests for the `AsyncServer_t` object.

The `AsyncServer_t` constructor takes five parameters:

1. The port number to use for the web server
2. A pointer to the [config manager](/library_guide/configure_library)
3. The root path for the API, this will be your custom API endpoint.
4. The path for the WiFi Manager html page, this is not appended to the api path, and is instead used as a root path to generate the WiFi Manager page.
5. The root path for _custom commands_ for the API, this _**is**_ appended to the api path, and is the root path for your custom [RESTful API](/library_guide/rest_api).
:::

The `AsyncServer_t::custom_html_files` is a `std::vector` of `UserRoutes_t`s. The `UserRoutes_t` is a `struct` that contains the following:

```cpp
struct UserRoutes_t {
        // create a constructor to initialize the variables
        UserRoutes_t(const std::string& endpoint, const std::string& file,
                     const std::string& method)
            : endpoint(std::move(endpoint)),
              file(std::move(file)),
              method(std::move(method)) {}
        std::string endpoint;
        std::string file;
        std::string method;
    };
```

Example of using the API:

```cpp
AsyncServer_t async_server(80, configHandler.config, "/api", "/wifimanager",
                           "/mycommands");

APIServer server(configHandler.config, async_server);

// ...

// Set the custom files
// The first parameter is the url endpoint to access the file
// The second parameter is the path to the file in SPIFFS/LittleFS
// The third parameter is the HTTP method to use to access the file
async_server.custom_html_files.emplace_back("/hello", "/helloWorld.html", "GET");
async_server.custom_html_files.emplace_back("/goodbye", "/goodbye.html", "POST");

// ...
```

To add custom backend logic to your custom frontend files, you can use the [REST API](/library_guide/rest_api).

Example:

```cpp
void printHelloWorld(AsyncWebServerRequest* request) {
    Serial.println("Hello World!");
    request->send(200, "text/plain", "Hello World!");
}

void setup() {
    // ...
    // Add the command to the API
server.addAPICommand("helloWorld", printHelloWorld);
    // ...
}
```

Now you can call the `printHelloWorld` function from `/hello` whenever you access this endpoint, or from your other custom frontend files.

```html
// helloWorld.html
<script>
fetch("/api/helloWorld")
    .then((response) => response.text())
    .then((data) => console.log(data));
</script>
```

Allowing you to easily build robust custom web interfaces for your ESPs, with ease.
