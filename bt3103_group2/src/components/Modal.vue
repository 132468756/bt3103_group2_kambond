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

        <section
          class="modal-body"
          id="modalDescription"
        >
          <div classname="body">
            Purpose: {{post.purpose}}  
          </div>
          <div classname="body">
            Location: {{post.location}} 
          </div>
          <div classname="body">
            Description: {{post.description}}  
          </div>
          <div classname="body">
            Time: {{post.postDate}} 
          </div>
          <div classname="body">
            Catogory: {{post.category}} 
          </div>
          <div classname="body">
            <p>{{ post.imageURL}} </p>
            <img :src= "url" alt="Preview" />
          </div>

          
          

        </section>

        <footer class="modal-footer">
          <div name="footer">
            <img src="@/assets/profilephoto.jpeg" alt="cannotfind" id = "picprofile"/>
            <!-- <router-link :to= "{name:'Profile', params:{id: post.user}}"> -->
            <router-link :to = "'/profile/' + post.user " :id = post.user>
              {{post.userName}}
            </router-link>
          </div>
            <!-- <div id="buttons">
            <div v-if= "userID == post.user">
              <button
              class = "borrowButton"> Unavailable</button>
            </div>
            <div v-else-if = "post.status == 'Want to borrow'">
              <button @click = "toBorrow(this)"
              class = "borrowButton"> Lend </button>
            </div> -->

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
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, setDoc, getDoc, arrayUnion} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
// const storage = getStorage();

  export default {
    name: 'Modal',
    data() {
      return {
        userID :"",
        };
    },
    props:{
      post:Object
      },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          }
        });
      },
    methods: {
      close() {
        this.$emit('close');
        console.log(this.user.email)
        console.log(this.post.email)
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
            this.close();
          }
        }else{
          if(confirm("Please confirm that you want to borrow this item from this user")){
            await self.addRequest(this.post.purpose);
            await self.addDeal(this.post.purpose);
            await self.updateStatus();
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
    height:80%;
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
    overflow-y: scroll;
    height: 40vh;
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
    margin-left:4vw;
  }

  .borrowButton{
    color: white;
    background:#e6709d; 
    border:0px;
    border-radius: 2px;
    height: 30px;
    width: 30vw;
    margin: auto;
  }

  .borrowButton:hover{
    background:#df1e68;
    transition:1s;
  }
  
  .btn-big-close {
    border:0px;
    border-radius: 2px;
    height: 30px;
    width: 30vw;
    margin: auto;
  }

  .btn-big-close:hover{
    background: rgba(233, 184, 204, 0.671);
    transition: 1s;
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
</style>
