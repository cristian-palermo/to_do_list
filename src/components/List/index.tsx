import { Dispatch, SetStateAction, useState } from "react";
import Button from "../Button";
import { WrapList, ListStyle } from "./style";
import { type TPosts, type TPost } from "./types";
import axios, { AxiosError } from "axios";
import Input from "../Input";

const List = ({
  posts,
  setPosts,
}: {
  posts: TPosts;
  setPosts: Dispatch<SetStateAction<TPosts>>;
}) => {
  const [showInputId, setShowInputId] = useState(0);
  const [inputMod, setInputMod] = useState<string>("");

  const remove = async (postId: TPost["id"]) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      console.log("Post eliminato con successo");
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      const err = error as AxiosError;
      console.error("Errore durante l'eliminazione del post:", err.message);
    }
  };

  const update = async ({
    postId,
    updatedPost,
  }: {
    postId: TPost["id"];
    updatedPost: string;
  }) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        updatedPost
      );
      console.log("Post modificato:", response.data);
      setPosts(
        posts.map((post) => {
          setShowInputId(postId);
          if (post.id === postId) {
            post.title = inputMod;
          }
          return post;
        })
      );
      setShowInputId(0);
    } catch (error) {
      const err = error as AxiosError;
      console.error("Errore durante la modifica del post:", err.message);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <WrapList key={post.id}>
          <ListStyle>{post.title}</ListStyle>
          <div>
            <Button text="Remove" onClick={() => remove(post.id)} />
            <Button text="Modify" onClick={() => setShowInputId(post.id)} />
          </div>

          {showInputId === post.id && (
            <>
              <Input
                key={post.id}
                onChange={(e) => setInputMod(e.target.value)}
                value={inputMod}
                placeholder={post.title}
              />
              <Button
                text={"Confirm"}
                onClick={() =>
                  update({ postId: post.id, updatedPost: inputMod })
                }
              />
            </>
          )}
        </WrapList>
      ))}
    </div>
  );
};

export default List;
