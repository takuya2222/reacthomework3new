import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import db from "./FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", "5UkEx4PkWs3uxfN8AVLZ");
      const docSnap = await getDoc(docRef);
      setUserName(docSnap.data().username);
      setBalance(docSnap.data().balance);
    })();
  }, []);

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
      {userName}さんようこそ！ 残高:{balance}
      <h1>マイページ</h1>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      <p>{user && user.email}</p>
      <button>ログアウト</button>
    </>
  );
};

export default Dashboard;
