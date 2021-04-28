import { Container } from "../components/Container";
import Head from "next/head";
import React, { useState } from "react";
import { Button, Select } from "@chakra-ui/react";
import useSWR from "swr";
import NextLink from "next/link";

const Index = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [option, setOption] = useState<string>("");

  const { data: dropDownData, error: _mapError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/dropdown`,
    fetcher
  );
  return (
    <Container height="100vh">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <meta name="description" content="Covi Find" />
        <meta name="keywords" content="corona helpline" />
        <title>Covi Find</title>

        <link rel="manifest" href="/manifest.json" />

        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
      </Head>
      <Select
        my={8}
        py={4}
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
            my={8}
            py={4}
            variant="outline"
            colorScheme="blue"
          >
            Go
          </Button>
        </NextLink>
      )}
    </Container>
  );
};

export default Index;
