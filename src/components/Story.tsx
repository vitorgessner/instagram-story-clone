import { Link, useParams } from "react-router";
import { ProgressTicks } from "./ProgressTicks";
import { StoriesProfile } from "./StoriesProfile";
import { MiniStories } from "./MiniStories";
import { StoryImage } from "./StoryImage";
import { useEffect } from "react";
import useStoriesStore from "../store/storiesStore";
import type { ProfilesI } from "../types/profileTypes";

interface StoryI {
    profile?: ProfilesI
}

export const Story = ({ profile }: StoryI) => {
    const { setStoryToSeen, getFirstUnseenStory } = useStoriesStore();

    const { postId } = useParams();

    useEffect(() => {
        setStoryToSeen(Number(postId))
    }, [setStoryToSeen, postId])

    return (
        !profile ? (<li className="storiesList">
            <section className="progress">
                <ProgressTicks />
            </section>
            <section className="profile">
                <StoriesProfile />
            </section>
            <StoryImage />
        </li>) : (
            <Link to={`/stories/${profile.username}/${getFirstUnseenStory(profile.id)?.id}`}
            className="miniStoriesLink">
                <li className="miniStoriesList">
                        <MiniStories profile={profile} />
                </li>
            </Link>
        )
    )
}