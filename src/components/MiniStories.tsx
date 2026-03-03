import useStoriesStore from "../store/storiesStore"
import type { ProfilesI } from "../types/profileTypes";
import { getPixelColor } from "../utils/getPixelColor";

export const MiniStories = ({ profile }: { profile: ProfilesI | undefined }) => {
    const { getFirstUnseenStory, getStories } = useStoriesStore();
    if (!profile) return;

    const story = getFirstUnseenStory(profile.id);
    if (!story) return;

    const bg = document.querySelector(`#${profile.userName}`) && getPixelColor(document.querySelector(`#${profile.userName}`) as HTMLImageElement)

    return (
        <section className="story"
            style={bg ? { backgroundColor: `rgba(${bg.red}, ${bg.green}, ${bg.blue}, ${bg.alpha})` } : { backgroundColor: '#oklch(87% 0.065 274.039)' }}>
            <div className="inside text-center text-white z-100">
                <div className="flex flex-col justify-center items-center h-full z-100">
                    <img className={`profilePicture mx-auto ${getStories(profile.id)?.find(story => !story.isSeen) && 'notSeen'}`} src={profile.pfpPath} alt={profile.userName} />
                    <h1>{profile.userName}</h1>
                </div>
            </div>
            <img id={String(profile.userName)} className="storyImage brightness-50" src={story.imgPath} />
        </section>
    )
}