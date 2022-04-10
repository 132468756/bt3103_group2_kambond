<template>
    <div id="userInfo">
        <div class="profilePicDiv" v-if="this.showIcon">
            <img :src= "url" alt="Preview" id="IconImg"/>
        </div>
        <div v-else class="profilePicDiv">
            <img src="@/assets/profile.png" id="profilePic">
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
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const db = getFirestore(firebaseApp)

export default {
    data(){
        return {
            username:'',
            bio:'',
            creditPoint:'',
            likes:'',
            email:'',
            profileiconURL: '',
            path: '',
            url: ' ',
            showIcon: false
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
            self.profileiconURL = user.data().profileiconURL
            console.log("in meth Self likes = ")
            console.log(self.likes)
        },
        
        async getURL(self){
            setTimeout(() => {
            console.log(self.profileiconURL)
            self.path = self.user
            console.log("getURL triggered")
            console.log(self.path)
            // Get URL for the image inside the storage
            const storage = getStorage();
            const starsRef = ref(storage, 'icons/'+ self.path);
            // const starsRef = ref(storage, 'posts/lrqian2000@gmail.comlalala1649237027381');
            getDownloadURL(starsRef)
            .then((url) => {
            self.url = url
            self.showIcon=true
            })
            }, 500);
        },

        emitInterface() {
            this.$emit("interface", {
                update: () => this.update(this)
            });
            console.log("interface emitted")
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


        this.display(this)

        
        this.getURL(this)

        // async function display(self){
        //     let user = await getDoc(doc(db, "Users", self.user))
        //     self.username = user.data().username
        //     self.bio = user.data().bio
        //     self.creditPoint = user.data().creditPoint
        //     self.likes = user.data().likes
        //     console.log("mounted Self likes = ")
        //     console.log(self.likes)
        // }
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
    color: rgb(82, 165, 136);
    }

    .profilePicDiv {
    text-align: center;
    }

    #profilePic {
    width: 100px;
    height: 100px;
    }

    #IconImg {
    border-radius: 50%; 
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin-top: 20px;

    }


</style>