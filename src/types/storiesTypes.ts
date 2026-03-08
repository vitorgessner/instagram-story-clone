export interface StoriesI {
  id: number,
  userId: number,
  isSeen: boolean,
  date: number,
  imgPath: string,
  dominantColor?: { red: number | undefined; green: number | undefined; blue: number | undefined; alpha: number | undefined; }
}

export interface AddStoryFormI {
    image: File | undefined,
  }