export const File = () => {
    document.getElementById('file-upload')?.addEventListener('change', function () {
        const fileNameDisplay = document.getElementById('file-name-display');

        if (this?.files && this?.files.length > 0) {
            fileNameDisplay.textContent = this.files[0].name;
        } else {
            fileNameDisplay.textContent = 'No file selected';
        }
    })

    const target = document.getElementById('target');

        console.log(target)
        target?.addEventListener('dragover', (ev) => {
            ev.preventDefault();
        });
        target?.addEventListener('drop', (ev) => {
            ev.preventDefault();
            const data = ev.dataTransfer?.files
            if (target.lastChild) target.lastChild.textContent = data[0].name
        })

    return (
        <div id="target" className="min-w-full min-h-full grow border-2 border-zinc-400 py-3">
            <input id='file-upload' className="min-w-full min-h-full h-full hidden" placeholder="drop or click to select an image" type="file" formEncType="multipart/form-data" />
            <label htmlFor="file-upload" className="bg-zinc-200 py-2.5 px-4 cursor-pointer rounded-sm ml-1">Choose or drop an image in the box</label>
            <span id="file-name-display" className="ml-2.5">No file selected</span>
        </div>
    )
}