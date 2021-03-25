<template>
  <div>{{player.name}}</div>
  <div>{{player.rating.estimate()}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    player: {
      name: String,

    }
  },
  setup(props) {
    
  },
})
</script>

