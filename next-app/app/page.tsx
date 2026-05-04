'use client';

import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { FaLinkedinIn, FaXTwitter, FaInstagram, FaGithub } from 'react-icons/fa6';

export default function HomePage() {
  const [showAbout, setShowAbout] = useState(false);

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    // Hide the about panel.
    setShowAbout(false);

    // Scroll to the top.
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-trigger the preload animation by toggling the body class.
    const body = document.body;
    body.classList.add('is-preload');
    window.setTimeout(() => {
      body.classList.remove('is-preload');
    }, 100);
  };

  const handleAboutClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowAbout(true);

    window.setTimeout(() => {
      const about = document.getElementById('about');
      if (about) {
        about.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  return (
    <>
      <header id="header">
        <div className="content">
          <div className="inner">
            <h1>Dr Fernando Mateos-González</h1>
            <p>Field biologist, scientist, expedition leader</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#home" onClick={handleHomeClick}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={handleAboutClick}>
                About
              </a>
            </li>
            <li>
              <a
                href="https://scholar.google.se/citations?hl=es&pli=1&user=bwM4wj0AAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Research
              </a>
            </li>
            <li>
              <Link href="/es">Español</Link>
            </li>
          </ul>
        </nav>
        <ul className="icons">
          <li>
            <a
              href="https://www.linkedin.com/in/fernandomateosgonzalez/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/Bioblogo"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
            >
              <FaXTwitter />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/bioblogo/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @bioblogo"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/fernandomateos"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </header>

      <div id="main">
        {showAbout && (
          <article id="about">
            <h2 className="major">About</h2>
            <img src="/images/tanganyika.jpg" alt="Fernando Mateos-González" className="profile-photo" />
            <p>
              Hey there! My name is Fernando Mateos-González, and you can blame me for everything
              that doesn&apos;t work around this website.
            </p>
            <p>
              Ever since I can remember, I’ve been fascinated by nature, and that led me to study a
              BSc in Biology at the{' '}
              <a href="http://www.unex.es/" target="_blank" rel="noreferrer">
                University of Extremadura
              </a>{' '}
              in Southern Spain, arguably one of the richest wildlife spots in Europe.
            </p>
            <p>
              After working for a while as a conservation biologist for both the private and civil
              sectors, curiosity lured me to research, and I ended up completing an MSc in
              Biodiversity and a PhD in Animal Behaviour at the{' '}
              <a href="http://www.ub.edu/web/ub/es/index.html?" target="_blank" rel="noreferrer">
                University of Barcelona
              </a>{' '}
              and the{' '}
              <a href="http://museuciencies.cat/es/" target="_blank" rel="noreferrer">
                Natural History Museum of Barcelona
              </a>{' '}
              (Spain). Then, as a fully fledged scientist, I worked for several years as a
              postdoctoral researcher affiliated with the{' '}
              <a href="https://www.ebc.uu.se/?languageId=1" target="_blank" rel="noreferrer">
                Evolutionary Biology Centre in Uppsala (Sweden)
              </a>
              , the{' '}
              <a
                href="http://collectivebehaviour.com/people/mateos-gonzalez-fernando/"
                target="_blank"
                rel="noreferrer"
              >
                Max Planck Institute for Ornithology (Germany)
              </a>{' '}
              and the{' '}
              <a href="http://www.sbs.utexas.edu/ryan/" target="_blank" rel="noreferrer">
                University of Texas at Austin (USA)
              </a>
              .
            </p>
            <p>
              My scientific interests are broad: behaviour, evolution, conservation, climate
              change… Lately, however, what decides where I go and what I do are mainly curiosity
              and the chance of adventure. I have made my dream true and become a{' '}
              <a
                href="https://www.linkedin.com/in/fernandomateosgonzalez/"
                target="_blank"
                rel="noreferrer"
              >
                nomadic mercenary biologist
              </a>
              , offering my services only to the most interesting causes.
            </p>
            <p>
              My basecamp, and current main source of interesting work, is the Czech NGO{' '}
              <a href="https://www.alkawildlife.eu/" target="_blank" rel="noreferrer">
                ALKA Wildlife
              </a>
              , an independent research team working for conservation through international
              scientific projects.
            </p>
            <p>
              Thanks to this career I’ve been lucky to live and work in several countries in
              Europe, America, Africa and Australia, doing amazing things like tracking lynx in the
              snow, guiding expeditions in the Peruvian Amazon, canoeing down the Yukon River in
              Canada, diving in Lake Tanganyika, exploring the island of Trinidad and even working
              in the rainforest with the BBC for a Sir David Attenborough series.
            </p>
            <p>
              This fun life required a lot of luck and friends, a truckload of work and a bit of
              studying… but the important thing is that it is possible. You can find amazing jobs as
              a biologist. If you want to know how, I write about biology careers and science
              communication at{' '}
              <a href="https://www.bioblogia.net" target="_blank" rel="noreferrer">
                Bioblogia.net
              </a>
              .
            </p>
            <p>
              Want to get in touch?{' '}
              <a href="mailto:fernando@bioblogia.net">fernando@bioblogia.net</a>
            </p>
          </article>
        )}
      </div>
    </>
  );
}

