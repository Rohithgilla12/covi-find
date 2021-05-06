import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface LeadHomeProps {}

const LeadHome: React.FC<LeadHomeProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  return <Box>{id}</Box>;
};

export default LeadHome;
