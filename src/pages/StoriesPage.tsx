import { ArrowLeftCircle, ArrowRightCircle, ArrowBigLeft } from "lucide-react"
import { Link } from "react-router"
import { ProfileStories } from "../components/ProfileStories";
import { profiles } from "../utils/data";
import { getProfileById, getProfileByUser } from "../utils/getProfile";
import { useParams } from "react-router";
import { getPosts } from "../utils/getPosts";

export const StoriesPage = () => {
    const screenWidth = window.innerWidth;
    const { userName, postId } = useParams();
    const userId = getProfileByUser(userName!).id
    const posts = getPosts(userId);
    let nextPost, previousPost;
    let previousStoriesCount = 0;
    let nextStoriesCount = 0;
    const sortedProfiles = profiles.sort((profilea, profileb) => profilea.order! - profileb.order!)
    const invertedProfiles = sortedProfiles.toReversed();
    const previousStories: Array<React.ReactElement> = [];

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === Number(postId)) {
            previousPost = posts[i - 1];
            nextPost = posts[i + 1];
        }
    }

    return (
        <main className="bg-indigo-50">
            <ul className="storiesView">
                {
                    invertedProfiles.map((profile, i) => {
                        if (previousStoriesCount >= 2) return
                        if (profile.order! >= getProfileById(userId).order!) {
                            return
                        }
                        if (profile.order! < getProfileById(userId).order!) {
                            previousStoriesCount++;
                            if (screenWidth > 1100 && previousStoriesCount === 1) {
                                previousStories.push(<ProfileStories type='mini' profile={profile} />)
                            }
                            if (screenWidth > 1620 && previousStoriesCount === 2) {
                                previousStories.push(<ProfileStories type='mini' profile={profile} />)
                            }
                            if (i >= invertedProfiles.length - 1 || previousStoriesCount >= 2) {
                                return previousStories.toReversed().map(tes => tes)
                            }
                            return
                        }
                    })
                }

                {screenWidth > 500 && previousPost && <Link to={`/stories/${userName}/${previousPost?.id}`}><ArrowLeftCircle size='24' stroke="#222" /></Link>}
                <ProfileStories />
                {screenWidth > 500 && nextPost && <Link to={`/stories/${userName}/${nextPost?.id}`}><ArrowRightCircle size='24' stroke="#222" /></Link>}

                {sortedProfiles.map((profile, i) => {
                    if (nextStoriesCount >= 2) return
                    if (profile.order! <= getProfileById(userId).order!) {
                        return
                    } else {
                        nextStoriesCount++;
                        if (screenWidth > 1100 && nextStoriesCount === 1) return <ProfileStories type='mini' profile={profile} />
                        if (screenWidth > 1620 && nextStoriesCount === 2) return <ProfileStories type='mini' profile={profile} />
                    }
                })}
            </ul>
            <Link className="absolute left-0 sm:left-4 top-4" to={'/'}><ArrowBigLeft size={24} fill="#222" stroke="#222" /></Link>
        </main>
    )
}