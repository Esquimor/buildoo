import { Label } from "@shared-ui";
import { ReactNode } from "react";

interface TrpcStatusProps {
  status: "error" | "success" | "loading";
  children: ReactNode;
  error?: ReactNode;
  loading?: ReactNode;
}

export function TrpcStatus({
  status,
  children,
  error,
  loading
}: TrpcStatusProps) {

  if (status === "loading")
    return loading ? loading : (
      <div
        className="flex items-center"
      >
        <Label
          label="Loading"
        />
      </div>
    )
  else if (status === "error")
    return error ? error : (
      <div
        className="flex items-center"
      >
        <Label
          label="Error"
        />
      </div>
    )
  else {
    return children
  }
}