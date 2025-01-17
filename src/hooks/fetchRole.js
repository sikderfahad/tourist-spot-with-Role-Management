import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

// Fetch user role from Firestore
export const fetchUserRole = async (uid) => {
  if (!uid) {
    // console.log(`User uid not found`);
    return;
  }
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().role; // Return role if exists
  } else {
    console.error("No such document!");
    return;
  }
};
