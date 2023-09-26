<script setup>
import CheckBoxList from '../vue/CheckBoxList.vue'
import { InProgress, Completed, Planned } from '../static/dev_roadmap'
</script>

# EasyNetworkManager Development Road-map {.text-[var(--font-accent)]}

This will contain a list of features that are in progress, completed, and planned.

## Completed

<CheckBoxList
    :options="{...Completed}"
/>

## In Progress

<CheckBoxList
    :options="{...InProgress}"
/>

## Planned

<CheckBoxList
    :options="{...Planned}"
/>
