import { Play, Pause } from "lucide-react";
import { getTimeAfterPost } from "../utils/getTimeAfterPost";
import { getProfileById, getProfileByUser } from "../utils/getProfile";
import { stories, type StoriesI, type ProfilesI } from '../utils/data';
import { Link, useParams, Navigate } from "react-router";
import { getFirstUnseenPost, getFirstUnseenPostId } from "../utils/getFirstUnseenPosts";
import { getPosts } from "../utils/getPosts";
import { getPixelColor } from "../utils/getPixelColor";

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
    let nextPost, previousPost;

    // console.log(document.querySelector('.storyImage.pb-14'))
    const bg = document.querySelector('.storyImage.pb-14') && getPixelColor(document.querySelector('.storyImage.pb-14') as HTMLImageElement)

    const currentIndex: number = currentStories.indexOf(currentStory!);
    const previousIndex: number = currentIndex - 1
    const nextIndex: number = currentIndex + 1

    const progressBar = document.querySelector('.progressTick')

    if (progressBar) {
        if (isRunning) {
            currentIndex > -1 && progressBar.children[currentIndex].firstChild.classList.add('active');
        } else {
            currentIndex > -1 && progressBar.children[currentIndex].firstChild.classList.remove('active');
        }
    }

    for (let i = 0; i < currentStories.length; i++) {
        if (currentStories[i].id === Number(postId)) {
            previousPost = currentStories[i - 1];
            nextPost = currentStories[i + 1];
        }
    }

    const animations = currentIndex > -1 && progressBar?.children[currentIndex].firstChild.getAnimations()
    if (animations && progressBar) {
        if (progressBar.children[previousIndex] && progressBar.children[previousIndex].firstChild.getAnimations().length > 0) {
            progressBar.children[previousIndex].firstChild.getAnimations()[0].finish()
        }
        animations[0].currentTime = 0;
        animations[0].play()
        if (animations[0].playState === 'finished' && nextPost) Navigate({to: `/stories/${userName}/${nextPost?.id}`})

        if (progressBar.children[nextIndex] && progressBar.children[nextIndex].firstChild.getAnimations().length > 0) {
            console.log('aqui')
            progressBar.children[nextIndex].firstChild.getAnimations()[0].pause();
            progressBar.children[nextIndex].firstChild.getAnimations()[0].currentTime = 0;
        }
    }

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
            <section style={currentStory && bg && {backgroundColor: `rgba(${bg?.red}, ${bg?.green}, ${bg?.blue}, ${bg?.alpha})`}} className={currentStory ? `story` : "story bg-[#222]"}>
                {currentStory ? <img className="storyImage pb-14" data-current src={currentStory.imgPath} alt="" />
                    : <div className="storyNotFound">Story não encontrado</div>}
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