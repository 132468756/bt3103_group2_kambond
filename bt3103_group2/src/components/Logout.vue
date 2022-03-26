<template>
    <br>
    <br>
  <button id="btn" type="button" @click="signOut()" v-if="user">Logout</button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
    name:'Logout',

    data(){
        return{
            user:false,
        }
    },

    mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) =>{
            if (user) {
                this.user = user;
            }
        })
    },

    methods:{
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user);
            this.$router.push({name:'Login'});
        }
    }
}
</script>

<style>
#btn{
    width: 5%;
    height: 5%;
    background-color: rgb(186, 218, 224);
    cursor: pointer;
    border-radius: 5px;
    border: none;
}

#btn:hover{
    background-color: aliceblue;
    color:black;
    box-shadow: 2px 2px grey;
}
</style>