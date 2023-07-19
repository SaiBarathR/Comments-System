import { useState } from "react";
import useTreeStructureProvider from "../customHooks/treeStructureProvider";
import CommentsRenderer from "./CommentsRenderer";

export default function Comments() {

    const [commentsData, setCommentsData] = useState({ id: 1, items: [], });

    const { insertNode, editNode, deleteNode } = useTreeStructureProvider();

    const handleInsertNode = (folderId, item) => {
        const finalStructure = insertNode(commentsData, folderId, item);
        setCommentsData(finalStructure);
    };

    const handleEditNode = (folderId, value) => {
        const finalStructure = editNode(commentsData, folderId, value);
        setCommentsData(finalStructure);
    };

    const handleDeleteNode = (folderId) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = { ...finalStructure };
        setCommentsData(temp);
    };

    return (
        <div className="flex flex-col gap-6">
            <CommentsRenderer
                handleInsertNode={handleInsertNode}
                handleEditNode={handleEditNode}
                handleDeleteNode={handleDeleteNode}
                comment={commentsData}
            />
        </div>
    )
}
