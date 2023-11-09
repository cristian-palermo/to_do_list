type TPost = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

type TPosts = TPost[];

export type { TPosts, TPost };
