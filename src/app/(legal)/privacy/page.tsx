import Breadcrumb from "@/components/common/Breadcrumb"
import PrivacyPolicy from "@/components/legal/PrivacyPolicy"

const Privacy: React.FC = () => {
    return (
        <>
            <Breadcrumb pageName="Privacy" pageTitle="Privacy"/>
            <PrivacyPolicy/>
        </>
    )
}

export default Privacy