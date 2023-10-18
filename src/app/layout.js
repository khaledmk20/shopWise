"use client";
import { createGlobalStyle } from "styled-components";
import StyledComponentsRegistry from "./registry";
import { CartContextProvider } from "./components/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

`;
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <CartContextProvider>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <body>{children}</body>
          </QueryClientProvider>
        </CartContextProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
