<script setup>
import Alerts from '../../vue/alerts/Alerts.vue'
import ImageCard from '../../vue/images/ImageComponent.vue'
import { image_settings } from '../../static/image_settings'
import { alerts } from '../../static/alerts'
</script>

# Uploading via OTA

## What is it?

OTA stands for `Over The Air`, and it is a way to update your firmware without having to connect your device to your computer.

### How do I use it?

To use OTA, you need to have working firmware on your ESPs first.

Once you have manually flashed the firmware at least once, you can use an `OTA` environment and the `OTA` class to update your ESPs.

Example of an OTA environment:

```ini
```

Example of minimum code required to update your ESPs:

```cpp
```

To use Asynchronous OTA, you can use the `update` endpoint from the `REST API`.


