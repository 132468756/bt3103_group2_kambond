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
          <slot name="header">
            title: {{post.title}}
          </slot>
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
          <slot name="body">
            description: {{post.description}}
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            owner: {{post.userName}}
          </slot>
          <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Close
          </button>
          <button @click = "toBorrow(this)"> Borrow </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import firebaseApp from "../firebase.js";
import {getFirestore} from "firebase/firestore";
import { doc, updateDoc, setDoc, getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"

const db = getFirestore(firebaseApp);
  export default {
    name: 'Modal',
    props:{
      post:Object
      
      },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          }
        })
      },
    methods: {
      close() {
        this.$emit('close');
        },

      addDeal: async function(){
        var a = this.post.postID
        console.log(this.post)
        try{
          const docRef = await setDoc(doc(db, "Deals", a), {
              dealID: a,
              owner: this.post.user
              })
          console.log(docRef);
          }
        catch(error){
          console.error("Error adding document:", error);
          }
        
        try{
          let docRe = await getDoc(doc(db, "Users", this.post.user));
          let deals = []
          if(docRe.data().deals != undefined){
            deals = docRe.data().deals
          }
          console.log(deals)
          deals.push(a)
          console.log(this.post.user)
          const docR = await updateDoc(doc(db, "Users", this.post.user),  {
            deals:deals
            })
          console.log(docR);
          }
        catch(error){
          console.error("Error updating document:", error);
          }
        },

      addRequest: async function(){
        var a = this.post.postID
        console.log(a)
        try{
          let docRef = await getDoc(doc(db, "Users", this.user.email));
          console.log(docRef.data())
          let requests = []
          if (docRef.data().requests!= undefined){
            requests = docRef.data().requests
          }
          requests.push(a)
          console.log(requests)
          const docRe = await updateDoc(doc(db, "Users", this.user.email), {
              requests:requests
              })
          console.log(docRe);
        }
        catch(error){
          console.error("Error updating document:", error);
          }
          },

      toBorrow: async function(self){
            alert("borrowing item " + this.title)
            await self.addRequest();
            await self.addDeal();
            await self.updateStatus();
          },

      updateStatus: async function(){
        try{
          const postDoc = await updateDoc(doc(db, "Posts", this.postID),{
            status: "Requested"
          })
          console.log(postDoc)
        }
        catch(error){
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
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    height:80%;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>