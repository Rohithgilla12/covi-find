import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface ImageTileProps {
  onClick: any;
  imagePath: string;
  tileTitle: string;
}

const ImageTile: React.FC<ImageTileProps> = ({
  onClick,
  imagePath,
  tileTitle,
}) => {
  return (
    <Center>
      <Box
        h={"140px"}
        w={"140px"}
        borderRadius="lg"
        background="#D1E3E0"
        d="flex"
        alignItems="center"
        justifyContent="center"
        as="button"
        flexDirection="column"
        onClick={onClick}
      >
        <Image src={imagePath} alt={tileTitle} height={72} width={72} />
        <Text p={1} fontSize="sm">
          {tileTitle}
        </Text>
      </Box>
    </Center>
  );
};

export default ImageTile;
