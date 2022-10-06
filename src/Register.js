import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { Navigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import db from "./FirebaseConfig";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const stockUserInfo = () => {
    addDoc(collection(db, "users"), {
      // doc(userId)でドキュメントIDを指定することができる
      username: registerName, // フィールドにはusernameだけを指定する
      balance: 500,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const userId = userCredential.user.uid;
      stockUserInfo(userId);
      // await createUserWithEmailAndPassword(
      //   auth,
      //   registerEmail,
      //   registerPassword
      // );
      // stockUserInfo(e);
      // console.log(db.userId);
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  /* ↓ログインしているかどうかを判定する */
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {/* ↓ログインしていればマイページを表示 */}
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>新規登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>ユーザ名</label>
              <input
                name="name"
                type="name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </div>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>登録する</button>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
