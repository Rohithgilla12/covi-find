import { Button, Text, Box, Flex } from "@chakra-ui/react";
import React from "react";

import { Options, useSelectedButton } from "../context/ButtonSelection";

import { Container } from "./Container";

interface CTAProps {
  buttonData: Array<string>;
}

export const CTA: React.FC<CTAProps> = ({ buttonData }) => {
  const { setSelection } = useSelectedButton();
  return (
    <Container
      flexDirection="column"
      flexWrap="nowrap"
      overflowX="scroll"
      position="absolute"
      top="0"
      width="100%"
      zIndex={500}
      background="#008EBE"
      opacity="0.9"
      p={4}
    >
      <Flex direction="row">
        <Button
          width="100%"
          variant="solid"
          flexGrow={3}
          mx={2}
          background="#E5dfdf"
          w={"fit-content"}
          onClick={() => {
            setSelection(Options.Hospitals);
          }}
        >
          <Text fontSize="md" color="black">
            Hospitals
          </Text>
        </Button>
        {buttonData.includes("Available_Gen") && (
          <Button
            width="100%"
            variant="outline"
            flexGrow={3}
            background="#E5dfdf"
            mx={2}
            colorScheme="blue"
            w={"fit-content"}
            onClick={() => {
              setSelection(Options.Beds);
            }}
          >
            <Text fontSize="md" color="black">
              Beds
            </Text>
          </Button>
        )}
        {buttonData.includes("Available_ICU") && (
          <Button
            width="100%"
            variant="outline"
            flexGrow={3}
            mx={2}
            colorScheme="blue"
            background="#E5dfdf"
            w={"fit-content"}
            onClick={() => {
              setSelection(Options.IcuBeds);
            }}
          >
            <Text fontSize="md" color="black">
              ICU
            </Text>
          </Button>
        )}
        {buttonData.includes("Available_Venti") && (
          <Button
            width="100%"
            variant="outline"
            flexGrow={3}
            mx={2}
            colorScheme="blue"
            background="#E5dfdf"
            w={"fit-content"}
            onClick={() => {
              setSelection(Options.Venilator);
            }}
          >
            <Text fontSize="md" color="black">
              Ventilators 
            </Text>
          </Button>
        )}
      </Flex>
      <Box p={2}>
        <Text fontSize="x-small" textAlign="center" color="black">
          Click the button to see the currently available resources
        </Text>
      </Box>
    </Container>
  );
};
