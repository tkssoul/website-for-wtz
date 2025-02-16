<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="wrapper">
    <div>
      <HelloWorld />
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
  margin: 0 2rem 0 0;
}

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffc0cb;
}
</style>
