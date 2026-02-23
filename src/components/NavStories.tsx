import { Link } from 'react-router';
import { profiles, type ProfilesI } from '../utils/data';
import { getPosts } from '../utils/getPosts';
import { getFirstUnseenPostId } from '../utils/getFirstUnseenPosts';

export const NavStories = ({ children }: { children: React.ReactNode }) => {
    const scrollContainer = document.querySelector('.stories');
    scrollContainer?.addEventListener('wheel', (ev) => {
        ev.preventDefault();
        scrollContainer.scrollTo({
            left: scrollContainer.scrollLeft + ev.deltaY,
            behavior: 'smooth'
        })
    })

    const setOrder = (profile: ProfilesI) => {
        const seenPost = getPosts(profile.id).find(post => post.isSeen) ?? getPosts(profile.id).find(post => !post.isSeen);
        const order = seenPost && Math.floor((new Date().getTime() - seenPost?.date) / 10000)
        const profileOrder = order && getPosts(profile.id).find(post => post.isSeen) ? 9999 + order + profile.id : order && order + profile.id
        return profileOrder;
    }

    return (
        <div>
            <ul className="stories">
                {children}
                {profiles.map((profile) => {
                    profile.order = setOrder(profile)
                    return (
                        <li key={profile.id}
                            className={`flex flex-col items-center`}
                            style={{ order: profile.order }}>
                            <Link to={`/stories/${profile.userName}/${getFirstUnseenPostId(profile)}`}>
                                <img className={`profilePicture ${getPosts(profile.id).find(post => !post.isSeen) ? 'notSeen' : ''}`} src={profile.pfpPath} alt={profile.userName} />
                            </Link>
                            <h1>{profile.userName}</h1>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}