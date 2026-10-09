import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell, Section } from "@/components/site/page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — THE CASSTLE CO" },
      { name: "description", content: "Privacy Policy of The Casstle Co." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        intro="At The Casstle Co., we respect your privacy and are committed to handling your personal information responsibly and transparently."
        variant="dark"
      />

      <div className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-6 md:px-10 lg:px-16 text-muted-foreground space-y-6 text-[15px] leading-relaxed">
          
          <p className="font-semibold text-foreground">The Casstle Co.<br />
          Operated by Per Square Feet Infraventures LLP<br />
          Effective Date: 9 October 2026<br />
          Last Updated: 9 October 2026</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">1. Introduction</h2>
          <p>At The Casstle Co., we respect your privacy and are committed to handling your personal information responsibly and transparently.</p>
          <p>The Casstle Co. is a real estate and property advisory brand operated by Per Square Feet Infraventures LLP, based in Gurugram, Haryana, India.</p>
          <p>We provide curated access to second-home real estate opportunities, including villas, farmhouses, weekend homes, lifestyle properties and selected resale opportunities. Our activities may also involve property developers, property owners and relevant professional service providers.</p>
          <p>This Privacy Policy explains how we collect, use, store, disclose and otherwise process personal information when you visit our website, explore properties, submit an enquiry, request a consultation, register your interest, subscribe to updates or communicate with us.</p>
          <p>Please read this Policy carefully. Where applicable law requires consent for a particular processing activity, we will seek that consent through an appropriate mechanism.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">2. Who We Are</h2>
          <p>For the purposes of this Privacy Policy:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Legal entity: Per Square Feet Infraventures LLP</li>
            <li>Brand name: The Casstle Co.</li>
            <li>Office address: C-21A, Block C, Sushant Lok, Phase I, Sector 43, Gurugram, Haryana – 122009, India</li>
            <li>Website: https://www.thecasstle.co</li>
            <li>Privacy contact: official.persquarefeet@gmail.com</li>
          </ul>
          <p>In this Policy, “The Casstle Co.”, “we”, “us” and “our” refer to Per Square Feet Infraventures LLP operating under its brand name The Casstle Co.</p>
          <p>“You” and “your” refer to an individual who visits our website, shares information with us or otherwise interacts with our business.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">3. Scope of This Policy</h2>
          <p>This Policy applies to personal information collected through:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Our website and its enquiry forms</li>
            <li>Property discovery and advisory enquiries</li>
            <li>Buyer requirement and property preference forms</li>
            <li>Requests for property information, shortlists or site visits</li>
            <li>Newsletter and marketing subscriptions</li>
            <li>Email, telephone and WhatsApp Business communications</li>
            <li>Digital advertising and marketing campaigns</li>
            <li>Referrals and introductions</li>
            <li>Interactions with property developers, owners and business partners facilitated through us</li>
          </ul>
          <p>This Policy does not govern third-party websites or services that we do not own or control. Those services may have separate privacy policies.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">4. Information We Collect</h2>
          <p>The information we collect depends on how you interact with us and what you choose to provide.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">4.1 Personal and Contact Information</h3>
          <p>We may collect your:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Full name</li>
            <li>Mobile number</li>
            <li>Email address</li>
            <li>City or location</li>
            <li>Preferred communication method</li>
            <li>Other contact information voluntarily provided by you</li>
          </ul>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">4.2 Property Preferences and Enquiry Information</h3>
          <p>When you explore second-home opportunities or request assistance, we may collect:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Preferred destination or property location</li>
            <li>Property type, such as a villa, farmhouse, weekend home or second home</li>
            <li>Budget range</li>
            <li>Intended use, including personal, family, lifestyle or potential rental use</li>
            <li>Preferred property features and amenities</li>
            <li>Purchase timeline</li>
            <li>Site-visit requests and scheduling preferences</li>
            <li>Questions, requirements and other details you share with us</li>
          </ul>
          <p>We use this information to understand your enquiry and identify potentially relevant property opportunities.</p>
          <p>You are not required to provide information that is unnecessary for your enquiry. Please do not submit sensitive financial documents or other sensitive information unless it is reasonably necessary and the purpose for collecting it has been explained to you.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">4.3 Newsletter and Marketing Information</h3>
          <p>If you subscribe to our updates or choose to receive marketing communications, we may collect your contact details, subscription preferences and information necessary to manage your communication choices.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">4.4 Referral Information</h3>
          <p>If you introduce someone to The Casstle Co. or participate in a referral activity, we may receive that person's name, contact information and limited information about the introduction.</p>
          <p>Please share another person's contact details only where you are authorised to do so and have taken appropriate steps to inform them. Where practicable, we encourage you to share our website or enquiry form so that the individual can contact us directly.</p>
          <p>We may contact a referred individual where permitted by applicable law. We will respect any request not to receive further communications.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">4.5 Business and Developer Information</h3>
          <p>For business enquiries, we may collect professional contact details, company information, role or designation, project details and information relevant to a potential commercial relationship.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">4.6 Website and Technical Information</h3>
          <p>When you visit our website, certain information may be collected through server logs, cookies, analytics tools and similar technologies, depending on their configuration. This may include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>IP address</li>
            <li>Browser and device information</li>
            <li>Operating system</li>
            <li>Pages visited and interactions with the website</li>
            <li>Date, time and duration of visits</li>
            <li>Referring website or campaign source</li>
            <li>Cookie identifiers and similar online identifiers</li>
            <li>Website performance and security information</li>
          </ul>
          <p>The information collected depends on the features and tools enabled on the website and your privacy choices.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">4.7 Communications</h3>
          <p>We may retain relevant correspondence, enquiry records and follow-up notes to respond to your requests and manage our business relationship with you.</p>
          <p>We will provide appropriate notice and obtain consent where required before recording calls or using transcription technologies.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">5. How We Collect Information</h2>
          <p>We may collect information:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Directly from you, when you submit a form, contact us or request property information</li>
            <li>Through our website, using enquiry forms, cookies, analytics and other enabled technologies</li>
            <li>Through communication and marketing platforms, when you interact with our campaigns or contact us through those platforms</li>
            <li>Through referrals, where someone introduces you to our business</li>
            <li>Through property-related interactions, where relevant information is lawfully shared with us by a property owner, developer or other party in connection with an enquiry</li>
          </ul>
          <p>Where applicable, we will provide the required privacy notice and obtain consent or identify another lawful basis before processing personal information.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">6. How We Use Your Information</h2>
          <p>We may use your information for the following purposes.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.1 Responding to Enquiries</h3>
          <p>To answer your questions, provide requested property information and communicate with you about the opportunities or services in which you have expressed an interest.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.2 Understanding Your Requirements</h3>
          <p>To understand your preferences, budget range, intended use and timeline so that we can identify potentially relevant properties, destinations or projects.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.3 Property Discovery and Advisory</h3>
          <p>To support property comparisons, coordinate discussions and provide information relevant to your stated requirements. Recommendations depend on the information available and are not guarantees of suitability, legal compliance, investment performance or future returns.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.4 Property Visits and Introductions</h3>
          <p>To coordinate site visits, arrange meetings and share relevant information with property developers or owners where necessary to fulfil your request.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.5 Business Relationships</h3>
          <p>To manage communications and enquiries involving property developers, owners, consultants and other business contacts.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.6 Marketing and Updates</h3>
          <p>Where permitted by law and subject to any required consent or preferences, to send relevant property updates, new project information, destination insights, newsletters, events and other communications relating to The Casstle Co.</p>
          <p>You can opt out of promotional communications at any time through the available unsubscribe mechanism or by contacting us.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.7 Website Analytics and Improvement</h3>
          <p>To understand website usage, improve functionality, assess content performance, troubleshoot issues and improve the visitor experience, subject to applicable law and your privacy choices.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.8 Advertising and Campaign Measurement</h3>
          <p>Where advertising technologies are enabled and legally permitted, we may use relevant information to measure campaign performance, understand engagement and support advertising or remarketing activities.</p>
          <p>Non-essential tracking technologies will be managed in accordance with applicable consent requirements.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">6.9 Security and Legal Compliance</h3>
          <p>To maintain security, prevent misuse, comply with applicable legal obligations, respond to lawful requests and establish, exercise or defend legal claims where necessary.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">7. Cookies, Analytics and Advertising Technologies</h2>
          <p>Our website may use cookies and similar technologies to support website functionality, remember preferences, understand website usage and measure marketing effectiveness.</p>
          <p>Depending on the configuration of our website, these technologies may include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Essential technologies, required for core functionality or security</li>
            <li>Analytics technologies, including Google Analytics, to understand website usage</li>
            <li>Advertising technologies, including Meta Pixel, where enabled, to measure advertising performance or support audience and campaign functions</li>
            <li>Preference technologies, where used, to remember selected settings</li>
          </ul>
          <p>These technologies may collect technical information such as online identifiers, device information, browsing interactions and campaign-related events. Depending on the tool and its configuration, information may be transmitted to the relevant service provider.</p>
          <p>Where required by applicable law, we will seek consent before enabling non-essential cookies or similar tracking technologies. You may be able to manage your preferences through our cookie consent mechanism and your browser settings.</p>
          <p>Disabling certain technologies may affect some website features.</p>
          <p>Our use of Google Analytics, Meta Pixel and other technologies is subject to their respective terms and privacy practices. Their presence on our website does not mean that every feature is necessarily enabled at all times.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">8. How We Share Your Information</h2>
          <p>We share personal information only where reasonably necessary for the purposes described in this Policy, where you direct us to do so, or where otherwise permitted or required by applicable law.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">8.1 Property Developers and Owners</h3>
          <p>When you enquire about a property or request an introduction, we may share relevant contact details and property requirements with the associated developer, property owner or authorised representative so that your enquiry can be addressed.</p>
          <p>We aim to share information relevant to the specific enquiry rather than unrelated personal details.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">8.2 Website and Business Service Providers</h3>
          <p>We use or may use third-party providers to support our website and business operations, including:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Customer relationship management (CRM) systems</li>
            <li>Website forms and lead-capture tools</li>
            <li>Google Analytics</li>
            <li>Meta advertising technologies</li>
            <li>WhatsApp Business</li>
            <li>Email marketing platforms</li>
            <li>Website hosting, cloud infrastructure and security services</li>
            <li>Cookie consent and preference-management tools</li>
          </ul>
          <p>These providers may process information on our behalf or as independent service providers, depending on their role and the service involved. The information shared and the purposes of processing depend on the relevant integration and its configuration.</p>
          <p>We will take appropriate steps to govern such processing in accordance with applicable legal requirements.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">8.3 Legal and Regulatory Disclosures</h3>
          <p>We may disclose information where required by applicable law, a lawful order or a competent authority, or where reasonably necessary to protect legal rights, security or safety.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">8.4 Business Transfers</h3>
          <p>If our business undergoes a restructuring, reorganisation, merger or transfer of business assets, relevant information may be transferred as part of that process, subject to applicable law and appropriate safeguards.</p>

          <h3 className="text-lg font-medium text-primary mt-8 mb-2">8.5 No Sale of Personal Information</h3>
          <p>We do not sell personal information to third parties in exchange for money. However, certain analytics or advertising integrations may involve the transmission of information to third-party platforms. Such processing will be governed by the relevant tool configuration, applicable law and any consent requirements.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">9. Property Enquiries and Third-Party Services</h2>
          <p>The Casstle Co. may facilitate introductions between prospective buyers, property developers, property owners and relevant professional service providers.</p>
          <p>When you request an introduction or site visit, we may share relevant information to facilitate that request.</p>
          <p>Once your information is received by an independent developer, owner or service provider, its subsequent processing may be governed by that party's own privacy practices and legal obligations.</p>
          <p>We do not control the independent privacy practices of third parties merely because we introduced them to you. We encourage you to review their applicable terms before sharing additional information or engaging their services.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">10. Data Retention</h2>
          <p>We retain personal information for as long as reasonably necessary for the purposes for which it was collected, including responding to enquiries, maintaining ongoing customer relationships, managing property interests and meeting applicable legal obligations.</p>
          <p>As part of our ongoing customer relationship management, enquiry information may be retained to support follow-ups and future interactions relevant to your stated interests.</p>
          <p>Retention periods may vary according to the type of information, the nature of the relationship and applicable legal requirements. We will periodically review retained information and take appropriate steps to delete, anonymise or otherwise dispose of information that is no longer required, subject to lawful retention obligations.</p>
          <p>Where you withdraw consent or request deletion, we will assess and act on the request in accordance with applicable law. Some information may need to be retained where a legal obligation or another lawful basis applies.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">11. Data Security</h2>
          <p>We take reasonable steps appropriate to the nature of the information and our operations to protect personal information against unauthorised access, disclosure, alteration, loss or misuse.</p>
          <p>Depending on the systems used, safeguards may include access restrictions, account permissions, secure communication practices, service-provider controls and appropriate technical or organisational measures.</p>
          <p>No website, electronic transmission or storage system can be guaranteed to be completely secure. We cannot promise absolute security, but we will address relevant security concerns in accordance with applicable law.</p>
          <p>If you believe that your personal information has been misused or that a security incident has occurred, please contact us using the details provided below.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">12. Your Privacy Rights and Choices</h2>
          <p>Subject to applicable law and the provisions in force at the relevant time, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Request information about the processing of your personal information</li>
            <li>Request correction or updating of inaccurate information</li>
            <li>Request deletion of personal information where applicable</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Opt out of promotional communications</li>
            <li>Raise a privacy concern or submit a grievance</li>
            <li>Exercise other rights available to you under applicable law</li>
          </ul>
          <p>You can submit a request by contacting official.persquarefeet@gmail.com.</p>
          <p>We may need to verify your identity before acting on a request. We will respond within the period required by applicable law.</p>
          <p>Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal. It may also affect our ability to provide a service that depends on the relevant information.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">13. Marketing Communications</h2>
          <p>Where permitted by law and subject to applicable consent requirements, we may send you property updates, new project information, destination insights, newsletters and other relevant communications.</p>
          <p>You can opt out of promotional communications by:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Using the unsubscribe link in an email, where available</li>
            <li>Following the available opt-out instructions on the relevant communication channel</li>
            <li>Contacting us at official.persquarefeet@gmail.com</li>
          </ul>
          <p>We will take reasonable steps to implement your request in accordance with applicable law.</p>
          <p>Opting out of marketing communications does not necessarily prevent us from sending non-promotional messages required to respond to an active enquiry or fulfil a service you have requested.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">14. Third-Party Websites</h2>
          <p>Our website may contain links to third-party websites, property project pages, social media platforms, maps or external services.</p>
          <p>These websites and services may operate independently of The Casstle Co. Their information collection and processing practices are governed by their own terms and privacy policies.</p>
          <p>We recommend reviewing those policies before sharing information with an external website or service.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">15. Children's Privacy</h2>
          <p>Our website and services are intended for individuals exploring property-related information or business opportunities, rather than for children.</p>
          <p>We do not knowingly seek to collect children's personal information for independent property enquiries or marketing activities. Where applicable law imposes specific requirements relating to children's data, we will comply with those requirements.</p>
          <p>If you believe that a child has provided personal information to us in circumstances where it should not have been collected, please contact us so that we can review the matter and take appropriate action.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">16. International Visitors and Cross-Border Processing</h2>
          <p>Our website may be accessed by visitors outside India, including non-resident Indians and other prospective buyers.</p>
          <p>Our technology and service providers may process information in locations outside India, depending on the services used and their configuration. Any such processing will be subject to applicable legal requirements and relevant service-provider arrangements.</p>
          <p>If you are located outside India, please note that privacy laws may differ depending on your location.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">17. Changes to This Policy</h2>
          <p>We may update this Privacy Policy to reflect changes in our business, website functionality, technology, service providers or legal obligations.</p>
          <p>The latest version will be published on this page with an updated “Last Updated” date.</p>
          <p>Where a material change requires additional notice or consent under applicable law, we will take appropriate steps to provide it.</p>
          <p>We encourage you to review this page periodically.</p>

          <h2 className="text-xl font-display font-medium text-primary mt-12 mb-4">18. Contact Us</h2>
          <p>For questions, privacy requests or concerns regarding this Policy or the handling of your personal information, please contact:</p>
          <p>Per Square Feet Infraventures LLP<br />
          Operating under the brand name The Casstle Co.<br />
          Office Address:<br />
          C-21A, Block C, Sushant Lok, Phase I, Sector 43, Gurugram, Haryana – 122009, India<br />
          Website: https://www.thecasstle.co<br />
          Privacy Email: official.persquarefeet@gmail.com</p>
          <p>Please use the subject line “Privacy Request – The Casstle Co.” when contacting us about a privacy-related matter.</p>
          <p>We will review your request and respond in accordance with applicable law.</p>

          <div className="mt-12 p-6 bg-secondary/30 border border-border rounded text-sm italic">
            <p>Policy review notice: This Privacy Policy should be read alongside the Terms & Conditions and Disclaimer published on our website. It describes intended privacy practices and must be kept consistent with the actual forms, tracking tools, data-sharing arrangements and retention practices used by Per Square Feet Infraventures LLP.</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
