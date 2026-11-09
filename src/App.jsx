import React, { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, ChartNoAxesCombined, Heart, Linkedin, Mail, Menu, MessageCircle, Sparkles, Users, X } from 'lucide-react'
import { caseStudies, expertise, experience, industries, skillGroups, stats } from './data/portfolio'

const LINKEDIN = 'https://www.linkedin.com/in/praise-ojua-523209265/'
const EMAIL = 'ojuapra114@gmail.com'
const iconMap = { sparkles: Sparkles, heart: Heart, chart: ChartNoAxesCombined, message: MessageCircle, users: Users }

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return <div className={`section-heading ${centered ? 'centered' : ''}`}>
    <p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}
  </div>
}

function SkillTag({ children }) { return <span className="skill-tag">{children}</span> }

function StatCard({ stat }) {
  return <article className="stat-card"><p className="stat-number">{stat.value}<span>{stat.suffix}</span></p><p className="stat-label">{stat.label}</p></article>
}

function ExpertiseCard({ item }) {
  const Icon = iconMap[item.icon]
  return <article className="expertise-card"><span className="icon-wrap"><Icon aria-hidden="true" size={21} strokeWidth={1.7} /></span><h3>{item.title}</h3><p>{item.description}</p></article>
}

function TimelineItem({ item, index }) {
  return <article className="timeline-item reveal" style={{ '--delay': `${index * 80}ms` }}>
    <span className="timeline-dot" aria-hidden="true" />
    <div className="timeline-card">
      <div className="experience-top"><div><p className="experience-company">{item.company}</p><h3>{item.role}</h3></div><span className="experience-date">{item.date}</span></div>
      {item.location && <p className="experience-location">{item.location}</p>}
      {item.roles ? <div className="sub-roles">{item.roles.map((role) => <div className="sub-role" key={role.title}><div className="sub-role-heading"><h4>{role.title}</h4><span>{role.date}</span></div><ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>)}</div> : <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      <div className="tag-row">{item.tags.map((tag) => <SkillTag key={tag}>{tag}</SkillTag>)}</div>
    </div>
  </article>
}

function CaseStudyCard({ item, onOpen }) {
  return <button className="case-card" type="button" onClick={() => onOpen(item)} aria-label={`Open ${item.title} case study preview`}>
    <span className="case-topline"><SkillTag>{item.industry}</SkillTag><ArrowUpRight size={18} aria-hidden="true" /></span>
    <h3>{item.title}</h3><p className="case-coming">Coming soon</p>
    <div className="case-structure"><p><strong>Challenge</strong><span>Details coming soon</span></p><p><strong>Approach</strong><span>Details coming soon</span></p><p><strong>Result</strong><span>Details coming soon</span></p></div>
    <span className="case-metric">{item.metric}</span>
  </button>
}

function CaseModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [item, onClose])
  if (!item) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="case-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={onClose} aria-label="Close case study"><X size={20} /></button><SkillTag>{item.industry}</SkillTag><h2 id="modal-title">{item.title}</h2><p className="modal-intro">This case study is being prepared. Check back soon for the full story.</p><div className="case-structure modal-structure"><p><strong>Challenge</strong><span>Details coming soon</span></p><p><strong>Approach</strong><span>Details coming soon</span></p><p><strong>Result</strong><span>Details coming soon</span></p></div><span className="case-metric">{item.metric}</span></section>
  </div>
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const links = [['About', 'about'], ['Expertise', 'expertise'], ['Experience', 'experience'], ['Case Studies', 'case-studies'], ['Contact', 'contact']]
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) }), { rootMargin: '-35% 0px -55% 0px' })
    links.forEach(([, id]) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])
  const closeMenu = () => setMenuOpen(false)
  return <header className="site-header"><nav className="nav-shell" aria-label="Main navigation"><a className="wordmark" href="#home" onClick={closeMenu}>Praise Ojua<span>.</span></a><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>{links.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={closeMenu}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s Talk <ArrowUpRight size={15} /></a></div></nav></header>
}

function App() {
  const [selectedCase, setSelectedCase] = useState(null)
  const [formState, setFormState] = useState('')
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setFormState('Your email app should open with your message ready to send.')
    event.currentTarget.reset()
  }
  return <>
    <Navigation />
    <main>
      <section className="hero section-wrap" id="home"><div className="hero-copy reveal is-visible"><span className="hero-pill"><span /> Customer Success <i>|</i> SaaS &amp; B2B</span><h1>Turning client conversations into <em>long-term relationships.</em></h1><p className="hero-subtitle">I help customers feel confident, supported, and successful from the very first conversation.</p><p className="hero-focus">Onboarding <span>•</span> Adoption <span>•</span> Retention</p><div className="hero-actions"><a className="button button-primary" href="#contact">Let’s Talk <ArrowRight size={17} /></a><a className="button button-outline" href={LINKEDIN} target="_blank" rel="noreferrer">View LinkedIn <ArrowUpRight size={16} /></a></div><p className="availability"><span /> Open to remote Customer Success roles</p></div><div className="hero-visual reveal is-visible" aria-label="Portrait placeholder"><div className="portrait-frame"><div className="portrait-inner"><div className="portrait-monogram">P<span>O</span></div><p>Customer Success<br />with care.</p><span className="portrait-spark">✳</span></div></div><span className="portrait-note">People first. Always.</span></div></section>
      <section className="stats-section section-wrap" aria-label="Career impact"><div className="stats-grid">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div></section>
      <section className="section-wrap content-section" id="about"><SectionHeading eyebrow="A little about me" title="Good relationships are built on follow-through." /><div className="about-grid"><p className="about-copy">My path into Customer Success runs through several client-facing roles where trust and follow-through decide the outcome: customer onboarding, client relationship management, travel booking, lead nurturing, and candidate screening. Across SaaS, telehealth, B2B, insurance, and real estate clients, I’ve learned what customers need to feel heard, and what keeps them engaged after the first call.</p><div className="about-asides"><article className="about-note"><span className="note-icon"><BriefcaseBusiness size={19} /></span><div><h3>Currently</h3><p>Deepening my skills in Customer Success Management and Technical Account Management, with a focus on onboarding, adoption, renewals, portfolio management, churn prevention, and retention.</p></div></article><article className="about-note"><span className="note-icon"><ArrowDown size={19} /></span><div><h3>Open to</h3><p>Customer Success Associate and Customer Success Manager roles (remote), especially in SaaS, health tech, and B2B services.</p></div></article></div></div></section>
      <section className="section-wrap content-section" id="expertise"><SectionHeading eyebrow="What I bring" title="Customer care, with a clear point of view." description="Thoughtful service and dependable execution, from the first hello to the next milestone." centered /><div className="expertise-grid">{expertise.map((item) => <ExpertiseCard key={item.title} item={item} />)}</div></section>
      <section className="industries-band"><div className="section-wrap industries-inner"><p className="eyebrow">Industries I’ve worked across</p><div className="industry-tags">{industries.map((industry) => <SkillTag key={industry}>{industry}</SkillTag>)}</div></div></section>
      <section className="section-wrap content-section experience-section" id="experience"><SectionHeading eyebrow="The journey so far" title="Experience built around people." description="A look at the roles where I’ve made each conversation count." /><div className="timeline">{experience.map((item, index) => <TimelineItem key={item.company} item={item} index={index} />)}</div></section>
      <section className="section-wrap content-section case-section" id="case-studies"><SectionHeading eyebrow="In practice" title="Case Studies" description="Real customer scenarios, the approach I took, and the results." centered /><div className="case-grid">{caseStudies.map((item) => <CaseStudyCard key={item.title} item={item} onOpen={setSelectedCase} />)}</div></section>
      <section className="section-wrap content-section skills-section" id="skills"><SectionHeading eyebrow="The toolkit" title="Skills & tools." description="People-first strengths, backed by organized processes." /><div className="skill-groups">{skillGroups.map((group) => <article className="skill-group" key={group.title}><h3>{group.title}</h3><div className="tag-row">{group.skills.map((skill) => <SkillTag key={skill}>{skill}</SkillTag>)}</div></article>)}</div></section>
      <section className="contact-section" id="contact"><div className="section-wrap contact-grid"><div className="contact-copy"><p className="eyebrow">Have a good feeling?</p><h2>Let’s build something <em>lasting</em> together.</h2><p>Open to remote Customer Success roles in SaaS, health tech, and B2B services.</p><div className="contact-links"><a className="button button-primary" href={`mailto:${EMAIL}`}><Mail size={17} /> Email me</a><a className="button button-outline" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a></div><p className="email-note">Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p></div><form className="contact-form" onSubmit={handleSubmit}><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required placeholder="Name" /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /><label htmlFor="message">A little about what’s on your mind</label><textarea id="message" name="message" rows="4" required placeholder="Write your message..." /><button className="button button-primary form-submit" type="submit">Send a note <ArrowRight size={17} /></button>{formState && <p className="form-status" role="status">{formState}</p>}</form></div></section>
    </main>
    <footer className="site-footer"><div className="section-wrap footer-inner"><a className="footer-name" href="#home">Praise Ojua</a><span>Customer Success Professional</span><a className="footer-linkedin" href={LINKEDIN} aria-label="Praise Ojua on LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={18} /></a><span className="copyright">© 2026 Praise Ojua</span></div></footer>
    <CaseModal item={selectedCase} onClose={() => setSelectedCase(null)} />
  </>
}

export default App
