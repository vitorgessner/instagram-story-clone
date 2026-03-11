import { useCallback, useMemo } from "react";
import useProfilesStore from "../store/profileStore"
import useStoriesStore from "../store/storiesStore";
import type { ProfilesI } from "../types/profileTypes";

const useOrderMap = () => {
    const { profiles, loggedProfile } = useProfilesStore();
    const { getStories, getLastSeenStory } = useStoriesStore();

    const setOrder = useCallback((profile: ProfilesI) => {
        if (profile.id === loggedProfile?.id) return -99;
        const seenPost = getStories(profile.id)?.find(story => !story.isSeen) ?? getLastSeenStory(profile.id);
        if (!seenPost) return 99999999
        const order = Math.floor((new Date().getTime() - seenPost?.date) / 10000)
        const profileOrder = getStories(profile.id)?.findLast(post => post.isSeen) ? 9999 + order : order

        return profileOrder;
    }, [getStories, getLastSeenStory, loggedProfile?.id])

    const orderMap = useMemo(() => {
        const map = new Map<number, number>();
        profiles.forEach(profile => {
            map.set(profile.id, setOrder(profile));
        });
        return map;
    }, [profiles, setOrder])

    return orderMap;
}

export default useOrderMap