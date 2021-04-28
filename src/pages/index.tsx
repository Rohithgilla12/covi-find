// import MapComponent from "../components/Map";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Options, SelectedButtonContext } from "../context/ButtonSelection";

const MapComponentNoSSR = dynamic<any>(() => import("../components/Map"), {
  ssr: false,
});

const Index = () => {
  const [selctedButton, setSelection] = useState(Options.Hospitals);

  return (
    <Container height="100vh">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        />
      </Head>
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
