import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import db from "./FirebaseConfig";
import { collection, getDocs, querySnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  const userData = collection(db, "users");
  getDocs(userData).then((querySnapshot) => {
    console.log(querySnapshot.docs.document);
    setUserName(querySnapshot.docs.username);
  });

  /* ↓state変数「user」を定義 */
  const [user, setUser] = useState("");
  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {userName}
      <h1>マイページ</h1>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      <p>{user && user.email}</p>
      <button>ログアウト</button>
    </>
  );
};

export default Dashboard;
