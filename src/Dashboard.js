import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import db from "./FirebaseConfig";
import { collection, getDocs, querySnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  const userData = collection(db, "users");
  getDocs(userData).then((querySnapshot) => {
    querySnapshot.docs.map((doc) => {
      querySnapshot.docs.map((doc) => {
        setUserName(doc.get("username"));
      });
      console.log(querySnapshot.docs);
    });
  });

  // useEffect(() => {
  //   (async () => {
  //     const docRef = doc(db, "users", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     console.log(docSnap);
  //   })();
  // }, []);

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
