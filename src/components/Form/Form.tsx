import { Label } from "./Label"
import { Text } from "./Text"
import { Password } from "./Password"
import { File } from "./File"
import useProfilesStore from "../../store/profileStore"
import useStoriesStore from "../../store/storiesStore"
import { useNavigate } from "react-router"

const Form = ({ children, id, setModal }: {children: React.ReactNode, id: string, setModal?: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { addProfile, login, loggedProfile } = useProfilesStore()
    const { addToStories } = useStoriesStore()

    const navigate = useNavigate();

    return <form className="flex flex-col min-h-full self-stretch grow" id={id} name={id} method="POST" onSubmit={async (e) => {
        e.preventDefault()
        if (id === 'register') return addProfile();
        if (id === 'login') return login();
        if (loggedProfile) {
            const newStory = await addToStories(loggedProfile.id);
            if (setModal) setModal(false);

            if (newStory) navigate(`/stories/${loggedProfile.userName}/${newStory.id}`)
        }
    }
    }>{children}</form>
}

Form.Label = Label

Form.Text = Text

Form.Password = Password

Form.File = File

export default Form