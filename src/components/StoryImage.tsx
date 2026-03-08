import { useParams } from "react-router";
import useStoriesStore from "../store/storiesStore";
import type { StoriesI } from "../types/storiesTypes";
import useProfilesStore from "../store/profileStore";

export const StoryImage = () => {
    const { getStories } = useStoriesStore();
    const { getProfileByUser } = useProfilesStore();

    const { username, postId } = useParams();

    if (!username || !postId) return;

    const user = getProfileByUser(username);
    if (!user) return;

    const currentStories: Array<StoriesI> | null = getStories(user.id);
    if (!currentStories) return;

    const currentStory = currentStories.find(story => story.id === Number(postId));
    if (!currentStory) return;

    console.log(currentStory.dominantColor)

    return (
        <section style={currentStory.dominantColor && { backgroundColor: `rgba(${currentStory.dominantColor.red},${currentStory.dominantColor.green},${currentStory.dominantColor.blue},${currentStory.dominantColor.alpha})` }} 
        className={currentStory ? `story` : "story bg-[#222]"}>
            {currentStory ? <img className="storyImage this" decoding="sync" loading="eager" src={currentStory.imgPath} alt="" />
                : <div className="storyNotFound">Story não encontrado</div>}
        </section>
    )
}