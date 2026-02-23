import type { ChangeEvent } from "react";

export const File = () => {
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const fileNameDisplay = document.getElementById('file-name-display');

        if (fileNameDisplay) {
            if (ev.target.files && ev.target.files.length > 0) {
                fileNameDisplay.textContent = ev.target.files[0].name;
            } else {
                fileNameDisplay.textContent = 'No file selected';
            }
        }
    }

    const target = document.getElementById('target');

    target?.addEventListener('dragover', (ev) => {
        ev.preventDefault();
    });
    target?.addEventListener('drop', (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer?.files
        if (target.lastChild && data) target.lastChild.textContent = data[0].name
    })

    // const handleDrop = (ev : DragEvent) => {
    //     ev.preventDefault();
    //     const data = ev.dataTransfer?.files
    //     if (target?.lastChild && data) target.lastChild.textContent = data[0].name
    // }

    return (
        <div id="target" onDragOver={e => e.preventDefault()} /*onDrop={handleDrop} state no textContent */ className="min-w-full min-h-full grow border-2 border-zinc-400 py-3">
            <input id='file-upload' onChange={handleChange} className="min-w-full min-h-full h-full hidden" placeholder="drop or click to select an image" type="file" formEncType="multipart/form-data" />
            <label htmlFor="file-upload" className="bg-zinc-200 py-2.5 px-4 cursor-pointer rounded-sm ml-1">Choose or drop an image in the box</label>
            <span id="file-name-display" className="m-2.5 block">No file selected</span>
        </div>
    )
}