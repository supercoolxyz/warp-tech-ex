<template>
  <div class="home">
    <h1>Sprint View</h1>
    <p>This is the sprint view where you can manage your tasks.</p>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { WindowService } from '@/services/WindowService';


@Options({
  components: {
  },
})
export default class SprintView extends Vue {

  mounted() {
  }
}

</script>
