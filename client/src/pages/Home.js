import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/scss/homePage/Home.module.scss";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:3001/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFirstName(response.data.first_name || ''); 
        setLastName(response.data.last_name || '');
        setIsLoggedIn(true);
      } 
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <div className={styles.topLeftContainer}>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className={`${styles.buttonCommon} ${styles.logoutButton}`}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className={`${styles.buttonCommon} ${styles.loginButton}`}
          >
            Login
          </Link>
        )}
      </div>
      <h1 className={styles.fullName} data-firstname={firstName} data-lastname={lastName}> </h1>
      <div className={styles.homeContainer}>
        <nav>
          <ul>
            <li>
              <Link to="/form">
                ประเมินค่า ฯ<span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </li>
            <li>
              <Link to="/">
                ประเมินการลา
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </li>
            <li>
              <Link to="/selectevaluation">
                ผลการประเมิน
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
