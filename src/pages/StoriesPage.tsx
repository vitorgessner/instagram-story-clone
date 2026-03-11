import { ArrowLeftCircle, ArrowRightCircle, ArrowBigLeft } from "lucide-react"
import { Link } from "react-router"
import { Story } from "../components/Story";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useProfilesStore from "../store/profileStore";
import type { ProfilesI } from "../types/profileTypes";
import useStoryNavigation from "../hooks/useStoryNavigation";

export const StoriesPage = () => {
    const { getProfileByUser } = useProfilesStore();

    const { username, postId } = useParams();

    const user: ProfilesI | null = getProfileByUser(username!)

    const { previousStories, nextStories, previousPost, nextPost } = useStoryNavigation(username, postId);

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    const isWideScreen = screenWidth > 1100;
    const isExtraWideScreen = screenWidth > 1620;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1100) setScreenWidth(501)
            if (window.innerWidth >= 1100 && window.innerWidth < 1620) setScreenWidth(1101)
            if (window.innerWidth >= 1620) setScreenWidth(1621)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <main className="bg-indigo-50">
            <ul className="storiesView">
                {
                    
                    previousStories.toReversed().map((profile, i) => {
                        if (isWideScreen && i === 1) return <Story key={profile?.id} profile={profile} />
                        if (isExtraWideScreen && i === 0) return <Story key={profile?.id} profile={profile} />
                    })
                }

                <Link className={!previousPost ? 'pointer-events-none opacity-50' : ''} to={`/stories/${username}/${previousPost?.id}`}><ArrowLeftCircle size='24' stroke="#222" /></Link>
                <Story key={user!.id} />
                <Link className={!nextPost ? 'pointer-events-none opacity-50' : ''} to={`/stories/${username}/${nextPost?.id}`}><ArrowRightCircle size='24' stroke="#222" /></Link>

                {
                    nextStories.map((profile, i) => {
                        if (i >= 2) return null
                        if (isWideScreen && i === 0) return <Story key={profile?.id} profile={profile} />
                        if (isExtraWideScreen && i === 1) return <Story key={profile?.id} profile={profile} />
                    })
                }
            </ul>
            <Link className="absolute left-0 sm:left-4 top-4" to={'/'}><ArrowBigLeft size={24} fill="#222" stroke="#222" /></Link>
        </main>
    )
}