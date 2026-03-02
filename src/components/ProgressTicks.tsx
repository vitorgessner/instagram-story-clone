import { useParams } from "react-router";
import { useCallback, useLayoutEffect, useRef } from "react";
import useStoriesStore from "../store/storiesStore";
import useProfilesStore from "../store/profileStore";
import { useNavigate } from "react-router";

export const ProgressTicks = () => {
    const { getStories, getFirstSeenStory, getFirstUnseenStory } = useStoriesStore();
    const { getProfileByUser, profiles } = useProfilesStore();

    const { userName, postId } = useParams();
    const navigate = useNavigate();
    const user = getProfileByUser(userName!);

    const currentStories = getStories(user!.id);

    const localRef = useRef<Record<string, HTMLLIElement | null>>({});

    const goToNext = useCallback(() => {
        if (!currentStories) return;
        const activeIndex = currentStories.findIndex(story => story.id === Number(postId));

        const nextStory = currentStories[activeIndex + 1]
        if (!nextStory) {
            const activeProfileIdx = profiles.findIndex(profile => profile.userName === userName);
            const nextProfile = profiles[activeProfileIdx + 1];

            if (!nextProfile) return navigate('/')
            return navigate(`/stories/${nextProfile.userName}/${getFirstUnseenStory(nextProfile.id)?.id ?? getFirstSeenStory(nextProfile.id)?.id}`)
        }

        navigate(`/stories/${userName}/${nextStory.id}`)
    }, [currentStories, postId, profiles, userName, navigate, getFirstSeenStory, getFirstUnseenStory])

    useLayoutEffect(() => {
        let animation : Animation;
        if (!currentStories) return

        const activeIndex = currentStories.findIndex(story => story.id === Number(postId));

        currentStories.forEach((story, index) => {
            const el = localRef.current[story.id]
            if (!el) return;

            el.getAnimations().forEach(a => a.cancel());

            if (index < activeIndex) {
                el.animate(
                    [{ paddingLeft: '100%' }, { paddingLeft: '100%' }],
                    { duration: 0, fill: 'forwards' }
                )
            }

            if (index === activeIndex) {
                animation = el.animate(
                    [
                        { paddingLeft: '4px' },
                        { paddingLeft: '100%' }
                    ],
                    {
                        duration: 5000,
                        fill: 'forwards'
                    }
                )

                animation.addEventListener('finish', goToNext)
            }

            if (index > activeIndex) {
                el.animate(
                    [
                        { paddingLeft: '4px' }, { paddingLeft: '4px' }
                    ],
                    {
                        duration: 0, fill: 'forwards'
                    }
                )
            }
        })

        return () => {
            animation.removeEventListener('finish', goToNext)
        }
    }, [postId, currentStories, goToNext])

    // useLayoutEffect(() => {
    //     if (!currentStories) return;

    //     const currentIdx = currentStories.findIndex(story => story.id === Number(postId));
    //     if (!currentIdx) return;

    //     const nextStory = currentStories[currentIdx + 1];
    //     if (!nextStory) return;

    //     console.log(localRef.current[Number(postId)])
    //     if (localRef.current[Number(postId)]?.getAnimations()[0].playState === 'finished') {
    //         navigate(`/stories/${userName}/${nextStory.id}`)
    //     }

    // }, [postId, currentStories, navigate, userName])

    return (
        <ul className="progressTicks">
            {currentStories?.map((story) => {
                return <div className="progressLine">
                    <li key={story.id} className="progressBar" ref={(el) => { localRef.current[Number(story.id)] = el }}></li>
                </div>
            })}
        </ul>
    )
}