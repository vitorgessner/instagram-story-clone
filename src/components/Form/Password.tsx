import { useFormContext } from "react-hook-form"
// import useProfilesStore from "../../store/profileStore"

type PasswordFormValues = {
    password: string
}

export const Password = () => {
    // const { setFormData } = useProfilesStore()

    const { register, formState: { errors } } = useFormContext<PasswordFormValues>();

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({ password: e.target.value })
    // }

    return <div className="inline">
        <input type="password" autoComplete="off" {...register('password', {
            required: 'Password is required',
            minLength: { message: 'Password must have at least 4 characters', value: 4},
            // onChange: handleChange
        })} />
        {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
        </div>
}