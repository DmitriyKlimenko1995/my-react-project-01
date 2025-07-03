import React from "react";
import dialogsmodule from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={dialogsmodule.dialogs}>
            <div className={dialogsmodule.dialogsItems}>
                <div className={dialogsmodule.dialog}>Dmitriy</div>
                <div className={dialogsmodule.dialog}>Oleg</div>
                <div className={dialogsmodule.dialog}>Volodumur</div>
                <div className={dialogsmodule.dialog}>Roman</div>
                <div className={dialogsmodule.dialog}>Taras</div>
            </div>
            <div className={dialogsmodule.messages}>
                <div className={dialogsmodule.message}>dznzmzyxfym</div>
                <div className={dialogsmodule.message}>dznzmzyxfym</div>
                <div className={dialogsmodule.message}>dznzmzyxfym</div>
            </div>
        </div>
        
    );
}

export default Dialogs;