<template>
    <div id="userInfo">
        <div class="profilePicDiv">
            <img src="@/assets/profilephoto.jpeg" id="profilePic">
        </div>
        <h2 id="username">{{username}}</h2>
        <div class="userInfoDetail">
            <h4 id="Kambond">{{bio}}</h4>
            <h4 id="myCreditPoint">Credbility Point: {{creditPoint}}</h4>
            <h4 id="likes">Likes: {{likes}}</h4>
        </div>
    </div>
</template>

<script>
import { getDoc, doc, getFirestore } from '@firebase/firestore'
import firebaseApp from '../../firebase'

const db = getFirestore(firebaseApp)

export default {
    data(){
        return {
            username:'Username',
            bio:'Bio',
            creditPoint:0,
            likes:0,
            email:''
        }
    },

    props:{
        user:String
    },

    mounted(){
        async function update(self){
            self.email = self.user
            let user_info = await getDoc(doc(db, "Users", self.user))
            self.username = user_info.data().username
            self.bio = user_info.data().bio
            self.likes = user_info.data().likes
            self.creditPoint = user_info.data().creditPoint
        }
        update(this)

        async function display(self){
            let user = await getDoc(doc(db, "Users", self.email))
            self.username = user.data().username
            self.bio = user.data().bio
            self.creditPoint = user.data().creditPoint
            self.likes = user.data().likes
            console.log(self.likes)
        }
        display(this)
    }

}
</script>

<style>
    #username {
    text-align: center;
    color: black;
    }

    #Kambond {
    text-align: center;
    color: rgb(0, 0, 0);
    font-style: italic;
    }

    #myCreditPoint, #likes {
    text-align: center;
    color: rgb(106, 202, 170);
    }

    .profilePicDiv {
    text-align: center;
    }

    #profilePic {
    width: 100px;
    height: 100px;
    }
</style>