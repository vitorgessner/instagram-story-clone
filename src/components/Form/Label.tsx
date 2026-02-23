export const Label = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="inputContainer">
            <label className="inline">{children}</label>
        </div>
    )
}