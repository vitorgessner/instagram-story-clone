import { Link } from 'react-router';
import { useRef } from 'react';
import useProfilesStore from '../store/profileStore';
import useStoriesStore from '../store/storiesStore';
import type { ProfilesI } from '../types/profileTypes';

export const NavStories = ({ children }: { children: React.ReactNode }) => {
    const { profiles } = useProfilesStore();
    const { getStories, getFirstUnseenStory, getFirstSeenStory } = useStoriesStore();

    const scrollRef = useRef<HTMLUListElement>(null);

    const handleWheel = (ev : React.WheelEvent) => {
        ev.preventDefault();
        scrollRef.current?.scrollTo({
            left: scrollRef.current.scrollLeft + ev.deltaY,
            behavior: 'smooth'
        })
    }

    const setOrder = (profile: ProfilesI) => {
        const seenPost = getFirstUnseenStory(profile.id) ?? getFirstSeenStory(profile.id);
        if (!seenPost) return undefined
        const order = Math.floor((new Date().getTime() - seenPost?.date) / 10000)
        const profileOrder = order && getStories(profile.id)?.find(post => post.isSeen) ? 9999 + order : order && order
        return profileOrder;
    }

    return (
        <div>
            <ul className="stories" ref={scrollRef} onWheel={handleWheel}>
                {children}
                {profiles.map((profile) => {
                    profile.order = setOrder(profile)
                    if (getStories(profile.id)) {
                    return (
                        <li key={profile.id}
                            className={`flex flex-col items-center`}
                            style={{ order: profile.order }}>
                            {getFirstUnseenStory(profile.id) ?
                            <Link to={`/stories/${profile.userName}/${getFirstUnseenStory(profile.id)?.id}`}>
                                <img className={`profilePicture ${getStories(profile.id)?.find(post => !post.isSeen) ? 'notSeen' : ''}`} src={profile.pfpPath} alt={profile.userName} />
                            </Link> :
                            <Link to={`/stories/${profile.userName}/${getFirstSeenStory(profile.id)?.id}`}>
                            <img className={`profilePicture ${getStories(profile.id)?.find(post => !post.isSeen) ? 'notSeen' : ''}`} src={profile.pfpPath} alt={profile.userName} />
                        </Link>}
                            <h1>{profile.userName}</h1>
                        </li>
                    )} else {
                        return (<li key={profile.id}
                            className={`flex flex-col items-center`}
                            style={{ order: 999999}}
                            >
                                <img className={`profilePicture`} src={profile.pfpPath} alt={profile.userName} />
                            <h1>{profile.userName}</h1>
                        </li>)
                    }
                })}
            </ul>
        </div>
    )
}