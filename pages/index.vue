<template>
  <div class="container">
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  data() {
    return {
    }
  },
  async fetch() {
    await this.fetchDiscList()
  },
  computed: {
    ...mapGetters("music", ["getDiscList", "getIsLoading"]),
  },
  methods: {
    ...mapActions("music", ["fetchDiscList"]),
  }
  
}
</script>

<style lang="postcss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  display: block; 
  padding: 20px 0;
}

.header {
  color: #fff;
  &__userImage {
    margin-right: 10px;
  }
  &__userName {
    font-weight: bold;
  }
}

.a {
  background: aquamarine;
  &__b {
    background: red;
    font-size: 3px;
  }
}
</style>
