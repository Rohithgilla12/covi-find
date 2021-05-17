import { Text, Box, Flex } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import { Options, useSelectedButton } from "../context/ButtonSelection";
import { fetcher } from "../utils/fetcher";

import { Container } from "./Container";
import FilterButton from "./FilterButton";

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
        {buttonData.includes("Available_Gen") && buttonCount && (
          <FilterButton
            onClick={() => {
              setSelection(Options.Beds);
            }}
            count={buttonCount["Available_Gen"]}
            name="Beds"
            option={Options.Beds}
          />
        )}
        {buttonData.includes("Available_ICU") && buttonCount && (
          <FilterButton
            onClick={() => {
              setSelection(Options.IcuBeds);
            }}
            count={buttonCount["Available_ICU"]}
            name="ICU"
            option={Options.IcuBeds}
          />
        )}
        {buttonData.includes("Available_Venti") && buttonCount && (
          <FilterButton
            onClick={() => {
              setSelection(Options.Venilator);
            }}
            count={buttonCount["Available_Venti"]}
            name="Ventilators"
            option={Options.Venilator}
          />
        )}
        {buttonData.includes("Available_Oxy") && buttonCount && (
          <FilterButton
            onClick={() => {
              setSelection(Options.Oxygen);
            }}
            count={buttonCount["Available_Oxy"]}
            name="Oxygen"
            option={Options.Oxygen}
          />
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
