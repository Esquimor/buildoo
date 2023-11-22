"use client"

import { trpc } from "../trpc";

function RootTrpc({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div>{children}</div>
    );
  }
  
  export default trpc.withTRPC(RootTrpc)