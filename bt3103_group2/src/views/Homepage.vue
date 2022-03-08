<template>
  <SearchField/>
  <Contact/>
</template>

<script>
import SearchField from "../components/Home/SearchField.vue"
import Contact from "../components/Home/Contact.vue"

export default {
  name: "Homepage",
  components: {
    SearchField,
    Contact
  }
}
</script>

<style>

</style>