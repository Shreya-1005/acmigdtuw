import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styling/intern.css'
import pic1 from '../assets/pic1.png'
import pic2 from '../assets/pic2.png'
import pic3 from '../assets/pic3.png'
import test1 from '../assets/test1.png'
import test2 from '../assets/test2.png'
import newsirpic from '../assets/newsirpic.jpeg'
import drshweta from '../assets/drshweta.png'
import collage from '../assets/collage.png'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Home',     href: '#hero'     },
  { label: 'About Us', href: '#about'    },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Register', href: '#register' },  
  { label: 'Speakers', href: '#mentors'  },
  { label: 'Recap',    href: '#recap'    },
]

const BACK_LINK = '/'

const TEAM = [
  { name: 'Shriya Panda',       role: 'President',             branch: 'B.Tech IT',     color: '#5B5FFF' },
  { name: 'Vanshika Sehrawat',  role: 'VP — Technical',        branch: 'B.Tech AIML',   color: '#4B4FD1' },
  { name: 'Diya Sindhu',        role: 'VP — Planning',         branch: 'B.Tech CSE',    color: '#5B5FFF' },
  { name: 'Ishita Gupta',       role: 'VP — Finances',         branch: 'B.Tech CSE-AI', color: '#3E42B0' },
  { name: 'Shreya Shrivastava', role: 'Event Head',            branch: 'B.Tech CSE-AI', color: '#4B4FD1' },
  { name: 'Rabbika Azmi',       role: 'Technical Lead',        branch: 'B.Tech IT',     color: '#5B5FFF' },
  { name: 'Tanisha Ojha',       role: 'Web Dev / Design Head', branch: 'B.Tech IT',     color: '#3E42B0' },
]

const TIMELINE = [
  { date: 'MAY 29, 2026',    title: 'Applications Open',    desc: 'Early-stage registration opens for all qualified IGDTUW and external candidates.',  active: true  },
  { date: 'JUNE 05, 2026',   title: 'Application Deadline', desc: 'Final window for submission of portfolios and project preferences.',                  active: true  },
  { date: 'JUNE 08, 2026',   title: 'Program Onboarding',   desc: 'Orientation day, track allocation, and initial mentor meetings.',                    active: false },
  { date: 'JULY 25, 2026',   title: 'Final Showcase',       desc: 'Project demonstrations to industry evaluators and award ceremony.',                  active: false },
]

const FAQS = [
  { q: 'Who is eligible for this internship?',  a: 'Open to students from all programs, all years, and all disciplines — both IGDTUW and outside students are welcome.' },
  { q: 'Will a certificate be provided?',       a: 'Yes — a certificate recognised for summer/industry internship credits as per university norms is awarded on completion.' },
  { q: 'Is this internship paid?',              a: 'This is a learning-focused internship. Participants receive mentorship, certification, and project experience rather than a stipend.' },
  { q: 'What is the registration fee?',         a: '₹1,000 for IGDTUW students and ₹2,000 for students from other institutions.' },
  { q: 'Online or offline?',                    a: '100% online. All lectures are recorded and provided asynchronously for maximum flexibility.' },
  { q: 'How do I register?',                    a: 'Complete the payment via NEFT/UPI to the account details below, then fill in the registration form ( https://docs.google.com/forms/d/e/1FAIpQLSdKeMQlrWgNxnArM_pDyKvMt0fe4RMHnxZSKufBefZ2YYWn4w/viewform ) with your transaction receipt.' },
  { q: 'Where do I fill the registration form?', a: 'After completing the payment, open the registration form here: https://docs.google.com/forms/d/e/1FAIpQLSdKeMQlrWgNxnArM_pDyKvMt0fe4RMHnxZSKufBefZ2YYWn4w/viewform' },
]

const RECAP_IMAGES = [
  { src: new URL('../assets/recap1.jpg', import.meta.url).href, alt: 'Internship session 1' },
  { src: new URL('../assets/recap2.jpg', import.meta.url).href, alt: 'Internship session 2' },
  { src: new URL('../assets/recap3.jpg', import.meta.url).href, alt: 'Internship session 3' },
  { src: new URL('../assets/recap4.jpg', import.meta.url).href, alt: 'Internship session 4' },
  { src: new URL('../assets/recap5.jpg', import.meta.url).href, alt: 'Internship session 5' },
]

function reveal(ref, sel) {
  if (!ref.current) return { revert: () => {} }
  return gsap.context(() => {
    const targets = sel ? ref.current.querySelectorAll(sel) : ref.current
    if (!targets || (targets.length !== undefined && targets.length === 0)) return
    gsap.fromTo(targets,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 95%', toggleActions: 'play none none none', once: true } }
    )
  }, ref)
}

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'keyword', v: 'import ' }, { t: 'normal', v: '{ useState, useEffect } ' }, { t: 'keyword', v: 'from ' }, { t: 'string', v: "'react'" }] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'import ' }, { t: 'normal', v: 'axios ' }, { t: 'keyword', v: 'from ' }, { t: 'string', v: "'axios'" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'fn', v: 'ACMProject' }, { t: 'normal', v: ' = () => {' }] },
  { indent: 1, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'normal', v: '[data, setData] = ' }, { t: 'fn', v: 'useState' }, { t: 'normal', v: '([])' }] },
  { indent: 1, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'normal', v: '[loading, setLoading] = ' }, { t: 'fn', v: 'useState' }, { t: 'normal', v: '(' }, { t: 'bool', v: 'true' }, { t: 'normal', v: ')' }] },
  { indent: 0, tokens: [] },
  { indent: 1, tokens: [{ t: 'fn', v: 'useEffect' }, { t: 'normal', v: '(() => {' }] },
  { indent: 2, tokens: [{ t: 'comment', v: '// fetch internship data' }] },
  { indent: 2, tokens: [{ t: 'fn', v: 'fetchProjects' }, { t: 'normal', v: '().then(res => ' }, { t: 'fn', v: 'setData' }, { t: 'normal', v: '(res))' }] },
  { indent: 1, tokens: [{ t: 'normal', v: '}, [])' }] },
  { indent: 0, tokens: [] },
  { indent: 1, tokens: [{ t: 'keyword', v: 'return ' }, { t: 'normal', v: '(' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '<div ' }, { t: 'attr', v: 'className' }, { t: 'normal', v: '=' }, { t: 'string', v: '"acm-wrap"' }, { t: 'tag', v: '>' }] },
  { indent: 3, tokens: [{ t: 'tag', v: '<HeroSection ' }, { t: 'attr', v: 'data' }, { t: 'normal', v: '={data} ' }, { t: 'tag', v: '/>' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '</div>' }] },
  { indent: 1, tokens: [{ t: 'normal', v: ')' }] },
  { indent: 0, tokens: [{ t: 'normal', v: '}' }] },
]

function AnimatedWorkspace({ mousePos }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [terminalLines, setTerminalLines] = useState([])
  const terminalQueue = [
    '$ npm run research',
    '▸ Loading research datasets...',
    '$ python analyze_data.py --optimize',
    '✓ Analysis complete: 127 papers reviewed',
    '$ git commit -m "feat: research insights"',
    '✓ [main 8e2f4c9] research milestone achieved',
  ]

  useEffect(() => {
    let line = 0
    const iv = setInterval(() => {
      if (line < CODE_LINES.length) { setVisibleLines(l => l + 1); line++ }
      else { line = 0; setVisibleLines(0) }
    }, 280)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    let idx = 0
    const iv = setInterval(() => {
      setTerminalLines(prev => {
        const next = [...prev, terminalQueue[idx % terminalQueue.length]]
        idx++
        return next.slice(-4)
      })
    }, 2200)
    return () => clearInterval(iv)
  }, [])

  const mx = mousePos.x
  const my = mousePos.y
  const tiltX = (my - 0.5) * 6
  const tiltY = (mx - 0.5) * -6

  const floatStyle = (baseX, baseY, speed, amp) => ({
    transform: `translate(${(mx - 0.5) * amp * 18}px, ${(my - 0.5) * amp * 12}px)`,
    transition: `transform ${speed}s ease-out`,
    position: 'absolute',
    left: baseX,
    top: baseY,
  })

  return (
    <div className="ip-ws-scene">
      <div
        className="ip-ws-laptop-wrap"
        style={{
          transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 0.35s ease-out',
        }}
      >
        <div className="ip-ws-laptop">
          <div className="ip-ws-screen">
            <div className="ip-ws-titlebar">
              <span className="ip-ws-tb-dot ip-ws-tb-red" />
              <span className="ip-ws-tb-dot ip-ws-tb-yellow" />
              <span className="ip-ws-tb-dot ip-ws-tb-green" />
              <span className="ip-ws-tb-filename">ACMProject.jsx</span>
            </div>
            <div className="ip-ws-editor">
              <div className="ip-ws-gutter">
                {CODE_LINES.slice(0, visibleLines).map((_, i) => (
                  <div key={i} className="ip-ws-lineno">{i + 1}</div>
                ))}
              </div>
              <div className="ip-ws-codebody">
                {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="ip-ws-codeline" style={{ paddingLeft: `${line.indent * 14}px` }}>
                    {line.tokens.map((tok, j) => (
                      <span key={j} className={`ip-ws-tok-${tok.t}`}>{tok.v}</span>
                    ))}
                    {i === visibleLines - 1 && (
                      <span className={`ip-ws-cursor${cursorVisible ? '' : ' ip-ws-cursor-hidden'}`}>|</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="ip-ws-terminal">
              <div className="ip-ws-term-bar">TERMINAL</div>
              {terminalLines.map((l, i) => (
                <div key={i} className={`ip-ws-term-line${l.startsWith('✓') ? ' ip-ws-term-ok' : l.startsWith('$') ? ' ip-ws-term-cmd' : ''}`}>{l}</div>
              ))}
            </div>
          </div>
          <div className="ip-ws-base" />
          <div className="ip-ws-stand" />
        </div>
      </div>

      <div className="ip-ws-float ip-ws-float-react" style={floatStyle('6%', '8%', 0.55, 0.25)}>
        <svg width="42" height="42" viewBox="0 0 42 42"><circle cx="21" cy="21" r="5" fill="#5FAAD9"/><ellipse cx="21" cy="21" rx="18" ry="7" fill="none" stroke="#5FAAD9" strokeWidth="2"/><ellipse cx="21" cy="21" rx="18" ry="7" fill="none" stroke="#5FAAD9" strokeWidth="2" transform="rotate(60 21 21)"/><ellipse cx="21" cy="21" rx="18" ry="7" fill="none" stroke="#5FAAD9" strokeWidth="2" transform="rotate(-60 21 21)"/></svg>
      </div>

      <div className="ip-ws-float ip-ws-float-git" style={floatStyle('82%', '4%', 0.7, 0.2)}>
        <svg width="36" height="36" viewBox="0 0 36 36"><path d="M18 2 L30 10 L30 26 L18 34 L6 26 L6 10 Z" fill="none" stroke="#2477BF" strokeWidth="2"/><circle cx="18" cy="12" r="3" fill="#2477BF"/><circle cx="12" cy="22" r="3" fill="#2477BF"/><circle cx="24" cy="22" r="3" fill="#2477BF"/><line x1="18" y1="15" x2="12" y2="19" stroke="#2477BF" strokeWidth="1.5"/><line x1="18" y1="15" x2="24" y2="19" stroke="#2477BF" strokeWidth="1.5"/></svg>
      </div>

      <div className="ip-ws-float ip-ws-float-trophy" style={floatStyle('88%', '62%', 0.6, 0.15)}>
        <div className="ip-ws-badge-chip">
          <span>★</span><span>Excellence</span>
        </div>
      </div>

      <div className="ip-ws-float ip-ws-float-coffee" style={floatStyle('4%', '70%', 0.8, 0.3)}>
        <svg width="38" height="38" viewBox="0 0 38 38"><rect x="6" y="14" width="20" height="18" rx="4" fill="rgba(82,102,192,0.15)" stroke="#5266C0" strokeWidth="1.5"/><path d="M26 18 Q34 18 34 23 Q34 28 26 28" fill="none" stroke="#5266C0" strokeWidth="1.5"/><path d="M12 8 Q14 4 12 2" stroke="#8FA3D9" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M17 8 Q19 4 17 2" stroke="#8FA3D9" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
      </div>

      <div className="ip-ws-float ip-ws-float-snippet1" style={floatStyle('78%', '30%', 0.65, 0.22)}>
        <div className="ip-ws-snippet">
          <span className="ip-ws-tok-keyword">async </span>
          <span className="ip-ws-tok-fn">fetch</span>
          <span className="ip-ws-tok-normal">(url)</span>
        </div>
      </div>

      <div className="ip-ws-float ip-ws-float-snippet2" style={floatStyle('2%', '38%', 0.5, 0.28)}>
        <div className="ip-ws-snippet">
          <span className="ip-ws-tok-tag">{'<'}</span>
          <span className="ip-ws-tok-fn">Component</span>
          <span className="ip-ws-tok-tag">{'/>'}</span>
        </div>
      </div>

      <div className="ip-ws-float ip-ws-float-acm" style={floatStyle('44%', '2%', 0.72, 0.18)}>
        <div className="ip-ws-acm-badge">ACM</div>
      </div>

      <div className="ip-ws-float ip-ws-float-node1" style={floatStyle('70%', '82%', 0.58, 0.2)}>
        <svg width="44" height="28" viewBox="0 0 44 28"><circle cx="6" cy="14" r="5" fill="none" stroke="#8FA3D9" strokeWidth="1.5"/><circle cx="22" cy="6" r="5" fill="none" stroke="#5266C0" strokeWidth="1.5"/><circle cx="38" cy="14" r="5" fill="none" stroke="#8FA3D9" strokeWidth="1.5"/><circle cx="22" cy="22" r="5" fill="none" stroke="#4750B8" strokeWidth="1.5"/><line x1="11" y1="14" x2="17" y2="9" stroke="#5266C0" strokeWidth="1"/><line x1="27" y1="9" x2="33" y2="13" stroke="#5266C0" strokeWidth="1"/><line x1="11" y1="16" x2="17" y2="20" stroke="#5266C0" strokeWidth="1"/><line x1="27" y1="20" x2="33" y2="16" stroke="#5266C0" strokeWidth="1"/></svg>
      </div>

      <div className="ip-ws-float ip-ws-float-sticky" style={floatStyle('8%', '18%', 0.62, 0.25)}>
        <div className="ip-ws-sticky">
          <div>AI/ML</div>
          <div>Web3</div>
          <div>Cloud</div>
        </div>
      </div>

      <div className="ip-ws-float ip-ws-float-geo1" style={floatStyle('15%', '65%', 0.75, 0.12)}>
        <div className="ip-ws-badge-chip">
          <span>⚡</span><span>Research</span>
        </div>
      </div>

      <div className="ip-ws-float ip-ws-float-geo2" style={floatStyle('88%', '75%', 0.68, 0.1)}>
        <div className="ip-ws-badge-chip">
          <span>◆</span><span>Innovation</span>
        </div>
      </div>
    </div>
  )
}

export default function SummerInternship2026() {
  const [scrolled, setScrolled] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const heroRef     = useRef()
  const aboutRef    = useRef()
  const timelineRef = useRef()
  const mentorsRef  = useRef()
  const recapRef    = useRef()
  const teamRef     = useRef()
  const payRef      = useRef()
  const faqRef      = useRef()
  const navRef      = useRef()

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.1 })
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })

    const onMouse = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const ctxs = [
      reveal(heroRef,     '[data-h]'),
      reveal(aboutRef,    '[data-a]'),
      reveal(timelineRef, '[data-tl]'),
      reveal(mentorsRef,  '[data-m]'),
      reveal(recapRef,    '[data-rc]'),
      reveal(payRef,      '[data-p]'),
      reveal(faqRef,      '[data-f]'),
    ]
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      ctxs.forEach(c => c.revert())
    }
  }, [])

  return (
    <div className="ip">

      <nav ref={navRef} className={`ip-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/acmigdtuw/" className="ip-nav-back">← Back</a>
        <div className="ip-nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="ip-nav-link">{label}</a>
          ))}
        </div>
        <a href="#register" className="ip-btn ip-btn-primary" style={{ padding: '9px 22px', fontSize: '13px' }}>Apply Now</a>
      </nav>

      <section id="hero" ref={heroRef} className="ip-hero ip-hero-animated">
        <div className="ip-hero-animated-inner">
          <div className="ip-hero-text-col">
            <div data-h className="ip-hero-badge">Registration Open for 2026</div>
            <h1 data-h className="ip-hero-title">
              Elevate Your Engineering<br />
              <span>Journey This Summer.</span>
            </h1>
            <p data-h className="ip-hero-sub">
              ACM Summer programme is research oriented. Training and internship shall provide the essential skills for developing critical thinking, problem-solving, and analytical skills. The goal will be to bridge the gap between classroom learning and real-world application, with research focus.
            </p>
            <div data-h className="ip-hero-btns">
              <a href="#register" className="ip-btn ip-btn-primary">Begin Application →</a>
            </div>
            <div className="ip-hero-stats-row" style={{ display: 'none' }}>
              <p style={{ fontSize: '14px', color: '#4A4A4A', lineHeight: '1.8', marginTop: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Learn industry-relevant skills in <strong>AI/ML, Web3, Cloud Infrastructure, and Cyber Security</strong>. Work on real-world projects mentored by renowned faculty and tech leaders. Join 500+ alumni.
              </p>
            </div>
          </div>
          <div className="ip-hero-ws-col">
            <img src={collage} alt="Internship Collage" style={{ width: '100%', maxWidth: '500px', borderRadius: '16px' }} />
          </div>
        </div>
      </section>

      <section ref={aboutRef} id="about" className="ip-section ip-section-alt">
        <div className="ip-max">
          <div className="ip-about-grid">
            <div>
              <h2 data-a className="ip-section-title" style={{ marginBottom: '24px' }}>About the Program</h2>
              <p data-a className="ip-about-text">
                The ACM IGDTUW Summer Internship is a research-oriented and skill-building initiative designed to bridge the gap between academic theory and industry practice.
              </p>
              <p data-a className="ip-about-text">
                Our curriculum empowers women in tech through hands-on development in AI/ML, Web3, Cloud Infrastructure, and Cyber Security. Under the guidance of renowned faculty and industry veterans, interns tackle real-world problem statements.
              </p>
            </div>
            <div className="ip-detail-grid">
              {[
                { label: 'Duration',   sub: '8 Weeks (June – Aug 2026)'   },
                { label: 'Mode',       sub: 'Hybrid (On-campus & Remote)' },
                { label: 'Mentorship', sub: 'Research-Oriented'        },
              ].map(({ label, sub }) => (
                <div key={label} data-a className="ip-card ip-detail-card">
                  <div>
                    <div className="ip-detail-label">{label}</div>
                    <div className="ip-detail-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section ref={payRef} id="register" className="ip-payment-section">
        <div data-p className="ip-payment-card">
          <div>
            <h2 className="ip-payment-title">Payment & Registration</h2>
            <p className="ip-payment-desc">Complete the registration fee payment via NEFT/UPI and attach the transaction receipt to the application form.</p>
            {[
              ['Account Name:',   'ACM IGDTUW'],
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
          <div className="ip-form-button-container">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdKeMQlrWgNxnArM_pDyKvMt0fe4RMHnxZSKufBefZ2YYWn4w/viewform" target="_blank" rel="noopener noreferrer" className="ip-btn ip-btn-teal-solid ip-form-btn">
              Registeration Form
            </a>
          </div>
        </div>
      </section>

      <section ref={mentorsRef} id="mentors" className="ip-section ip-section-alt">
        <div className="ip-max">
          <h2 data-m className="ip-section-title ip-section-center">Academic Guidance</h2>
          <div className="ip-guidance-grid">
            {[
              { name: 'Dr. Rishabh Kaushal', role: 'Faculty Advisor', desc: 'Assistant Professor, IT Department with specialisation in Web Mining & Cyber Security.', image: newsirpic, links: [{ url: 'https://rishabhkaushal.github.io/', label: 'PORTFOLIO' }, { url: 'https://www.igdtuw.ac.in/profile/details/dr-rishabh-kaushal', label: 'IGDTUW' }] },
              { name: 'Dr. Shweta Jindal',   role: 'Faculty Advisor', desc: 'Expert in Distributed Systems and Cloud Computing Architectures at IGDTUW.', image: drshweta, links: [{ url: 'https://www.igdtuw.ac.in/profile/details/dr-shweta-jindal-formerly-shweta-singhal', label: 'IGDTUW' }] },
            ].map(({ name, role, desc, image, links }) => (
              <div key={name} data-m className="ip-card ip-mentor-card">
                <img src={image} alt={name} className="ip-mentor-img" />
                <div className="ip-mentor-body">
                  <div className="ip-mentor-name">{name}</div>
                  <div className="ip-mentor-role">{role}</div>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', justifyContent: 'center', fontSize: '13px' }}>
                    {links.map((link, idx) => (
                      <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#5B5FFF', textDecoration: 'underline' }}>{link.label}</a>
                    ))}
                  </div>
                  <div className="ip-mentor-desc">{desc}</div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      <section ref={recapRef} id="recap" className="ip-recap-section">
        <div className="ip-recap-mosaic">
          <div data-rc className="ip-rcell ip-rcell-badge">
            <div className="ip-hero-badge" style={{ marginBottom: '14px' }}>2024–25 Edition</div>
            <h2 className="ip-section-title">What We Did<br />Last Time</h2>
          </div>
          <div data-rc className="ip-rcell ip-rcell-writeup">
            <p className="ip-about-text" style={{ marginBottom: '14px' }}>
              The 2024–25 ACM IGDTUW Summer Internship was a milestone edition — one that set the bar for what student-led research programs can achieve. With <strong>180+ group applications</strong> pouring in from across disciplines and institutions, the response far exceeded expectations.
            </p>
            <p className="ip-about-text" style={{ marginBottom: '14px' }}>
              After a rigorous evaluation, <strong>32 exceptional groups</strong> were shortlisted — each tackling problem statements across AI, LLMs, Blockchain, DL/ML, Cybersecurity, and Healthcare Solutions.
            </p>
            <p className="ip-about-text" style={{ marginBottom: 0 }}>
              Over <strong>six months</strong>, participants were mentored by <strong>15 dedicated mentors</strong> through the full arc of research: ideation, literature review, experimentation, and final presentation.
            </p>
          </div>
          <div data-rc className="ip-rcell ip-rcell-stats">
            {[
              { val: '180+', label: 'Applications' },
              { val: '32',   label: 'Groups'       },
              { val: '15',   label: 'Mentors'      },
              { val: '6mo',  label: 'Duration'     },
            ].map(({ val, label }) => (
              <div key={label} className="ip-recap-stat">
                <div className="ip-recap-stat-val">{val}</div>
                <div className="ip-recap-stat-label">{label}</div>
              </div>
            ))}
          </div>
          <div data-rc className="ip-rcell ip-rcell-tracks">
            <div className="ip-rcell-tracks-title">Research Tracks</div>
            {['Machine Learning', 'Cybersecurity', 'Deep Learning', 'Cloud Computing', 'Healthcare Issues', 'Computer Vision', 'Image Segmentation and Optimization'].map(t => (
              <div key={t} className="ip-rcell-track-item"><div className="ip-rcell-track-dot" />{t}</div>
            ))}
          </div>
          <div data-rc className="ip-rcell ip-rcell-pdf">
            <div className="ip-recap-pdf-embed-header">
              <span className="ip-recap-pdf-icon">⬇</span>
              <div>
                <div className="ip-recap-pdf-title">2024–25 Program Magazine</div>
                <div className="ip-recap-pdf-sub">Research highlights, projects & more</div>
              </div>
              <a href="https://drive.google.com/file/d/19lNUrYA2OtOGDsV7WZET_hak1JXfpGnQ/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="ip-recap-pdf-arrow">↗</a>
            </div>
            <iframe src="https://drive.google.com/file/d/19lNUrYA2OtOGDsV7WZET_hak1JXfpGnQ/preview" className="ip-recap-pdf-frame" allow="autoplay" title="2024–25 Program Magazine" />
          </div>
          {RECAP_IMAGES.map(({ src, alt }, i) => (
            <div key={i} data-rc className={`ip-rcell ip-rcell-img ip-rcell-img-${i}`}>
              <img src={src} alt={alt} className="ip-recap-img"
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.style.background = '#dde5ec' }} />
            </div>
          ))}
        </div>
      </section>

      <section ref={faqRef} className="ip-section ip-section-alt">
        <div className="ip-max-sm">
          <h2 data-f className="ip-section-title ip-section-center">Frequently Asked Questions</h2>
          <div data-f className="ip-faq-list">
            {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      <footer className="ip-footer">
        <div className="ip-footer-grid">
          <div>
            <div className="ip-footer-brand">ACM IGDTUW</div>
            <p className="ip-footer-mission">Building the next generation of women leaders in technology through community and mentorship.</p>
            <div className="ip-footer-social">
              {['Web', 'Linked', 'Instagram'].map((icon, i) => (
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
  
  // Parse URLs in the answer text
  const renderAnswer = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)
    
    return parts.map((part, i) => 
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#5B5FFF', textDecoration: 'underline', cursor: 'pointer', wordBreak: 'break-all' }}>
          {part}
        </a>
      ) : (
        part
      )
    )
  }
  
  return (
    <div className={`ip-faq-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ip-faq-header">
        <span className="ip-faq-q">{q}</span>
        <span className={`ip-faq-chevron${open ? ' open' : ''}`}>▼</span>
      </div>
      {open && <div className="ip-faq-a">{renderAnswer(a)}</div>}
    </div>
  )
}