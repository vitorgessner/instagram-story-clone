import { useParams } from "react-router";
import { ProgressTicks } from "./ProgressTicks";
import { StoriesProfile } from "./StoriesProfile";
import { MiniStories } from "./MiniStories";
import { StoryImage } from "./StoryImage";
import { useEffect } from "react";
import useStoriesStore from "../store/storiesStore";
import type { ProfilesI } from "../types/profileTypes";
// import useProfilesStore from "../store/profileStore";
// import type { StoriesI } from "../types/storiesTypes";

export const Story = ({ type, profile }: { type?: string, profile?: ProfilesI }) => {
    const { setStoryToSeen } = useStoriesStore();
    // const { getProfileByUser } = useProfilesStore();

    const { postId } = useParams();
    // const currentStories = get;

    // stories.map(story => {
    //     if (user && story.userId === user.id) currentStories.push(story)
    // })

    useEffect(() => {
        setStoryToSeen(Number(postId))
    }, [setStoryToSeen, postId])

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