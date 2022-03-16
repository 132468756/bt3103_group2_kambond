<template>
    <button id="changeSettingBtn">
        change
    </button>
</template>

<script>
export default {

}
</script>

<style>
#changeSettingBtn {
    border-radius: 12px;
    width: 80%;
    height: 40px;
    background-color: transparent;
    border: transparent;
    cursor: pointer;
    color: blue;
}

#changeSettingBtn:hover {
    font-weight: bold;
    background-color: rgb(15, 252, 220);
    transition: 0.5s;
}

#changeSettingBtn:active {
    background-color: rgb(15, 179, 157);
}
</style>