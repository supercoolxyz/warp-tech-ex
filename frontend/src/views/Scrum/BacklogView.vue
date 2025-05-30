<template>
  <div class="home">
    <h1>Backlog View</h1>
    <p>This is the backlog view where you can manage your tasks.</p>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { WindowService } from '@/services/WindowService';


@Options({
  components: {
  },
})
export default class BacklogView extends Vue {
  
  mounted() {
  }
}

</script>
