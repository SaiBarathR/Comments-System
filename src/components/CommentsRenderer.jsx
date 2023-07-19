import { useEffect, useRef, useState } from "react";
import { ReactComponent as Arrow } from "../icons/arrow.svg";
import ButtonRenderer from "./ButtonRenderer";

export default function CommentsRenderer({ handleInsertNode, handleEditNode, handleDeleteNode, comment }) {
    const [commentInput, setCommentInput] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [displayInput, displayComment] = useState(false);
    const [expandChidReplies, setExpandChidReplies] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef?.current?.focus();
    }, [editMode]);

    const handleNewComment = () => {
        setExpandChidReplies(!expandChidReplies);
        displayComment(true);
    };

    const onAddComment = () => {
        if (editMode) {
            if (inputRef.current.value && inputRef.current.value.length > 0) {
                handleEditNode(comment.id, inputRef.current.value);
                setEditMode(false)
            }
        } else {
            setExpandChidReplies(true);
            handleInsertNode(comment.id, commentInput);
            displayComment(false);
            setCommentInput("");
        }
    };

    const handleDelete = () => {
        handleDeleteNode(comment.id);
    };

    const handleClickChildrenEdit = () => {
        if (inputRef.current)
            inputRef.current.innerText = comment.name;
        setEditMode(false);
    };

    const handleClickCancel = () => {
        displayComment(false);
        if (!comment?.items?.length) setExpandChidReplies(false);
    }

    return <div>
        <div className={comment.id === 1 ? "flex gap-4 items-center" : "flex flex-col m-2 p-2  rounded cursor-pointer"}>
            {comment.id === 1 ? (
                <>
                    <textarea
                        type="text"
                        className="resize-none border-slate-400 outline-none border-2 p-2 pt-1 min-w-[290px] h-[55px] rounded-lg"
                        autoFocus
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="add comments"
                        onKeyUp={({ key, shiftKey }) => !shiftKey && key === "Enter" && commentInput.length > 0 && onAddComment()}
                    />
                    <button
                        className="bg-sky-600 capitalize w-[145px] text-white text-sm p-2 rounded-lg hover:scale-110 transition ease-in-out delay-75 cursor-pointer"
                        onClick={commentInput.length > 0 ? onAddComment : null}
                    >
                        Add Comment
                    </button>
                </>
            ) : (
                <div className="flex gap-6 items-center">
                    {editMode ? <textarea
                        className={editMode ? "max-w-[450px] resize-none min-w-[280px] block min-h-[50px] text-left bg-transparent break-all p-2 pt-1 outline-none border-2 border-slate-400 rounded-lg" : "max-w-[450px] p-2 pt-1 outline-none break-all bg-transparent min-h-[50px] block"}
                        defaultValue={comment.name}
                        ref={inputRef}
                    /> : <div className={"max-w-[320px] p-2 text-left items-center flex pt-1 outline-none break-all bg-transparent min-h-[50px]"}>{comment.name}</div>}
                    <div className="flex gap-6 items-center">
                        {editMode ? (<ButtonRenderer buttonList={[{ children: "Save", type: 'positive', onClick: onAddComment }, { children: "Cancel", type: "negative", onClick: handleClickChildrenEdit, }]} />)
                            : (<div className="flex w-full gap-6">
                                <ButtonRenderer buttonList={[{
                                    children: <div className="flex items-center gap-2">
                                        {expandChidReplies ? (
                                            <Arrow className="rotate-180" />) : (
                                            <Arrow />
                                        )}{" "}
                                        Reply
                                    </div>, type: 'positive', onClick: handleNewComment,
                                },
                                { children: "Edit", type: "positive", onClick: () => setEditMode(true) },
                                { children: "Delete", type: "negative", onClick: handleDelete, }]}
                                />
                            </div>)
                        }
                    </div>
                </div>
            )}
        </div>
        <div className="ml-10">
            {displayInput && (
                <div className="flex gap-6 items-center">
                    <textarea
                        type="text"
                        className="resize-none border-slate-400 outline-none border-2 p-2 pt-1 min-w-[250px] h-[55px] rounded-lg"
                        autoFocus
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyUp={({ key, shiftKey }) => !shiftKey && key === "Enter" && commentInput.length > 0 && onAddComment()}
                    />
                    <ButtonRenderer buttonList={[{ children: "Reply", type: 'positive', onClick: onAddComment }, { children: "Cancel", type: "negative", onClick: handleClickCancel, }]} />
                </div>
            )}
            {comment.items && comment.items.length > 0 && comment.items.map((comment) => {
                return (
                    <CommentsRenderer
                        key={comment.id}
                        handleInsertNode={handleInsertNode}
                        handleEditNode={handleEditNode}
                        handleDeleteNode={handleDeleteNode}
                        comment={comment}
                    />
                );
            })}
        </div>
    </div >
}
