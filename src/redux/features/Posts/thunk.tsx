import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentType, PostType } from "../../../types";
import {
  addBookmarkHandler,
  addCommentHandler,
  createPostHandler,
  deletePostHandler,
  editPostHandler,
  getAllPostsHandler,
  getPostsByUsernameHandler,
  getPostsOfFollowingHandler,
  likePostHandler,
  removeBookmarkHandler,
  unlikePostHandler,
} from "./services";

export const createPost = createAsyncThunk(
  "posts/create-post",
  async (post: PostType) => await createPostHandler(post)
);

export const getAllPosts = createAsyncThunk(
  "posts/get-posts",
  async () => await getAllPostsHandler()
);

export const getPostsByUserName = createAsyncThunk(
  "posts/get-post-username",
  async (userName: string) => await getPostsByUsernameHandler(userName)
);

export const getPostsOfFollowing = createAsyncThunk(
  "posts/posts-of-following",
  async () => await getPostsOfFollowingHandler()
);

export const likePost = createAsyncThunk(
  "posts/like-post",
  async (postId: string) => await likePostHandler(postId)
);

export const unLikePost = createAsyncThunk(
  "posts/unlike-post",
  async (postId: string) => await unlikePostHandler(postId)
);

export const addBookmark = createAsyncThunk(
  "posts/add-bookmark",
  async (postId: string) => await addBookmarkHandler(postId)
);

export const removeBookmark = createAsyncThunk(
  "posts/remove-bookmark",
  async (postId: string) => await removeBookmarkHandler(postId)
);

export const editPost = createAsyncThunk(
  "posts/edit-post",
  async (postData: PostType) => await editPostHandler(postData)
);

export const deletePost = createAsyncThunk(
  "posts/delete-post",
  async (postId: string) => await deletePostHandler(postId)
);

export const addComment = createAsyncThunk(
  "posts/add-comment",
  async (comment: CommentType) => await addCommentHandler(comment)
);
