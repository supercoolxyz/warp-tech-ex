<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { WindowService } from '@/services/WindowService';


@Options({
  components: {
  },
})
export default class AboutView extends Vue {
  
  mounted() {
  }
}

</script>