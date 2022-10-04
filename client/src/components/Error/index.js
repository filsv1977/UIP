import React from 'react';

function Error({message}) {
    return (
        <div className="alert alert-danger d-flex justify-content-center align-items-center top-10" role="alert">
            {message}
        </div>
    );
}

export default Error;
