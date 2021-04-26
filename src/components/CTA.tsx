import { Button } from "@chakra-ui/react";

import { Options, useSelectedButton } from "../context/ButtonSelection";

import { Container } from "./Container";

export const CTA = () => {
  const { setSelection } = useSelectedButton();
  return (
    <Container
      flexDirection="row"
      flexWrap="nowrap"
      overflowX="scroll"
      position="fixed"
      top="0"
      width="100%"
      maxWidth="48rem"
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
    </Container>
  );
};
