import LoginTemplate from "@/components/templates/SignIn/LoginTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 | Watch Movie",
};

export default function LoginPage() {
  return <LoginTemplate />;
}
