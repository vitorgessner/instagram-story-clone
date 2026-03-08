import { Label } from "./Label"
import { Text } from "./Text"
import { Password } from "./Password"
import { File } from "./File"
import useProfilesStore from "../../store/profileStore"
import useStoriesStore from "../../store/storiesStore"
import { useNavigate } from "react-router"
import { useForm, FormProvider } from "react-hook-form";
import { ValidationError } from "../../utils/ValidationError"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    username: z.string().min(3, 'username should have at least 3 characters').nullish(),
    password: z.string().min(6, 'password should have at least 6 characters').nullish(),
    image: z.any()
    .refine(files => !files || files.length === 1, 'At least one image is required')
    .transform(files => !files || files.item(0))
    .refine(file => {
        return !file || ['image/png', 'image/jpeg'].includes(file.type)
    }, 'File must be a PNG or JPEG')
    .refine(file => {
        return !file || file.size <= 1024 * 1024 * 3
    }, 'File size must be less than 3MB').optional()
})

type FormValues = z.infer<typeof formSchema>

interface FormI {
    children: React.ReactNode,
    id: string,
    setModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({ children, id, setModal }: FormI) => {
    const { addProfile, login, loggedProfile } = useProfilesStore()
    const { addToStories, setFormData } = useStoriesStore()
    const methods = useForm<FormValues>({
         mode: 'onChange', 
         resolver: zodResolver(formSchema),
        })

    const navigate = useNavigate();

    return <FormProvider {...methods}>
        <form className="flex flex-col min-h-full self-stretch grow" id={id} name={id} onSubmit={methods.handleSubmit(async (data) => {
            if (id === 'register') {
                try {
                    await addProfile();
                } catch (error) {
                    if (error instanceof ValidationError) {
                        methods.setError('image', error)
                    } else {
                        console.error('Unexpected error: ' + error)
                    }
                }
            }
            if (id === 'login') {
                try {
                    await login();
                } catch (error) {
                    if (error instanceof ValidationError) {
                        methods.setError('password', error)
                    } else {
                        console.error('Unexpected error: ' + error)
                    }
                }
            }
            if (loggedProfile) {
                try {
                    setFormData({ image: data.image });
                    const newStory = await addToStories(loggedProfile.id);
                    if (!newStory) return null;

                    if (setModal) setModal(false);

                    await navigate(`/stories/${loggedProfile.username}/${newStory.id}`)
                } catch (error) {
                    if (error instanceof ValidationError) {
                        methods.setError('image', error)
                    } else {
                        console.error('Unexpected error: ' + error)
                    }
                }
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