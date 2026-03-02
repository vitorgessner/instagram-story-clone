import useProfileStore from "../../store/profileStore"
import type { RegisterFormI, LoginFormI } from "../../types/profileTypes"

type TextProps = {
    id: Extract<keyof RegisterFormI, "userName"> | Extract<keyof LoginFormI, 'loginName'>
}

export const Text = ({id} : TextProps) => {
    const { formData, setFormData } = useProfileStore()
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ [id]: e.target.value })
    }

    return <input className="inline" id={id} name={id} type='text' onChange={handleChange} value={formData[id] ?? ''}/>
}