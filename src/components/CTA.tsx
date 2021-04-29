import { Button } from "@chakra-ui/react";

import { Options, useSelectedButton } from "../context/ButtonSelection";

import { Container } from "./Container";

interface CTAProps {
  buttonData: Array<string>;
}

export const CTA: React.FC<CTAProps> = ({ buttonData }) => {
  console.log({ buttonData });
  const { setSelection } = useSelectedButton();
  return (
    <Container
      flexDirection="row"
      flexWrap="nowrap"
      overflowX="scroll"
      position="fixed"
      top="0"
      width="100%"
      py={3}
    >
      <Button
        width="100%"
        variant="outline"
        flexGrow={3}
        mx={2}
        colorScheme="green"
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
          colorScheme="green"
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
          colorScheme="green"
          onClick={() => {
            setSelection(Options.IcuBeds);
          }}
        >
          ICU Beds
        </Button>
      )}
      {buttonData.includes("Available_Venti") && (
        <Button
          width="100%"
          variant="outline"
          flexGrow={3}
          mx={2}
          colorScheme="green"
          onClick={() => {
            setSelection(Options.Venilator);
          }}
        >
          Venilator Beds
        </Button>
      )}
    </Container>
  );
};
