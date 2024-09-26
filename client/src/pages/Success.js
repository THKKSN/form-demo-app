import React from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/scss/successPage/SuccessPage.module.scss';

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.successContainer}>
            <h2>Submission Successful!</h2>
            <button className={styles.backButton} onClick={() => navigate("/")}>
                Go to Home
            </button>
        </div>
    );
};

export default Success;
