// ✅ app/layout.tsx
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Footer from "@/components/organisms/Footer";
import { getUserFromCookie } from "@/lib/auth";
import ClientLayout from "./client-layout";
import AuthStoreProvider from "@/stores/auth/authStoreProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserFromCookie();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <AuthStoreProvider initialState={userData ?? undefined}>
              <CssBaseline />
              <ClientLayout>{children}</ClientLayout>
              <Footer />
            </AuthStoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
