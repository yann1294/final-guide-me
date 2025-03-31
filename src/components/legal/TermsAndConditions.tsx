"use client"
import React, { useState } from 'react';
import { Container, Button } from 'reactstrap';

const TermsAndConditions: React.FC = () => {
    const [agreed, setAgreed] = useState<boolean>(false);

    const handleAgree = () => {
        setAgreed(true);
        // Additional logic to save user's agreement status to a database or cookie.
    };

    return (
        <Container className='bg-white'>
            <h1 className="my-4">Terms and Conditions</h1>
            <p className="mb-4">Job Applicant</p>
            <p className="mb-4">
                If you submit a job application to us, we will gather your resume information and accompanying documents, which may contain personal details. In addition, we will ask you to complete a form and provide personal information where required, such as your name, contact information, home address, date of birth, gender, ethnicity, accessibility needs, and details regarding your passport and immigration status.
            </p>
            {/* Other paragraphs */}
            <h1 className="my-4">Cookies & Website Usage</h1>
            <p className='mb-4'>
                We utilize a common technology called "cookies" and web server log on our websites. To learn about the specific cookies we employ, please consult our Cookies Policy. Our Privacy Policy was most recently revised in February of 2022.
            </p>
            <h1 className='mb-4'>Entry, health and visa requirements</h1>
            <p className='mb-4'>Discover up-to-date details regarding visa and travel document requirements, as well as COVID-19 vaccination and quarantine regulations imposed by local governments worldwide. Click the link to learn more.</p>
            <h2 className='mb-4'>Arrival and Departure</h2>
            <p className='mb-4'>
                The beginning and end of each trip will take place in a town that is accessible via plane, train, boat, or bus. The specific locations for each trip can be found on the corresponding page in the catalog, as well as in your pre-departure information. Depending on the tour, it may be recommended to arrive at the starting point the night before the trip departs. If this is the case, we can assist you in making hotel reservations by either providing you with instructions to contact the hotel yourself or by making the reservations for you. In the event that we make the reservations for you, the hotel will require a credit card number to hold the reservation or occasionally a check sent in advance of your arrival. We will inform you of the payment policies for each specific hotel.
            </p>
            <h2 className='mb-2'>Accommodations</h2>
            <p className='mb-2'>
                Trip prices are based on two people per room. If you are traveling alone, we will assign you a roommate of the same gender, or you can choose to room alone, paying the single supplement. There are a limited number of single rooms available on all trips. If you choose to be paired with a roommate and we are unable to pair you, we will invoice you for the single supplement 60 days prior to the trip. If we are subsequently able to find you a roommate, we will gladly refund the single supplement.
            </p>
            <h2 className='mb-4'>Pricing</h2>
            <p className='mb-4'>
                Included in the trip price are high-quality accommodations that reflect the visited region (double occupancy), breakfasts, most dinners, and some lunches (as specified in trip details), park entry fees (unless otherwise noted), scheduled admission fees to historic sites, gratuities for hotels, meals, and baggage, trip literature, experienced guides, support vehicles, and all transportation during the trip by bus, boat, train, plane, cable car, or funicular (unless otherwise noted). The trip price does not include air and land transportation to and from the trip, beverages, personal expenses, and non-scheduled visits and activities.
                The trip price excludes certain expenses such as transportation to and from the trip location via air or land, beverages, personal expenses, as well as any visits or activities that are not included in the scheduled itinerary.
            </p>
            <h2 className='mb-4'>Customers</h2>
            <p className='mb-4'>
                No children are allowed.
                Booking with us requires to be 18 and up.
                Our team of Program Managers and Guest Experience specialists are constantly keeping up-to-date with the latest news and information on COVID-19 and its variants, including reviewing local and international guidelines, health department responses, entry and exit requirements, and other policies that could impact travel or the trip experience. We closely monitor local regulations to ensure that we can continue with our planned activities or similar ones. If travel restrictions affect our ability to enter or leave a destination or follow our planned itinerary, we will make every effort to keep our guests informed.
                To communicate with travelers, our team will share any changes to destination rules, regulations, and trip operations, as well as keep you informed about health and safety guidelines. We may also refer you to third-party resources if needed. Since travel guidelines are constantly changing around the world, we encourage everyone to keep an eye on local guidelines and to contact our team directly with any questions.
                If a traveler feels unwell or experiences any signs of illness during a trip, our partner, Global Rescue, is available 24/7 to provide remote assistance. Eligible guests can access advice on necessary steps and precautions, and Global Rescue can also help arrange in-person local care at approved medical facilities. Please refer to pre-trip materials for more information, and some restrictions may apply.
                Apart from complying with the aforementioned guidelines and ensuring that travelers have a comfortable trip experience, our trip leaders are also taking extra measures.
                They carry additional supplies such as masks and hand sanitizers for the group in case anyone loses or forgets them. Travelers are advised to bring their own personal supplies, including masks, hand sanitizers, and disinfectant wipes, to ensure their comfort during the trip. It is recommended to refer to the guidelines provided by specific airlines and packages, as they vary.
                The trip leaders are encouraging healthy behaviors by reminding travelers of safety practices and leading by example. While they cannot prevent COVID-19, they are doing their best to minimize the risk of infection and ensure a positive trip experience.
                Additionally, trip leaders are adapting the on-trip experience by staying updated with the best practices for staying healthy during the pandemic, and making necessary adjustments to ensure physical distancing, frequent hand-washing, and other precautions are taken.

            </p>
            <h2 className='mb-2'>Disputes</h2>
            <p className='mb-4'>
                Any disputes that may arise from or relate to the site and these terms of use will be governed by the laws of the State of New York and will be resolved in courts located in the County of New York, New York.
                If you have any cause of action or claim relating to the site or these terms of use, it must be initiated within one year from when the cause of action first occurred. If it is not initiated within this time frame, the claim or cause of action will be permanently barred, and you will have waived any right to pursue it.
            </p>
            <Button color="primary" className="mt-4" onClick={handleAgree} disabled={agreed}>Agree</Button>
        </Container>
    );
};

export default TermsAndConditions;
