import AboutUs from "@/components/about/AboutUs";
import Breadcrumb from "@/components/common/Breadcrumb";

const AboutDetailsPage: React.FC = () => {
    return (
      <>
        <Breadcrumb pageName="our_mission" pageTitle="OUR MISSION"/>
        <AboutUs/>
      </>
    );
  };
  
  export default AboutDetailsPage;