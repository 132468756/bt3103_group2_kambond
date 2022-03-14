<template>
  <button id="btn" @click="signOut()" v-if="user"> Logout</button>
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
            const user = suth.currentUser;
            signOut(auth, user);
            this.$router.push({name:'Login'});
        }
    }
}
</script>

<style>
#btn{
    text-align: center;
    margin: auto;
    background-color: black;
    color:white;
}

#btn:hover{
    background-color: aliceblue;
    color:black;
    box-shadow: 2px 2px grey;
}
</style>