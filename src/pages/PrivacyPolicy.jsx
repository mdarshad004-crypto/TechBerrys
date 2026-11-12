import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, Check, ChevronDown, Copy, Printer, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const sections = [
  {
    id: 'information-we-collect', title: 'Information We Collect',
    intro: 'We may collect the following types of information when you interact with our website:',
    groups: [
      ['Personal Information', ['Full Name', 'Email Address', 'Phone Number', 'Company Name', 'Business Information']],
      ['Project Information', ['Selected Services', 'Estimated Project Budget', 'Project Requirements', 'Messages and Enquiries']],
      ['Technical Information', ['IP Address', 'Browser Type', 'Device Information', 'Website Usage Data', 'Pages Visited and Interaction Information']],
    ],
    outro: 'We collect only the information necessary for the purposes described in this policy.',
  },
  {
    id: 'how-we-use', title: 'How We Use Your Information',
    intro: 'We may use the collected information to:',
    bullets: ['Respond to project enquiries and questions.', 'Understand your business and project requirements.', 'Provide information about our services.', 'Prepare project proposals and quotations.', 'Communicate about requested services.', 'Improve website performance and user experience.', 'Maintain website security and prevent misuse.', 'Meet applicable legal obligations.'],
    outro: 'We will not use your personal information for unrelated purposes without an appropriate legal basis.',
  },
  {
    id: 'how-we-protect', title: 'How We Protect Your Information',
    intro: 'We take reasonable technical and organisational measures to protect personal information against unauthorised access, misuse, alteration, disclosure or loss.',
    bullets: ['Secure server configurations.', 'Restricted access to personal information.', 'Secure data transmission where supported.', 'Regular security checks.', 'Appropriate access controls.'],
    outro: 'However, no method of electronic storage or internet transmission can guarantee absolute security.',
  },
  {
    id: 'sharing-information', title: 'Sharing of Information',
    intro: 'TechBerry does not sell personal information to third parties. We may share relevant information with trusted service providers when necessary to operate our website and provide services, including:',
    bullets: ['Website hosting providers.', 'Database and cloud storage providers.', 'Email delivery services.', 'Website analytics providers.', 'Technical support providers.'],
    outro: 'These providers should only process information as necessary for their assigned services and under appropriate contractual or legal safeguards. We may also disclose information where required by applicable law or a valid legal request.',
  },
  {
    id: 'cookies', title: 'Cookies and Tracking Technologies',
    intro: 'Our website may use cookies and similar technologies to:',
    bullets: ['Maintain website functionality.', 'Understand website traffic.', 'Improve user experience.', 'Remember certain website preferences.'],
    outro: 'You can manage cookies through your browser settings. Where required, we will obtain appropriate consent before using non-essential cookies.',
  },
  {
    id: 'storage-retention', title: 'Data Storage and Retention',
    paragraphs: ['We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, including responding to enquiries, providing services, maintaining business records and meeting legal requirements.', 'When information is no longer required, we will take appropriate steps to delete or anonymise it, subject to applicable legal obligations.'],
  },
  {
    id: 'privacy-rights', title: 'Your Privacy Rights',
    intro: 'Depending on applicable laws, you may have rights to:',
    bullets: ['Request access to your personal information.', 'Request correction of inaccurate information.', 'Request deletion of personal information.', 'Withdraw consent where processing is based on consent.', 'Raise concerns about how your information is handled.', 'Submit a privacy-related complaint.'],
    outro: 'To exercise applicable rights, contact us using the details provided on our Contact page.',
  },
  {
    id: 'third-party-websites', title: 'Third-Party Websites',
    paragraphs: ['Our website may contain links to external websites and third-party services.', 'TechBerry is not responsible for the privacy practices, content or security of websites operated by third parties.', 'We encourage visitors to review the privacy policies of those websites before sharing personal information.'],
  },
  {
    id: 'childrens-privacy', title: "Children's Privacy",
    paragraphs: ['Our website and business services are intended for business users and general audiences, not specifically directed towards children.', "We do not knowingly collect children's personal information in circumstances where applicable law requires parental consent or prohibits such collection."],
  },
  {
    id: 'policy-changes', title: 'Changes to This Privacy Policy',
    paragraphs: ['We may update this Privacy Policy from time to time to reflect changes in our services, business practices, technology or legal requirements.', 'Any updated version will be published on this page with a revised Last Updated date.'],
  },
  {
    id: 'contact-us', title: 'Contact Us',
    paragraphs: ['If you have questions, concerns or requests relating to this Privacy Policy or the handling of your personal information, please contact our team through the Contact page.'],
  },
];

function PolicySection({ section, index }) {
  return (
    <section className="privacy-section" id={section.id} aria-labelledby={`${section.id}-heading`}>
      <div className="privacy-section-number">{String(index + 1).padStart(2, '0')}</div>
      <div className="privacy-section-body">
        <h2 id={`${section.id}-heading`}>{section.title}</h2>
        {section.intro && <p>{section.intro}</p>}
        {section.groups?.map(([title, items]) => (
          <div className="privacy-info-group" key={title}>
            <h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
        {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.outro && <p>{section.outro}</p>}
        {section.id === 'contact-us' && <Link className="privacy-inline-link" to="/contact">Go to Contact page <ArrowRight size={16} aria-hidden="true" /></Link>}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Privacy Policy | TechBerry';
    const description = document.querySelector('meta[name="description"]');
    const oldDescription = description?.content;
    if (description) description.content = 'Learn how TechBerry collects, uses and protects personal information when you visit our website, contact us or use our services.';
    let canonical = document.querySelector('link[rel="canonical"]');
    const hadCanonical = Boolean(canonical);
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const oldCanonical = canonical.href;
    canonical.href = `${window.location.origin}/privacy-policy`;
    return () => {
      document.title = originalTitle;
      if (description && oldDescription !== undefined) description.content = oldDescription;
      if (hadCanonical) canonical.href = oldCanonical;
      else canonical.remove();
    };
  }, []);

  useEffect(() => {
    const sectionElements = sections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const elements = [
      ...sectionElements,
      document.querySelector('.privacy-transparency'),
      document.querySelector('.privacy-contact-card'),
    ].filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => entry.target.classList.add('is-revealed'));
      const visible = entries
        .filter((entry) => entry.isIntersecting && sectionElements.includes(entry.target))
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
    elements.forEach((element) => observer.observe(element));
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      const page = document.querySelector('.privacy-page:not(.terms-page)');
      const pageBottom = page ? page.offsetTop + page.offsetHeight : document.documentElement.scrollHeight;
      const scrollable = Math.max(1, pageBottom - window.innerHeight);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / scrollable))})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const jumpTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/privacy-policy`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt('Copy this page link:', `${window.location.origin}/privacy-policy`);
    }
  };

  return (
    <main className="privacy-page" id="top">
      <div className="privacy-reading-progress" aria-hidden="true"><span ref={progressRef} /></div>
      <header className="privacy-hero">
        <div className="privacy-hero-inner">
          <div className="privacy-hero-copy">
            <span className="privacy-eyebrow"><span /> LEGAL &amp; PRIVACY</span>
            <h1>Your Privacy Matters to Us.</h1>
            <p>Your trust is important to us. Learn how TechBerry collects, uses and protects your personal information.</p>
            <div className="privacy-updated"><span>Last Updated</span><time dateTime="2026-11-12">12 November 2026</time></div>
          </div>
          <div className="privacy-hero-mark" aria-hidden="true"><ShieldCheck size={78} strokeWidth={1.25} /><span>YOUR TRUST<br />MATTERS</span><i className="privacy-ambient-dots" /></div>
        </div>
      </header>

      <div className="privacy-wrap">
        <div className="privacy-transparency"><ShieldCheck size={19} aria-hidden="true" /><p>We believe in transparency. Your personal information deserves care, respect and protection.</p></div>

        <div className="privacy-layout">
          <aside className="privacy-sidebar" aria-label="Privacy policy navigation">
            <div className="privacy-toc">
              <div className="privacy-toc-heading"><span>ON THIS PAGE</span><b>Contents</b></div>
              <nav aria-label="Table of contents">
                {sections.map((section, index) => (
                  <a key={section.id} href={`#${section.id}`} className={activeSection === section.id ? 'is-active' : ''} aria-current={activeSection === section.id ? 'location' : undefined} onClick={(event) => { event.preventDefault(); jumpTo(section.id); }}>
                    <span>{String(index + 1).padStart(2, '0')}</span>{section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="privacy-document">
            <details className="privacy-mobile-toc">
              <summary><span>In this policy</span><ChevronDown size={18} aria-hidden="true" /></summary>
              <nav aria-label="Mobile table of contents">
                {sections.map((section, index) => <a key={section.id} href={`#${section.id}`} className={activeSection === section.id ? 'is-active' : ''} aria-current={activeSection === section.id ? 'location' : undefined} onClick={(event) => { event.preventDefault(); jumpTo(section.id); event.currentTarget.closest('details')?.removeAttribute('open'); }}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a>)}
              </nav>
            </details>
            <div className="privacy-toolbar" aria-label="Privacy policy actions">
              <span>TechBerry <i aria-hidden="true">/</i> Privacy Policy</span>
              <div><button type="button" onClick={copyLink}><>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy link'}</></button><button type="button" onClick={() => window.print()}><Printer size={16} />Print</button></div>
            </div>
            <div className="privacy-introduction"><p>At TechBerry, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store and protect information when you visit our website, contact us or use our services.</p><p>By using our website, you acknowledge that you have read this Privacy Policy.</p></div>
            {sections.map((section, index) => <PolicySection key={section.id} section={section} index={index} />)}

            <section className="privacy-contact-card" aria-labelledby="privacy-contact-heading">
              <div className="privacy-contact-icon"><ShieldCheck size={24} aria-hidden="true" /></div>
              <div><span className="privacy-contact-label">WE’RE HERE TO HELP</span><h2 id="privacy-contact-heading">Have Questions About Your Privacy?</h2><p>If you have questions about how your information is handled, our team is here to help.</p></div>
              <Link to="/contact">Contact Our Team <ArrowRight size={17} aria-hidden="true" /></Link>
            </section>
            <div className="privacy-signoff"><strong>TechBerry</strong><span>Beyond Technology. Into Tomorrow.</span></div>
          </div>
        </div>
      </div>
      {showTop && <button type="button" className="privacy-back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><ArrowUp size={19} /> <span>Top</span></button>}
    </main>
  );
}
