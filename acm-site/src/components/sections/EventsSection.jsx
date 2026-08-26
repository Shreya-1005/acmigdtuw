 import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import potdImage from '../../assets/potd.jpeg'
import recap1Image from '../../assets/recap1.jpg'
import recap4Image from '../../assets/recap4.jpg'
import sourceryImage from '../../assets/sourcery.jpeg'
import summerInternshipImage from '../../assets/summer-intern-26-poster.jpeg'

gsap.registerPlugin(ScrollTrigger)

const getEventImageSrc = (image) => image.startsWith('http') || image.startsWith('/')
  ? image
  : `${import.meta.env.BASE_URL}${image}`

const events = [
  {
    tag: 'Flagship Program',
    tagColor: '#00c4e0',
    date: '8 Jun – 31 Jul 2026',
    title: 'ACM Research Summer Internship',
    desc: 'A flagship summer research internship designed to help students explore meaningful technical problems through guided, hands-on work.',
    objective: 'Connected students with research-oriented learning, mentorship, and practical project experience during the summer break.',
    participants: '70+',
    images: [summerInternshipImage],
    link: '/acmigdtuw/summer-workshop-2026',
    linkLabel: 'Explore Internship'
  },
  {
    tag: 'Challenge',
    tagColor: '#0082aa',
    date: '22 Mar – 25 Apr 2026',
    title: 'POTD: 30-Day LeetCode Challenge',
    desc: 'A consistency-first coding challenge where students solved one LeetCode problem each day for 30 days.',
    objective: 'Built a sustainable daily problem-solving habit through regular practice and steady progress, with consistency as the only requirement.',
    participants: '40+',
    images: [potdImage]
  },
  {
    tag: 'Open Source',
    tagColor: '#005f7f',
    date: '3 – 10 Apr 2026',
    title: 'Sourcery',
    desc: 'A contribution sprint where students worked on real-world projects under the guidance of project maintainers.',
    objective: 'Gave students practical experience solving meaningful problems, collaborating with maintainers, and contributing beyond tutorials and toy exercises.',
    participants: '25+',
    images: [sourceryImage]
  },
  {
    tag: 'Workshop',
    tagColor: '#00c4e0',
    date: 'Feb 2026',
    title: 'AI for Social Good',
    desc: 'Expert session on leveraging AI to counter online aggression and build safer digital communities.',
    objective: 'Explored technical strategies to identify and mitigate online hostility using AI systems.',
    participants: '25+',
    images: [
      'events/ai-for-social-good-1.jpg',
      'events/ai-for-social-good-2.jpg'
    ]
  },
  {
    tag: 'Workshop',
    tagColor: '#0082aa',
    date: 'Feb 2026',
    title: 'AI x Augmented Reality Workshop',
    desc: 'Hands-on workshop exploring AR/VR technologies and building real-world immersive experiences.',
    objective: 'Introduced students to AR/VR tools and guided them in building practical immersive applications.',
    participants: '30+',
    images: ['events/acmxleanin.jpg']
  },
  {
    tag: 'Event',
    tagColor: '#005f7f',
    date: 'Feb 2026',
    title: 'Winter Workshop Felicitation',
    desc: 'Recognition ceremony celebrating participants, mentors, and coordinators.',
    objective: 'Recognised contributions and performance of participants in the ACM Winter Workshop program.',
    participants: '30+',
    images: [
      'events/winter-workshop-fel-1.jpg',
      'events/winter-workshop-fel-2.jpg'
    ]
  },
  {
    tag: 'Workshop',
    tagColor: '#00c4e0',
    date: 'Dec 2025 – Jan 2026',
    title: 'ACM Winter Workshop',
    desc: 'Structured program covering DSA, projects, resume building, and mentorship.',
    objective: 'Strengthened technical foundations through guided mentorship, DSA practice, and career preparation.',
    participants: '40+',
    images: ['events/winter-workshop-1.png']
  },
  {
    tag: 'Event',
    tagColor: '#0082aa',
    date: 'Nov 2025',
    title: 'Online Orientation',
    desc: 'Virtual orientation session introducing ACM and opportunities.',
    objective: 'Introduced ACM initiatives, membership benefits, and engagement opportunities to new students.',
    participants: '40+',
    images: ['events/online-orientation.jpeg']
  },
  {
    tag: 'Event',
    tagColor: '#005f7f',
    date: 'Oct 2025',
    title: 'Offline Orientation',
    desc: 'Introduction to ACM community with interactive activities.',
    objective: 'Built awareness about ACM activities and encouraged student participation through engagement.',
    participants: '40+',
    images: [
      'events/offline-orientation-1.jpg',
      'events/offline-orientation-2.jpg'
    ]
  },
  {
    tag: 'Competition',
    tagColor: '#00c4e0',
    date: 'Oct 2025',
    title: 'AI Comic Creation Challenge',
    desc: 'Creative competition using AI tools like DALL·E and Gemini to design engaging comic strips.',
    objective: 'Encouraged creative storytelling using generative AI tools.',
    participants: '20+',
    images: ['events/comic-creation.jpeg']
  },
  {
    tag: 'Talk',
    tagColor: '#0082aa',
    date: 'Sep 2025',
    title: 'Alumni Connect',
    desc: 'Session on cybersecurity careers, certifications, and building industry-ready skillsets.',
    objective: 'Provided insights into cybersecurity careers and industry expectations.',
    participants: '15+',
    images: ['events/alumini-connect.jpeg']
  },
  {
    tag: 'Talk',
    tagColor: '#00c4e0',
    date: 'Aug 2025',
    title: 'Future of Generative AI',
    desc: 'Expert session by Dr. Akshi Kumar on advancements in GenAI and sustainable AI systems.',
    objective: 'Explored real-world applications and future trends in generative AI.',
    participants: '350+',
    images: [
      'events/future-of-genai-1.jpg',
      'events/future-of-genai-2.jpg'
    ]
  },
  {
    tag: 'Program',
    tagColor: '#005f7f',
    date: 'Apr 2025',
    title: 'ACM Research Internship Conclusion',
    desc: 'Final evaluation and recognition of research internship projects with awards and certifications.',
    objective: 'Showcased research outcomes and recognized student achievements.',
    participants: '30+',
    images: [recap1Image, recap4Image]
  },
  // {
  //   tag: 'Workshop',
  //   tagColor: '#0082aa',
  //   date: 'Feb 2025',
  //   title: 'Meditation and Happiness',
  //   desc: 'Session focused on mental well-being, mindfulness, and personal growth.',
  //   objective: 'Promoted mental well-being and stress management among students.',
  //   participants: '—',
  //   images: []
  // },
  // {
  //   tag: 'Talk',
  //   tagColor: '#00c4e0',
  //   date: 'Jan 2025',
  //   title: 'Career Options After B.Tech',
  //   desc: 'Guidance session on career paths, higher studies, and competitive exams.',
  //   objective: 'Guided students on various career pathways after graduation.',
  //   participants: '—',
  //   images: []
  // },
  // {
  //   tag: 'Talk',
  //   tagColor: '#0082aa',
  //   date: 'Nov 2024',
  //   title: 'Motivation and Higher Studies',
  //   desc: 'Session providing strategies for academic growth and higher education planning.',
  //   objective: 'Motivated students to pursue higher education and structured preparation.',
  //   participants: '—',
  //   images: []
  // }
]

export default function EventsSection() {
  const sectionRef = useRef()
  const scrollRef = useRef()
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    if (!selectedEvent) return

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [selectedEvent])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-ev-head]',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-ev-head]', start: 'top 82%' },
        }
      )

      gsap.fromTo('[data-ev-card]',
        { y: 80, opacity: 0, rotateX: 8 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1, stagger: 0.12, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id = 'events'
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vh, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(4,8,15,0) 0%, rgba(4,8,15,0.8) 20%, rgba(4,8,15,0.85) 80%, rgba(4,8,15,0) 100%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div data-ev-head style={{ marginBottom: '52px' }}>
          <h2 style={{
            fontSize: 'clamp(36px,5vw,64px)',
            fontWeight: 800,
            color: '#fff'
          }}>
            Featured <span style={{ color: '#0082aa' }}>Events</span>
          </h2>
        </div>

        {/* Scroll wrapper */}
        <div style={{ position: 'relative' }}>

          {/* Left */}
          <button
            onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.035)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >←</button>

          {/* Right */}
          <button
            onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.035)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >→</button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="events-scroll"
            style={{
              display: 'flex',
              gap: '18px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '10px',
              scrollbarWidth: 'none',
            }}
          >
            {events.map((ev) => (
              <div
                key={ev.title}
                data-ev-card
                onClick={() => setSelectedEvent(ev)}
                style={{
                  minWidth: '260px',
                  maxWidth: '260px',
                  flex: '0 0 auto',
                  scrollSnapAlign: 'start',

                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{
                    background: `${ev.tagColor}22`,
                    border: `1px solid ${ev.tagColor}44`,
                    color: ev.tagColor,
                    fontSize: '10px',
                    padding: '4px 10px',
                    borderRadius: '100px',
                  }}>
                    {ev.tag}
                  </span>

                  <span style={{ fontSize: '11px', color: '#aaa' }}>
                    {ev.date}
                  </span>
                </div>
                <h3 style={{ color: '#fff' }}>{ev.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>{ev.desc}</p>
                {ev.link && (
                  <a
                    href={ev.link}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-flex',
                      marginTop: '18px',
                      color: '#00c4e0',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    {ev.linkLabel} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && createPortal(
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4,8,15,0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 1100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
          }}
        >
          <div
            className="event-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(32px, 5vw, 72px)',
              maxWidth: '1100px',
              width: '100%',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: 'clamp(32px, 5vw, 64px)',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event details"
              title="Close event details"
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '36px',
                height: '36px',
                display: 'grid',
                placeItems: 'center',
                padding: 0,
                border: '1px solid rgba(0,196,224,0.35)',
                borderRadius: '50%',
                background: 'rgba(0,196,224,0.08)',
                color: '#00c4e0',
                cursor: 'pointer'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ color: '#fff', fontWeight: 800, margin: '0 0 28px', lineHeight: 1.1 }}>
                {selectedEvent.title}
              </h2>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <span style={{ width: '3px', minHeight: '24px', background: '#00c4e0', borderRadius: '3px', flexShrink: 0 }} />
                <p style={{ color: 'rgba(255,255,255,0.62)', margin: 0, lineHeight: 1.7 }}>
                  {selectedEvent.desc}
                </p>
              </div>
              <p style={{ color: '#fff', margin: '0 0 32px', lineHeight: 1.7 }}>
                <strong>Objective:</strong> {selectedEvent.objective}
              </p>
              <p style={{ color: '#00c4e0', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: '#00c4e0', flexShrink: 0 }}>
                  <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M3.5 19c.5-3 2.3-4.5 5.5-4.5s5 1.5 5.5 4.5M14 15.2c.8-.5 1.7-.7 2.8-.7 2.3 0 3.6 1.4 3.9 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                {selectedEvent.participants} attendees
              </p>
              {selectedEvent.link && (
                <a
                  href={selectedEvent.link}
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    marginTop: '28px',
                    padding: '11px 18px',
                    border: '1px solid rgba(0,196,224,0.5)',
                    borderRadius: '999px',
                    color: '#00c4e0',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  {selectedEvent.linkLabel} →
                </a>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', justifyContent: 'center' }}>
              {selectedEvent.images.map((img, i) => (
                <img
                  key={i}
                  src={getEventImageSrc(img)}
                  alt={`${selectedEvent.title} event photograph ${i + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '360px',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    display: 'block'
                  }}
                />
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}