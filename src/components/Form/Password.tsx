import useProfilesStore from "../../store/profileStore"
import type { LoginFormI, RegisterFormI } from "../../types/profileTypes"

interface PasswordProps {
    id: Extract<keyof RegisterFormI, 'password'> | Extract<keyof LoginFormI, 'loginPass'>
}

export const Password = ({id} : PasswordProps) => {
    const { formData, setFormData } = useProfilesStore()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ [id]: e.target.value })
    }

    return <input type="password" id={id} name={id} onChange={handleChange} value={formData[id] ?? ''}/>
}