import { Container } from "../components/Container";
import React, { useState } from "react";
import VercelLogo from "../components/VercelLogo";
import HomePageOptions from "../types/HomePageOptions";
import Image from "next/image";
import { Box, Text } from "@chakra-ui/react";

const Index = () => {
  const [option, setOption] = useState<HomePageOptions>(HomePageOptions.Home);

  return (
    <Container
      background={"#FDFBED"}
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box align="center" w={"100%"}>
        <Image src="/covi-find.png" alt="Logo" height={200} width={150} />
        <Text color="#008EBE" fontSize="4xl">
          CoviFind
        </Text>
        <Text color="#008EBE" fontSize="md">
          Covid Resources Near You
        </Text>
        <Text color="red" fontSize="xl">
          We have stopped updating.
        </Text>
        {/* {option === HomePageOptions.Home && (
          <SimpleGrid p={4} columns={2} spacing={8}>
            <ImageTile
              imagePath="/images/medical.png"
              onClick={() => {
                setOption(HomePageOptions.MedicalResouces);
              }}
              tileTitle="COVID Leads"
            />
            <ImageTile
              imagePath="/images/hospital.png"
              onClick={() => {
                setOption(HomePageOptions.Hospitals);
              }}
              tileTitle="Hospital Care"
            />
          </SimpleGrid>
        )}
        {option === HomePageOptions.Hospitals && <HospitalCare />}
        {option === HomePageOptions.MedicalResouces && <MedicalCare />} */}
      </Box>
      <VercelLogo />
    </Container>
  );
};

export default Index;
