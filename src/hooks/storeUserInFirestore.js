import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export const storeUserInFirestore = async (user, role = "user") => {
  try {
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: user.displayName || user?.email.split("@")[0],
        email: user?.email,
        role: role,
      });
      console.log("User doc created in firestore");
    } else {
      console.log("user doc already exist in firestore");
    }
  } catch (err) {
    console.log(`Error when user data store in firestore: ${err}`);
  }
};
