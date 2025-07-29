import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNewStatusText, updateProfileStatusText } from './../../MyData/users-slice';

function UserStatus({ userId }) {
    // const [status, setStatus] = useState("");
    // const [newStatus, setNewStatus] = useState("");

    const dispatch = useDispatch();

    const status = useSelector((state) => state.users.ProfileStatus);
    const newStatusText = useSelector((state) => state.users.newStatusText);

    const [editMode, setEditMode] = useState(false);

    let onStatusChange = (e) => {
        let text = e.target.value;
        dispatch(updateNewStatusText(text));
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Действие при нажатии Enter
            handleUpdate();
            setEditMode(prev => !prev);
        }
    };


    useEffect(() => {
        fetch(`http://localhost:5000/api/status/${userId}`)
            .then(res => res.json())
            .then(data => dispatch(updateProfileStatusText(data.status)))
            .catch(err => console.error("Ошибка загрузки статуса:", err));
    }, [userId]);

    const handleUpdate = () => {
        fetch("http://localhost:5000/api/status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, statusText: newStatusText })
        })
            .then(res => res.json())
            .then(data => {
                if (data.updated) dispatch(updateProfileStatusText(newStatusText));
                dispatch(updateNewStatusText(""));
            });
    };

    return (
        <div onDoubleClick={() => { setEditMode(prev => !prev) }}>
            {!editMode &&
                <div>
                    <span>{status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus onBlur={() => {
                        setEditMode(prev => !prev);
                        handleUpdate();
                    }} value={newStatusText} onChange={onStatusChange} onKeyDown={handleKeyDown} />
                </div>
            }
        </div>
    )
}

export default UserStatus;




/* return (
    <div onDoubleClick={() => { setEditMode(prev => !prev) }}>
        {!editMode &&
            <div>
                <span>{status}</span>
            </div>
        }
        {editMode &&
            <div>
                <input autoFocus onBlur={() => {
                    setEditMode(prev => !prev);
                    handleUpdate();
                }} value={newStatus} onChange={e => setNewStatus(e.target.value)} />
            </div>
        }
    </div>
) */