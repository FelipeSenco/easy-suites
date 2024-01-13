"use client";
import { Header } from "@/Components/Header";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </main>
  );
};

export default Layout;
