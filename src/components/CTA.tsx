import { Button } from "@chakra-ui/react";

import { Options, useSelectedButton } from "../context/ButtonSelection";

import { Container } from "./Container";

interface CTAProps {
  buttonData: Array<string>;
}

export const CTA: React.FC<CTAProps> = ({ buttonData }) => {
  const { setSelection } = useSelectedButton();
  return (
    <Container
      flexDirection="row"
      flexWrap="nowrap"
      overflowX="scroll"
      position="absolute"
      top="0"
      width="100%"
      zIndex={500}
      background="transparent"
      py={3}
    >
      <Button
        width="100%"
        variant="outline"
        flexGrow={3}
        mx={2}
        colorScheme="blue"
        w={"fit-content"}
        onClick={() => {
          setSelection(Options.Hospitals);
        }}
      >
        Hospitals
      </Button>
      {buttonData.includes("Available_Gen") && (
        <Button
          width="100%"
          variant="outline"
          flexGrow={3}
          mx={2}
          colorScheme="blue"
          w={"fit-content"}
          onClick={() => {
            setSelection(Options.Beds);
          }}
        >
          Beds
        </Button>
      )}
      {buttonData.includes("Available_ICU") && (
        <Button
          width="100%"
          variant="outline"
          flexGrow={3}
          mx={2}
          colorScheme="blue"
          w={"fit-content"}
          onClick={() => {
            setSelection(Options.IcuBeds);
          }}
        >
          ICU
        </Button>
      )}
      {buttonData.includes("Available_Venti") && (
        <Button
          width="100%"
          variant="outline"
          flexGrow={3}
          mx={2}
          colorScheme="blue"
          w={"fit-content"}
          onClick={() => {
            setSelection(Options.Venilator);
          }}
        >
          Venilators
        </Button>
      )}
    </Container>
  );
};
