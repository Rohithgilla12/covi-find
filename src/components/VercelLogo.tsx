import React from "react";
import Image from "next/image";
import { Container } from "./Container";
import NextLink from "next/link";

interface VercelLogoProps {}

const VercelLogo: React.FC<VercelLogoProps> = ({}) => {
  return (
    <NextLink href="https://vercel.com/?utm_source=covi-find&utm_campaign=oss">
      <Container
        position="absolute"
        zIndex={500}
        bottom="0"
        right="0"
        width="fit-content"
      >
        <Image
          src="/vercel/powered-by-vercel.svg"
          alt="Vercel"
          width={90}
          height={28}
        />
      </Container>
    </NextLink>
  );
};

export default VercelLogo;
