import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import NextLink from "next/link";
import { Box, Button, Select } from "@chakra-ui/react";
import { Container } from "../Container";

interface MedicalCareProps {}

export const MedicalCare: React.FC<MedicalCareProps> = ({}) => {
  const [option, setOption] = useState<string>("");

  const { data: dropDownData, error: _mapError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/leads/dropdown`,
    fetcher
  );
  return (
    <>
      <Container
        flexDirection="column"
        flexWrap="nowrap"
        overflowX="scroll"
        position="absolute"
        justifyContent="start"
        bottom="0"
        width="100%"
        zIndex={500}
        background="#008EBE"
        opacity="0.9"
        py={3}
      >
        Data sourced from{" "}
        <NextLink href="https://covidwin.in/">covidwin.in</NextLink>
      </Container>
      <Box m={8} p={8}>
        <Select
          my={2}
          py={2}
          background={"gray.100"}
          color="black"
          onChange={(event) => {
            setOption(event.target.value);
          }}
          placeholder="Select State"
        >
          {dropDownData &&
            dropDownData.map((item: { id: string; name: string }) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
        </Select>
        {option.length > 0 && (
          <NextLink href={`leads/${option}`}>
            <Button
              width="100%"
              my={2}
              py={2}
              variant="solid"
              colorScheme="blue"
            >
              Go
            </Button>
          </NextLink>
        )}
      </Box>
    </>
  );
};
