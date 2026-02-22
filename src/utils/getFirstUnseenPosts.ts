import type { ProfilesI } from "./data"
import { getPosts } from "./getPosts"

export const getFirstUnseenPostId = (profile: ProfilesI) => {
        const posts = getPosts(profile.id)
        const post = posts.find(post => !post.isSeen)
        if (post) return post.id
        return posts[0].id
}

export const getFirstUnseenPost = (profile: ProfilesI) => {
    const posts = getPosts(profile.id)
    const post = posts.find(post => !post.isSeen)
    if (post) return post
    return posts[0]
}