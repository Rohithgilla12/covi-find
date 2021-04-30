import { Container } from "../components/Container";
import React, { useState } from "react";
import { Box, Button, Select, Text } from "@chakra-ui/react";
import useSWR from "swr";
import NextLink from "next/link";
import Image from "next/image";

const Index = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [option, setOption] = useState<string>("");

  const { data: dropDownData, error: _mapError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/dropdown`,
    fetcher
  );
  return (
    <Container
      background={"#FDFBED"}
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box align="center">
        <Image src="/covi-find.png" alt="Logo" height={200} width={150} />
        <Text color="#008EBE" fontSize="4xl">
          CoviFind
        </Text>
        <Text color="#008EBE" fontSize="md">
          Covid Resources Near You
        </Text>
        <Select
          my={2}
          py={2}
          background={"gray.100"}
          color="black"
          onChange={(event) => {
            setOption(event.target.value);
          }}
          placeholder="Select city"
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
          <NextLink href={`map/${option}`}>
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
    </Container>
  );
};

export default Index;
