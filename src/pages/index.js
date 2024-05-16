import BaseLayout from "../components/BaseLayout";
import Dashboard from "@/components/MainDashboard/HomeDashboard";

const Home = () => {
  return (
    <>
      <BaseLayout>
        <Dashboard/>
      </BaseLayout>
    </>
  );
};

export default Home;
