'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form ,Navbar ,Nav} from 'react-bootstrap';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
  const [typing, setTyping] = useState('');
  const phrases = ['Backend Developer', 'API Specialist', 'Freelancer'];
  const timerRef = useRef<number | null>(null);
  const [expanded, setExpanded] = useState(false); // control navbar state
  const navRef = useRef<HTMLDivElement | null>(null);

  // Typing Effect
  useEffect(() => {
    let current = 0;
    let isDeleting = false;
    let txt = '';
    const wait = 1600;
    let mounted = true;

    const tick = () => {
      if (!mounted) return;
      const full = phrases[current];
      txt = isDeleting ? full.substring(0, txt.length - 1) : full.substring(0, txt.length + 1);
      setTyping(txt);

      let delta = 100 - Math.random() * 40;
      if (isDeleting) delta /= 2;
      if (!isDeleting && txt === full) {
        delta = wait;
        isDeleting = true;
      } else if (isDeleting && txt === '') {
        isDeleting = false;
        current = (current + 1) % phrases.length;
        delta = 300;
      }
      timerRef.current = window.setTimeout(tick, delta);
    };

    timerRef.current = window.setTimeout(tick, 500);
    return () => { mounted = false; if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Email Handler
  async function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        target,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      alert('Message sent — I will reply soon!');
      target.reset();
    } catch (err) {
      console.error(err);
      alert('Could not send the message.');
    }
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);
  return (
    <>
      <Head>
        <title>Rathnesh Belman | Backend Developer & API Specialist</title>
        <meta name="description" content="Rathnesh Belman - Backend Developer, API Specialist & Freelancer. Building secure, scalable APIs and backend solutions. Open for freelance & full-time roles." />
        <meta name="keywords" content="Backend Developer, Node.js, Express.js, PHP, MySQL, API Developer, Freelancer, Vercel Deployment" />
        <meta name="author" content="Rathnesh Belman" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Rathnesh Belman | Backend Developer" />
        <meta property="og:description" content="I build secure, scalable backend solutions and APIs. Open to freelance & full-time opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/myprofile.jpg" />
        <meta property="og:url" content="https://rathnesh-creatives-portfolio.vercel.app" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rathnesh Belman | Backend Developer" />
        <meta name="twitter:description" content="I build secure, scalable backend solutions and APIs. Open to freelance & full-time opportunities." />
        <meta name="twitter:image" content="/myprofile.jpg" />

        <link rel="canonical" href="https://rathnesh-creatives-portfolio.vercel.app" />
         <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        {/* ====== HEADER ====== */}
        <Navbar expand="lg" className={styles.header} variant="dark" fixed="top" expanded={expanded} >
              <Container ref={navRef}>
                <Navbar.Brand href="#" className={styles.logo}>
                  Rathnesh
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"   onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                    <Nav.Link href="#about" className={styles.navLink} onClick={() => setExpanded(false)}>About Me</Nav.Link>
                    <Nav.Link href="#skills" className={styles.navLink} onClick={() => setExpanded(false)}>Skills</Nav.Link>
                    <Nav.Link href="#services" className={styles.navLink} onClick={() => setExpanded(false)}>Services</Nav.Link>
                    <Nav.Link href="#projects" className={styles.navLink} onClick={() => setExpanded(false)}>Projects</Nav.Link>
                    <Nav.Link href="#contact" className={styles.navLink} onClick={() => setExpanded(false)}>Contact</Nav.Link>
                    
                  </Nav>
                </Navbar.Collapse>
              </Container>
        </Navbar>
        {/* ====== HERO SECTION (PREMIUM) ====== */}
        <section className={styles.hero}>
          <div className="container-compact">
            <div className={styles.heroInner}>
              
              {/* LEFT TEXT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={styles.heroText}
              >
                <h1 className={styles.headline}>
                  Hi, I’m <span className={styles.name}>Rathnesh</span>
                </h1>

                <h2 className={styles.subline}>
                  A <span className={styles.roleDynamic}>{typing}</span>
                  <span className={styles.cursor}>|</span>
                </h2>

                <p className={styles.heroDesc}>
                  I’m a passionate <b>Backend Developer</b> building secure APIs,
                  scalable systems, and real-world solutions.
                </p>

                <div className={styles.heroButtons}>
                  <Button href="#contact" className={styles.btnPrimary}>Let’s Work Together</Button>
                  <a href="/resume.pdf" download className={styles.btnOutline} role="button" aria-label="Download resume">Download CV</a>
                </div>
              </motion.div>

              {/* RIGHT SIDE IMAGE */}  
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className={styles.heroVisual}
              >
                <div className={styles.glowCircle}></div>
                <Image
                  src="/myprofile.jpg"
                  alt="Rathnesh"
                  width={320}
                  height={320}
                  className={styles.heroProfile}
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ====== About Me SECTION ====== */}
        <section  id="about" className={styles.about}>
          <div className="container-compact">
            <h3 className="section-title">About Me</h3>
            <p className={styles.aboutText}>
              I'm a Backend Developer specializing in building fast, secure, and scalable APIs.
              I help businesses solve real-world problems with clean code and strong system design.
              Currently open to Freelance Work & Full-Time Roles.
            </p>
          </div>
        </section>

        {/* ====== SKILL SECTION  ====== */}
        <section  id="skills" className={styles.skills}>
          <div className="container-compact">
            <h3 className="section-title">Skills & Expertise</h3>

            <div className={styles.skillGrid}>
              {[
                "Node.js", "Express.js", "PHP", "MySQL",
                "REST API Development", "Authentication (JWT)",
                "Git & GitHub", "Postman", "Linux Server",
                "Vercel Deployment"
              ].map((skill, i) => (
                <motion.div 
                  key={i}
                  className={styles.skillCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: .4, delay: i * 0.05 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== SERVICES SECTION ====== */}
        <section id="services" className={styles.services}>
          <div className="container-compact">
            <h3>What I Offer</h3>

            <div className={styles.serviceGrid}>
              {[
                {
                  title: "Backend Development",
                  desc: "Building fast, secure and scalable backend systems using Node.js, Express.js, PHP and MySQL."
                },
                {
                  title: "API Development",
                  desc: "REST API design, authentication (JWT), role-based access, validation, error handling."
                },
                {
                  title: "Database Design",
                  desc: "MySQL schema design, indexing, optimization, migrations, and performance tuning."
                },
                {
                  title: "Deployment & Hosting",
                  desc: "Deploying apps on Vercel, cPanel, VPS, Linux server configuration and optimization."
                },
                {
                  title: "Bug Fixing / Optimization",
                  desc: "Fix backend errors, optimize slow APIs, secure endpoints, remove vulnerabilities."
                },
                {
                  title: "Freelance Project Support",
                  desc: "End-to-end backend solutions for startups, businesses, and individual clients."
                }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  className={styles.serviceCard}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECTS (SLIDER) ====== */}
        <section id="projects" className={styles.projects}>
          <div className="container-compact">
            <h3>Featured Projects</h3>
                <motion.div className={styles.sliderWrapper} whileTap={{ cursor: "grabbing" }}>
                <motion.div
                  className={styles.slider}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0 }}
                >
                  {[
                    {
                      title: "New Project Coming Soon",
                      desc: "A major backend-focused project is on the way.",
                      tech: "Releasing soon…",
                      img: "/project/comingsoon.jpg"
                    }
                  ].map((p, i) => (
                    <motion.article
                      key={i}
                      className={styles.projectCard}
                      whileHover={{ scale: 1.04, y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <div className={styles.cardImage}>
                        <img src={p.img} alt={p.title} />
                      </div>
                      <div className={styles.cardInner}>
                        <h5>{p.title}</h5>
                        <p>{p.desc}</p>
                        <small>{p.tech}</small>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </motion.div>

          </div>
        </section>


        {/* ====== TESTIMONIALS SECTION ====== */}
        <section id="testimonials" className={styles.testimonials}>
          <div className="container-compact">
            <h3>What People Say</h3>

            <div className={styles.testimonialGrid}>
              {[
                {
                  name: "Ajay Kumar",
                  role: "Startup Founder",
                  text: "Rathnesh built a backend API for my startup — secure, fast, and delivered before deadline. Highly recommended!",
                  img: "/testimonials-image/user1.png"
                },
                {
                  name: "Sandeep Shetty",
                  role: "Business Owner",
                  text: "Very professional and excellent communication. Solved all backend issues and optimized our database performance.",
                  img: "/testimonials-image/user2.png"
                },
                {
                  name: "Meera D",
                  role: "Project Manager",
                  text: "One of the best backend developers I worked with. Clean code, scalable architecture, and reliable delivery.",
                  img: "/testimonials-image/user3.jpg"
                }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  className={styles.testimonialCard}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className={styles.testimonialTop}>
                    <img src={t.img} alt={t.name} className={styles.testimonialImg} />
                    <div>
                      <h4>{t.name}</h4>
                      <small>{t.role}</small>
                    </div>
                  </div>

                  <p className={styles.testimonialText}>{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ====== CONTACT ====== */}
        <section id="contact" className={styles.contact}>
          <Container>
            <h3>Get in Touch</h3>
            <Row className="justify-content-center">
              <Col md={7}>
                <motion.div  className={styles.contactCard}  initial={{ opacity: 0, y: 30 }}  whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 0.6 }}>
                  <Form onSubmit={handleSend}>
                    <Form.Control name="from_name" placeholder="Your name" required className="mb-3" />
                    <Form.Control name="reply_to" type="email" placeholder="Your email" required className="mb-3" />
                    <Form.Control as="textarea" rows={5} name="message" placeholder="Your message" required className="mb-3" />
                    <Button type="submit" className={styles.btnPrimary}>Send Message</Button>
                  </Form>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ====== FOOTER ====== */}
        <footer className={styles.footer}>
          <div className="container-compact">
            <p className={styles.footerText}>
            © {new Date().getFullYear()} <span>Rathnesh Belman</span>. All Rights Reserved.
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}
