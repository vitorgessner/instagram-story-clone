import useProfileStore from "../../store/profileStore"
import { useFormContext } from "react-hook-form"

type TextFormValues = {
    username: string
}

export const Text = () => {
    const { setFormData } = useProfileStore()
        const { register, formState: { errors } } = useFormContext<TextFormValues>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ 'username': e.target.value })
    }

    return <div className="inline">
        <input type='text' autoComplete="off" {...register('username', {
            required: 'Username is required',
            minLength: { message: 'Username must have at least 4 characters', value: 4},
            onChange: handleChange
        })} />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}
    </div>
}