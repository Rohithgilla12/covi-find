import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { ShareButtons } from "../components/ShareButtons";

interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <Box p={8} h={"100vh"} background="#FDFBED">
      <Text color="black" fontSize="md">
        We are a dedicated group of volunteers who are trying to help out in
        these tough times. We hope this resource is useful for people in urgent
        needs.
      </Text>
      <Text color="black" fontSize="md">
        To contribute to this initiative please join our discord server{" "}
        <NextLink href="https://discord.gg/55QYEYKj">
          <Button color="blue" variant="link">
            here.
          </Button>
        </NextLink>
      </Text>
      <Text color="black" fontSize="md">
        Have coding skills? put it to (good) use{" "}
        <NextLink href="https://github.com/Rohithgilla12/covi-find">
          <Button color="blue" variant="link">
            here.
          </Button>
        </NextLink>
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
      <ShareButtons />
    </Box>
  );
};

export default About;
