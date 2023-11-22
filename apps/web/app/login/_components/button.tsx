'use client'

import { trpc } from "../../trpc";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'next-client-cookies';

export default function Button() {
    const router = useRouter();
    const cookies = useCookies();
  
    const login =  trpc.auth.login.useMutation({
      onSuccess(data) {
        cookies.set('currentUser', JSON.stringify(data))
        localStorage.setItem("token", data.token)
        router.push("/");
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

            login.mutate({ email, password});
          }}>Login</button>
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