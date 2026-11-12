import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, Check, Copy, Printer, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const sections = [
  { id: 'introduction', title: 'Introduction', paragraphs: ['Welcome to TechBerry.', 'These Terms & Conditions govern your access to and use of the TechBerry website, services, and digital solutions.', 'By accessing our website or engaging with our services, you acknowledge that you have read and understood these terms.', 'If you do not agree with any part of these terms, please discontinue using our website and services.'] },
  { id: 'our-services', title: 'Our Services', intro: 'TechBerry provides digital technology and IT solutions, including:', bullets: ['Website Design & Development', 'Shopify Development & Customization', 'Mobile Application Development', 'Search Engine Optimization (SEO)', 'Digital Marketing Solutions', 'UI/UX Design', 'Custom Software Development', 'Technical Support & Maintenance'], outro: 'The exact scope, deliverables, timelines, and pricing of each project will be agreed upon separately between TechBerry and the client.' },
  { id: 'enquiries-communication', title: 'Project Enquiries & Communication', toc: 'Project Enquiries', paragraphs: ['When submitting an enquiry through our website, you agree to provide accurate and complete information.', 'You authorize TechBerry to contact you using the information provided to discuss your requirements, project details, quotations, and potential collaboration.', 'Submitting an enquiry does not automatically create a contractual relationship or guarantee project acceptance.'] },
  { id: 'pricing-payments', title: 'Pricing & Payments', bullets: ['Project pricing will be communicated through an individual quotation or proposal.', 'Payment schedules and milestones will be mutually agreed upon before project commencement.', 'Additional features or changes outside the agreed scope may involve additional charges.', 'Any applicable taxes will be communicated as part of the quotation.', 'Payments must be made according to the agreed payment schedule.'] },
  { id: 'timelines-deliverables', title: 'Project Timeline & Deliverables', toc: 'Project Timeline', intro: 'Project timelines will be estimated based on the agreed scope of work. Timely delivery may depend on:', bullets: ['Client feedback and approvals.', 'Availability of required content and resources.', 'Third-party integrations and services.', 'Changes to the original project requirements.'], outro: 'TechBerry will make reasonable efforts to complete projects within the agreed timeline.' },
  { id: 'client-responsibilities', title: 'Client Responsibilities', intro: 'Clients are responsible for:', bullets: ['Providing accurate project information.', 'Supplying necessary content, images, credentials, and resources.', 'Reviewing deliverables and providing feedback within agreed timelines.', 'Ensuring they have the necessary rights to materials supplied to TechBerry.', 'Making payments according to the agreed terms.'], outro: 'Delays in receiving required information or approvals may affect project timelines.' },
  { id: 'intellectual-property', title: 'Intellectual Property Rights', toc: 'Intellectual Property', intro: 'Unless otherwise agreed in writing:', bullets: ['TechBerry retains ownership of its pre-existing tools, frameworks, reusable components, and internal development resources.', 'Ownership or licensing of project-specific deliverables will be governed by the individual project agreement.', 'Third-party software, plugins, fonts, images, and other licensed resources remain subject to their respective licensing terms.', "Clients must not reproduce or distribute TechBerry's proprietary materials without authorization."] },
  { id: 'revisions-additional-work', title: 'Revisions & Additional Work', paragraphs: ['Project revisions will be handled according to the scope and revision limits agreed upon in the project proposal.', 'Requests involving significant changes, additional features, or work beyond the original scope may require revised timelines and additional charges.'] },
  { id: 'third-party-services', title: 'Third-Party Services', paragraphs: ['Our solutions may integrate with third-party platforms, tools, and services, including hosting providers, payment gateways, Shopify applications, analytics tools, and APIs.', 'TechBerry does not control third-party platforms and is not responsible for their independent availability, policies, pricing, or service interruptions.', 'Clients are subject to the terms and policies of those third-party providers.'] },
  { id: 'website-usage', title: 'Website Usage', intro: 'You agree not to:', bullets: ['Use our website for unlawful purposes.', 'Attempt unauthorized access to our systems.', 'Distribute malicious software or harmful content.', 'Interfere with website functionality or security.', 'Copy or misuse website content without permission.'], outro: 'We reserve the right to restrict access where misuse or security concerns arise.' },
  { id: 'confidentiality', title: 'Confidentiality', paragraphs: ['TechBerry respects the confidentiality of client information and project-related discussions.', 'Both parties should take reasonable steps to protect confidential business information, credentials, documents, and materials shared during a project.', 'Any specific confidentiality obligations may be established through a separate agreement or NDA.'] },
  { id: 'limitation-liability', title: 'Limitation of Liability', paragraphs: ['To the extent permitted by applicable law, TechBerry shall not be responsible for indirect, incidental, or consequential losses arising from the use of our website or services.', 'We do not guarantee specific business results, search engine rankings, revenue growth, or marketing performance.', 'Any project-specific warranties or service commitments will be documented separately.'] },
  { id: 'service-modifications', title: 'Service Modifications', paragraphs: ['TechBerry reserves the right to modify, update, suspend, or discontinue website features or services where reasonably necessary.', 'We will make reasonable efforts to communicate material changes affecting active client engagements.'] },
  { id: 'privacy-data-protection', title: 'Privacy & Data Protection', toc: 'Privacy', paragraphs: ['Information submitted through our website is handled according to our Privacy Policy.', 'We encourage users to review our Privacy Policy to understand how personal information is collected, used, stored, and protected.'], link: true },
  { id: 'termination', title: 'Termination', paragraphs: ['Either party may terminate a project in accordance with the applicable project agreement.', 'Outstanding payments, completed work, intellectual property obligations, and confidentiality requirements will be handled according to the agreed terms and applicable law.'] },
  { id: 'governing-law', title: 'Governing Law', paragraphs: ['These Terms & Conditions shall be governed by the applicable laws of India, subject to any mandatory legal requirements and the jurisdiction agreed upon in the relevant project agreement.'] },
  { id: 'updates', title: 'Updates to These Terms', toc: 'Updates', paragraphs: ['TechBerry may update these Terms & Conditions from time to time.', 'Any revised version will be published on this page with an updated revision date.', 'Continued use of our website after an update constitutes acceptance where legally applicable.'] },
  { id: 'contact-us', title: 'Contact Us', toc: 'Contact Us', paragraphs: ['If you have questions regarding these Terms & Conditions, please contact us:'] },
];

function Section({ item, index }) {
  return <section className="privacy-section" id={`terms-${item.id}`} aria-labelledby={`terms-${item.id}-heading`}>
    <div className="privacy-section-number">{String(index + 1).padStart(2, '0')}</div>
    <div className="privacy-section-body"><h2 id={`terms-${item.id}-heading`}>{item.title}</h2>
      {item.intro && <p>{item.intro}</p>}
      {item.bullets && <ul>{item.bullets.map((text) => <li key={text}>{text}</li>)}</ul>}
      {item.paragraphs?.map((text) => <p key={text}>{text}</p>)}
      {item.outro && <p>{item.outro}</p>}
      {item.link && <Link className="privacy-inline-link" to="/privacy-policy">Read our Privacy Policy <ArrowRight size={16} aria-hidden="true" /></Link>}
      {item.id === 'contact-us' && <Link className="privacy-inline-link" to="/contact">Contact TechBerry <ArrowRight size={16} aria-hidden="true" /></Link>}
    </div>
  </section>;
}

export default function TermsConditions() {
  const [active, setActive] = useState(`terms-${sections[0].id}`);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef(null);
  useEffect(() => {
    const oldTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const oldDescription = description?.content;
    document.title = 'Terms & Conditions | TechBerry';
    if (description) description.content = 'Read the Terms & Conditions that govern access to and use of the TechBerry website, services and digital solutions.';
    let canonical = document.querySelector('link[rel="canonical"]');
    const hadCanonical = Boolean(canonical);
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    const oldCanonical = canonical.href;
    canonical.href = `${window.location.origin}/terms`;
    return () => { document.title = oldTitle; if (description && oldDescription !== undefined) description.content = oldDescription; if (hadCanonical) canonical.href = oldCanonical; else canonical.remove(); };
  }, []);
  useEffect(() => {
    const sectionTargets = sections.map(({ id }) => document.getElementById(`terms-${id}`)).filter(Boolean);
    const targets = [
      ...sectionTargets,
      document.querySelector('.terms-page .privacy-transparency'),
      document.querySelector('.terms-page .privacy-contact-card'),
    ].filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => entry.target.classList.add('is-revealed'));
      const item = entries
        .filter((entry) => entry.isIntersecting && sectionTargets.includes(entry.target))
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (item) setActive(item.target.id);
    }, { rootMargin: '-18% 0px -68% 0px' });
    targets.forEach((target) => observer.observe(target));
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      const page = document.querySelector('.terms-page');
      const pageBottom = page ? page.offsetTop + page.offsetHeight : document.documentElement.scrollHeight;
      const scrollable = Math.max(1, pageBottom - window.innerHeight);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / scrollable))})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  const jump = (id) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
  const copy = async () => { try { await navigator.clipboard.writeText(`${location.origin}/terms`); setCopied(true); window.setTimeout(() => setCopied(false), 2200); } catch { window.prompt('Copy this page link:', `${location.origin}/terms`); } };
  return <article className="privacy-page terms-page" id="top" aria-labelledby="terms-page-title">
    <div className="terms-reading-progress" aria-hidden="true"><span ref={progressRef} /></div>
    <header className="privacy-hero"><div className="privacy-hero-inner"><div className="privacy-hero-copy"><span className="privacy-eyebrow"><span /> LEGAL INFORMATION</span><h1 id="terms-page-title">Terms &amp; Conditions</h1><p>Clear guidelines for working together and using TechBerry's digital services.</p><div className="privacy-updated"><span>Last Updated</span><time dateTime="2026-11-12">12 November 2026</time></div></div><div className="privacy-hero-mark" aria-hidden="true"><Scale size={72} strokeWidth={1.25} /><span>FAIR &amp; CLEAR<br />TERMS</span></div><span className="terms-ambient-dots" aria-hidden="true" /></div></header>
    <div className="privacy-wrap"><div className="privacy-transparency"><Scale size={19} aria-hidden="true" /><p>We believe good partnerships start with clear expectations and open communication.</p></div>
      <div className="privacy-layout"><aside className="privacy-sidebar" aria-label="Terms navigation"><div className="privacy-toc"><div className="privacy-toc-heading"><span>ON THIS PAGE</span><b>Contents</b></div><nav aria-label="Table of contents">{sections.map((item, index) => { const id = `terms-${item.id}`; return <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined} onClick={(event) => { event.preventDefault(); jump(id); }}><span>{String(index + 1).padStart(2, '0')}</span>{item.toc || item.title}</a>; })}</nav></div></aside>
        <div className="privacy-document"><details className="privacy-mobile-toc"><summary><span>In these terms</span><span aria-hidden="true">⌄</span></summary><nav aria-label="Mobile table of contents">{sections.map((item, index) => { const id = `terms-${item.id}`; return <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined} onClick={(event) => { event.preventDefault(); jump(id); event.currentTarget.closest('details')?.removeAttribute('open'); }}><span>{String(index + 1).padStart(2, '0')}</span>{item.toc || item.title}</a>; })}</nav></details>
          <div className="privacy-toolbar"><span>TechBerry <i aria-hidden="true">/</i> Terms &amp; Conditions</span><div><button type="button" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy link'}</button><button type="button" onClick={() => window.print()}><Printer size={16} />Print</button></div></div>
          {sections.map((item, index) => <Section key={item.id} item={item} index={index} />)}
          <section className="privacy-contact-card" aria-labelledby="terms-contact-heading"><div className="privacy-contact-icon"><Scale size={24} aria-hidden="true" /></div><div><span className="privacy-contact-label">WE’RE HERE TO HELP</span><h2 id="terms-contact-heading">Have Questions About Our Terms?</h2><p>We're happy to clarify any questions regarding our services, policies or project agreements.</p></div><Link to="/contact">Contact TechBerry <ArrowRight size={17} aria-hidden="true" /></Link></section>
          <div className="privacy-signoff"><strong>TechBerry</strong><span>Beyond Technology. Into Tomorrow.</span></div>
        </div>
      </div>
    </div>
    {showTop && <button type="button" className="privacy-back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><ArrowUp size={19} /><span>Top</span></button>}
  </article>;
}
