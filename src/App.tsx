import React, { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosError, type AxiosResponse } from "axios";

import { TPost, TPosts } from "./components/List/types";
import List from "./components/List";
import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  const [posts, setPosts] = useState<TPosts>([]);
  const [newPostTitle, setNewPostTitle] = useState<TPost["title"]>("");
  const [newPostBody, setNewPostBody] = useState<TPost["body"]>("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response: AxiosResponse<TPosts> = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        const err = error as AxiosError;
        console.error("Errore durante la lettura dei post:", err.message);
      }
    };

    getPosts();
  }, []);

  const createPost = async (title: TPost["title"], body: TPost["body"]) => {
    const newPost = {
      body,
      id: posts && posts.length + 1,
      title,
      userId: posts && posts.length + 1,
    };
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost
      );
      setPosts([newPost, ...posts]);
      console.log("Nuovo post creato:", response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error("Errore durante la creazione del post:", err.message);
    }
  };

  return (
    <div>
      {posts?.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px",
            }}
          >
            <h3>Aggiungi Nuovo Post </h3>
            <Input
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Aggiungi titolo del post"
              value={newPostTitle}
            />

            <Input
              onChange={(e) => setNewPostBody(e.target.value)}
              placeholder="Aggiungi il body del post"
              value={newPostBody}
            />

            <Button
              text="Conferma"
              onClick={() => createPost(newPostTitle, newPostBody)}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px",
            }}
          >
            <List posts={posts} setPosts={setPosts} />
          </div>
        </>
      ) : (
        <p>Caricamento in corso...</p>
      )}
    </div>
  );
}

export default App;
