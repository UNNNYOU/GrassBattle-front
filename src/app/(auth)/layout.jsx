import { AuthHeader } from "@/components/shared/AuthHeader";

export default function AuthLayout({ children }) {
  return (
    <>
      <AuthHeader/>
      {children}
    </>
  );
}

