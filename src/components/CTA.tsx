import { Button, Text, Box, Flex } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import { Options, useSelectedButton } from "../context/ButtonSelection";
import { fetcher } from "../utils/fetcher";

import { Container } from "./Container";

interface CTAProps {
  buttonData: Array<string>;
  placeId: string;
}

export const CTA: React.FC<CTAProps> = ({ buttonData, placeId }) => {
  const { setSelection } = useSelectedButton();

  const { data: buttonCount, error: _buttonsError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/agg/${placeId}`,
    fetcher
  );

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
          variant="outline"
          flexGrow={1}
          mx={1}
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
            flexGrow={1}
            mx={1}
            background="#E5dfdf"
            colorScheme="blue"
            flexDir="column"
            w={"fit-content"}
            onClick={() => {
              setSelection(Options.Beds);
            }}
          >
            <Text fontSize="md" color="black">
              Beds
            </Text>
            <Text fontSize="x-small" color="black">
              {buttonCount && buttonCount["Available_Gen"]}
            </Text>
          </Button>
        )}
        {buttonData.includes("Available_ICU") && (
          <Button
            width="100%"
            variant="outline"
            flexGrow={1}
            colorScheme="blue"
            mx={1}
            background="#E5dfdf"
            flexDir="column"
            w={"fit-content"}
            onClick={() => {
              setSelection(Options.IcuBeds);
            }}
          >
            <Text fontSize="md" color="black">
              ICU
              <Text fontSize="x-small" color="black">
                {buttonCount && buttonCount["Available_ICU"]}
              </Text>
            </Text>
          </Button>
        )}
        {buttonData.includes("Available_Venti") && (
          <Button
            width="100%"
            variant="outline"
            flexGrow={1}
            mx={1}
            colorScheme="blue"
            background="#E5dfdf"
            w={"fit-content"}
            onClick={() => {
              setSelection(Options.Venilator);
            }}
          >
            <Text fontSize="md" color="black">
              Ventilators
              <Text fontSize="x-small" color="black">
                {buttonCount && buttonCount["Available_Venti"]}
              </Text>
            </Text>
          </Button>
        )}
        {buttonData.includes("Available_Oxy") && (
          <Button
            width="100%"
            variant="outline"
            flexGrow={1}
            mx={1}
            colorScheme="blue"
            background="#E5dfdf"
            w={"fit-content"}
            onClick={() => {
              setSelection(Options.Oxygen);
            }}
          >
            <Text fontSize="md" color="black">
              Oxygen
              <Text fontSize="x-small" color="black">
                {buttonCount && buttonCount["Available_Oxy"]}
              </Text>
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
