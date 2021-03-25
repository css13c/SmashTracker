<template>
  <div class="home">
    <PlayerInfo/>
  </div>
</template>

<script lang="ts">
import PlayerInfo from "@/components/PlayerInfo.vue";
import { defineComponent } from "node_modules/vue/dist/vue";

export default defineComponent({
  components: { PlayerInfo },
});
</script>
