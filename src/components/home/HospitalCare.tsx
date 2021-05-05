import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Dropdown } from "./Dropdown";
import { useRouter } from "next/router";

interface HospitalCareProps {}

export const HospitalCare: React.FC<HospitalCareProps> = ({}) => {
  const router = useRouter();

  return (
    <Box align="center" m={8} p={8}>
      <Dropdown />
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
  );
};
