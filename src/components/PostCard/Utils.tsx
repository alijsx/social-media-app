import { DocumentData } from "firebase/firestore";

export const getProfileUser = (
  users: DocumentData[] | undefined,
  userId: string
) => users?.find((user) => user?.uid === userId);

export const checkIfPostIsLiked = (
  post: DocumentData | undefined,
  uid: string
) => post?.likes.some((p: any) => p?.uid === uid);

export const checkIfPostIsBookmarked = (
  post: DocumentData | undefined,
  uid: string
) => post?.bookmarks?.some((p: any) => p?.uid === uid);

export const checkIfUserAllowedToEditDelete = (
  postUserId: string,
  uid: string
) => postUserId === uid;
