<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <section name="header">
            {{post.title}}
          </section>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>
        <div id="infoContainer">
          <span
            class="modal-body"
            id="modalDescription"
          >
            <span classname="body">
              Purpose: {{post.purpose}}  
            </span>
            <span classname="body">
              Location: {{post.location}} 
            </span>
            <span classname="body">
              Description: {{post.description}}  
            </span>
            <span classname="body">
              Time: {{post.postDate}} 
            </span>
            <span classname="body">
              Catogory: {{post.category}} 
            </span>
          </span>

          <span id="imgContainer" class="modal-body" v-if="this.showPic">
            <!-- <p>{{ post.imagePath}} </p> -->
            <img :src= "url" alt="Preview" id="modalImg"/>
          </span>
        </div>

        <footer class="modal-footer">
          <div name="footer">
            <div class="profilePicDiv">
              <img :src= "url2"  id="IconImg"/>
            </div>
              <router-link to="/myprofile" v-if="post.user == this.userID">{{post.userName}} </router-link>
            <router-link :to = "'/profile/' + post.user " :id = post.user v-else>
              {{post.userName}}
            </router-link>
          </div>
          <div id="buttons">
            <div id="actionBtn" v-if="post.user!=this.userID">
              <div v-if= "post.status == 'Want to borrow'">
                <button @click = "toBorrow(this)"
                class = "borrowButton"> Lend</button>
              </div>
              <div v-else-if = "post.status == 'Want to lend'">
                <button @click = "toBorrow(this)"
                class = "borrowButton"> Borrow </button>
              </div>
              <div v-else>
                <button class = "borrowButton">Unavailable </button>
              </div>
            </div>
            <button
              type="button"
              class="btn-big-close"
              @click="close"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </footer>
      </div>
    </div> <!-- modal-backgrop -->
  </transition>
</template>

<script>
//heiheihei
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, setDoc, getDoc, arrayUnion} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const db = getFirestore(firebaseApp);
// const storage = getStorage();
  export default {
    name: 'Modal',
    data() {
      return {
        userID:"",
        url: '',
        url2: 'https://firebasestorage.googleapis.com/v0/b/kambond-2515f.appspot.com/o/icons%2Fprofile.png?alt=media&token=c79bf3ba-7dae-40d0-b4c2-f80952ef0495',
        path: '',
        showPic: false,
        path2:'',
        postuserID: "",
        };
    },
    props:{
      post:Object,
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.userID = this.user.email;
        }
      });
    },

    methods: {
      async getURL(){
        setTimeout(() => {
          console.log(this.post.imagePath)
          this.path = this.post.postID
          console.log("getURL triggered")
          console.log(this.path)
          // Get URL for the image inside the storage
          const storage = getStorage();
          const starsRef = ref(storage, 'posts/'+ this.path);
          // const starsRef = ref(storage, 'posts/lrqian2000@gmail.comlalala1649237027381');
          getDownloadURL(starsRef)
          .then((url) => {
            this.url = url
            this.showPic=true
          })
        }, 500);
      },
      async getURL2(){
        setTimeout(() => {
          console.log(this.post.usericonURL)
          this.path2 = this.post.user
          console.log("getURL2 triggered")
          console.log(this.path2)
          // Get URL for the image inside the storage
          const storage2 = getStorage();
          const starsRef2 = ref(storage2, 'icons/'+ this.path2);
          // const starsRef = ref(storage, 'posts/lrqian2000@gmail.comlalala1649237027381');
          getDownloadURL(starsRef2)
          .then((url) => {
            this.url2 = url
          })
        }, 500);
      },


      close() {
        this.$emit('close');
        console.log(this.user.email)
        console.log(this.post.email)
      },

      open(){
        this.showPic=false
        this.url=''
        this.url2 = 'https://firebasestorage.googleapis.com/v0/b/kambond-2515f.appspot.com/o/icons%2Fprofile.png?alt=media&token=c79bf3ba-7dae-40d0-b4c2-f80952ef0495'
      },


      addDeal: async function(purpose){
        var a = this.post.postID
        if (purpose == "Borrowing"){
          var lender = this.user.email
          var borrower = this.post.user
        }
        else {
          lender = this.post.user
          borrower = this.user.email
        }
        try{
          const docRef = await setDoc(doc(db, "Deals", a), {
              dealID: a,
              lender: lender,
              borrower: borrower
              })
          console.log(docRef);
          }
        catch(error){
          console.error("Error adding document:", error);
          }
        
        try{
          const docR = await updateDoc(doc(db, "Users", lender),  {
            deals:arrayUnion(a)
            })
          console.log(docR);
          }
        catch(error){
          console.error("Error updating document:", error);
          }
        },
      addRequest: async function(purpose){
        var a = this.post.postID
        console.log(a)
        if (purpose == "Borrowing"){
          var borrower = this.post.user
        }
        else {
          borrower = this.user.email
        }
        try{
          let docRef = await getDoc(doc(db, "Users", borrower));
          console.log(docRef.data())
          let requests = []
          if (docRef.data().requests!= undefined){
            requests = docRef.data().requests
          }
          requests.push(a)
          console.log(requests)
          const docRe = await updateDoc(doc(db, "Users", borrower), {
              requests:requests
              })
          console.log(docRe);
        }catch(error){
          console.error("Error updating document:", error);
          }
        },
      toBorrow: async function(self){
        if(this.post.purpose=="Borrowing"){
          if(confirm("Please confirm that you want to lend this item to this user")){
            await self.addRequest(this.post.purpose);
            await self.addDeal(this.post.purpose);
            await self.updateStatus();
            this.$router.push({name: 'sideBar', query: {q:"showDeal"}});
            this.close();
          }
        }else{
          if(confirm("Please confirm that you want to borrow this item from this user")){
            await self.addRequest(this.post.purpose);
            await self.addDeal(this.post.purpose);
            await self.updateStatus();
            this.$router.push({name: 'sideBar', query: {q:"showRequest"}});
            this.close();
          }
        }
      },
      updateStatus: async function(){
        try{
          const postDoc = await updateDoc(doc(db, "Posts", this.post.postID),{
            status: "Requested"
          })
          console.log(postDoc)
        }catch(error){
          console.error("Error updating document:", error);
          }
        },
      },
}
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content:center;
    align-items:center;
    /* The image used */
    background-image: url("~@/assets/modal-bg3.jpg");
    /* Control the height of the image */
    min-height: 100%;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size:cover;
  }
  .modal {
    background-color: rgba(233,233,233,0.8);
    border-radius: 10px;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    height:90%;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  .modal-header{
    padding: 15px;
    display: flex;
    height: 10%;
    margin-top: 0;
    font-size: 7vh;
    font-weight: bold;
    /* text-decoration-line: overline underline;
    text-decoration-style: solid; */
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: rgb(17, 46, 90);
    text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
    justify-content: space-between;
    /* The image used */
    background-image: url("~@/assets/watercolor-pink.jpg");
    /* Control the height of the image */
    min-height: 10%;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size:cover;
  }
  .modal-footer {
    padding: 15px;
    display: flex;
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    font-size:3vh;
    align-content: center;
  }
  .modal-body {
    position: relative;
    padding: 20px 10px 20px 100px;
    display:flex;
    flex-direction: column;
    font-size:3vh;
    text-align: left;
    height: 40vh;
    width: 40%;
  }
  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 25px;
    margin-top: 2px;
    margin-right: 5px;
    cursor: pointer;
    font-weight: bold;
    color: rgba(17, 46, 90, 0.719);
    background: transparent;
  }
  .btn-close:hover{
    color:rgb(17, 46, 90);
    transition: 0.5s;
  }
  #buttons{
    margin-top:2%;
  }
  .borrowButton{
    color: white;
    background:#e6709d; 
    border:0px;
    border-radius: 2px;
    height: 30px;
    width: 15vw;
    margin: auto;
  }
  .borrowButton:hover{
    background:#df1e68;
    transition:1s;
    cursor: pointer;
  }
  
  .btn-big-close {
    border:0px;
    border-radius: 2px;
    height: 30px;
    width: 15vw;
    margin: auto;
    background:#ffbfd8; 
  }
  .btn-big-close:hover{
    background: rgba(255, 167, 202, 0.925);
    transition: 1s;
    cursor: pointer;
  }
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
  #picprofile {
  width: 4vw;
  height: 4vw;
}
#modalImg {
  width: 30vw;
  height: 35vh;
}

#imgContainer {
  text-align: center;
  width: 40%;
  height: 40vh;
}

#modalDescription {
  display: flex;
  width: 30%;
}

#infoContainer {
  text-align: center;
  display: flex;
  flex-direction: row;
}

.modal::-webkit-scrollbar {
  display: none;
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
</style>