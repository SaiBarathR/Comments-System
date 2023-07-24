import { useEffect, useState } from "react";
import useTreeStructureProvider from "../customHooks/treeStructureProvider";
import CommentsRenderer from "./CommentsRenderer";

export default function Comments() {

    const [commentsData, setCommentsData] = useState({ id: 1, items: [], });
    const { insertNode, editNode, deleteNode } = useTreeStructureProvider();

    useEffect(() => {
        const comments = JSON.parse(localStorage.getItem('comments')) || {}
        comments.id && setCommentsData(comments)
        comments.id && localStorage.clear();
    }, [])

    function handleReload() {
        localStorage.setItem('comments', JSON.stringify(commentsData));
        console.log(commentsData, "in");
    }

    window.addEventListener("beforeunload", handleReload);

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
            <label className="text-left font-semibold text-4xl">Comment Widget</label>
            <CommentsRenderer
                handleInsertNode={handleInsertNode}
                handleEditNode={handleEditNode}
                handleDeleteNode={handleDeleteNode}
                comment={commentsData}
            />
        </div>
    )
}
