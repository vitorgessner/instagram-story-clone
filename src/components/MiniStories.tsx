import { Link } from "react-router"
import type { ProfilesI } from "../utils/data"
import useStoriesStore from "../store/storiesStore"

export const MiniStories = ({profile} : {profile: ProfilesI | undefined}) => {
    const { getFirstUnseenStory, getStories } = useStoriesStore();
    if (!profile) return;

    const story = getFirstUnseenStory(profile.id);
    if (!story) return;

    return (
        (<Link to={`/stories/${profile.userName}/${story.id}`}>
            <div className="inside text-center text-white">
                <img className={`profilePicture mx-auto ${getStories(profile.id)?.find(story => !story.isSeen) && 'notSeen'}`} src={profile.pfpPath} alt={profile.userName} />
                <h1>{profile.userName}</h1>
            </div>
            <img className="storyImage brightness-50" src={story.imgPath}/>
        </Link>)
    )
}