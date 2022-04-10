<template>
    <div id="userInfo">
        <div class="profilePicDiv" v-if="this.showIcon">
            <img :src= "url" alt="Preview" id="IconImg"/>
        </div>
        <div v-else class="profilePicDiv">
            <img src="@/assets/profile.png" id="IconImg">
        </div>
        <div class = "chooseicon">
            <input
            type="file"
            accept="image/*"
            id="icon"
            @change="onIconChange"
            />
            <label for="icon"><button id="changeIconImg">Upload Image</button></label>
            <img
                :src="previewicon"
                alt="Preview"
                v-if="previewIcon"
                class="uploading-image"
                />
            <div v-if="this.iconStatus != 'static'"><button class = "changeSettingBtn" id = "confirmChangeIcon" @click ="confirmChangeIcon()">Confirm Change</button></div> 
            <div v-if="this.iconStatus != 'static'"><button class = "cancelSettingBtn" id = "cancelChangeIcon" @click ="cancelChangeIcon()"> Cancel</button></div>
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
import { ref, getStorage, uploadBytes, getDownloadURL} from "firebase/storage"


const db = getFirestore(firebaseApp)
const storage = getStorage();
export default {
    data(){
        return {
            username:'Username',
            bio:'Bio',
            creditPoint:0,
            likes:0,
            email:'',
            profileiconURL:'',
            previewicon: null,
            icon: null,
            iconStatus : "static",
            iconpath: '',
            iconURL: '',
            showIcon: false,
            path: '',
            url: ' ',
        }
    },

    mounted(){
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user){
                this.user = user;
                this.userID = this.user.email;
                display(this, this.userID)
            }else{
                display(this, "10086")
            }
        })

        async function display(self){
            let user = await getDoc(doc(db, "Users", self.userID))
            self.username = user.data().username
            self.bio = user.data().bio
            self.creditPoint = user.data().creditPoint
            self.likes = user.data().likes
            self.profileiconURL = user.data().profileiconURL
            console.log(self.likes)
        }
        display(this)

        async function getURL(self){
            setTimeout(() => {
            console.log(self.profileiconURL)
            self.path = self.userID
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
        }

        getURL(this)

        //function close() {
        //this.$emit('close');
        //console.log(this.userID)
        //console.log(this.userID)
        //this.url=''
        //this.showIcon=false
        //}
    },
    methods: {
        onIconChange(i) {
        // const reader = new FileReader();
        let file = i.target.files[0]; // get the supplied file
        this.icon = file;
        this.previewicon = URL.createObjectURL(file);
        this.iconStatus = "changing";
        },

        async uploadImage(userID) {
        if (this.icon) {
        // var myPostID = this.post.postID
        // var myImgName = myPostID.replace(/./g, "-")
            const path = "icons/"+userID;
            const fileRef = ref(storage, path)
        console.log(fileRef)
        await uploadBytes(fileRef, this.icon)
        .then(() => {console.log("Icon uploaded successfully to Firebase. Path" + path)})
            }
        },
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

    #IconImg {
    border-radius: 50%; 
    overflow: hidden;
    width: 100px;
    height: 100px;
    }

    #icon {
        display: none;
    }

    #changeIconImg {
        background-color: rgb(230, 230, 230);
        border: transparent;
        box-shadow:  0 0 5px rgb(66, 64, 62);
        border-radius: 10px;
        cursor: pointer;
        width: auto;
        height: 4%;
    }

    #changeIconImg:hover {
        transition: 0.3s;
        background-color: rgba(199, 199, 199);
    }

    #changeIconImg:active {
        background-color: rgb(107, 107, 107);
    }
</style>