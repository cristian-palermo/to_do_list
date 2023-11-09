import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../slices/postsSlice";

const createStore = () => {
  const store = configureStore({
    reducer: {
      posts: postsSlice.reducer,
    },
  });

  return store;
};

const store = createStore();

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export { type RootState, type AppDispatch };
