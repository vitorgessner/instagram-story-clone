import { Label } from "./Label"
import { Text } from "./Text"
import { Password } from "./Password"
import { File } from "./File"
import useProfilesStore from "../../store/profileStore"
import useStoriesStore from "../../store/storiesStore"
import { useNavigate } from "react-router"
import { useForm, FormProvider } from "react-hook-form"

interface FormI {
    children: React.ReactNode, 
    id: string, 
    setModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({ children, id, setModal }: FormI) => {
    const { addProfile, login, loggedProfile } = useProfilesStore()
    const { addToStories } = useStoriesStore()
    const methods = useForm<{ loginPass: string, password: string, loginName: string, userName: string }>()

    const navigate = useNavigate();

    return <FormProvider {...methods}>
    <form className="flex flex-col min-h-full self-stretch grow" id={id} name={id} onSubmit={methods.handleSubmit(async () => {
        if (id === 'register') return addProfile();
        if (id === 'login') return login();
        if (loggedProfile) {
            const newStory = await addToStories(loggedProfile.id);
            if (!newStory) return

            if (setModal) setModal(false);

            navigate(`/stories/${loggedProfile.userName}/${newStory.id}`)
        }
    })
    }>{children}</form>
    </FormProvider>
}

Form.Label = Label
Form.Text = Text
Form.Password = Password
Form.File = File

export default Form