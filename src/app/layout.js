"use client";
import styled, { createGlobalStyle } from "styled-components";
import StyledComponentsRegistry from "./registry";
import { CartContextProvider } from "./components/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const GlobalStyles = createGlobalStyle`
:root {
  --toastify-color-success: #0D3D29;
}
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
            <body>
              <>
                <ToastContainer
                  position="top-center"
                  hideProgressBar={false}
                  newestOnTop={false}
                  autoClose={500}
                  closeOnClick
                  rtl={false}
                  draggable
                  theme="colored"
                />
                {children}
              </>
            </body>
          </QueryClientProvider>
        </CartContextProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
