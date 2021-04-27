// import MapComponent from "../components/Map";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Options, SelectedButtonContext } from "../context/ButtonSelection";

const MapComponentNoSSR = dynamic<any>(() => import("../components/Map"), {
  ssr: false,
});

const Index = () => {
  const [selctedButton, setSelection] = useState(Options.Hospitals);

  return (
    <Container height="100vh">
      <SelectedButtonContext.Provider value={{ selctedButton, setSelection }}>
        <Container mt={"10vh"}>
          <MapComponentNoSSR />
        </Container>
        <CTA />
      </SelectedButtonContext.Provider>
    </Container>
  );
};

export default Index;
