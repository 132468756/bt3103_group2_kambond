<template>
  <p id="statusbar">status:{{ status }}</p>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      status: "want to borrow",
    };
  },
};
</script>

<style>
#statusbar {
  background-color: rgb(228, 140, 9);
  text-align: center;
  border: 10px;
  border-radius: 10px;
  width:20px;
  height:10px;
}
</style>