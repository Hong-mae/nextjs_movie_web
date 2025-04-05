import SignInTemplate from "@/components/templates/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 | Watch Movie",
};

export default function SignInPage() {
  return <SignInTemplate />;
}
