import { stories, type StoriesI } from "./data";

export const getPosts = (id: number): Array<StoriesI> => {
    const posts: Array<StoriesI> = [];
    stories.map(story => {
        if (story.userId === id) posts.push(story)
    })

    if (posts.length <= 0) throw new Error('User has no posts')

    return posts;
}