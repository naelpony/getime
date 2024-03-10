"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function AddUser() {
  const [email, setNewEmail] = useState("");
  const [password, setNewPassword] = useState("");

  const router = useRouter();

  const addUser = async () => {
    const data = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response?.json?.())
      .catch((e) => console.log(e));

      router.push('http://localhost:3000/testtest')
      

  };

  



  return (
    <>
    <h1>{}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="text"
          name="paswword"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Enter</button>
      </form>
    </>
  );
}
