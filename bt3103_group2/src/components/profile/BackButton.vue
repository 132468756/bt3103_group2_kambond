<template>
    <!-- This is sample for the Back button -->
    <div id="Back">
        <input type="button" id="BackBtn" value="Back" onclick="window.history.back()">
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #BackBtn {
        width: 60px;
        height: 30px;
        background-color: rgb(0, 0, 0);
        color: white;
        cursor: pointer;
        border-radius: 12px;
        border: none;
        margin-left: 10%;
    }
</style>