import { ArrowLeftCircle, ArrowRightCircle, ArrowBigLeft } from "lucide-react"
import { Link } from "react-router"
import { Story } from "../components/Story";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useProfilesStore from "../store/profileStore";
import useStoriesStore from "../store/storiesStore";
import type { ProfilesI } from "../types/profileTypes";

export const StoriesPage = () => {
    const {profiles, getProfileByUser} = useProfilesStore();
    const { getStories } = useStoriesStore();

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    const { userName, postId } = useParams();

    const user : ProfilesI | null = getProfileByUser(userName!)

    const posts = user && getStories(user.id);
    let nextPost, previousPost;
    let previousStoriesCount = 0, nextStoriesCount = 0;

    const sortedProfiles = profiles.sort((profilea, profileb) => profilea.order! - profileb.order!)
    const invertedProfiles = sortedProfiles.toReversed();
    const previousStories: Array<React.ReactElement> = [];

    if (posts){
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === Number(postId)) {
                previousPost = posts[i - 1];
                nextPost = posts[i + 1];
            }
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 1100) setScreenWidth(501)
            if (window.innerWidth >= 1100 && window.innerWidth < 1620) setScreenWidth(1101)
            if (window.innerWidth >= 1620) setScreenWidth(1621)
        })

        return () => {
            window.removeEventListener('resize', () => {
                if (window.innerWidth < 1100) setScreenWidth(501)
                if (window.innerWidth >= 1100 && window.innerWidth < 1620) setScreenWidth(1101)
                if (window.innerWidth >= 1620) setScreenWidth(1621)
            })
        }
    }, [])

    return (
        <main className="bg-indigo-50">
            <ul className="storiesView">
                {
                    invertedProfiles.map((profile, i) => {
                        if (previousStoriesCount >= 2) return
                        if (user && user.order && profile.order! >= user.order) {
                            return
                        }
                        if (!getStories(profile.id) || profile.id === getProfileByUser(userName!)?.id) return
                        if (user && user.order && profile.order! < user.order) {
                            previousStoriesCount++;
                            if (screenWidth > 1100 && previousStoriesCount === 1) {
                                previousStories.push(<Story type='mini' profile={profile} />)
                            }
                            if (screenWidth > 1620 && previousStoriesCount === 2) {
                                previousStories.push(<Story type='mini' profile={profile} />)
                            }
                            if (i >= invertedProfiles.length - 1 || previousStoriesCount >= 2) {
                                return previousStories.toReversed().map(stories => stories)
                            }
                            return
                        }
                    })
                }

                {screenWidth > 500 && previousPost && <Link to={`/stories/${userName}/${previousPost?.id}`}><ArrowLeftCircle size='24' stroke="#222" /></Link>}
                <Story />
                {screenWidth > 500 && nextPost && <Link to={`/stories/${userName}/${nextPost?.id}`}><ArrowRightCircle size='24' stroke="#222" /></Link>}

                {sortedProfiles.map((profile) => {
                    if (nextStoriesCount >= 2) return
                    if (!getStories(profile.id) || profile.id === getProfileByUser(userName!)?.id) return
                    if (user && user.order && profile.order! <= user.order!) {
                        return
                    } else {
                        nextStoriesCount++;
                        if (screenWidth > 1100 && nextStoriesCount === 1) return <Story type='mini' profile={profile} />
                        if (screenWidth > 1620 && nextStoriesCount === 2) return <Story type='mini' profile={profile} />
                    }
                })}
            </ul>
            <Link className="absolute left-0 sm:left-4 top-4" to={'/'}><ArrowBigLeft size={24} fill="#222" stroke="#222" /></Link>
        </main>
    )
}