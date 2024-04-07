"use client"
import React, { useState } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';

const PrivacyPolicy: React.FC = () => {
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleAgree = () => {
    setAgreed(true);
    // Additional logic to save user's agreement status to a database or cookie.
  };

  return (
    <Container className='bg-white'>
      <h1 className="my-4">Privacy Policy</h1>
      <p className="mb-4">GUIDEME takes its data protection and privacy responsibilities seriously.
        Please read the following privacy policy (Privacy Policy) to understand how we use and protect the personal information you provide to us, or we receive and collect when you use our services, including how we collect it, and what we do with it, as well as some of the steps we take to safeguard your personal information.  We hope that this will help you make an informed decision about sharing personal information with us.
        This Privacy Policy may be updated from time to time to keep it up to date with legal requirements and the way we operate our business. You are responsible for reviewing this Privacy Policy periodically and informing yourself of any changes to this Privacy Policy. We suggest that you check back regularly to review any changes. If we make significant changes to this Privacy Policy, we will seek to inform you by notice on our website or email.
      </p>
      <p className="mb-4">
        What Information do we collect about you?
      </p>
      <ListGroup>
      <ListGroupItem>
      Making an Enquiry or Booking a Trip
We will collect certain information from you when you make an enquiry or book a trip with us. Depending on your interaction with us and what products and services you use, typically we collect the following personal information:
      </ListGroupItem>
      <ListGroupItem>
      your full name, date of birth, gender (i.e. male/female/other), title, postal address, phone number, email address, next of kin, dietary requirements, height and weight, travel insurance details, passport details (including nationality and city of birth), passport scan, visa application, visa page scan;
	•	we may also ask for medical / health information, such as pre-existing medical conditions, vaccination status, if you have a disability, medication that requires refrigeration, food allergies etc., some of which is considered sensitive information or special category data under relevant data protection laws; and
	•	any additional information you provide during the booking process to check if a trip is right for you, which may include personal information.
        </ListGroupItem>
      <ListGroupItem>
      We also process and store records of the products and services you have enquired about or purchased from us, as well as collect and process information relevant to your booking (such as flights and accommodation details) that you have not booked through GUIDEME, where this information has been passed to us by our partners and/or third parties.
If GUIDEME is offering visa support or assisting you with applying for a visa in countries such as Iran, Russia, China, etc. you may be asked to provide additional information, including for example, your occupation, your father’s personal information, marital status, your spouse’s personal information, your children’s personal information, employment and education history and social media tags. If you are providing us with the personal information of another person, you must ensure that you inform these persons of the information that you intend to provide to us, and that those you represent are aware of the content of our Privacy Policy and consent to your acting on their behalf.
      </ListGroupItem>
      <ListGroupItem>
      We also collect your technical identity data (including IP addresses, browser type and versions, other technology on the device that you use to access our websites, some of which is collected automatically), as well as information about your usage of our websites as you and others browse our websites (see our separate “Cookies” policy for more information).
We may also receive information about you from other sources. These include business partners, such as our affiliate partners, including Urban Adventures, Haka Tours or Wildlands, members of our GUIDEME Group, travel providers and tour operators, travel agents and other independent third parties. Anything we receive from these sources may be combined with information provided by you. For example, our services are not only made available via our website and mobile apps, but are also integrated into the services of our affiliate partners that you can find online, such as Urban Adventures. When you use any of these services, you may provide reservation details to our business partners who, where permitted, then forward your details to us.
Travel providers (e.g. accommodation, hotel, transport and other similar local providers (Travel Providers) may also share personal information about you with GUIDEME, for example, to ensure fulfillment of your travel reservation, if you have support questions about a tour or trip booked, or if any complaints or disputes arising about your reservation.
Through your user preferences on your GUIDEME booking account, if you link you GUIDEME user account to a social media account (e.g. Facebook or Twitter) you may exchange information between us and that social media provider – though you can at all times choose not to share that data through the user preferences on your account.
 </ListGroupItem>
    </ListGroup>
      {/* Additional content */}
      <p className="mb-4">
    Why do we collect your information?
    We collect, hold and handle your personal information for a variety of business purposes (further information on each of which is set out below), including to:
    </p>
    <ListGroup>
      <ListGroupItem>
      provide you with our and our partner travel products and services, administer your reservations and tours, manage your booking account settings (if you open an GUIDEME user account), and generally administer and manage our customer relationship with you;
	•	if you are a business partner, supplier or agents, to manage our business relationship with you;
	•	if you subscribe or donate to the GUIDME Foundation, to identify and tell you about causes we think you may be interested in, including sending email newsletters (where permitted by you) or sending printed materials to your postal address;
      </ListGroupItem>
      <ListGroupItem>
      •	contact you and process your communications with us, for example, to respond to your queries or complaints, or if we need to tell you something important, or invite you to complete a booking (e.g. if started but not finished a tour reservation online);
	•	generally improve our products and services and your user experience with us ;
        </ListGroupItem>
      <ListGroupItem>
      •	contact you and process your communications with us, for example, to respond to your queries or complaints, or if we need to tell you something important, or invite you to complete a booking (e.g. if started but not finished a tour reservation online);
	•	generally improve our products and services and your user experience with us ;
      </ListGroupItem>
      <ListGroupItem>
      comply with our legal obligations and assist government and law enforcement agencies or regulators; and
	•	carry out our marketing activities, including identify and tell you about other travel related products or services that we think may be of interest to you, process feedback forms and other similar communications.
      </ListGroupItem>
      <ListGroupItem>
      Under applicable privacy and data protection laws (including EU/UK GDPR), for GUIDEME to collect, hold, use, share and process your information we must have a purpose and legal basis to do so. The legal basis may differ depending on your interaction with us and what information we collect and process, which will fall under:
Necessary for the performance of a contract – When you make an enquiry or book a trip with us or any of our partners, we rely on the legal basis that the processing of your personal information is necessary for the performance of your contract with us  i.e. completing a travel reservation as part of your planned itinerary and administering your booking.
Legitimate Interest – Our legitimate interest means your information has a commercial business purpose and is necessary in order to provide a product or service to you and does not override your rights and freedoms as an individual. For example; as a travel customer, we collect your email address for the purpose of communicating with you when necessary to communicate about the product or service you’re requesting or booking, and for GUIDEME to provide you with relevant information. If you are a business partner, we may process your contact information in order to manage our relationship with you. We also rely on our legitimate interests to improve our products and services, and to prevent fraudulent activity on our online platforms and accounts (as set out more specifically below). When using personal data to serve our or a third party's legitimate interest, we will always balance your rights and interests in the protection of your personal information against our rights and interests or those of the third party, including by using your information in a way which is proportionate and respects your privacy.
Legal Obligations - in certain circumstances we will need to use your information to comply with our legal obligations, for example, to comply with local laws in the country you are visiting.
Vital Interest – we rely on  the legal basis of vital interest in certain limited circumstances where it is essential to you and your health that we process your personal information; for example, to contact medical providers / insurance providers in the case of any medical emergency.
Consent – where required by applicable laws, we will obtain your prior consent prior to processing your personal information, including before sending you electronic marketing materials or as otherwise required by law.
You can revoke your consent or object to our marketing in certain circumstances; please see ‘WHAT ARE YOUR RIGHTS’ for further information.
Providing your personal data to us is voluntary. However, we may not be able to fulfill your reservation and your experience may be affected if certain personal information is not provided. We may only be able to provide you with some products and services if we can only collect some personal data. For example, we can’t process your travel booking if we don’t collect your name and contact details.
      </ListGroupItem>
    </ListGroup>
    <h1 className="mb-4">
    <p className="mb-4">
    Why do we collect your information?
    We collect, hold and handle your personal information for a variety of business purposes (further information on each of which is set out below), including to:
    </p>
    </h1>
    <ListGroup>
      <ListGroupItem>
      We use your personal information to arrange and provide you with the products and services you have requested and booked. This includes booking any flights, transportation, accommodation and activities. The following will provide more insight into these purposes:
      </ListGroupItem>
      <ListGroupItem>
      •	Your personal information will be used by our group leaders to identify you and ensure your safety during the trip.
	•	Depending on your destination and services being booked for you, we may be required by the supplier to provide certain types of personal information in order to secure the booking. We may also be legally required by local laws and governments to provide travel documentation such as passport details or a passport scan.
	•	Your contact details will be collected in order to manage our relationship with you, including updates about your booking, providing relevant information and any applicable tickets, handling feedback and complaints, and to contact you in the event of an emergency.
	•	Providing relevant information, which may include sensitive information, to insurance providers, their agents and medical staff in circumstances where we/they need to act on your behalf or in the interest of passengers or in an emergency.
	•	Where permitted by law, where it is in your vital interest or you provide your consent to do so, your medical/health information may be shared to ensure that we understand any specific needs you may have, before and during your trip. Any pre-existing medical conditions could impact your enjoyment of the trip, and by informing us of any conditions, issues or limitations, we can ensure that GUIDEME is better prepared to assist if required.
        </ListGroupItem>
      <ListGroupItem>
      Other than where it is in your vital interests or required by relevant laws, medical/health information can only be used by GUIDEME with your consent. This is because medical/health information is considered sensitive and by consenting, you are showing us that you understand and agree to us processing this information. Providing medical/health information and consenting 
      </ListGroupItem>
      <ListGroupItem>
      to its use by GUIDEME is optional, however, it is highly recommended that information be provided (including if requested) for your safety and wellbeing.
      </ListGroupItem>
    </ListGroup>
    <h1 className="mb-4">
    Research
    </h1>
    <p className='mb-4'>
    We conduct research and analyze your information, including feedback and comments, to help us improve our products and services and to enhance your customer experience, including customizing online content, and to improve your booking and website experience.  We also look for trends and future destinations and itinerary opportunities.
We may use your de-identified data for internal reporting (i.e. if a partnership was successful), creating new marketing strategies and to identify trends.
We may contact you to seek your interest in taking part in research projects, surveys and interviews. These interactions are designed to help us gain insight and understand certain things such as how to improve the services we provide, help us to understand our customers’ needs and expectations, what media they consume, what their concerns are, why do they travel, etc. Your information and details from our research activities may be stored or kept on file for future reference if relevant and will be de-identified where possible.
    </p>
    <h1 className="mb-4">
    How do we collect your information?
    </h1>
    <p className='mb-4'>
    Your information may come to us in a variety of different ways. You may provide information directly to us or our sales agents, travel agents, business partners, including   tour operators and guides, and other third parties (including insurance and medical providers) when communicating via email, phone, letter, web chat or in person. Please see more information here. You may also provide us with your information by filling in an online or printed form, leaving feedback, completing a survey, donating to the GUIDEME Foundation, subscribing to a newsletter or a loyalty program.
Your information may also be provided to us by a friend/family member who is booking on your behalf.
    </p>
    <h1 className="mb-4">
    Other sharing
    </h1>
    <p className='mb-4'>
    We may share or transfer information in connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company. You will be notified via email and/or a prominent notice on the services if a transaction takes place, as well as any choices you may have regarding your information.
We may share your information with relevant regulators, which may include privacy regulators and supervisory authorities in other jurisdictions, and with courts and law enforcement to comply with all applicable laws, regulations and rules, and requests of law enforcement (e.g. police), regulatory and other governmental agencies
We also share personal information with insurance providers and/or medical personnel, which may be for identification of fraud or error, for regulatory reporting and compliance, or if we believe the disclosure is necessary to lessen or prevent a threat to life, health or safety.
We may share in aggregate, statistical form, non-personal information regarding the visitors to our website, traffic patterns, and website usage with our advertisers.
    </p>
    <h1 className='mb-4'>
    Selling data
    </h1>
    <p className='mb-4'>
    We do not and will not sell your personal information under any circumstances.
    </p>
    <h1 className='mb-4'>
    Cross-Border Transfers
    </h1>
    <p className='mb-4'>
    As we have stated earlier, it is necessary for us to share your information with our Group entities, partners and third parties, many of which are located overseas. When we transfer your information overseas, we seek to ensure appropriate privacy, confidentiality and security measures are in place, and that we comply with all applicable data protection and privacy laws.
Further, we operate with different service providers in over 120 countries, across all regions of the world, so it is not possible for us to provide a list of all these countries in this Policy. Our key service providers are located in Australia and the United States.  If you have any specific questions about where or to whom your personal information will be sent, please see the Contact Us section below.
In some jurisdictions, including the EEA, the UK and Australia, data protection laws restrict transferring personal information outside the jurisdiction. We take appropriate steps to ensure that your personal information receives an adequate level of protection (by putting in place appropriate safeguards, such as contractual clauses e.g. EU approved standard contractual clauses), or that we are able to rely on an appropriate derogation under applicable privacy and data protection laws.  You have a right to request access to any safeguard which we use to transfer your personal information outside of the UK and the EEA.
Where we receive requests for information from law enforcement or regulators, we carefully validate these requests before any personal information is disclosed.
You have a right to contact us for more information about the safeguards we have put in place (including a copy of relevant contractual commitments).
    </p>
    <h1 className='mb-4'>
    What are your rights?
    </h1>
    <p className='mb-4'>
    We want you to feel reassured that you have control of the information you provide to us. Subject to certain exemptions, and depending on relevant data protection laws, including in some cases upon our legal basis for processing your information there are certain rights you have over your personal information. These include:
	•	You can ask us to update any inaccurate, incomplete or out-of-date information we hold about you
	•	You can ask us to provide you with a copy of the information we hold on you, or that we transfer that information to another service provider
	•	You may request that we stop processing or using your information
	•	You may request that we delete any / all information we hold about you
	•	You may withdraw consent that you have provided to us
Where possible we will comply with your request, however, there may be instances where we cannot fulfil your request, or there will be consequences if we were to fulfil your request. We will always communicate with you about any consequences before going forward, or give you written reasons for any refusal.
Under certain data protection laws, including the EU/UK GDPR, you may also (subject to certain exceptions):
	•	withdraw consent to our use of your information for marketing purposes;
	•	object to the processing of your personal data, where we collect your personal data for our legitimate interest;
	•	request your personal information be transferred to yourself or a third party without hindrance in a commonly used format.
We may ask you for additional information to confirm your identity and for security purposes, before disclosing the personal information requested to you. We reserve the right to charge a fee where permitted by law, for instance if your request is manifestly unfounded or excessive.
We will only perform the activities outlined above to the extent that such activities will not compromise privacy, security or any other legal interests.
You may also wish to make a complaint about the way we have handled your personal information or other interference with your privacy rights.
You can exercise any of these rights at any time by contacting us (see the Contact Us section) or your relevant privacy or data protection authority.
    </p>
    <h1 className='mb-4'>
    Contact us
GUIDEME Data Protection Officer
<p className='mb-4'>
GUIDEME has appointed a dedicated Data Protection Officer as well as Regional Privacy Officers. If you have any questions about this Privacy Policy or are concerned about how we have handled your personal information, we would like to hear from you. We treat privacy matters seriously and will endeavour to correct the matter.
If you would like to exercise your rights, as listed above, you can also do this by contacting the privacy team via the below form.
Submit an enquiry
 
One of our Privacy Officers will contact you within a reasonable time frame after receiving your enquiry or request to verify who you are in order to locate any accounts or bookings you may have with us or ask any follow up questions to better understand your enquiry.
For the GUIDEME Foundation, please contact us at the details below:
Email: staff@guideme.net
Phone: 4049660715

We will inform you whether we will conduct an investigation and the estimated completion date for the investigation process. After we have completed our enquiries, we will contact you, usually in writing, to advise the outcome and invite a response to our conclusions about the complaint. If we receive a response from you, we will assess it and advise if we have changed our view. If you are unsatisfied by our final response, you may escalate your complaint to the relevant regulatory body.
</p>
    </h1> 
    <h1 className='mb-4'>Complaint to the Data Protection Authority</h1>
    <p className='mb-4'>
    f you have any concerns or complaints about how we are collecting or processing your personal information, you can complain to your local data protection authority. We would ask that you first contact us to seek to resolve the concern or complaint in the first instance.
If you are in the UK/EU, please follow this link to locate the data protection authority most relevant to you:  https://edpb.europa.eu/about-edpb/board/members_en
If you are in Australia, you may contact the Privacy Commissioner at the Office of the Australian Information Commissioner (www.oaic.gov.au/).
    </p>
    <h1 className='mb-4'>Retention</h1>
    <p className='mb-4'>
    We retain and store most information about you in computer systems and databases operated by either us or our external service providers. Some information about you may be recorded in paper files that we store securely.
We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for. In some circumstances we may store your personal information for longer periods of time, for instance where we are required to do so in accordance with legal, regulatory, tax or accounting requirements
In specific circumstances we may store your personal information for longer periods of time so that we have an accurate record of your dealings with us in the event of any complaints or challenges, or if we reasonably believe there is a prospect of litigation relating to your personal information or dealings.
    </p>
    <h1 className='mb-4'>How we keep your information secure</h1>
    <p className='mb-4'>
    GUIDEME is dedicated to keeping your personal information secure. We have implemented various physical, electronic and managerial security procedures in order to protect your information and reduce the risk of loss and misuse, and from unauthorized access, modification, disclosure and interference.
We have put in place adequate procedures to deal with any actual or suspected personal information breach and will notify you and any applicable regulator of any data breach where we are legally required to do so.
Whilst we take all reasonable steps to ensure that your personal information is secure, we would ask you to be aware that the internet is inherently insecure, so please take precautions when disclosing any personal information online to us.
    </p>
    <h1 className='mb-4'>
    PARAPHRASE
    </h1>
    <p className='mb-4'>
    About this Policy
GUIDEME takes its data protection and privacy responsibilities seriously.
Please read the following privacy policy (Privacy Policy) to understand how we use and protect the personal information you provide to us, or we receive and collect when you use our services, including how we collect it, and what we do with it, as well as some of the steps we take to safeguard your personal information.  We hope that this will help you make an informed decision about sharing personal information with us.   
This Privacy Policy may be updated from time to time to keep it up to date with legal requirements and the way we operate our business. You are responsible for reviewing this Privacy Policy periodically and informing yourself of any changes to this Privacy Policy. We suggest that you check back regularly to review any changes. If we make significant changes to this Privacy Policy, we will seek to inform you by notice on our website or email.
We take data protection and privacy seriously at GUIDEME, and we want you to feel secure when you provide us with personal information. This Privacy Policy explains how we use and protect the personal information we receive from you or collect when you use our touristic services. We'll also describe how we gather your personal information and the measures we take to keep it safe.
To ensure that this Privacy Policy complies with legal requirements and reflects our business operations, we may update it from time to time. It is your responsibility to check this Privacy Policy regularly for any changes. If we make significant updates, we will inform you via our website or email."
What data do we gather about you when you use our touristic app?
If you make an inquiry or book a trip with us, we will gather certain personal data from you. Depending on the products and services you utilize and your interactions with us, we generally collect the following information:
		Full name, date of birth, gender, title, postal address, phone number, email address, next of kin, dietary requirements, height and weight, travel insurance information, passport information (including nationality and city of birth), passport scan, visa application, and visa page scan.
		We may also ask for health-related information such as pre-existing medical conditions, vaccination status, disabilities, medication that requires refrigeration, food allergies, and other sensitive information or special category data as required by relevant data protection laws.
		Any additional information you provide during the booking process to check if a trip is suitable for you, which may include personal information.
		Records of the products and services you have enquired about or purchased from us, as well as relevant information related to your booking (such as flights and accommodation details) that you have not booked through GUIDEME, but have been passed to us by our partners or third parties.
		Additional information, including occupation, personal details of family members, employment and education history, and social media tags, if we offer visa support or assist you in applying for a visa in countries such as Iran, Russia, China, and others.
		Technical identity data such as IP addresses, browser types and versions, and other technology used to access our websites, as well as information about your usage of our websites.
		Information received from other sources, such as our affiliate partners, travel providers, tour operators, travel agents, and other independent third parties, which may be combined with information provided by you.
		Personal information about you shared by travel providers (such as accommodation, hotel, transport, and other local providers) to ensure fulfillment of your travel reservation, or to address any support questions, complaints, or disputes arising about your reservation.
		If you link your GUIDEME user account to a social media account, you may exchange information between us and that social media provider through your user preferences on your GUIDEME booking account. However, you can choose not to share that data at any time by modifying your account preferences.
    </p>
      {/* <Button color="primary" className="mt-4" onClick={handleAgree} disabled={agreed}>Agree</Button> */}
    </Container>
  );
};

export default PrivacyPolicy;
