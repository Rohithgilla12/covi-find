import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <Box p={8} h={"100vh"} background="#FDFBED">
      <Text color="black" fontSize="md">
        We are a dedicated group of volunteers who are trying to help out in
        these tough times. We hope this resource is useful for people in urgent
        needs.
      </Text>
      <NextLink href="/">
        <Button
          leftIcon={<ChevronLeftIcon />}
          width="100%"
          variant="solid"
          my={2}
          colorScheme="blue"
          w={"fit-content"}
        >
          <Text color="black">Home</Text>
        </Button>
      </NextLink>
    </Box>
  );
};

export default About;
