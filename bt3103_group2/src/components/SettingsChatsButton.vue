<template>
    <div id="Settings">
        <a href="/settings">
            <button class="MyBtn" id="SettingsBtn" onmouseover="cursor:hand">
                <h2 class="InnerText">Settings</h2>
            </button>
        </a>
    </div>
    <br><br>
    <div id="Chats">
        <a href="/chats">
            <button class="MyBtn" id="ChatsBtn">
                <h2 class="InnerText">Chats</h2>
            </button>
        </a>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #SettingsBtn, #ChatsBtn {
        background-color: rgb(255, 231, 188);
    }

    #SettingsBtn:hover, #ChatsBtn:hover {
        box-shadow: 0 0 0 3px lightcoral;
        transition: 0.5s;
    }

    #SettingsBtn:active, #ChatsBtn:active {
        background-color: lightcoral;
    }

    #Settings, #Chats {
        border-radius: 25px;
        text-align: center;
        width: 72.73%;
        height: 100px;
        line-height: 100px;
    }
</style>