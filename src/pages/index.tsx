import { MapComponent } from "../components/Map";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { useState } from "react";
import { Options, SelectedButtonContext } from "../context/ButtonSelection";

const Index = () => {
  const [selctedButton, setSelection] = useState(Options.Hospitals);

  return (
    <Container height="100vh">
      <SelectedButtonContext.Provider value={{ selctedButton, setSelection }}>
        <Container mt={"10vh"}>
          <MapComponent />
        </Container>
        <CTA />
      </SelectedButtonContext.Provider>
    </Container>
  );
};

export default Index;
