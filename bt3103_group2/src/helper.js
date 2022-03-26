import { getDatabase, ref, set } from "firebase/database";


export function saveUser(user) {
  const db = getDatabase();
  const userId = user.uid;
  const name = user.displayName;
  const email = user.email;
// const name = "Leyuan";
// const email = "user.email";
  const imageUrl = user.photoURL;
  set(ref(db, 'chatrooms/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl,
    meetingrooms:'',
  })
  .then(
    console.log("create user in real time firebase successfully!")
  );
}
