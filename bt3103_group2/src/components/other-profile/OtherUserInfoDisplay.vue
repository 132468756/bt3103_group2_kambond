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
            username:'',
            bio:'',
            creditPoint:'',
            likes:'',
            email:''
        }
    },

    props:{
        user:String,
    },

    methods:{
        async update(self){
            self.email = self.user
            let user_info = await getDoc(doc(db, "Users", self.user))
            self.username = user_info.data().username
            self.bio = user_info.data().bio
            self.likes = user_info.data().likes
            self.creditPoint = user_info.data().creditPoint
        },

        async display(self){
            let user = await getDoc(doc(db, "Users", self.user))
            self.username = user.data().username
            self.bio = user.data().bio
            self.creditPoint = user.data().creditPoint
            self.likes = user.data().likes
            console.log("in meth Self likes = ")
            console.log(self.likes)
        },

        emitInterface() {
            this.$emit("interface", {
                update: () => this.update(this)
            });
        }
    },

    mounted(){
        this.emitInterface();
        // async function update(self){
        //     self.email = self.user
        //     let user_info = await getDoc(doc(db, "Users", self.user))
        //     self.username = user_info.data().username
        //     self.bio = user_info.data().bio
        //     self.likes = user_info.data().likes
        //     self.creditPoint = user_info.data().creditPoint
        // }

        this.update(this)

        // async function display(self){
        //     let user = await getDoc(doc(db, "Users", self.user))
        //     self.username = user.data().username
        //     self.bio = user.data().bio
        //     self.creditPoint = user.data().creditPoint
        //     self.likes = user.data().likes
        //     console.log("mounted Self likes = ")
        //     console.log(self.likes)
        // }
        this.display(this)
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