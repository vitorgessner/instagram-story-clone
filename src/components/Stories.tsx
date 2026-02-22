import { Link } from 'react-router';
import { profiles } from '../utils/data';
import { getPosts } from '../utils/getPosts';
import { getFirstUnseenPostId } from '../utils/getFirstUnseenPosts';

export const Stories = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ul className="stories">
                {children}
                {profiles.map((profile) => {
                    const order = Math.floor((new Date().getTime() - getPosts(profile.id).find(post => post.isSeen)?.date) / 10000)
                    profile.order = getPosts(profile.id).find(post => post.isSeen) ? 9999 + order : order;
                    console.log(profile.userName + ': ' +profile.order)
                    return (
                        <li key={profile.id}
                            className={`flex flex-col items-center`}
                            style={{ order: profile.order }}>
                            <Link to={`/stories/${profile.userName}/${getFirstUnseenPostId(profile)}`}>
                                <img className={`profilePicture ${getPosts(profile.id).find(post => !post.isSeen) ? 'notSeen' : ''}`} src={profile.pfpPath} alt={profile.userName} />
                            </Link>
                            <h1>{profile.userName}</h1>
                        </li>)
                })}
            </ul>
        </div>
    )
}