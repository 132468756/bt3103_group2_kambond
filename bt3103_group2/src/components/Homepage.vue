<template>
  <Navigator/>
  <SearchField/>
  <Contact/>
</template>

<script>
import Navigator from "./Home/Navigator.vue"
import SearchField from "./Home/SearchField.vue"
import Contact from "./Home/Contact.vue"

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