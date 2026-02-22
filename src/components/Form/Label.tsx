export const Label = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="inputContainer">
            {/* <label htmlFor="user">User:</label>
            <input type="text" name="user" id="user" /> */}
            <label className="inline">{children}</label>
        </div>
    )
}