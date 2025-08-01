"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha inválida"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/thanks");
    } catch (err) {
      console.error(err);
      setError("Email ou senha incorretos.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="bg-black/90 rounded-2xl text-white p-5 flex flex-col gap-5">
      <h2 className="text-xl font-bold text-center">Entrar</h2>

      <Input
        type="email"
        {...register("email")}
        placeholder="Email"
        error={errors.email?.message}
      />

      <Input
        type="password"
        {...register("password")}
        placeholder="Senha"
        error={errors.password?.message}
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <a href="/register" className="text-center">Não possui conta? <strong>Registre-se</strong></a>
    </form>
  );
}
