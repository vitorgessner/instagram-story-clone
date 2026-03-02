import { useParams } from "react-router";
import { getTimeAfterPost } from "../utils/getTimeAfterPost";
import useStoriesStore from "../store/storiesStore";
import type { StoriesI } from "../types/storiesTypes";
import useProfilesStore from "../store/profileStore";

export const StoriesProfile = () => {
    const { getStories } = useStoriesStore();
    const { getProfileByUser } = useProfilesStore();

    const { userName, postId } = useParams();
    if (!userName || !postId) return;

    const user = getProfileByUser(userName);
    if (!user) return;

    const currentStories: Array<StoriesI> | null = getStories(user.id);
    if (!currentStories) return;

    const currentStory = currentStories.find(story => story.id === Number(postId));

    return (
        <>
            <div className="flex gap-2 items-center">
                <img className="profilePictureMini" src={user.pfpPath} alt={user.userName} />
                <h1>{user.userName}</h1>
                {currentStory && <p>{getTimeAfterPost(currentStory.date)}</p>}
            </div>
        </>
    )
}