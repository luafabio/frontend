<template>
  <div class="cover container box">
    <div>
      <h1 class="page-header titulo">Hermes Solutions Systems</h1>
      <img src="../../assets/logo.png" class="image-container">
    </div>
  </div>
</template>

<script>
export default {
  name: 'cover',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 500px;
}

.titulo {
  font-size: 50px;
  opacity: 0.9;
}

.image-container {
  height: 200px;
  width: 200px;
  margin-left: 200px;
  opacity: 0.8;
  
}
</style>
