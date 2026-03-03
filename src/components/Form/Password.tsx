import { useFormContext } from "react-hook-form"
import useProfilesStore from "../../store/profileStore"
import type { LoginFormI, RegisterFormI } from "../../types/profileTypes"

interface PasswordProps {
    id: Extract<keyof RegisterFormI, 'password'> | Extract<keyof LoginFormI, 'loginPass'>
}

export const Password = ({ id }: PasswordProps) => {
    const { setFormData } = useProfilesStore()

    const { register, formState: { errors } } = useFormContext<{ loginPass: string, password: string }>();
    console.log(errors.loginPass?.message);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ [id]: e.target.value })
    }

    return <div className="inline">
        <input type="password" {...register(id, {
            required: 'Password is required',
            minLength: { message: 'Password must have at least 4 characteres', value: 4}
        })} onChange={handleChange} />
        {errors.loginPass && <p className="text-red-600">Error: {errors.loginPass?.message}</p>}
        {errors.password && <p className="text-red-600">Error: {errors.password?.message}</p>}
        </div>
}