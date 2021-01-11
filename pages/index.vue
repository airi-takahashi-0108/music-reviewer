<template>
  <div class="container">

    <pre>{{disc}}</pre>
  
  </div>
</template>

<script>
import axios from 'axios'


export default {
  data() {
    return {
      disc: []
    }
  },
  mounted() {
     axios.get('/musics')
    .then(response =>  { 
      console.log(response)
      this.disc = response
      })


  },
  computed: {
  }
}
</script>

<style lang="postcss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
