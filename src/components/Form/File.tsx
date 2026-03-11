import type React from "react";
import { useState } from "react";
// import useProfilesStore from "../../store/profileStore";
// import useStoriesStore from "../../store/storiesStore";
import { useFormContext } from "react-hook-form";

type FileFormValues = {
    image: File
}

export const File = () => {
    // const { setFormData: setProfilesData } = useProfilesStore();
    // const { setFormData: setStoriesData } = useStoriesStore();

    const [fileName, setFileName] = useState<string>('No file selected');

    const { register, formState: { errors } } = useFormContext<FileFormValues>();

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files && ev.target.files.length > 0) {
            setFileName(ev.target.files[0].name);
        } else {
            setFileName('No file selected');
        }
    }

    const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        const data = ev.dataTransfer?.files
        if (data) setFileName(data[0].name);
    }

    return (
        <div>
            <div id="target" onDragOver={e => e.preventDefault()} onDrop={handleDrop} className="min-w-full min-h-full grow border-2 border-dotted border-zinc-400 py-3">
                <input id="file-upload" {...register('image', {
                    required: `Image is required`,
                    onChange: handleChange,
                })} className="min-w-full min-h-full h-full hidden" placeholder="drop or click to select an image" type="file" formEncType="multipart/form-data" />
                <label htmlFor="file-upload" className="text-center bg-zinc-200 py-2.5 cursor-pointer rounded-sm block mx-auto mt-2">Select</label>
                <span id="file-name-display" className="m-2.5 w-full text-center block mx-auto">{fileName}</span>
            </div>
            {errors.image && <span className="text-red-600">{errors.image?.message}</span>}
        </div>
    )
}