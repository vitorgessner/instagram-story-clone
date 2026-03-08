import { Link } from 'react-router';
import { useRef } from 'react';
import useProfilesStore from '../store/profileStore';
import useStoriesStore from '../store/storiesStore';
import type { ProfilesI } from '../types/profileTypes';
import { getTimeAfterPost } from '../utils/getTimeAfterPost';

export const NavStories = ({ children }: { children: React.ReactNode }) => {
    const { profiles, loggedProfile } = useProfilesStore();
    const { getStories, getFirstUnseenStory, getLastSeenStory, removeFromStories } = useStoriesStore();

    const scrollRef = useRef<HTMLUListElement>(null);

    const handleWheel = (ev : React.WheelEvent) => {
        ev.preventDefault();
        scrollRef.current?.scrollTo({
            left: scrollRef.current.scrollLeft + ev.deltaY,
            behavior: 'smooth'
        })
    }

    const setOrder = (profile: ProfilesI) => {
        const seenPost = getStories(profile.id)?.find(story => !story.isSeen) ?? getLastSeenStory(profile.id);
        if (!seenPost) return 99999999
        const order = Math.floor((new Date().getTime() - seenPost?.date) / 10000)
        const profileOrder = getStories(profile.id)?.findLast(post => post.isSeen) ? 9999 + order : order

        return profileOrder;
    }

    return (
        <div>
            <ul className="stories" ref={scrollRef} onWheel={handleWheel}>
                {children}
                {profiles.map((profile) => {
                    profile.order = setOrder(profile)
                    if (profile.id === loggedProfile?.id) profile.order = -99
                    if (getStories(profile.id)) {
                        const stories = getStories(profile.id);
                        if (!stories) return null
                        stories.map(story => {
                            if (getTimeAfterPost(story.id).split('h')) {
                                if (Number(getTimeAfterPost(story.id).split('h')[0]) >= 24) removeFromStories(story.id)
                            }
                        })
                    return (
                        <li key={profile.id}
                            className={`flex flex-col items-center`}
                            style={{ order: profile.order }}>
                            {getFirstUnseenStory(profile.id) &&
                            <Link to={`/stories/${profile.username}/${getFirstUnseenStory(profile.id)?.id}`}>
                                <img className={`profilePicture ${stories?.find(post => !post.isSeen) ? 'notSeen' : ''}`} src={profile.pfpPath} alt={profile.username} />
                            </Link>}
                            <h1>{profile.username}</h1>
                        </li>
                    )} else {
                        return (<li key={profile.id}
                            className={`flex flex-col items-center`}
                            style={{ order: 999999}}
                            >
                                <img className={`profilePicture`} src={profile.pfpPath} alt={profile.username} />
                            <h1>{profile.username}</h1>
                        </li>)
                    }
                })}
            </ul>
        </div>
    )
}