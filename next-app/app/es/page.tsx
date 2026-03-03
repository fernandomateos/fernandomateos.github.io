'use client';

import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { FaLinkedinIn, FaXTwitter, FaInstagram, FaGithub } from 'react-icons/fa6';

export default function HomePageEs() {
  const [showAbout, setShowAbout] = useState(false);

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowAbout(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <p>Biólogo, científico, guía de expediciones</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#home" onClick={handleHomeClick}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#about" onClick={handleAboutClick}>
                Sobre mí
              </a>
            </li>
            <li>
              <a
                href="https://scholar.google.se/citations?hl=es&pli=1&user=bwM4wj0AAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Investigación
              </a>
            </li>
            <li>
              <Link href="/">English</Link>
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
            <h2 className="major">Sobre mí</h2>
            <p>
              ¡Hola! Me llamo Fernando Mateos-González, y puedes culparme de todo lo que no funcione
              en esta web.
            </p>
            <p>
              Desde que tengo memoria me ha fascinado la naturaleza, y eso me llevó a estudiar
              Biología en la{' '}
              <a href="http://www.unex.es/" target="_blank" rel="noreferrer">
                Universidad de Extremadura
              </a>
              , en el sur de España, posiblemente uno de los lugares más ricos en biodiversidad de
              Europa.
            </p>
            <p>
              Después de trabajar como biólogo de la conservación en el sector privado y civil, la
              curiosidad me llevó a la investigación y terminé con un máster en Biodiversidad y un
              doctorado en Comportamiento Animal en la{' '}
              <a href="http://www.ub.edu/web/ub/es/index.html?" target="_blank" rel="noreferrer">
                Universidad de Barcelona
              </a>{' '}
              y el{' '}
              <a href="http://museuciencies.cat/es/" target="_blank" rel="noreferrer">
                Museo de Ciencias Naturales de Barcelona
              </a>
              . Luego, como científico de pleno derecho, trabajé varios años como investigador
              postdoctoral en el{' '}
              <a href="https://www.ebc.uu.se/?languageId=1" target="_blank" rel="noreferrer">
                Centro de Biología Evolutiva de Uppsala (Suecia)
              </a>
              , el{' '}
              <a
                href="http://collectivebehaviour.com/people/mateos-gonzalez-fernando/"
                target="_blank"
                rel="noreferrer"
              >
                Instituto Max Planck de Ornitología (Alemania)
              </a>{' '}
              y la{' '}
              <a href="http://www.sbs.utexas.edu/ryan/" target="_blank" rel="noreferrer">
                Universidad de Texas en Austin (EE.UU.)
              </a>
              .
            </p>
            <p>
              Mis intereses científicos son amplios: comportamiento, evolución, conservación,
              cambio climático… Pero últimamente lo que decide adónde voy y qué hago son la
              curiosidad y la posibilidad de aventura. He cumplido mi sueño y me he convertido en
              un{' '}
              <a
                href="https://www.linkedin.com/in/fernandomateosgonzalez/"
                target="_blank"
                rel="noreferrer"
              >
                biólogo mercenario nómada
              </a>
              , ofreciendo mis servicios solo a las causas más interesantes.
            </p>
            <p>
              Mi base de operaciones y fuente principal de trabajo interesante es la ONG checa{' '}
              <a href="https://www.alkawildlife.eu/" target="_blank" rel="noreferrer">
                ALKA Wildlife
              </a>
              , un equipo de investigación independiente que trabaja por la conservación a través de
              proyectos científicos internacionales.
            </p>
            <p>
              Gracias a esta carrera he tenido la suerte de vivir y trabajar en varios países de
              Europa, América, África y Australia, haciendo cosas increíbles como rastrear linces en
              la nieve, guiar expediciones en la Amazonía peruana, hacer kayak por el río Yukón en
              Canadá, bucear en el lago Tanganica, explorar Trinidad e incluso trabajar en la
              selva con la BBC para una serie de Sir David Attenborough.
            </p>
            <p>
              Esta vida divertida requirió mucha suerte y amigos, un montón de trabajo y un poco de
              estudio… pero lo importante es que es posible. Puedes encontrar trabajos increíbles
              como biólogo. Si quieres saber cómo, escribo sobre carreras en biología y
              comunicación científica en{' '}
              <a href="https://www.bioblogia.net" target="_blank" rel="noreferrer">
                Bioblogia.net
              </a>
              , y publico un boletín semanal llamado{' '}
              <a href="https://biotapas.biologia.net" target="_blank" rel="noreferrer">
                Las Biotapas
              </a>
              .
            </p>
          </article>
        )}
      </div>
    </>
  );
}
