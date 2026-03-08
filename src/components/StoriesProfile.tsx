import { useParams } from "react-router";
import { getTimeAfterPost } from "../utils/getTimeAfterPost";
import useStoriesStore from "../store/storiesStore";
import type { StoriesI } from "../types/storiesTypes";
import useProfilesStore from "../store/profileStore";

export const StoriesProfile = () => {
    const { getStories } = useStoriesStore();
    const { getProfileByUser } = useProfilesStore();

    const { username, postId } = useParams();
    if (!username || !postId) return;

    const user = getProfileByUser(username);
    if (!user) return;

    const currentStories: Array<StoriesI> | null = getStories(user.id);
    if (!currentStories) return;

    const currentStory = currentStories.find(story => story.id === Number(postId));

    return (
        <>
            <div className="flex gap-2 items-center">
                <img className="profilePictureMini" src={user.pfpPath} alt={user.username} />
                <h1>{user.username}</h1>
                {currentStory && <p>{getTimeAfterPost(currentStory.date)}</p>}
            </div>
        </>
    )
}