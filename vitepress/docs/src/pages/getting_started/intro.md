<script setup>
import Alerts from '../../vue/alerts/Alerts.vue'
import ImageCard from '../../vue/images/ImageComponent.vue'
import { alerts } from '../../static/alerts'
import { image_settings } from '../../static/image_settings'
</script>

# EasyNetworkManager {.text-3xl .font-bold .underline .text-[var(--font-accent)]}

<Alerts :options="alerts.user_warning">
    <template v-slot:content>
        <p>
            This project is in active development.
            However, it is working for most users.
        </p>
    </template>
</Alerts>

Open source networking library for Espressif Chip-sets via `TCP` and `UDP` protocols.

Built on-top of [ESPAsyncWebServer](https://github.com/me-no-dev/ESPAsyncWebServer), with logical and efficient abstraction layers for ease of use.

Plug-and-Play C++ API for custom RESTful APIs.

This project supports the following boards:

- ESP8266 (all varieties)
- ESP32 (all varieties)

::: info Note
Full `ESP32C3` support is still in development, please report any bugs in the issues section.
Of note, this has been successfully tested on all boards except for the `ESP32C3`.
This library fully supports `M5Stack` devices.
:::

This library provides an embedded WiFiManager html front-end on a customizable URL endpoint.

::: tip Tip
This feature can be turned off in favour of your own [custom front-end](/library_guide/custom_html_files).
:::

<ImageCard :options="image_settings.wifi_manager"/>

<!-- ![WiFi Manager](/images/wifimanager.png) -->

This library provides numerous key features:

- saving networks to memory
- auto-discovery of saved networks (up to 3 saved wifi networks)
- automatically creating an Access Point if connecting to a wifi network fails
- mDNS support
- Async OTA support
  - OTA endpoint
- Sync OTA support
- customizable REST API
- WebSockets

Want to get started? Check out the [getting started page](/getting_started/things_to_know) and then the [customization guide.](/customization/overview)

## Contact

Please join our discord for updates and any questions. We hope to see you there!

<ImageCard :options="image_settings.discord_content"/>

# Licenses

[![GitHub license](https://img.shields.io/github/license/RedHawk989/EyeTrackVR?style=plastic)](https://github.com/ZanzyTHEbar/EasyNetworkManager/blob/main/LICENSE)

***All software is under the [MIT License](http://opensource.org/licenses/MIT).
All documentation, including this wiki, is under the Creative Commons CC-BY-SA-4.0 license***.
