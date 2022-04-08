<template>
  <div class = "hello">
    <input type = "file" @change = "onFileselected">
    <button @click = "onUpload">Upload</button>
    </div>   
</template>

<script>
export default {
  name: "avatar" ,
  data() {
    return {
      selectedfile: null
    }
  },
  methods: {
    onFileSelect(event) {
      this.selectedfile = event.target.files[0]
    },
    onUpload() {
      
    }
  }
}
</script>
