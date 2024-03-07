'use client'

import { useState } from "react"



export default function AddUser() {
 
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    sername: '',
    password: ''
  });


  const addUser = () => {
    fetch('http://localhost:4000/api/users', {
      method: "POST",
      body : JSON.stringify({
        newUser,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).catch((e) => console.log(e));
  }


  return (

    <form onSubmit={(e) => {
      e.preventDefault();
      addUser()
    }}>
      <input type="text" 
      name="email"
      value={newUser.email}
      placeholder="Enter email"
      onChange={e => setNewUser({...newUser, email: e.target.value})}
      />
      <input type="text" 
      name="naem"
      value={newUser.name}
      placeholder="Enter name"
      onChange={e => setNewUser({...newUser, name: e.target.value})}      
      />
      <input type="text" 
      name="sername"
      value={newUser.sername}
      placeholder="Enter sername"
      onChange={e => setNewUser({...newUser, sername: e.target.value})}
      />
      <input type="text" 
      name="paswword"
      value={newUser.password}
      placeholder="Enter password"
      onChange={e => setNewUser({...newUser, password: e.target.value})}
      />

      <button type="submit">Enter</button>


    </form>

  );

}