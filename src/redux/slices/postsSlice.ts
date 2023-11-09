import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // removePost: (state, action) => {
    //   const postId = action.payload;
    //   state.posts = state.posts.filter((el) => el.id !== postId);
    // },
  },
});

// export const { removePost } = postsSlice.actions;

export default postsSlice;
