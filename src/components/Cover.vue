<template>
  <div class="cover container box">
    <div>
      <br>
      <br>
      <img src="../../assets/logo1.png" class="image-container">
      <br>
      <br>
      <h1 class="page-header titulo">Hermes Solutions Systems</h1>
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
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  /*background-size: cover;*/
  /*background-attachment: fixed;*/
}

.titulo {
  font-size: 50px;
  opacity: 0.9;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.image-container {
  /*height: 200px;*/
  width: 30%;
  /*margin-left: 200px;*/
  opacity: 0.8;
  display: block;
  margin-left: auto;
  margin-right: auto;
}


</style>
