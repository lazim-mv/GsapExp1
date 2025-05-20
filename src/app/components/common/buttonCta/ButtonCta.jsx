import React from 'react'
import styles from './ButtonCta.module.css'

const ButtonCta = ({btnText}) => {
    return (
        <div className={`buttonCta ${styles.container}`}>
            {btnText}
        </div>
    )
}

export default ButtonCta