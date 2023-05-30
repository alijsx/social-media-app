import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  auth,
  db,
  googleAuthProvider,
  storage,
} from "../../../configs/firebase";
import { Toast } from "../../../components";
import {
  IAuth,
  SignUpType,
  UserType,
  SignInType,
  EditUserType,
} from "../../../types";
import { toast } from "react-hot-toast";

export const createUser = async (signupData: SignUpType, userId: string) => {
  try {
    const user: UserType = {
      uid: userId,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      userName:
        signupData.firstName.toLocaleLowerCase() +
        signupData.lastName.toLocaleLowerCase() +
        Math.floor(Math.random() * 1000) +
        9000,
      email: signupData.email,
      photoURL:
        "https://res.cloudinary.com/dut75albw/image/upload/v1658120718/breakout/default_user_1_oemavu.png",
      followers: [],
      following: [],
      bookmarks: [],
      likes: [],
      bio: "",
      website: "",
    };
    await setDoc(doc(db, "users", userId), user);
    const userInfo = getUserById(userId);
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error: any) {
    return error;
  }
};

export const createGoogleUser = async (gUser: IAuth) => {
  try {
    if (gUser?.displayName) {
      const user: UserType = {
        uid: gUser?.uid,
        firstName: gUser?.displayName?.split(" ")[0],
        lastName: gUser?.displayName?.split(" ")[1],
        userName:
          gUser?.displayName?.split(" ")[0].toLocaleLowerCase() +
          gUser?.displayName?.split(" ")[1].toLocaleLowerCase() +
          Math.floor(Math.random() * 1000),
        email: gUser?.email,
        photoURL: gUser.photoURL,
        followers: [],
        following: [],
        bookmarks: [],
        likes: [],
        bio: "",
        website: "",
      };
      await setDoc(doc(db, "users", gUser.uid), user);
      const userInfo = getUserById(gUser.uid);
      return userInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

export const googleSignIn = async () => {
  try {
    const response = await signInWithPopup(auth, googleAuthProvider);
    const user = await getUserById(response.user.uid);
    if (user?.uid) {
      localStorage.setItem("breakout/user-id", response?.user?.uid);
      Toast({ message: "Sign in Successful", type: "success" });
    } else {
      toast.error("Please signup using you Google Account");
    }
    return await getUserById(response?.user?.uid);
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
    return undefined;
  }
};

export const googleSignUp = async () => {
  try {
    const response = await signInWithPopup(auth, googleAuthProvider);
    localStorage.setItem("breakout/user-id", response?.user?.uid);
    const createdGoogleUser = await createGoogleUser(response?.user);
    Toast({ message: "Google Signup Successful", type: "success" });
    return createdGoogleUser;
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
};

export const emailPasswordSignUp = async (signupData: SignUpType) => {
  try {
    const { email, password } = signupData;
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("breakout/user-id", response?.user?.uid);
    const createdUser = await createUser(signupData, response?.user?.uid);
    Toast({ message: "Account creation successful", type: "success" });
    return createdUser;
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
};

export const emailPasswordSignIn = async (signinData: SignInType) => {
  try {
    const { email, password } = signinData;
    const response = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("breakout/user-id", response?.user?.uid);
    Toast({ message: "Sign In Successful", type: "success" });
    return await getUserById(response?.user?.uid);
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
};

export const userLogout = async () => {
  try {
    localStorage.removeItem("breakout/user-id");
    await signOut(auth);
    Toast({ message: "Sign out Successful", type: "success" });
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
};

export const updateUser = async (editUserData: EditUserType) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, editUserData);
      return await getUserById(uid);
    }
  } catch (error: any) {
    Toast({ message: error?.message, type: "error" });
  }
};

export const followUser = async (otherUid: string) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const userRef = doc(db, "users", uid);
      const otherUserRef = doc(db, "users", otherUid);
      const otherUserData = await getUserById(otherUid);
      const userData = await getUserById(uid);
      await updateDoc(userRef, {
        following: arrayUnion({
          bio: otherUserData?.bio,
          firstName: otherUserData?.firstName,
          lastName: otherUserData?.lastName,
          photoURL: otherUserData?.photoURL,
          uid: otherUserData?.uid,
          userName: otherUserData?.userName,
          website: otherUserData?.website,
        }),
      });
      await updateDoc(otherUserRef, {
        followers: arrayUnion({
          bio: userData?.bio,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          photoURL: userData?.photoURL,
          uid: userData?.uid,
          userName: userData?.userName,
          website: userData?.website,
        }),
      });
      return await getUserById(uid);
    }
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (otherUid: string) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const userRef = doc(db, "users", uid);
      const otherUserData = await getUserById(otherUid);
      const userData = await getUserById(uid);
      const otherUserRef = doc(db, "users", otherUid);
      await updateDoc(userRef, {
        following: arrayRemove({
          bio: otherUserData?.bio,
          firstName: otherUserData?.firstName,
          lastName: otherUserData?.lastName,
          photoURL: otherUserData?.photoURL,
          uid: otherUserData?.uid,
          userName: otherUserData?.userName,
          website: otherUserData?.website,
        }),
      });
      await updateDoc(otherUserRef, {
        followers: arrayRemove({
          bio: userData?.bio,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          photoURL: userData?.photoURL,
          uid: userData?.uid,
          userName: userData?.userName,
          website: userData?.website,
        }),
      });
      return await getUserById(uid);
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeUserProfileImage = async (file: any) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const user = await getUserById(uid);
      const loading = toast.loading("Uploading image...");
      const storageRef = ref(storage, `/users/${user?.userName}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const pathName = uploadTask?.ref?.toString();
      const uploadedPictureRef = ref(storage, pathName);
      toast.success("Profile picture change successfully", { id: loading });
      const url = await getDownloadURL(uploadedPictureRef);
      return url;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePhotoURL = async (path: string) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { photoURL: path });
      return await getUserById(uid);
    }
  } catch (error) {
    console.log(error);
  }
};
