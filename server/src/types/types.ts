import { CreatePostInput } from "../schema/post.schema";
import { CreateUserInput } from "../schema/user.schema";

export type EditProp =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "dateOfBirth"
  | "gender"
  | "avatar";

export interface UserToCreate extends CreateUserInput {
  avatar: string;
}

export interface UserNode {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  avatar: string;
}

export type EditPostInput = CreatePostInput;

export type RequestParams = {
  id: string;
};

export type PostNode = {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  postId: string;
  content: string;
  at: string;
  privacy: "public" | "private" | "friends";
  image: string;
  likes: number;
};

export type PostsResponse = {
  posts: PostNode[];
};
