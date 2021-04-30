import React from "react";
import { Container } from "./Container";
import { Button, Flex, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Container
      flexDirection="column"
      flexWrap="nowrap"
      overflowX="scroll"
      position="absolute"
      bottom="0"
      width="100%"
      zIndex={500}
      background="#008EBE"
      opacity="0.9"
      py={3}
    >
      <Flex direction="row">
        <NextLink href="/about">
          <Button
            width="100%"
            variant="solid"
            m={2}
            colorScheme="blue"
            w={"fit-content"}
          >
            <Text color="black">About Us</Text>
          </Button>
        </NextLink>
        <NextLink href="/">
          <Button
            leftIcon={<ChevronLeftIcon />}
            width="100%"
            variant="solid"
            m={2}
            colorScheme="blue"
            w={"fit-content"}
          >
            <Text color="black">Home</Text>
          </Button>
        </NextLink>
      </Flex>

      <Text textAlign="center" color="black">
        We get the data directly from various government websites. However,
        sometimes the data might be wrong or outdated. Please contact the
        hospital before making any decisions
      </Text>
    </Container>
  );
};
