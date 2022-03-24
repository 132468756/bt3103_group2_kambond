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
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { getDoc, doc, getFirestore } from '@firebase/firestore'
import firebaseApp from '../../firebase'

const db = getFirestore(firebaseApp)

export default {
    data(){
        return {
            username:'',
            bio:'',
            creditPoint:'',
            likes:''
        }
    },

    mounted(){
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user){
                display(this, user.email)
            }else{
                display(this, "10086")
            }
        })

        async function display(self, userID){
            let user = await getDoc(doc(db, "Users", userID))

            self.username = user.data().username
            self.bio = user.data().bio
            self.creditPoint = user.data().creditPoint
            self.likes = user.data().likes()
        }
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