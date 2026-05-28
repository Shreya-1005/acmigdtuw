import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styling/intern.css'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Home',        href: '#hero'     },
  { label: 'Programs',    href: '#about'    },
  { label: 'Internships', href: '#timeline' },
  { label: 'Resources',   href: '#mentors'  },
  { label: 'About Us',    href: '#team'     },
]

const TEAM = [
  { name: 'Shriya Panda',       role: 'President',             branch: 'B.Tech IT',     color: '#00c4e0' },
  { name: 'Vanshika Sehrawat',  role: 'VP — Technical',        branch: 'B.Tech AIML',   color: '#0082aa' },
  { name: 'Diya Sindhu',        role: 'VP — Planning',         branch: 'B.Tech CSE',    color: '#00c4e0' },
  { name: 'Ishita Gupta',       role: 'VP — Finances',         branch: 'B.Tech CSE-AI', color: '#005f7f' },
  { name: 'Shreya Shrivastava', role: 'Event Head',            branch: 'B.Tech CSE-AI', color: '#0082aa' },
  { name: 'Rabbika Azmi',       role: 'Technical Lead',        branch: 'B.Tech IT',     color: '#00c4e0' },
  { name: 'Tanisha Ojha',       role: 'Web Dev / Design Head', branch: 'B.Tech IT',     color: '#005f7f' },
]

const TIMELINE = [
  { date: 'MARCH 15, 2026',  title: 'Applications Open',    desc: 'Early-stage registration opens for all qualified IGDTUW and external candidates.',  active: true  },
  { date: 'APRIL 30, 2026',  title: 'Application Deadline', desc: 'Final window for submission of portfolios and project preferences.',                  active: true  },
  { date: 'JUNE 01, 2026',   title: 'Program Onboarding',   desc: 'Orientation day, track allocation, and initial mentor meetings.',                    active: false },
  { date: 'JULY 25, 2026',   title: 'Final Showcase',       desc: 'Project demonstrations to industry evaluators and award ceremony.',                  active: false },
]

const FAQS = [
  { q: 'Who is eligible for this internship?',  a: 'Open to students from all programs, all years, and all disciplines — both IGDTUW and outside students are welcome.' },
  { q: 'Will a certificate be provided?',       a: 'Yes — a certificate recognised for summer/industry internship credits as per university norms is awarded on completion.' },
  { q: 'Is this internship paid?',              a: 'This is a learning-focused internship. Participants receive mentorship, certification, and project experience rather than a stipend.' },
  { q: 'What is the registration fee?',         a: '₹1,000 for IGDTUW students and ₹2,000 for students from other institutions.' },
  { q: 'Online or offline?',                    a: '100% online. All lectures are recorded and provided asynchronously for maximum flexibility.' },
  { q: 'How do I register?',                    a: 'Complete the payment via NEFT/UPI to the account details below, then fill in the registration form with your transaction receipt.' },
]

function reveal(ref, sel) {
  return gsap.context(() => {
    gsap.fromTo(sel ? ref.current.querySelectorAll(sel) : ref.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
    )
  }, ref)
}

export default function SummerInternship2026() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef     = useRef()
  const aboutRef    = useRef()
  const timelineRef = useRef()
  const mentorsRef  = useRef()
  const teamRef     = useRef()
  const payRef      = useRef()
  const faqRef      = useRef()
  const navRef      = useRef()

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.1 })
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    const ctxs = [
      reveal(heroRef,     '[data-h]'),
      reveal(aboutRef,    '[data-a]'),
      reveal(timelineRef, '[data-tl]'),
      reveal(mentorsRef,  '[data-m]'),
      reveal(teamRef,     '[data-tm]'),
      reveal(payRef,      '[data-p]'),
      reveal(faqRef,      '[data-f]'),
    ]
    return () => { window.removeEventListener('scroll', onScroll); ctxs.forEach(c => c.revert()) }
  }, [])

  return (
    <div className="ip">

      {/* NAV */}
      <nav ref={navRef} className={`ip-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="ip-nav-brand">ACM IGDTUW</a>
        <div className="ip-nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="ip-nav-link">{label}</a>
          ))}
        </div>
        <a href="#register" className="ip-btn ip-btn-primary" style={{ padding: '9px 22px', fontSize: '13px' }}>Apply Now</a>
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} className="ip-hero">
        <div className="ip-hero-grid">
          <div>
            <div data-h className="ip-hero-badge">Registration Open for 2026</div>
            <h1 data-h className="ip-hero-title">
              Elevate Your Engineering<br />
              <span>Journey This Summer.</span>
            </h1>
            <p data-h className="ip-hero-sub">
              Join ACM IGDTUW's premier 8-week summer internship. Work on high-impact projects, receive 1:1 mentorship from industry leaders, and build the future.
            </p>
            <div data-h className="ip-hero-btns">
              <a href="#register" className="ip-btn ip-btn-primary">Begin Application →</a>
              <a href="#timeline" className="ip-btn ip-btn-ghost">View Curriculum</a>
            </div>
          </div>
          <div className="ip-stats-grid">
            {[
              { icon: '👥', val: '500+', label: 'Alumni Network'    },
              { icon: '💻', val: '24+',  label: 'Project Tracks'    },
              { icon: '📋', val: '8w',   label: 'Immersive Learning' },
              { icon: '🏅', val: '100%', label: 'Completion Rate'   },
            ].map(({ icon, val, label }) => (
              <div key={label} data-h className="ip-stat-card">
                <div className="ip-stat-icon">{icon}</div>
                <div className="ip-stat-val">{val}</div>
                <div className="ip-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} id="about" className="ip-section ip-section-alt">
        <div className="ip-max">
          <div className="ip-about-grid">
            <div>
              <h2 data-a className="ip-section-title" style={{ marginBottom: '24px' }}>About the Program</h2>
              <p data-a className="ip-about-text">
                The ACM IGDTUW Summer Internship is a research-oriented and skill-building initiative designed to bridge the gap between academic theory and industry practice.
              </p>
              <p data-a className="ip-about-text">
                Our curriculum is meticulously crafted to empower women in tech through hands-on development in fields like AI/ML, Web3, Cloud Infrastructure, and Cyber Security. Under the guidance of renowned faculty and industry veterans, interns will tackle real-world problem statements.
              </p>
              <a data-a href="#" className="ip-download-link">Download Brochure ↓</a>
            </div>
            <div className="ip-detail-grid">
              {[
                { icon: '📅', label: 'Duration',   sub: '8 Weeks (June - Aug 2026)'    },
                { icon: '📍', label: 'Mode',       sub: 'Hybrid (On-campus & Remote)'  },
                { icon: '💳', label: 'Fee',        sub: 'INR 3,500 (Early Bird)'       },
                { icon: '🧠', label: 'Mentorship', sub: '1:1 Industry Connect'         },
              ].map(({ icon, label, sub }) => (
                <div key={label} data-a className="ip-card ip-detail-card">
                  <div className="ip-detail-icon">{icon}</div>
                  <div className="ip-detail-label">{label}</div>
                  <div className="ip-detail-sub">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section ref={timelineRef} id="timeline" className="ip-section">
        <div className="ip-max-md">
          <h2 data-tl className="ip-section-title ip-section-center" style={{ marginBottom: '56px' }}>Program Timeline</h2>
          <div className="ip-timeline-wrap">
            <div className="ip-timeline-line" />
            {TIMELINE.map(({ date, title, desc, active }, i) => (
              <div key={i} data-tl className={`ip-tl-item${active ? '' : ' muted'}`}>
                <div className={`ip-tl-dot${active ? '' : ' muted'}`} />
                <div className="ip-tl-date">{date}</div>
                <div className="ip-tl-title">{title}</div>
                <div className="ip-tl-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC GUIDANCE */}
      <section ref={mentorsRef} id="mentors" className="ip-section ip-section-alt">
        <div className="ip-max">
          <h2 data-m className="ip-section-title ip-section-center">Academic Guidance</h2>
          <div className="ip-guidance-grid">
            {[
              { name: 'Dr. Rishabh Kaushal', role: 'Faculty Advisor', desc: 'Assistant Professor, IT Department with specialisation in Web Mining & Cyber Security.' },
              { name: 'Dr. Shweta Jindal',   role: 'Co-Advisor',      desc: 'Expert in Distributed Systems and Cloud Computing Architectures at IGDTUW.' },
            ].map(({ name, role, desc }) => (
              <div key={name} data-m className="ip-card ip-mentor-card">
                <div style={{ height: '220px', background: 'linear-gradient(135deg,#b0c4ce,#8ea8b5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px', color: 'rgba(255,255,255,0.5)' }}>👤</div>
                <div className="ip-mentor-body">
                  <div className="ip-mentor-name">{name}</div>
                  <div className="ip-mentor-role">{role}</div>
                  <div className="ip-mentor-desc">{desc}</div>
                </div>
              </div>
            ))}
            <div data-m className="ip-mentor-placeholder">
              <div className="ip-mentor-ph-icon">👥</div>
              <div className="ip-mentor-ph-title">Industry Mentor</div>
              <div className="ip-mentor-ph-sub">Joining from Microsoft / Google / Amazon</div>
            </div>
            <div data-m className="ip-mentor-placeholder">
              <div className="ip-mentor-ph-icon">🔬</div>
              <div className="ip-mentor-ph-title">Research Lead</div>
              <div className="ip-mentor-ph-sub">Joining from Premier R&D Labs</div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section ref={teamRef} id="team" className="ip-section">
        <div className="ip-max">
          <h2 data-tm className="ip-section-title ip-section-center">Student Leadership</h2>
          <div className="ip-team-grid">
            {TEAM.map(({ name, role, branch, color }) => {
              const initials = name.split(' ').map(n => n[0]).join('')
              return (
                <div key={name} data-tm className="ip-card ip-team-card">
                  <div className="ip-team-avatar" style={{ background: `${color}18`, border: `2px solid ${color}44`, color }}>
                    {initials}
                    <div style={{ position: 'absolute', top: 3, right: 3, width: 7, height: 7, borderRadius: '50%', background: color, animation: 'ip-pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div>
                    <div className="ip-team-name">{name}</div>
                    <div className="ip-team-role" style={{ color }}>{role}</div>
                    <div className="ip-team-branch">{branch}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section ref={payRef} id="register" className="ip-payment-section">
        <div data-p className="ip-payment-card">
          <div>
            <h2 className="ip-payment-title">Payment & Registration</h2>
            <p className="ip-payment-desc">Please complete the registration fee payment via NEFT/UPI and attach the transaction receipt to the application form.</p>
            {[
              ['Account Name:',   'ACM IGDTUW Student Chapter'],
              ['Account Number:', '09001000018964'],
              ['IFSC Code:',      'PSIB0001098'],
              ['Bank:',           'Punjab and Sind Bank, GGSIPU University, Delhi – 110006'],
            ].map(([label, val]) => (
              <div key={label} className="ip-payment-row">
                <span className="ip-payment-label">{label}</span>
                <span className="ip-payment-val">{val}</span>
              </div>
            ))}
          </div>
          <div className="ip-qr-panel">
            <div className="ip-qr-box">QR CODE</div>
            <div className="ip-qr-label">Scan to Pay via UPI</div>
            <div className="ip-qr-sub">All major wallets supported</div>
            <a href="#" onClick={e => e.preventDefault()} className="ip-btn ip-btn-teal-solid" style={{ marginTop: '8px' }}>
              Open Form After Payment
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="ip-section ip-section-alt">
        <div className="ip-max-sm">
          <h2 data-f className="ip-section-title ip-section-center">Frequently Asked Questions</h2>
          <div data-f className="ip-faq-list">
            {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ip-footer">
        <div className="ip-footer-grid">
          <div>
            <div className="ip-footer-brand">ACM IGDTUW</div>
            <p className="ip-footer-mission">Building the next generation of women leaders in technology through community and mentorship.</p>
            <div className="ip-footer-social">
              {['🌐', '@', '▣'].map((icon, i) => (
                <a key={i} href="#" className="ip-footer-social-btn">{icon}</a>
              ))}
            </div>
          </div>
          {[
            { title: 'Resources', links: ['Internships', 'Academic Programs', 'Mentorship'] },
            { title: 'Legal',     links: ['Code of Conduct', 'Privacy Policy'] },
            { title: 'Connect',   links: ['GitHub', 'LinkedIn', 'Instagram'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div className="ip-footer-col-title">{title}</div>
              <div className="ip-footer-links">
                {links.map(l => <a key={l} href="#" className="ip-footer-link">{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="ip-footer-bottom">
          <span>© 2024 ACM IGDTUW. All rights reserved. Built for builders and scholars.</span>
          <a href="#">Contact Support</a>
        </div>
      </footer>

    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ip-faq-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ip-faq-header">
        <span className="ip-faq-q">{q}</span>
        <span className={`ip-faq-chevron${open ? ' open' : ''}`}>▼</span>
      </div>
      {open && <div className="ip-faq-a">{a}</div>}
    </div>
  )
}