import { Button, Text } from "@chakra-ui/react";

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
      bgGradient={["linear(to-b, #008EBE, #FDFBED)"]}
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
        <Text color="black">Hospitals</Text>
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
          <Text color="black">Beds</Text>
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
          <Text color="black">ICU</Text>
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
          <Text color="black">Venilators</Text>
        </Button>
      )}
    </Container>
  );
};
