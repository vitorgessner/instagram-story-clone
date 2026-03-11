import useProfilesStore from "../store/profileStore";
import useStoriesStore from "../store/storiesStore";
import useOrderMap from "./useOrderMap";

const useStoryNavigation = (username: string | undefined, postId: string | undefined) => {
    const { profiles, getProfileByUser } = useProfilesStore();
    const { getStories } = useStoriesStore();
    const orderMap = useOrderMap();

    const somethingNull = { previousStories: [], nextStories: [], previousPost: null, nextPost: null }

    if (!username || !postId) return somethingNull

    const user = getProfileByUser(username);

    if (!user) return somethingNull

    const order = [...orderMap];
    const sortedProfiles = order.sort((profileA, profileB) => profileA[1] - profileB[1])
        .map(sorted => sorted[0])
        .map(sorted =>
            profiles.find(profile => profile.id === sorted)
        )

    const invertedProfiles = sortedProfiles.toReversed();

    const previousStories = invertedProfiles.filter((profile) =>
        !!profile &&
        profile?.id !== user.id &&
        !!getStories(profile.id) &&
        orderMap.get(user.id) != null &&
        orderMap.get(profile.id)! < orderMap.get(user.id)!
    ).slice(0, 2)

    const nextStories = sortedProfiles.filter((profile) => {
        if (!profile) return null;
        const userOrder = orderMap.get(user.id);
        const profileOrder = orderMap.get(profile.id);
        if (!userOrder || !profileOrder) return null;
        if (userOrder && profileOrder <= userOrder) return null
        if (profile.id === user.id) return null
        if (!getStories(profile.id)) return null
        if (userOrder && profileOrder >= userOrder) return profile

    })

    const posts = getStories(user.id);
    if (!posts) return somethingNull

    const activeIndex = posts.findIndex(post => post.id === Number(postId));
    const previousPost = posts[activeIndex - 1] ?? null;
    const nextPost = posts[activeIndex + 1] ?? null

    return { previousStories, nextStories, previousPost, nextPost }
}

export default useStoryNavigation