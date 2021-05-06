import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Container } from "../../components/Container";
import { DataTable } from "../../components/leads/DataTable";
import { fetcher } from "../../utils/fetcher";

interface LeadHomeProps {}

const LeadHome: React.FC<LeadHomeProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const { data: leadsData, error: _Leadserror } = useSWR(
    `http://ach4l.pythonanywhere.com/covifind/leads/${id}`,
    fetcher
  );

  return (
    <Container>{leadsData && <DataTable leadData={leadsData} />}</Container>
  );
};

export default LeadHome;
