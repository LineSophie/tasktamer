import React from "react";

function DeleteTaskConfirmation({confirmRemoveTask, cancelRemoveTask}) {
    return(
        <div className="modalOverlay">
            <div className="modal">
                <div className="modalContent">
                    <p>Are you sure you want to permanently delete this task?</p>
                    <button onClick={confirmRemoveTask}>Yes</button>
                    <button onClick={cancelRemoveTask}>No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTaskConfirmation;