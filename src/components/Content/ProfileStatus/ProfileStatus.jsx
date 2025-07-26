import React from "react";
import { useState } from "react";

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <div onDoubleClick={() => {setEditMode(prev => !prev)}}>
            {!editMode && 
                <div>
                    <span>{props.ProfileStatus}</span>
                </div>
            }
            {editMode && 
                <div>
                    <input autoFocus onBlur={() => {setEditMode(prev => !prev)}} value={props.ProfileStatus} />
                </div>
            }
        </div>
    )
}

export default ProfileStatus;