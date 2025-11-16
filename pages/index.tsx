'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form ,Navbar ,Nav} from 'react-bootstrap';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [typing, setTyping] = useState('');
  const phrases = ['Backend Developer', 'API Specialist', 'Freelancer'];
  const timerRef = useRef<number | null>(null);
  const [expanded, setExpanded] = useState(false); // control navbar state

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

  return (
    <main>
      {/* ====== HEADER ====== */}
      <Navbar expand="lg" className={styles.header} variant="dark" fixed="top" expanded={expanded}>
            <Container>
              <Navbar.Brand href="#" className={styles.logo}>
                Rathnesh
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav"   onClick={() => setExpanded(!expanded)}/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link href="#about" className={styles.navLink} onClick={() => setExpanded(false)}>About Me</Nav.Link>
                  <Nav.Link href="#skills" className={styles.navLink} onClick={() => setExpanded(false)}>Skills</Nav.Link>
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
                <a href="/resume.pdf" download className={styles.btnOutline}>  Download CV </a>
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
  );
}
