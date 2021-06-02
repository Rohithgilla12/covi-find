import { Container, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { CTA } from "../../components/CTA";
import { Footer } from "../../components/Footer";
import VercelLogo from "../../components/VercelLogo";
import { Options, SelectedButtonContext } from "../../context/ButtonSelection";
import { fetcher } from "../../utils/fetcher";

interface HelpMapProps {}

const HelpMap: React.FC<HelpMapProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const [selctedButton, setSelection] = useState(Options.Beds);

  const { data: buttonData, error: _buttonsError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/buttons/${id}`,
    fetcher
  );

  return (
    <SelectedButtonContext.Provider value={{ selctedButton, setSelection }}>
      <Container
        h={"100vh"}
        w={"100vw"}
        background="#FDFBED"
        m={0}
        px={0}
        py={8}
      >
        <Container px={0}>
          {/* <MapComponentNoSSR id={id} /> */}
          <Text color="red" fontSize="xl">
            We have stopped updating.
          </Text>
        </Container>
        {buttonData && (
          <CTA placeId={id as any} buttonData={buttonData.buttons} />
        )}
      </Container>
      <Footer />
      <VercelLogo />
    </SelectedButtonContext.Provider>
  );
};

export default HelpMap;
