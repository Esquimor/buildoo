"use client"

import { trpc } from "../trpc";

function RootTrpc({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return children;
  }
  
  export default trpc.withTRPC(RootTrpc)