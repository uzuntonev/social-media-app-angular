export interface IPost {
  id: string,
  title: string;
  description: string;
  createdOn: Date;
  likes: number;
  dislikes: number;
  comments: string[];
  imgName?: string;
  createdBy: string;
  avatar: string;

}
