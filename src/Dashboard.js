import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import db from "./FirebaseConfig";
import { collection, getDoc, querySnapshot, doc } from "firebase/firestore";
import { async } from "@firebase/util";

const Dashboard = () => {
  // async
  // () => {
  const [userName, setUserName] = useState("");

  //   const userData = collection(db, "users");
  //   getDocs(userData).then((querySnapshot) => {
  //     querySnapshot.docs.map((doc) => {
  //       setUserName(doc.get("username"));
  //     });
  //     console.log(querySnapshot.docs);
  //   });

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users");
      const docSnap = await getDoc(docRef);
      setUserName(docSnap.username);
      console.log(setUserName);
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
      {userName}さんようこそ！
      <h1>マイページ</h1>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      <p>{user && user.email}</p>
      <button>ログアウト</button>
    </>
  );
};

export default Dashboard;
