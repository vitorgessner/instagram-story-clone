import { Label } from "./Label"
import { Text } from "./Text"
import { Password } from "./Password"
import { File } from "./File"
import { useForm, FormProvider, type UseFormReturn } from "react-hook-form";
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

export type FormValues = z.infer<typeof formSchema>

interface FormI {
    children: React.ReactNode,
    onSubmit: (methods: UseFormReturn<FormValues, unknown, FormValues>, data: Partial<FormValues>) => Promise<void | null>
}

const Form = ({ children, onSubmit }: FormI) => {
    const methods = useForm<FormValues>({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
    })

    return <FormProvider {...methods}>
        <form className="flex flex-col min-h-full self-stretch grow" onSubmit={methods.handleSubmit(async (data) => {
            onSubmit(methods, data)
        })
        }>{children}</form>
    </FormProvider>
}

Form.Label = Label
Form.Text = Text
Form.Password = Password
Form.File = File

export default Form