import { Link } from "react-router"
import type { ProfilesI } from "../utils/data"
import { getFirstUnseenPost, getFirstUnseenPostId } from "../utils/getFirstUnseenPosts"
import { getPosts } from "../utils/getPosts"

export const MiniStories = ({profile} : {profile: ProfilesI | undefined}) => {
    return (
        <Link to={`/stories/${profile?.userName}/${profile && getFirstUnseenPostId(profile)}`}>
            <div className="inside text-center text-white">
                <img className={`profilePicture mx-auto ${profile && getPosts(profile.id).find(post => !post.isSeen) && 'notSeen'}`} src={profile?.pfpPath} alt="" />
                <h1>{profile?.userName}</h1>
            </div>
            <img className="storyImage brightness-50" src={profile && getFirstUnseenPost(profile).imgPath} alt="" />
        </Link>
    )
}