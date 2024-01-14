import { DecalType } from "../config/constants";

import CustomButton from "./CustomButton";

interface FilePickerProps {
    file: File | undefined;
    setFile: (newFile: File) => void;
    readFile: (type: DecalType) => void;
}

const FilePicker = ({ file, setFile, readFile }: FilePickerProps) => {
    return (
        <div className="filepicker-container">
            <div className="flex-1 flex-col flex">
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files![0])}
                />
                <label htmlFor="file-upload" className="filepicker-label">
                    Upload File
                </label>

                <p className="mt-2 text-gray-500 text-xs truncate">
                    {file ? file.name : "No File Selected"}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
                <CustomButton
                    type="outline"
                    title="Logo"
                    onClick={() => readFile("logoDecal")}
                    className="text-xs"
                />
                <CustomButton
                    type="filled"
                    title="Full"
                    onClick={() => readFile("fullDecal")}
                    className="text-xs"
                />
            </div>
        </div>
    );
};

export default FilePicker;
