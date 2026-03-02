import { useParams } from "react-router";
import { getTimeAfterPost } from "../utils/getTimeAfterPost";
import useStoriesStore from "../store/storiesStore";
import type { StoriesI } from "../types/storiesTypes";
import useProfilesStore from "../store/profileStore";

export const StoriesProfile = () => {
    const { stories } = useStoriesStore();
    const { getProfileByUser } = useProfilesStore();

    const { userName, postId } = useParams();

    const user = getProfileByUser(userName!);
    const currentStories: Array<StoriesI> = [];

    stories.map(story => {
        if (user && story.userId === user.id) currentStories.push(story)
    })

    const currentStory = currentStories.find(story => story.id === Number(postId));

    return (
        <>
            <div className="flex gap-2 items-center">
                <img className="profilePictureMini" src={user!.pfpPath!} alt="" />
                <h1>{user && user.userName}</h1>
                {currentStory && <p>{getTimeAfterPost(currentStory.date)}</p>}
            </div>
        </>
    )
}