//src/app/page.tsx
import LoginForm from "@/components/LoginForm";
import { IoHome } from "react-icons/io5";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center"  style={{ backgroundImage: "url('/images/h2.jpg')", backgroundSize: "cover" }}>
      <LoginForm />
      <a href="/" className="text-white bg-black/90 w-20 h-20 justify-center rounded-full flex flex-col items-center mt-10">
        <IoHome size={30}/>voltar
      </a>
    </main>
  );
}

