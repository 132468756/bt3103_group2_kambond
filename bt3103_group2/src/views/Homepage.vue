<template>
  <Navigator/>
  <SearchField/>
  <Contact/>
</template>

<script>
import Navigator from "../components/Home/Navigator.vue"
import SearchField from "../components/Home/SearchField.vue"
import Contact from "../components/Home/Contact.vue"

export default {
  name: "Homepage",
  components: {
    Navigator,
    SearchField,
    Contact
  }
}
</script>

<style>

</style>