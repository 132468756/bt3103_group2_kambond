<template>
  <div class="view chat" id="chatBox">
    <header>
      <h1>Welcome, {{ username }}</h1>
    </header>
    
    <section class="chat-box">
      <div 
        v-for="message in this.messages" 
        :key=message.timestamp
        :class="(message.sender == this.userID ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.senderUsername }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="sendMessage">
        <input 
          type="text" 
          v-model="inputMessage" 
          placeholder="Write a message..." />
        <input 
          type="submit" 
          value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import  firebaseApp from "../../firebase.js"
import {getFirestore} from "firebase/firestore"
import { collection, query, where, getDocs, getDoc, doc,setDoc } from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth"
const db = getFirestore(firebaseApp)
export default {
    props:{
        receiver: String,
    },
    
    data(){
        return{
            userID:'',
            username:'',
            messages:[],
            inputMessage:'',
            receiverEmail:'',
        }
    },

    mounted(){
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user){
                this.userID=user.email
            }else{
                this.userID="10086"
            }
            display(this)
        })

        this.receiverEmail = this.receiver

        async function display(self){
            let userInfo = await getDoc(doc(db, "Users", self.userID))
            self.username = userInfo.data().username

            // Get all messages where sender is me and receiver is this user || sender is this user and receiver is me
            //Categorize based on who send the message
            const receiveMsgQuery = query(collection(db, "Messages"), where("sender", "==",  self.receiver), where("receiver", "==" , self.userID));
            const receiveMsgSnapshot = await getDocs(receiveMsgQuery)
            receiveMsgSnapshot.forEach((doc) => {
                console.log("msg: ", doc.data().value)
                self.messages.push(doc.data())
            })

            const sentMsgQuery = query(collection(db, "Messages"), where("receiver", "==",  self.receiver), where("sender", "==" , self.userID));
            const sentMsgSnapshot = await getDocs(sentMsgQuery)
            sentMsgSnapshot.forEach((doc) => {
                console.log("msg: ", doc.data().value)
                self.messages.push(doc.data())
            })
            self.messages.sort(function(a, b){
                a.data().timestamp - b.data().timestamp
            })
        }
    }, 
    methods:{
        sendMessage : async function(){
            console.log(this.receiver)
            // Store new message, key: randomize, sender, receiver, content/value, timestamp, senderUsername
            var sysTime = new Date()
            var timeStamp = sysTime.getTime()
            var msgID = this.userID + timeStamp
            const docData = {
                content: this.inputMessage,
                sender: this.userID,
                senderUsername: this.username,
                receiver: "jiangnuoyi1999@gmail.com",
                timestamp: timeStamp
            }
            await setDoc(doc(db, "Messages", msgID), docData)
            // Reset the inputMessage v-modal
            this.inputMessage=''
            // Call display again
            this.display()
        },

        display: async function(){
            let userInfo = await getDoc(doc(db, "Users", this.userID))
            this.username = userInfo.data().username

            // Get all messages where sender is me and receiver is this user || sender is this user and receiver is me
            //Categorize based on who send the message
            const receiveMsgQuery = query(collection(db, "Messages"), where("sender", "==",  this.receiver), where("receiver", "==" , this.userID));
            const receiveMsgSnapshot = await getDocs(receiveMsgQuery)
            receiveMsgSnapshot.forEach((doc) => {
                console.log("msg: ", doc.data().value)
                this.messages.push(doc.data())
            })

            const sentMsgQuery = query(collection(db, "Messages"), where("receiver", "==",  this.receiver), where("sender", "==" , this.userID));
            const sentMsgSnapshot = await getDocs(sentMsgQuery)
            sentMsgSnapshot.forEach((doc) => {
                console.log("msg: ", doc.data().value)
                this.messages.push(doc.data())
            })
            this.messages.sort(function(a, b){
                a.data().timestamp - b.data().timestamp
            })
        }
    }
}
</script>

<style lang="scss">
#chatBox {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.view {
	display: flex;
	justify-content: center;
	min-height: 100vh;
	background-color: #ea526f;
	
	&.login {
		align-items: center;
		.login-form {
			display: block;
			width: 100%;
			padding: 15px;
			
			.form-inner {
				display: block;
				background-color: #FFF;
				padding: 50px 15px;
				border-radius: 16px;
				box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
				h1 {
					color: #AAA;
					font-size: 28px;
					margin-bottom: 30px;
				}
				label {
					display: block;
					margin-bottom: 5px;
					color: #AAA;
					font-size: 16px;
					transition: 0.4s;
				}
				input[type="text"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px;
					margin-bottom: 15px;
					
					color: #333;
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;
					transition: 0.4s;
					&::placeholder {
						color: #888;
						transition: 0.4s;
					}
				}
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					background-color: #ea526f;
					border-radius: 8px;
					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
				&:focus-within {
					label {
						color: #ea526f;
					}
					input[type="text"] {
						background-color: #FFF;
						box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
						&::placeholder {
							color: #666;
						}
					}
				}
			}
		}
	}
	&.chat {
		flex-direction: column;
		header {
			position: relative;
			display: block;
			width: 100%;
			padding: 50px 30px 10px;
			.logout {
				position: absolute;
				top: 15px;
				right: 15px;
				appearance: none;
				border: none;
				outline: none;
				background: none;
				
				color: #FFF;
				font-size: 18px;
				margin-bottom: 10px;
				text-align: right;
			}
			h1 {
				color: #FFF;
			}
		}
		.chat-box {
			border-radius: 24px 24px 0px 0px;
			background-color: #FFF;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
			flex: 1 1 100%;
			padding: 30px;
			.message {
				display: flex;
				margin-bottom: 15px;
				
				.message-inner {
					.username {
						color: #888;
						font-size: 16px;
						margin-bottom: 5px;
						padding-left: 15px;
						padding-right: 15px;
					}
					.content {
						display: inline-block;
						padding: 10px 20px;
						background-color: #F3F3F3;
						border-radius: 999px;
						color: #333;
						font-size: 18px;
						line-height: 1.2em;
						text-align: left;
					}
				}
				&.current-user {
					margin-top: 30px;
					justify-content: flex-end;
					text-align: right;
					.message-inner {
						max-width: 75%;
						.content {
							color: #FFF;
							font-weight: 600;
							background-color: #ea526f;
						}
					}
				}
			}
		}
		footer {
			position: sticky;
			bottom: 0px;
			background-color: #FFF;
			padding: 30px;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
			form {
				display: flex;
				input[type="text"] {
					flex: 1 1 100%;
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px 0px 0px 8px;
					
					color: #333;
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;
					transition: 0.4s;
					&::placeholder {
						color: #888;
						transition: 0.4s;
					}
				}
				
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					padding: 10px 15px;
					border-radius: 0px 8px 8px 0px;
					background-color: #ea526f;
					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
			}
		}
	}
}
</style>