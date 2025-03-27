"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import useAuthStore from "@/stores/authStore";

export default function LoginTemplate() {
  const router = useRouter();
  const { login: setLogin } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:8090/api/v1/users/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "로그인 실패");

      const { accessToken, user } = data.data;

      console.log(accessToken, user);
      setLogin({ accessToken, user });
      // router.replace("/");
    } catch (err: any) {
      setError(err.message || "서버 오류");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">로그인</Typography>

        <TextField
          fullWidth
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          로그인
        </Button>
      </Box>
    </Container>
  );
}
