import { useParams } from "react-router";
import { stories, type StoriesI } from "../utils/data";
import { getPixelColor } from "../utils/getPixelColor"
import { getProfileByUser } from "../utils/getProfile";

export const StoryImage = () => {
    const bg = document.querySelector('.storyImage.pb-14') && getPixelColor(document.querySelector('.storyImage.pb-14') as HTMLImageElement)
    const { userName, postId } = useParams();
    const userId = getProfileByUser(userName!).id;

    const currentStories: Array<StoriesI> = [];
    
        stories.map(story => {
            if (story.userId === userId) currentStories.push(story)
        })
    
        const currentStory = currentStories.find(story => story.id === Number(postId))

    return (
        <section style={currentStory && bg ? { backgroundColor: `rgba(${bg.red}, ${bg.green}, ${bg.blue}, ${bg.alpha})` } : { backgroundColor: '#oklch(87% 0.065 274.039)' }} className={currentStory ? `story` : "story bg-[#222]"}>
            {currentStory ? <img className="storyImage pb-14" data-current src={currentStory.imgPath} alt="" />
                : <div className="storyNotFound">Story não encontrado</div>}
        </section>
    )
}