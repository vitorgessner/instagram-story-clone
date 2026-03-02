import { stories, type StoriesI } from "./data";

export const getPosts = (id: number): Array<StoriesI> | null => {
    const posts: Array<StoriesI> = [];
    stories.map(story => {
        if (story.userId === id) posts.push(story)
    })

    // if (posts.length <= 0) throw new Error('User has no posts')
    if (posts.length <= 0) return null

    return posts;
}