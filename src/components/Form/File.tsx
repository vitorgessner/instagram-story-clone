import type React from "react";
import { useRef } from "react";
import useProfilesStore from "../../store/profileStore";
import useStoriesStore from "../../store/storiesStore";
import type { RegisterFormI } from "../../types/profileTypes";
import type { AddStoryFormI } from "../../types/storiesTypes";

interface FileProps {
    id: Extract<keyof RegisterFormI, "pfp"> | keyof AddStoryFormI
}

export const File = ({ id }: FileProps) => {
    const {setFormData : setProfilesData} = useProfilesStore();
    const {setFormData : setStoriesData } = useStoriesStore();
    const fileNameRef = useRef<HTMLSpanElement>(null);
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (fileNameRef.current) {
            if (ev.target.files && ev.target.files.length > 0) {
                if (id === 'pfp') {
                    setProfilesData({ [id]: ev.target.files[0]})
                } else {
                    setStoriesData({ [id]: ev.target.files[0]})
                }
                fileNameRef.current.textContent = ev.target.files[0].name;
            } else {
                setProfilesData({});
                setStoriesData({});
                fileNameRef.current.textContent = 'No file selected';
            }
        }
    }

    const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (ev.dataTransfer && ev.dataTransfer.files.length > 0) {
            if (id === 'pfp') {
                setProfilesData({ [id]: ev.dataTransfer.files[0] })
            } else {
                setStoriesData({ [id]: ev.dataTransfer.files[0] })
            }
        }
        const data = ev.dataTransfer?.files
        if (fileNameRef.current && data) fileNameRef.current.textContent = data[0].name
    }

    return (
        <div id="target" onDragOver={e => e.preventDefault()} onDrop={handleDrop} className="min-w-full min-h-full grow border-2 border-zinc-400 py-3">
            <input id='file-upload' onChange={handleChange} className="min-w-full min-h-full h-full hidden" placeholder="drop or click to select an image" type="file" formEncType="multipart/form-data" />
            <label htmlFor="file-upload" className="bg-zinc-200 py-2.5 px-4 cursor-pointer rounded-sm ml-1">Choose or drop an image in the box</label>
            <span id="file-name-display" ref={fileNameRef} className="m-2.5 block">No file selected</span>
        </div>
    )
}