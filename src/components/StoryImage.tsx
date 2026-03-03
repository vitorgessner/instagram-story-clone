import { useParams } from "react-router";
import { getPixelColor } from "../utils/getPixelColor"
import useStoriesStore from "../store/storiesStore";
import type { StoriesI } from "../types/storiesTypes";
import useProfilesStore from "../store/profileStore";

export const StoryImage = () => {
    const { getStories } = useStoriesStore();
    const { getProfileByUser } = useProfilesStore();

    const bg = document.querySelector('.storyImage.pb-14') && getPixelColor(document.querySelector('.storyImage.pb-14') as HTMLImageElement)

    const { userName, postId } = useParams();
    if (!userName || !postId) return;

    const user = getProfileByUser(userName);
    if (!user) return;

    const currentStories: Array<StoriesI> | null = getStories(user.id);
    if (!currentStories) return;

    const currentStory = currentStories.find(story => story.id === Number(postId))

    return (
        <section style={currentStory && bg ? { backgroundColor: `rgba(${bg.red}, ${bg.green}, ${bg.blue}, ${bg.alpha})` } : { backgroundColor: '#oklch(87% 0.065 274.039)' }} className={currentStory ? `story` : "story bg-[#222]"}>
            {currentStory ? <img className="storyImage pb-14" src={currentStory.imgPath} alt="" />
                : <div className="storyNotFound">Story não encontrado</div>}
        </section>
    )
}