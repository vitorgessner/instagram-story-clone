import useStoriesStore from "../store/storiesStore"
import type { ProfilesI } from "../types/profileTypes";

export const MiniStories = ({ profile }: { profile: ProfilesI | undefined }) => {
    const { getFirstUnseenStory, getStories } = useStoriesStore();
    if (!profile) return;

    const story = getFirstUnseenStory(profile.id);
    if (!story) return;

    return (
        <section className="story"
            style={story.dominantColor && { backgroundColor: `rgba(${story.dominantColor.red},${story.dominantColor.green},${story.dominantColor.blue},${story.dominantColor.alpha})`, filter: 'brightness(0.7)' }}>
            <div className="inside text-center text-white z-100">
                <div className="flex flex-col justify-center items-center h-full z-100">
                    <img className={`profilePicture mx-auto ${getStories(profile.id)?.find(story => !story.isSeen) && 'notSeen'}`} src={profile.pfpPath} alt={profile.username} />
                    <h1>{profile.username}</h1>
                </div>
            </div>
            <img id={String(profile.username)} className="storyImage" src={story.imgPath} />
        </section>
    )
}