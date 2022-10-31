import React from 'react';

function Error({message}) {
    return (
        <div className="alert alert-danger d-flex justify-content-center align-items-center top-10 text-bg-danger border-danger">
            {message}
        </div>
    );
}

export default Error;
