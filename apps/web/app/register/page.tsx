"use client"
'use client'

import { trpc } from "../trpc";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
    const router = useRouter();
  
    const register =  trpc.auth.register.useMutation({
      onSuccess() {
        router.push("/login");
      },
      onError(err) {
        setErrorMsg(err.message);
      },
    });
  
    const [errorMsg, setErrorMsg] = useState("");

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    return (
      <div>

        <button onClick={(event) => {
            event.preventDefault();

            register.mutate({ email, password});
          }}>Register</button>
        {errorMsg}

        <br/>
        <br/>

        <div>
          Email: <input value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
          Password: <input value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
        </div>
      </div>
    );
  }