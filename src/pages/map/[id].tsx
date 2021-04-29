import { Container } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { CTA } from "../../components/CTA";
import { Options, SelectedButtonContext } from "../../context/ButtonSelection";

const MapComponentNoSSR = dynamic<any>(() => import("../../components/Map"), {
  ssr: false,
});

interface HelpMapProps {}

const HelpMap: React.FC<HelpMapProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const [selctedButton, setSelection] = useState(Options.Hospitals);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: buttonData, error: _buttonsError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/buttons/${id}`,
    fetcher
  );

  return (
    <SelectedButtonContext.Provider value={{ selctedButton, setSelection }}>
      <Container m={0} px={0} py={8}>
        <Container px={0} mt={"10vh"}>
          <MapComponentNoSSR id={id} />
        </Container>
        {buttonData && <CTA buttonData={buttonData.buttons} />}
      </Container>
    </SelectedButtonContext.Provider>
  );
};

export default HelpMap;
