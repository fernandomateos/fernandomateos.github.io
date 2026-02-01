export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  lang: 'en' | 'es';
  originalSource?: string;
};

// For a real blog you might fetch this from a CMS
// or read markdown files from the filesystem.
export const posts: Post[] = [
  // === ENGLISH POSTS ===
  {
    slug: 'fieldwork-lessons',
    title: 'Lessons from the Field',
    date: '2023-06-10',
    summary:
      'A few practical ideas for thriving during long field seasons in remote places.',
    content: `Spending months in the field teaches you to focus on the essentials:
good preparation, adaptability, and respect for the ecosystems and people
you work with.

In this short note I share a handful of small, practical habits that can
dramatically improve both data quality and team morale.`,
    lang: 'en',
  },
  {
    slug: 'communication-for-scientists',
    title: 'Why Scientists Should Communicate More',
    date: '2023-09-02',
    summary:
      'Science communication is not a luxury—it is part of the job description.',
    content: `Sharing our work clearly and honestly helps the public understand why
conservation and long‑term monitoring matter.

You do not need expensive equipment or a large following to start. A blog
post, a classroom visit, or a short thread can already make a difference.`,
    lang: 'en',
  },
  {
    slug: 'career-paths-in-biology',
    title: 'Non‑Linear Careers in Biology',
    date: '2024-02-18',
    summary:
      'Many paths can lead to meaningful work in ecology, conservation, and field biology.',
    content: `Very few careers in biology are truly linear.

Field seasons, short contracts, and interdisciplinary projects often create
unusual CVs—but these experiences can become unique strengths.

In this post I discuss a few examples and share resources for early‑career
biologists considering their next step.`,
    lang: 'en',
  },
  // English posts from bioblogia.net
  {
    slug: 'expeditions-adventure-conservation-british-exploring-society',
    title: 'Following the steps of my childhood hero: My experience volunteering with British Exploring Society',
    date: '2019-06-24',
    summary: 'From watching La Ruta Quetzal on TV to leading expeditions in the Peruvian Amazon.',
    content: `Almost a million years ago, back in 1995, a very young Fernandito was eating cookies with milk in front of the TV. His eyes were wide open and the spoon, dripping milk, was hovering motionless, halfway between the bowl and Fernando's mouth. His favourite show was about to start! It was called "La Ruta Quetzal" and it was an exciting competition for young students, who had to prove their knowledge for the chance to go on an expedition with Don Miguel de la Quadra-Salcedo.

Don Miguel was a legend. Some kind of Indiana Jones meets Captain America, with a crazy, crazy life. He became a national champion 9 times in athletics, developed a new javelin technique that added 20m to the world record, participated in the Olympic Games in Rome, worked as a truck driver in the Andes, became a whale hunter, spent 3 years in the Amazon rainforest, and later started "La Ruta Quetzal"—taking young explorers on amazing expeditions. I was never selected and had to settle for watching on TV.

Twenty years later, a slightly older Fernandito was reading a scientific paper on host-parasite dynamics, bored and procrastinating... when I opened Google and typed "Jungle job biologist". British Exploring Society was looking for an adventurous biologist to volunteer on an expedition to the Peruvian Amazon. A few days later I was selected for an interview in London, at the Royal Geographical Society building, and by the end of the year I had been selected as Science Leader for their next expedition to the Peruvian Amazon.

It is extremely hard to transmit with simple words the explosion of feelings you are blasted with after five weeks sleeping in a hammock in the rainforest. Waking up to the spectacular sound of the howler monkeys. Bird surveys at sunrise. Planning the day over a map. Hiking through the narrow paths, observing tracks, fauna and flora. Surveying streams, identifying butterflies, reptiles, amphibians, birds. Night walks to look for snakes, glass frogs, amblypygids.

That moment when I realised: I had achieved my dream of going to la Ruta Quetzal... as an expedition leader! Youth development wasn't high on my motivations when I applied—I just wanted to go to the Amazon. But those brilliant young explorers ended up winning my heart and became the absolute highlight of that experience.

After that first expedition, I came back thirsty for more. BES offered me a new challenge: Exploring the Canadian Yukon as Chief Scientist. Bears, wolves, Northern Lights, canoeing a distance equivalent to London to Paris. Then a pilot program in the UK, Scotland, and in August 2019 we sailed from Scotland to Iceland on one of the largest wooden tall ships in the world—a proper pirate ship—and hiked across Iceland.

The people I met through BES helped me remember an important difference: I had become too stressed thinking about what I wanted to be, instead of focusing on what I wanted to do. Now I do more of the things I enjoy, including something I didn't know I could be good at: helping young people develop into confident adults.

Thank you, British Exploring Society, for not only changing the lives of the young explorers, but also the lives of their expedition leaders. I hope to be still leading expeditions with you when I'm 84!`,
    lang: 'en',
    originalSource: 'https://www.bioblogia.net/2019/06/expeditions-adventure-and-conservation-with-the-british-exploring-society.html',
  },
  {
    slug: 'how-to-train-problem-solving-skills',
    title: 'How to train and demonstrate your problem-solving skills',
    date: '2016-07-30',
    summary: 'The four most important professional skills and how to develop them.',
    content: `According to the National Association of Colleges and Employers, four competencies are "essential": critical thinking and problem solving abilities, conflict management, team work attitude and process management, and communication skills (writing and speaking with clarity and ease).

Behavioral interviewing is on the rise: you will need to prove these skills already in the interview phase. A three-year study found that 50 percent of newly hired employees failed before finishing their second year due to poor interpersonal skills, and only 11% failed because they lacked technical skills. Hiring the wrong person is expensive, so employers filter candidates without the right professional skills early.

If you are engaged in a STEM career, you likely already have a good grasp on critical thinking—this process has many parallels with the scientific method! The best way to learn is practice. Skilled problem solvers learn to recognize patterns and use experience from previous challenges. If you don't have enough problems, create some: internships, volunteering, learning to code, fixing broken stuff, or even playing games to improve lateral thinking.

For really hard problems: go for a walk. Darwin walked on his "thinking path" a couple times a day. Henri Poincaré reached an impossible block, left for a geological excursion, and when his mind relaxed, a solution popped up. He concluded: "A creative solution for a hard problem requires alternate stages of conscious and unconscious work."

Once you solve a problem, write down how you did it. And to demonstrate your skills in your CV: describe specific actions and measurable results. Use the PARL method when elaborating interview responses: Problem, Action(s), Result(s), Lesson(s) learned.`,
    lang: 'en',
    originalSource: 'https://www.bioblogia.net/2016/07/howtotrainprofessionalskills.html',
  },
  // === SPANISH POSTS ===
  {
    slug: 'que-hacer-cuando-no-sabes-que-hacer',
    title: 'Qué hacer cuando no sabes qué hacer: Consejos para biólogos perdidos',
    date: '2016-06-01',
    summary: 'Sentir dudas es totalmente normal. Aquí van ideas para aclararlas.',
    content: `Leo, un estudiante de biología de segundo año, me escribió desde Argentina para pedirme consejo sobre su futuro. Tenía dudas: todo el mundo le dice que hay poco trabajo, que probablemente necesite un doctorado o máster, que quizá no le alcance la nota para becas... incluso pensó en cambiarse de carrera. Todas estas dudas le terminan agobiando.

Lo primero: sentir dudas es totalmente normal. Todos las hemos tenido. Incluso yo tuve mi momento de debilidad el año antes de empezar la universidad. Llegué al extremo de presentarme al examen de la academia militar, porque pensé que al menos tendría un "trabajo fijo". El día del examen me sorprendí tranquilisimo—me había dado cuenta de que me daba absolutamente igual aprobar. ¡Estaba allí sólo por miedo a que la biología fuera demasiado difícil! Salí de allí feliz. Ya no tenía dudas: ¡yo iba a ser biólogo!

El problema con la biología es que tiene tantas salidas que al final nos bloqueamos. La clave: identificar tu objetivo concreto mediante búsqueda activa. Ir probando caminos: voluntariados, prácticas, proyectos cortos. No necesitas que alguien te ofrezca un voluntariado para probar—¿crees que te gustaría ser educador ambiental? Organiza una charla, pon un anuncio pidiendo voluntarios. ¿Divulgador científico? Crea un perfil en twitter, abre un blog. Mientras buscas tu vocación activamente, estarás creando valiosas líneas en tu CV.

Lo importante no es el objetivo en sí. El truco está en no fijarse demasiado en la meta final, sino en aprender del proceso. Las habilidades y experiencias que consigues intentando alcanzar un objetivo te permitirán conseguir muchas otras metas. Simplemente, elige una meta que te permita aprender cosas interesantes por el camino. ¡Y disfruta del proceso! Los puntos se unen de la forma más inesperada.`,
    lang: 'es',
    originalSource: 'https://www.bioblogia.net/2016/06/que-hacer-cuando-no-sabes-que-hacer.html',
  },
  {
    slug: 'que-estudiar-para-conseguir-trabajo',
    title: 'Qué estudiar para conseguir trabajo de biólogo (o de cualquier cosa)',
    date: '2016-03-18',
    summary: 'Ideas y sugerencias para comenzar o reorientar tu carrera de biólogo.',
    content: `Los tiempos están cambiando: ya no nos dan un trabajo por tener tal o cual título. Los mercados se mueven tan rápido que las empresas buscan candidatos cada vez más específicos, que demuestren tener las habilidades necesarias para un proyecto concreto. Menos contratos fijos, menos plazas para oposiciones, y cada vez más requisitos específicos para cada oferta.

Pero esto también significa más flexibilidad: la posibilidad de realizar el trabajo más adecuado a tus gustos y capacidades durante cada etapa de tu vida. Debemos darle la vuelta: en vez de dejar que circunstancias externas nos adapten, nosotros mismos deberíamos ir guiando nuestra formación para ELEGIR el trabajo que queremos desempeñar.

Sobre especialización y másters: antes de estudiar uno, pregúntate dos cosas: ¿Qué objetivo concreto tienes? ¿Puedes alcanzarlo de otra forma más efectiva/barata/rápida? Lo más importante es tener claro para qué te van a servir esos estudios. De las profesiones más comunes que puede desempeñar un biólogo, quizá sólo una requiere específicamente un grado en biología: la de biólogo funcionario.

Una carrera universitaria casi nunca es una mala inversión. Estudiar durante varios años un tema concreto entrena tu cerebro: piensas más rápido, aprendes más rápido, sabes dónde buscar respuestas. Es como un superpoder.

Las habilidades transferibles fundamentales: resolver problemas, comunicaciones, ventas, análisis, trabajar en equipo, atraer y desarrollar talento, riesgo y juicio. Trata de identificarlas, entrenarlas y demostrarlas en tu CV. Un truco: busca en LinkedIn a gente que trabaje en lo que te gustaría, y estudia qué hicieron para llegar donde están.`,
    lang: 'es',
    originalSource: 'https://www.bioblogia.net/2016/03/que-estudiar-para-conseguir-trabajo.html',
  },
  {
    slug: 'por-que-yo-tengo-tanta-suerte',
    title: 'Por qué yo tengo tanta suerte y qué puedes hacer para que la tuya mejore',
    date: '2019-06-02',
    summary: 'Los cuatro tipos de suerte y cómo trabajar la que sí depende de ti.',
    content: `Dice mi amiga Marian que tengo una flor en el culo. No lo niego—aunque tengo malas rachas como todo el mundo, suelen pasarme cosas buenísimas casi todos los días. Creo que la razón es que llevo muchos años acumulando diferentes tipos de suerte.

Los cuatro tipos de suerte: (1) La suerte ciega—lo típico de encontrarte cinco euros en el suelo. Incontrolable, pero importante agradecer y aprovechar. (2) La suerte que depende de nuestro esfuerzo—moverse, hacer cosas, hablar con gente. Generar oportunidades. A río revuelto, ganancia de pescadores. (3) La que se alcanza cuando te especializas—conoces el mercado y eres mejor detectando oportunidades. Sabes dónde buscar y a quién preguntar. (4) La que se construye sobre todas las anteriores—reputación, marca personal. No sólo encuentras más oportunidades; las oportunidades vienen a ti.

Si te concentras en la suerte de tipo dos sin agobiarte demasiado, las demás vienen solas. La mejor estrategia: "Sé impaciente con tus acciones; paciente con los resultados." No inviertas demasiado tiempo planeando—elige un medio y empieza. Proyectos a corto plazo. Cuando termines uno, empieza otro. El interés compuesto es la fuerza más poderosa del universo. Cada persona que conozcas te abre un mundo de nuevos contactos—es exponencial.`,
    lang: 'es',
    originalSource: 'https://www.bioblogia.net/2019/06/por-que-yo-tengo-tanta-suerte-y-que.html',
  },
  {
    slug: 'como-conseguir-trabajo-conservacion',
    title: 'Cómo conseguir lo que quieres, sin planearlo',
    date: '2019-06-05',
    summary: 'Gota a gota, las pequeñas acciones crean arroyitos de oportunidades.',
    content: `A veces me siento junto a la ventana esperando la lluvia. Las gotas no caen en el mismo sitio—una aquí, otra allá. De repente una nueva gota cae demasiado cerca de otra y la arrastra, creando un pequeño arroyito vertical. Este juego zen es una metáfora de cómo funcionan las cosas en la vida: aunque no siempre se puede predecir dónde te llevarán tus acciones, las "gotas de acción" con las que vayas salpicando tu ventana vital acabarán por unirse y formarán arroyitos. Cuantas más gotitas, antes pasarán cosas chulas.

Un día de Febrero de 2016 encontré en Twitter una foto que llevaba a anécdotas sobre el trabajo como biólogo. Envié mi historia de cruzar Barcelona con 100 pajaritos en calcetines. Matt y yo seguimos en contacto. En Evolution 2016 en Austin nos hicimos colegas. Un par de meses después me invitó a Scicomm 2016 en Nebraska—di una charla de 5 minutos sobre ayudar a jóvenes biólogos a través del blog. Tap. Otra gotita.

Fast forward al verano siguiente: estaba en Perú después de varias semanas en la selva amazónica con British Exploring Society. Cristina de CREES habló bien de mí. Kristi Foster, que conocí allí, estaba escribiendo una guía para Conservation Careers. Le envié mi CV y el video de mi charla. Kristi decidió que el Dr Askew y yo habíamos de conocernos. Nick respondió inmediatamente con una invitación a colaborar. ¡Gota a gota, sin planearlo!

Ahora colaboramos juntos para ayudar a la gente que quiere trabajar en conservación. Ya está empezando a llover—¿oyes las gotas en la ventana?`,
    lang: 'es',
    originalSource: 'https://www.bioblogia.net/2019/06/como-conseguir-trabajo-conservacion.html',
  },
  {
    slug: 'para-que-sirve-un-congreso-cientifico',
    title: 'Para qué sirve un congreso científico y cómo aprovecharlo al máximo',
    date: '2015-05-19',
    summary: 'No vas sólo a presentar—vas a generar ideas, contactos y oportunidades.',
    content: `Un estudiante de doctorado no quería ir a un congreso porque "todavía no tengo resultados definitivos que presentar". Pero la gente no va a los congresos sólo para presentar. Incluso científicos de renombre van sin presentar nada.

¿Para qué sirve un congreso? Generar nuevas ideas—tu cerebro se expone a decenas de novedades en 4-5 días enfocado. Recuperar la motivación—algunos ponentes pueden reconducir tu carrera en 15 minutos. Mejorar tus habilidades—aprender técnicas, hipótesis, y a transmitir mejor tus propios resultados.

La utilidad más importante: conocer a otros investigadores y relacionarte con ellos. Trabajar en ciencia tiene un alto componente colaborativo. Los congresos son ferias de empleo donde los investigadores buscan colaboradores y los jóvenes promocionan sus habilidades. Asociarás tu imagen a ciertos temas. Los contactos lo son todo—entre dos candidatos similares, un empleador escogerá al que conozca o que sea sugerido por alguien de confianza.

Consejos prácticos: usa redes sociales y el hashtag del evento. Planifica—haz una lista de personas que te gustaría conocer. Pide a tu director que te presente. Levanta la mano en el turno de preguntas. Apúntate a todo—cenas, planes inesperados. No tienes por qué hacer lo que haga la mayoría. Las mejores oportunidades favorecen a las mentes preparadas y abiertas.`,
    lang: 'es',
    originalSource: 'https://www.bioblogia.net/2015/05/para-que-sirve-un-congreso-cientifico-y.html',
  },
];

export function getAllPosts(lang?: 'en' | 'es'): Post[] {
  const filtered = lang ? posts.filter((p) => p.lang === lang) : posts;
  return filtered.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string, lang?: 'en' | 'es'): Post | undefined {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return undefined;
  if (lang && post.lang !== lang) return undefined;
  return post;
}
