'use client'

import { trpc } from "../../trpc";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Button() {
    const router = useRouter();
  
    const login =  trpc.users.login.useMutation({
      onSuccess(data) {
        localStorage.setItem("token", data.token)
        router.push("/");
      },
      onError(err) {
        setErrorMsg(err.message);
      },
    });
  
    const [errorMsg, setErrorMsg] = useState("");
  
    return (
      <div>

<button onClick={(event) => {
            event.preventDefault();

            login.mutate({name: "lolo"});
          }}>Login</button>
        {errorMsg}
      </div>
    );
  }