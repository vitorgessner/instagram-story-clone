import { Play, Pause } from "lucide-react";
import { getTimeAfterPost } from "../utils/getTimeAfterPost";
import { getProfileById, getProfileByUser } from "../utils/getProfile";
import { stories, type StoriesI, type ProfilesI } from '../utils/data';
import { Link, useParams } from "react-router";
import { getFirstUnseenPost, getFirstUnseenPostId } from "../utils/getFirstUnseenPosts";
import { getPosts } from "../utils/getPosts";

export const ProfileStories = ({ type, profile }: { type?: string, profile?: ProfilesI }) => {
    const isRunning = true;
    const { userName } = useParams();
    const userId = getProfileByUser(userName!).id;
    const { postId } = useParams();
    const currentStories: Array<StoriesI> = [];
    const currentProfile: ProfilesI = getProfileById(userId)

    stories.map(story => {
        if (story.userId === userId) currentStories.push(story)
    })

    const currentStory = currentStories.find(story => story.id === Number(postId))

    const currentIndex : number = currentStories.indexOf(currentStory!);

    const progressBar = document.querySelector('.progressTick')

    if (progressBar){
        if (isRunning) {
            currentIndex > -1 && progressBar.children[currentIndex].firstChild.classList.add('active');
        } else {
            currentIndex > -1 && progressBar.children[currentIndex].firstChild.classList.remove('active');
        }
    }
    
    const animations = currentIndex > -1 && progressBar?.children[currentIndex].firstChild.getAnimations()

    const handleClick = () => {
        animations[0].playState === 'running' ? animations[0].pause() :
            animations[0].playState === 'paused' && animations[0].play()
    }

    return (
        !type ? (<li className="storiesList">
            <section className="progress">
                <ul className="progressTick">
                    {currentStories.map((story) => {
                        return <div className="progressLine">
                            <li key={story.id} className="progressBar"></li>
                        </div>
                    })}
                </ul>
            </section>
            <section className="profile">
                <div className="flex gap-2 items-center">
                    <img className="profilePictureMini" src={currentProfile.pfpPath} alt="" />
                    <h1>{currentProfile.userName}</h1>
                    {currentStory && <p>{getTimeAfterPost(currentStory.date)}</p>}
                </div>
                <button className="flex gap-2" onClick={handleClick}>
                    {isRunning ? <Pause size={16} fill="#000" /> : <Play size={16} fill="#000" />}
                </button>
            </section>
            <section className={currentStory ? "story" : "story bg-[#222]"}>
                {currentStory ? <img className="storyImage" src={currentStory.imgPath} alt="" />
                : <div className="storyNotFound">Story não encontrado</div> }
            </section>
        </li>) : (
            <li className="miniStoriesList">
                <section className="story">
                <Link to={`/stories/${profile?.userName}/${profile && getFirstUnseenPostId(profile)}`}>
                    <div className="inside text-center text-white">
                        <img className={`profilePicture mx-auto ${profile && getPosts(profile.id).find(post => !post.isSeen) && 'notSeen'}`} src={profile?.pfpPath} alt="" />
                        <h1>{profile?.userName}</h1>
                    </div>
                    <img className="storyImage brightness-50" src={profile && getFirstUnseenPost(profile).imgPath} alt="" />
                </Link>
                </section>
            </li>
        )
    )
}