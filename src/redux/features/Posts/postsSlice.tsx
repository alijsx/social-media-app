import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import {
  addBookmark,
  addComment,
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  likePost,
  removeBookmark,
  unLikePost,
} from "./thunk";

type PostStateType = {
  posts: DocumentData[] | undefined;
  loading: boolean;
};

const initialState: PostStateType = {
  posts: [],
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload?.posts;
      })
      .addCase(createPost.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(likePost.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(unLikePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(unLikePost.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(addBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(addBookmark.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(removeBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(removeBookmark.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(editPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(editPost.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(deletePost.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(addComment.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      });
  },
});

export default postsSlice.reducer;
