import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../configs/firebase";

export const getUserByUsername = async (userName: string) => {
  try {
    const q = query(collection(db, "users"), where("userName", "==", userName));
    const userDocs = await getDocs(q);
    const user = userDocs.docs.map((u) => ({ ...u.data() }));
    return user[0];
  } catch (error: any) {
    return error;
  }
};

export const getOtherUsers = async (uid: string) => {
  try {
    const q = query(collection(db, "users"), where("uid", "!=", uid));
    const userDocs = await getDocs(q);
    const otherUsers = userDocs.docs.map((u) => ({ ...u.data() }));
    return otherUsers;
  } catch (error: any) {
    return error;
  }
};
