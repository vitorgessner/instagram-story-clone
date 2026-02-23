import { getProfileByUser } from "../utils/getProfile";
import { stories, type StoriesI, type ProfilesI } from '../utils/data';
import { useParams, Navigate } from "react-router";
import { ProgressTicks } from "./ProgressTicks";
import { StoriesProfile } from "./StoriesProfile";
import { MiniStories } from "./miniStories";
import { StoryImage } from "./StoryImage";

export const Story = ({ type, profile }: { type?: string, profile?: ProfilesI }) => {
    const isRunning = true;
    const { userName, postId } = useParams();
    const userId = getProfileByUser(userName!).id;
    const currentStories: Array<StoriesI> = [];

    stories.map(story => {
        if (story.userId === userId) currentStories.push(story)
    })

    const currentStory = currentStories.find(story => story.id === Number(postId))
    let nextPost;

    const currentIndex: number = currentStories.indexOf(currentStory!);

    const progressTick = document.querySelector('.progressTick')
    let progressBar;

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

    for (let i = 0; i < currentStories.length; i++) {
        if (currentStories[i].id === Number(postId)) {
            nextPost = currentStories[i + 1];
        }
    }

    const animations = currentIndex > -1 && progressBar && progressBar.getAnimations()
    if (animations && animations[0].playState === 'finished' && nextPost) Navigate({ to: `/stories/${userName}/${nextPost?.id}` })

    return (
        !type ? (<li className="storiesList">
            <section className="progress">
                <ProgressTicks />
            </section>
            <section className="profile">
                <StoriesProfile />
            </section>
            <StoryImage />
        </li>) : (
            <li className="miniStoriesList">
                <section className="story">
                    <MiniStories profile={profile} />
                </section>
            </li>
        )
    )
}