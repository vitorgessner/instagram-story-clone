export const Label = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="inputContainer">
            <label className="inline w-fit">{children}</label>
        </div>
    )
}