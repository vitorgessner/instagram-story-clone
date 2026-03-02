import { Link } from "react-router"
import type { ProfilesI } from "../utils/data"
import useStoriesStore from "../store/storiesStore"

export const MiniStories = ({profile} : {profile: ProfilesI | undefined}) => {
    const { getStories, getFirstUnseenStory, getFirstSeenStory } = useStoriesStore();
    return (
        (profile && getFirstUnseenStory(profile.id) ? <Link to={`/stories/${profile?.userName}/${profile && getFirstUnseenStory(profile.id)?.id}`}>
            <div className="inside text-center text-white">
                <img className={`profilePicture mx-auto ${profile && getStories(profile.id)?.find(post => !post.isSeen) && 'notSeen'}`} src={profile?.pfpPath} alt="" />
                <h1>{profile?.userName}</h1>
            </div>
            <img className="storyImage brightness-50" src={profile && getFirstUnseenStory(profile.id)?.imgPath} alt="" />
        </Link> :
        <Link to={`/stories/${profile?.userName}/${profile && getFirstSeenStory(profile.id)?.id}`}>
        <div className="inside text-center text-white">
            <img className={`profilePicture mx-auto ${profile && getStories(profile.id)?.find(post => !post.isSeen) && 'notSeen'}`} src={profile?.pfpPath} alt="" />
            <h1>{profile?.userName}</h1>
        </div>
        <img className="storyImage brightness-50" src={profile && getFirstSeenStory(profile.id)?.imgPath} alt="" />
    </Link>)
    )
}