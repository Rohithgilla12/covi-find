// import MapComponent from "../components/Map";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Options, SelectedButtonContext } from "../context/ButtonSelection";
import Head from "next/head";

const MapComponentNoSSR = dynamic<any>(() => import("../components/Map"), {
  ssr: false,
});

const Index = () => {
  const [selctedButton, setSelection] = useState(Options.Hospitals);

  return (
    <Container height="100vh">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <meta name="description" content="Covi Find" />
        <meta name="keywords" content="corona helpline" />
        <title>Covi Find</title>

        <link rel="manifest" href="/manifest.json" />

        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
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
