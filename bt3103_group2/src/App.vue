<template>
  <Homepage/>
  <borrower/>
</template>

<script>
import Homepage from './components/Homepage.vue'
import Borrow from "./components/Borrow.vue";

export default {
  name: "App",
  components: {
    Homepage,
    Borrow
  }
}
</script>