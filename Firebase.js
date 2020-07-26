import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLBZFMEeEl3BEY7BYBWRsyjPWuuBJDp1I",
  authDomain: "todoapp-cffb9.firebaseapp.com",
  databaseURL: "https://todoapp-cffb9.firebaseio.com",
  projectId: "todoapp-cffb9",
  storageBucket: "todoapp-cffb9.appspot.com",
  messagingSenderId: "359905780490",
  appId: "1:359905780490:web:181b96839ebf73c75b50f3",
};

class Firebase {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy('name')

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
      let ref = this.ref

      ref.add(list);
  }

  updateList(list) {
      let ref = this.ref

      ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
      return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }

  detach() {
      this.unsubscribe();
  }
}

export default Firebase;
