import Breadcrumb from "@/components/common/Breadcrumb"
import TermsAndConditions from "@/components/legal/TermsAndConditions"

const Tc: React.FC = () => {
    return (
        <>
            <Breadcrumb pageName="Terms & Conditions" pageTitle="Terms & Conditions"/>
            <TermsAndConditions/>
        </>
    )
}

export default Tc