import { Box } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { TwitterIcon, WhatsappIcon } from "react-share";

interface ShareButtonsProps {}

const SHARE_TEXT =
  "https://covi-find.vercel.app/ \n The only Covid Resource tracker that shows them on a map. The information is reliable (government sources), and updated live. Please pass it on to people who might be needing this app to save precious moments during emergency 🙏🏻 🙏🏻";

export const ShareButtons: React.FC<ShareButtonsProps> = ({}) => {
  return (
    <Box flexDirection="row" d="flex">
      <Box my={4}>
        <NextLink href={`https://twitter.com/intent/tweet?text=${SHARE_TEXT}`}>
          <TwitterIcon size={32} round={true} />
        </NextLink>
      </Box>
      <Box m={4}>
        <NextLink href={`whatsapp://send?text=${SHARE_TEXT}`}>
          <WhatsappIcon size={32} round={true} />
        </NextLink>
      </Box>
    </Box>
  );
};
