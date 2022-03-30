<template>
    <button class="changeSettingBtn">
        change
    </button>
</template>

<script>
export default {
    name:"changeSettingButton"
}
</script>

<style>
.changeSettingBtn {
    border-radius: 12px;
    width: 80%;
    height: 40px;
    background-color: transparent;
    border: transparent;
    cursor: pointer;
    color: rgb(0, 102, 255);
}

.changeSettingBtn:hover {
    font-weight: bold;
    background-color: rgba(80, 218, 199, 0.7);
    transition: 0.5s;
}

.changeSettingBtn:active {
    background-color: rgba(15, 179, 157, 0.7);
}
</style>