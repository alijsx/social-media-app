import * as FirebaseAuth from "firebase/auth";

export interface IAuth extends FirebaseAuth.User {}

export type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type UserType = {
  bio: string;
  bookmarks: any[];
  email: string | null;
  firstName: string | undefined;
  followers: [User] | [];
  following: [User] | [];
  lastName: string | undefined;
  likes: any[];
  photoURL: string | null;
  uid: string | undefined;
  userName: string | any;
  website: string;
};

export type FieldType = {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
};

export type EditUserType = {
  bio?: string;
  website?: string;
  userName?: string;
};

export type PostType = {
  bookmarks?: any[];
  comments?: any[];
  content: string;
  fullName?: string;
  imageURL?: any;
  imgAltText?: string;
  isEdited: boolean;
  likes?: any[];
  pid?: string;
  userName?: string;
  userId?: string;
  userImgURL?: string;
  timeStamp?: any;
};

export type CommentType = {
  pid: string;
  text: string;
  uid?: string;
  userName?: string;
  fullName?: string;
  photoURL?: string;
};
