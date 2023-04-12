export interface IPostCard {
  contestImage: string;
  liked: Boolean;
  likeCount: number;
  onLike: () => void;
  caption: string;
}
