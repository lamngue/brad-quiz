import React from 'react'

export const Required = value => {
    if (!value) {
        return (
            <small className="form-text text-danger">
                {`Please enter`}
            </small>
        )
    }
}

export const EmailValid = value => {
    if (!/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/.test(value)) {
        return (
            <small className="form-text text-danger">
                {`Email is not in right format`}
            </small>
        )
    }
}

export const LengthString = value => {
    if (value.toString().trim().length < 6) {
        return (
            <small className="form-text text-danger">
                {`Password has to be above 6 characters`}
            </small>
        )
    }
}