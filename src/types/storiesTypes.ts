export interface StoriesI {
  id: number,
  userId: number,
  isSeen: boolean,
  date: number,
  imgPath: string,
}

export interface AddStoryFormI {
    storyImage: File
  }