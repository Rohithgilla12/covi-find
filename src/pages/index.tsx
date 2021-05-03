import { Container } from "../components/Container";
import React, { useState } from "react";
import { Box, Button, Select, Text } from "@chakra-ui/react";
import useSWR from "swr";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

const Index = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const router = useRouter();

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
        <Text color="black" fontSize="lg">
          OR
        </Text>
        <Box m={2} p={2}>
          <Button
            onClick={() => {
              if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async function (
                  position
                ) {
                  const res = await axios.post(
                    "https://ach4l.pythonanywhere.com/covifind/findcity",
                    {
                      lat: position.coords.latitude,
                      long: position.coords.longitude,
                    }
                  );
                  if (res.data.isFound === "Y") {
                    router.push(`/map/${res.data.location}`);
                  } else {
                  }
                });
              }
            }}
            width="100%"
            my={2}
            py={2}
            variant="solid"
            colorScheme="blue"
          >
            Find resources near me
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Index;
