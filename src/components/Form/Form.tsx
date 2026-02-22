import { Label } from "./Label"
import { Text } from "./Text"
import { Password } from "./Password"
import { File } from "./File"

const Form = ({ children }: {children: React.ReactNode}) => {
    return <form className="flex flex-col min-h-full self-stretch grow" method="POST" onSubmit={(e) => e.preventDefault()}>{children}</form>
}

Form.Label = Label

Form.Text = Text

Form.Password = Password

Form.File = File

export default Form