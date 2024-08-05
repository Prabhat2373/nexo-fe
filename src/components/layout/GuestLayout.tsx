import React from "react";
import MainHeader from "./partials/MainHeader";
import StoreProvider from "@/hoc/app/StoreProvider";
import Container from "../ui/Container";

const GuestLayout = ({ children }) => {
  return (
    <>
      <StoreProvider>
        <MainHeader />
        <main className="my-4">
          <Container>{children}</Container>
        </main>
      </StoreProvider>
    </>
  );
};

export default GuestLayout;
