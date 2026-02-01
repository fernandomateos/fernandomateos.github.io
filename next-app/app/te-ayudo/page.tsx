import Link from 'next/link';

export default function TeAyudoEnPage() {
  return (
    <>
      <header id="header">
        <div className="content">
          <div className="inner">
            <h1>Mentoring</h1>
            <p>Individual sessions for biology and conservation careers</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/es/te-ayudo">Español</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div id="main">
        <article>
          <h2 className="major">Looking for guidance in biology and the environment?</h2>
          <p>
            Hey there! I&apos;m Nando, a biologist by training and a compulsive curious by vocation.
          </p>
          <p>
            After a couple of decades working in various sectors of biology, the environment and
            conservation, I&apos;ve realised that one of the things I enjoy most is lending a hand to
            colleagues. So now, when I&apos;m not off on adventures, I try to reserve a couple of slots
            each week for personalised mentoring sessions.
          </p>
          <p>
            If you need guidance, a nudge for the next step, or an honest chat with someone who&apos;s
            been there, we can have a one-hour session to see what we can do.
          </p>
          <p>
            <a
              href="https://tidycal.com/fernandomateos/sesion1on1"
              target="_blank"
              rel="noreferrer"
              className="button primary"
            >
              Book a session with me
            </a>
          </p>

          <h3>What do you get from this?</h3>
          <p>
            I won&apos;t promise you the job of your dreams or a magic formula, but I can offer you:
          </p>
          <ul>
            <li>A realistic view of the different paths you can take</li>
            <li>Tricks and advice I&apos;ve learned the hard way</li>
            <li>Concrete ideas for your next step</li>
            <li>Above all, an honest conversation about what worries you</li>
          </ul>

          <h3>Why me?</h3>
          <p>
            I&apos;m no Attenborough, but I&apos;ve been lucky enough to try a bit of everything. I&apos;ve
            worked in academia, consultancies, NGOs, the public sector, startups and even as a
            freelancer. I&apos;ve seen the good and bad of each world, and I love sharing these
            experiences so others can make more informed decisions.
          </p>

          <h3>My background (quick version)</h3>
          <p>
            I&apos;ve been a researcher in Spain, Sweden, Australia, USA… I&apos;ve worked in behaviour,
            ecology and conservation on four continents, and now I juggle consulting with my own
            projects. The most valuable thing I&apos;ve gained from this journey are the lessons
            learned, especially from things that didn&apos;t work out as expected.
          </p>
          <p>Some random highlights:</p>
          <ul>
            <li>I did my PhD studying birds in Barcelona</li>
            <li>Fieldwork from the Arctic to Zambia</li>
            <li>Collaborated with the BBC in the Amazon</li>
            <li>Led scientific expeditions around the world</li>
            <li>Tracked, captured, anaesthetised and analysed lots of otters</li>
          </ul>
          <p>
            For more details, check my{' '}
            <a href="https://www.linkedin.com/in/fernandomateosgonzalez/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            .
          </p>

          <h3>How does it work?</h3>
          <ol>
            <li>Book a slot in my calendar</li>
            <li>Tell me a bit about your situation</li>
            <li>If you like, send me your CV, the offer you&apos;re interested in, or whatever you want us to look at together</li>
            <li>I confirm if I can help and prepare thoroughly</li>
            <li>We meet by video call and chat for an hour</li>
            <li>I send you the recording and all useful resources afterwards</li>
          </ol>

          <h3>What colleagues say</h3>
          <blockquote>
            &quot;It was a pleasure to meet Fernando and share an enjoyable session with him, receiving a
            good handful of personalised advice and large doses of empathy. Highly recommended for
            career castaways.&quot;
            <cite>— Marc Aquino Baleytó</cite>
          </blockquote>
          <blockquote>
            &quot;The session with Nando helps you see more clearly all the possibilities within your
            reach and how to achieve them.&quot;
            <cite>— Carol García Conde</cite>
          </blockquote>

          <h3>Shall we chat?</h3>
          <p>
            <a
              href="https://tidycal.com/fernandomateos/sesion1on1"
              target="_blank"
              rel="noreferrer"
              className="button primary"
            >
              Book an hour with me
            </a>
          </p>
          <p>
            No time slot works for you? Email me at{' '}
            <a href="mailto:fernando@bioblogia.net">fernando@bioblogia.net</a> and we&apos;ll find a slot.
          </p>

          <h3>Quick FAQ</h3>
          <p>
            <strong>How much does it cost?</strong> €125 per session, including preparation, recording and resources.
          </p>
          <p>
            <strong>Can I do more than one session?</strong> Of course! We can design a personalised follow-up plan according to your goals.
          </p>
          <p>
            <strong>Do I need to prepare anything?</strong> Ideally, send me your CV and tell me your current situation and objectives.
          </p>
          <p>
            <strong>What topics can we cover?</strong> From professional guidance (academia vs industry, sector changes, job hunting) to technical questions about research, fieldwork or project management. The idea is to adapt to whatever concerns you most right now.
          </p>

          <p className="original-source">
            This page was first published on{' '}
            <a href="https://www.bioblogia.net/p/te-ayudo.html" target="_blank" rel="noreferrer">
              Bioblogia.net
            </a>
          </p>
        </article>
      </div>
    </>
  );
}
