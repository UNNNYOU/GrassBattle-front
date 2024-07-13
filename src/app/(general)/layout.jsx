import { Header } from "@/components/shared/Header";

export default function AuthLayout({ children }) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}

