import { Link } from 'react-router';
import { useEffect, useRef } from 'react';
import useProfilesStore from '../store/profileStore';
import useStoriesStore from '../store/storiesStore';
import { getTimeAfterPost } from '../utils/getTimeAfterPost';
import useOrderMap from '../hooks/useOrderMap';

export const NavStories = ({ children }: { children: React.ReactNode }) => {
    const { profiles } = useProfilesStore();
    const { getStories, getFirstUnseenStory, removeFromStories, stories } = useStoriesStore();
    const orderMap = useOrderMap();

    const scrollRef = useRef<HTMLUListElement>(null);

    const handleWheel = (ev : React.WheelEvent) => {
        ev.preventDefault();
        scrollRef.current?.scrollTo({
            left: scrollRef.current.scrollLeft + ev.deltaY,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        stories.map(story => {
            if (getTimeAfterPost(story.id).split('h')) {
                if (Number(getTimeAfterPost(story.id).split('h')[0]) >= 24) removeFromStories(story.id)
            }
        })
    }, [stories, removeFromStories])

    return (
        <div>
            <ul className="stories" ref={scrollRef} onWheel={handleWheel}>
                {children}
                {profiles.map((profile) => {
                    if (getStories(profile.id)) {
                        const profileStories = getStories(profile.id);
                        if (!profileStories) return null
                    return (
                        <li key={profile.id}
                            className={`flex flex-col items-center`}
                            style={{ order: orderMap.get(profile.id) }}>
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