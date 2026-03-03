import useProfileStore from "../../store/profileStore"
import type { RegisterFormI, LoginFormI } from "../../types/profileTypes"
import { useFormContext } from "react-hook-form"

type TextProps = {
    id: Extract<keyof RegisterFormI, "userName"> | Extract<keyof LoginFormI, 'loginName'>
}

export const Text = ({ id }: TextProps) => {
    const { setFormData } = useProfileStore()
    const { register, formState: { errors } } = useFormContext<{ loginName: string, userName: string }>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ [id]: e.target.value })
    }

    return <div className="inline">
        <input id={id} type='text' {...register(id, {
            required: 'Name is required',
            minLength: { message: 'Name must have at least 4 characteres', value: 4}
        })} onChange={handleChange} />
        {errors.loginName && <p className="text-red-600">Error: {errors.loginName.message}</p>}
        {errors.userName && <p className="text-red-600">Error: {errors.userName.message}</p>}
    </div>
}