import { useParams } from "react-router";
import { stories, type StoriesI } from "../utils/data";
import { getProfileByUser } from "../utils/getProfile";

export const ProgressTicks = () => {
    const currentStories: Array<StoriesI> = [];
    const { userName } = useParams();
    const userId = getProfileByUser(userName!).id;

    stories.map(story => {
        if (story.userId === userId) currentStories.push(story)
    })
    return (
        <ul className="progressTicks">
            {currentStories.map((story) => {
                return <div className="progressLine">
                    <li key={story.id} className="progressBar"></li>
                </div>
            })}
        </ul>
    )
}