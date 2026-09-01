W3CWD-P3P10-harmonization-19980330
P3P Harmonized Vocabulary Specification
W3C Working Draft 30-March-1998
This Version:
 http://www.w3.org/TR/1998/WD-P3P10-harmonization-19980330
Latest Version: 
 http://www.w3.org/TR/1998/WD-P3P10-harmonization
Previous Version:
Please see drafts at the  Harmonizaton WG Page. [Member only]
Editor:
Joseph Reagle (W3C) reagle@w3.org
Status of This Document
This is a W3C Working Draft for review by W3C members and other interested parties. It is a draft document and may be updated, replaced or obsoleted by other documents at any time. It is inappropriate to use W3C Working Drafts as reference material or to cite them as other than "work in progress." A list of current W3C working drafts can be found at: http://www.w3.org/TR/

This draft specification is a stable, final, deliverable from the P3P Harmonized Vocabulary Working Group but it is part of a work in progress. At this point, it is not intended to be independently advanced toward W3C recommendation status, but rather it will be used along with the:

P3P Protocol White Paper
P3P Implementation Guide
and the previous two working drafts:

P3P Grammatical Model and Data Design Model Working Draft
P3P Architecture Working Draft
as a basis for the P3P1.0 specification.

This draft document will be considered by W3C and its members according to W3C process. This document is made public for the purpose of receiving comments that inform the W3C membership and staff on issues likely to affect the acceptance and adoption of the P3P. Comments should be sent to p3p-comments@w3.org.

This document is part of the Platform for Privacy Preferences Project Activity.


Table of Contents
Purpose
Compliance Requirements
Definitions
Data Categories: a type, or quality of specific data element such as last_name.
Data Collection Purposes:  the purpose of the data collection
Qualifications on Purposes: additional information on how the purpose is realized
General Disclosures: describe the user's capabilities to further understand a service provider's practices
Acknowledgements
1 Purpose
The purpose of this document is to specify and define a "harmonized" P3P vocabulary. Although P3P can support multiple schemas (vocabularies), the use of common vocabularies for describing privacy practices across implementations increases P3P's ultimate effectiveness. Therefore, this document includes vocabulary elements useful for expressing privacy policies reflective of a diversity of privacy laws, self-regulatory norms, and cultural notions about privacy. This vocabulary can be used to express policies as diverse as anonymous browsing to the provision of personalized Web content and services. However, P3P implementations need not restrict themselves solely to vocabularies defined within this document.

Note, in addition to the terms specified in the harmonized vocabulary, P3P requires services to specify in their proposals the service provider's identity, an experience space to which their practices apply (e.g., realm: http://www.w3.org), the location at which users can find a human-readable explanation of the service's privacy policies (policy-URI) and an optional human-readable description of the result (e.g., consequence: "to offer customized sports updates").

Security issues and protocols are not addressed by this document. Information about the characteristics and strength of those protocols is critical to a user's decision regarding the transmission of information. However, an assumption of P3P is that communication and storage security is achieved through means other than P3P itself (such as SSL).
Comment: Much of the work done on this schema was conducted under significant time pressure. Accordingly, there is interest from members of the working group to have some of these issues revisited in the future by the W3C or other entities as appropriate.

2 Compliance Requirements
This specification is a representation of a rough, inclusive consensus from the Harmonization WG -- meaning that which is specified is recommended as a minimal set of terms. The recommendation and requirements are offset in a colored table. Requirements are expressed over variables which the WG thinks values must be defined for in order to be a valid P3P proposal. Products must support the ability to parse and act upon all the variables defined, though we do not specify the way such values need to be acted upon or presented in a graphical user interface; these are left to implementations and user configuration -- which is addressed in the P3P Implementation Guide.

3 Definitions
Personally Identifiable Data
Data that is used to identify, contact, or locate a person. This includes data from which other personally identifying data can easily be derived. This definition focuses on use because it is difficult to determine whether certain data or combinations of data are personally identifiable without information about the context. For example, whether an IP address is static or randomly generated will influence whether it can be used to identify a person -- see Identifiable Use for more of an explanation.
Purpose
The reason(s) for data collection and use.
Practice
The set of disclosures regarding data usage, including purpose, identifiable use, recipients and other disclosures.
Equable Practice
A practice that is very similar to another in that the purpose, recipients, and identifiable use are the same or more constrained than the original (a lower value), and the other disclosures are not substantially different. For example, two sites with otherwise similar practices that follow different -- but similar -- sets of industry guidelines. )
Service Provider (Data Controller)
The person or organization which offers information, products or services from a Web site, collects information, and is responsible for the representations made in a practice statement.
4 Data Categories
A data category is a quality of a data element or class that may be used by the user's agent to determine what type of element is under discussion.
Recommendation: Service providers may use data categories to describe data elements or data sets. If a service provider requires a representation of data that is not otherwise referenceable in an easily understood way, we recommend the following terms be used according to their corresponding definitions.
Status: Optional: select all that apply.


0	
Physical Contact Information
Information that allows an individual to be contacted or located in the physical world -- such as phone number or address.
1	
Online Contact Information
Information that allows an individual to be contacted or located on the Internet -- such as email. Often, this information is independent of the specific computer used to access the network. (See Computer Information)
2	
Unique Identifiers 
Non-financial identifiers issued for purposes of consistently identifying the individual -- such as SSN or Web site IDs.
3	
Financial Account Identifiers 
Identifiers that tie an individual to a financial instrument, account, or payment system -- such as a credit card or bank account number.
4	
Computer Information 
Information about the computer system that the individual is using to access the network -- such as the IP number, domain name, browser type or operating system.
5	
Navigation and Click-stream Data 
Data passively generated by browsing the Web site -- such as which pages are visited, and how long users stay on each page.
6	
Transaction Data
Data actively generated from or reflecting explicit interactions with a service provider through its site -- such as queries to a search engine, logs of account activity, or purchases made on the Web. 
7	
Demographic and Socio-economic Data
Data about an individual's characteristics -- such as gender, age, and income.
8	
Preference Data
Data about an individual's likes and dislikes -- such as favorite color or musical tastes.
9	
Content 
The words and expressions contained in the body of a communication -- such as the text of email, bulletin board postings, or chat room communications.

5 Purposes Defined
The following specifies and defines a set of six purposes for data processing relevant to the Web.
Recommendation: Service providers must use the following terms to explain the purpose of data collection. Service providers must disclose all that apply over the data elements or classes they collect. If a service provider does not disclose that a data element is used for a given purpose, that is a representation that data is not used for that purpose. Service providers that disclose that they use data for "other" purposes should provide human readable explanations of those purposes.
Status: Required: select all that apply.


 
0	
Completion and Support of Current Activity 
The use of information by the service provider to complete  the activity for which it was provided, such as the provision of information, communications, or transaction services -- for example to return the results from a Web search, to forward email, or place an order. 
1	
Web Site and System Administration
The use of information solely for the technical support of the Web site and computer system. This would include processing computer account information, and information used in the course of securing, , and maintaining the site.
2	
Customization of Site to Individuals
The use of information to tailor or modify the content or design of the site to the particular individual.
3	
Research and Development
The use of information to enhance, evaluate, or otherwise review the site, service, product, or market. This does not include personal information used to tailor or modify the content to the specific individual nor information used to evaluate, target, profile or contact the individual. 
4	
Contacting Visitors for Marketing of Services or Products
The use of information to contact the individual for the promotion of a product or service. This includes notifying visitors about updates to the Web site.
5	
Other Uses 
The use of information not captured by the above definitions. (A human readable explanation should be provided in these instances.)

6 Purpose Qualifiers
Qualifiers are appended to a purpose to provide additional information on how the purpose is realized with respect to a data element or set of data elements. To simplify practice declaration, service providers may  promote such qualifications over aggregations (or all) of the data and their purposes. In that case, the highest value that applies to any purpose of the collection should be used for the resulting qualification.

Identifiable Use
Is data used in a way that is personally identifiable -- including linking it with identifiable information about you from other sources? While some data is obviously identifiable, such as (full_name), other data, such as (zip_code, salary, birth_date), could allow a person to be identified. Also, a technically astute person in some circumstances could determine the identity of a user from the IP number in a HTTP log. This requires a specific effort and is based on how that IP number is registered, whether it is used by more than one person on a computer, or if it is dynamically allocated by an internet service provider. Consequently, we refrain from defining any particular data or set of data as identifiable and focus on whether it is used in an identifiable way.

If identifiable is applied over an aggregation of data (promoted), this means that "some data is used in identifiable form."
Recommendation: Services must disclose the Identifiable qualifier.
Status: Required: select one.

0 No
1 Yes
Recipients (Domain of Use)
The recipients defines an organizational area, or domain, beyond the service provider and its agents where data may be distributed.
If recipients is applied over an aggregation of data (promoted), this means that "some of the data is distributed to [the highest valued option]." For instance, if all data but the telephone numbers is used by only "organizations following our practices," and the telephone number is used by "organizations following different practices," the service provider has the option of generically stating "data is distributed to organizations following different practices."
Recommendation: Services must disclose the Recipients qualifier.
Status: Required: select all that apply.

Comment: Creating a set of values which are simple, informative to the user, and accurate for service provider representations is very challenging and the WG is not completely satisfied with the results. For instance, the issue of transaction facilitators, such as shipping or payment processors, who are necessary for the completion and support of the activity but may follow different practices was problematic. As it stands, such organizations should be represented in whichever category most accurately reflects their practices with respect to the original service provider.

 
0	
Only ourselves and our agents
Ourselves and our agents. We define an agent as a third party that processes data only on behalf of the service provider for the completion of the stated purposes. (e.g., a printing bureau that prints address labels and does nothing further with the information.)
1	
Organizations following our practices
Organizations who use the data on their own behalf under equable practices. (e.g. data is shared with a partner who offers complementary products or accessories, but since they do not retain the data they consequently cannot provide access to it.)
2	
Organizations following different practices
Organizations that are constrained by and accountable to the original service provider, but may use the data in a way not specified in the service provider's practices. (e.g. data is shared with a partner who may also use data for research and development.)
3	
Unrelated third parties or public fora
Organizations or fora whose data usage practices are not known by the original service provider. (e.g. data is provided as part of a commercial CD-ROM directory, or it is posted on a public on-line Web directory.)

7 General Disclosures
The following are general disclosures about the policies of the service provider. Further information on the policies would be found at the policy-URI.

Access to Identifiable Information
the ability of the individual to view identifiable information and address questions or concerns to the service provider.
Recommendation: Service providers must disclose the Access capabilities associated with data collection. The methods of access is not specified. If data is said to be used in an identifiable form elsewhere in a statement, this disclosure applies to it. This is not meant to imply that access to all data is possible, but that some of the data may be accessible and that the user should communicate further with the service provider to determine what capabilities they have.
Status:  Required: select all that apply.

Comment: Service providers may also wish to provide capabilities to access to information collected through means other than the Web at the policy-URI. However, the scope of P3P statements are limited to data collected through HTTP or other Web transport protocols. Also, if access is provided through the Web we recommend the use of strong authentication and security mechanisms for such access, however security issues are outside the scope of this document.

0 Identifiable Data is Not Used
[this should be consistent with the use of the identifiable qualifier].
1 Identifiable Contact Information
access is given to identifiable online and physical contact information (e.g., users can access things such as a postal address).
2 Other Identifiable Information
access is given to other information linked to an identifiable person. (e.g., users can access things such as a their online account charges).
3 None
no access to identifiable information is given.
Assurance (accountability)
Does the site have an assuring party that attests that the service will abide by its proposal, follows guidelines in the processing of data, or other relevant assertions. Assurance may come from the service provider or an independent assuring party.
Status:  Required: select one.
Comment: This should be used consistently with the assurance field which is defined elsewhere in the Protocol White Paper.
0 No    there is no disclosure with respect to assurance.
1 Yes   there is an assurance mechanism, please see our disclosure.
 
Other_Disclosures
Are Disclosures Made with respect to the following:
Recommendation: If a site wishes to signfy in a proposal that it makes a disclosure about change_agreement, or retention, it may do so with the following. No disclosure means that the service provider makes no representation of a policy on that topic.
Status:  Optional: select all that apply.

Comment: Some members of the working group felt that 1) disclosures could be made about other topics such as security (see the purpose section), 2) more specific values should be provided, and 3) that such disclosures should be required. However, a strong consensus for this could not be reached in the available time.

0 Change_Agreement
Does the service provider make a disclosure regarding the capability for the user to cancel, or renegotiate the existing agreement at a future time?
1 Retention
Does the service provider make a disclosure on how long data is retained?
8 Acknowledgements
Liz Blumenfeld, America Online
Ann Cavoukian, Information and Privacy Commission/Ontario
Scott Chalfant, Matchlogic
Lorrie Cranor, AT&T
Jim Crowe, Direct Marketing Association
Josef Deitl, World Wide Web Consortium
David Duncan, Information and Privacy Commission/Ontario
Melissa Dunn, Microsoft
Patricica Faley, Direct Marketing Association
Marit Köhntopp, Privacy Commissioner of Schleswig-Holstein, Germany
Tony LAM, Hong Kong Privacy Commissioner's Office
Tara Lemmey, Narrowline
Jill Lesser, America Online
Steve Lucas, Matchlogic
Deirdre  Mulligan, Center for Democracy and Technology
Nick Platten, Data Protection Consultant (formerly of DG XV, European Commission)
Joseph Reagle, World Wide Web Consortium
Ari Schwartz, Center for Democracy and Technology
Jonathan Stark, TRUSTe
 _________

Copyright © 1998 W3C (MIT, INRIA, Keio ), All Rights Reserved. W3C liability, trademark, document use and software licensing rules apply.
