import { Play, Pause } from "lucide-react";
import { useParams } from "react-router";
import { type ProfilesI, stories, type StoriesI } from "../utils/data";
import { getProfileById, getProfileByUser } from "../utils/getProfile";
import { getTimeAfterPost } from "../utils/getTimeAfterPost";

export const StoriesProfile = () => {
    const isRunning = true;
    const { userName, postId } = useParams();
    const userId = getProfileByUser(userName!).id;
    const currentStories: Array<StoriesI> = [];
        const currentProfile: ProfilesI = getProfileById(userId);
    
        stories.map(story => {
            if (story.userId === userId) currentStories.push(story)
        })

    const currentStory = currentStories.find(story => story.id === Number(postId));

    const currentIndex: number = currentStories.indexOf(currentStory!);
    let progressBar;

    const progressTick = document.querySelector('.progressTick')
    if (progressTick) {
        if (currentIndex > -1) {
            progressBar = progressTick.children[currentIndex].firstChild as HTMLLIElement;
            if (isRunning) {
                progressBar?.classList.add('active');
            } else {
                progressBar?.classList.remove('active');
            }
        }
    }

    const animations = currentIndex > -1 && progressBar && progressBar.getAnimations()

    const handleClick = () => {
        if (animations && animations[0].playState === 'running') animations[0].pause()
        if (animations && animations[0].playState === 'paused') animations[0].play()
    }

    return (
        <>
            <div className="flex gap-2 items-center">
                <img className="profilePictureMini" src={currentProfile.pfpPath} alt="" />
                <h1>{currentProfile.userName}</h1>
                {currentStory && <p>{getTimeAfterPost(currentStory.date)}</p>}
            </div>
            <button className="flex gap-2" onClick={handleClick}>
                {isRunning ? <Pause size={16} fill="#000" /> : <Play size={16} fill="#000" />}
            </button>
        </>
    )
}