"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import api from "@/utils/axiosInstance";
import { useAuthStore } from "@/stores/auth/authStore";

export default function SignInTemplate() {
  const router = useRouter();

  // ✅ Provider 기반 훅으로 상태 접근
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/v1/users/signIn", {
        email,
        password,
      });

      const { accessToken, user } = res.data.data;

      // ✅ Zustand 상태에 저장
      login({ accessToken, user });

      // ✅ 홈으로 이동
      // router.replace("/");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || "로그인 실패";
      setError(message);
    } finally {
      setLoading(false);
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
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </Box>
    </Container>
  );
}
