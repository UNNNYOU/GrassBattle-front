import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function AuthLayout({ children }) {
  return (
    <>
      <Header/>
        {children}
      <Footer/>
    </>
  );
}

