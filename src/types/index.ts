export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  username: string;
  bio: string | "";
  imageId: string;
  imageUrl: URL | string;
  file: File[];
  followers: string[];
  following: string[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  followers: string[]; // Array of user IDs who are following this user
  following: string[]; // Array of user IDs this user is following
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};


export type IUpdateUserFollowers = {
  userId: string;
  followerId: string;
};

