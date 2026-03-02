import { useParams } from "react-router";
import { ProgressTicks } from "./ProgressTicks";
import { StoriesProfile } from "./StoriesProfile";
import { MiniStories } from "./MiniStories";
import { StoryImage } from "./StoryImage";
import { useEffect } from "react";
import useStoriesStore from "../store/storiesStore";
import type { ProfilesI } from "../types/profileTypes";

interface StoryI {
    type?: string,
    profile?: ProfilesI
}

export const Story = ({ type, profile }: StoryI) => {
    const { setStoryToSeen } = useStoriesStore();

    const { postId } = useParams();

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