import { useDispatch, useSelector } from "react-redux";
import { executeProcess } from "../store/processThunk";
import type { AppDispatch } from "../store/store";
import type { RootState } from "../store/store"; 
import { fileAssociations } from "../config/fileAssociations";

// interface FileHandlerProps {
//     id: string;
//     name: string;
//     content: string;
//     extension: string;
// }

export const useFileHandler = () => {
    const dispatch = useDispatch<AppDispatch>();
    const fs =  useSelector((state: RootState) => state.fileSystem);

    const openFile = (fileId: string) => {
        const targetFile = fs.files.find(file => file.id === fileId);
        if(!targetFile) return;



        const associatedApp = fileAssociations[targetFile.extension];

        if(associatedApp) {
            dispatch(executeProcess(associatedApp, {fileId}));
        } else {
            alert("No associated application found for this file type.");
        }
    }

    return {
        openFile
    }
   
}