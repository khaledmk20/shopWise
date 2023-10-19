"use client";
import styled, { createGlobalStyle } from "styled-components";
import StyledComponentsRegistry from "./registry";
import { CartContextProvider } from "./components/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

`;

const StyledContainer = styled(ToastContainer)`
  .Toastify__progress-bar {
    background-color: #0d3d29;
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
                <StyledContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
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
