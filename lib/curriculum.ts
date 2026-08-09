import { SITE_NAME, SITE_URL } from "@/lib/constants";

/**
 * Single source of truth for /curriculum/ — the year-level hub pages.
 *
 * This is a separate section from the guides library, not a replacement
 * for it:
 *
 *   /curriculum/                  index, grouped by year level
 *   /curriculum/year-9-maths/     hub — every topic in that year, explained
 *   /guides/                      unchanged — the existing flat topic-guide
 *                                 library, linked from the bottom of the
 *                                 curriculum index, not from the header nav
 *   /guides/pythagoras-theorem/   existing MDX topic guide, untouched
 *
 * Hub pages cross-link out to a matching guide inline (via `topic.guide`
 * below) where one exists. The existing guides keep their own unchanged
 * breadcrumb (Home → Guides → Topic) — they are not renested under a hub.
 *
 * Drives: app/curriculum/page.tsx (index), each app/curriculum/<slug>/page.tsx
 * hub route via components/CurriculumHub.tsx, and app/sitemap.ts.
 *
 * ACCURACY RULES (do not relax):
 *  - Years 7-10 are the Western Australian Curriculum. Say "WA Year N".
 *    NEVER "WACE" and never "K-12".
 *  - WACE applies to Years 11-12 only.
 *  - All prose here is original. SCSA's own documents are licensed for
 *    non-commercial educational use only, so nothing may be lifted or
 *    lightly reworded from them.
 *  - `lastModified` is a real date. Get it with:
 *      git log -1 --format=%ad --date=short -- lib/curriculum.ts
 *
 * PUBLISHING:
 *  - `published: false` entries are excluded from routes, the index and the
 *    sitemap. Flip to true only once the page body below is written AND
 *    fact-checked against the current SCSA syllabus.
 */

export type CurriculumSubject = "Maths" | "Science" | "English";

export type CurriculumStage = "lower" | "upper";

export interface CurriculumTopic {
  /** Topic name as a student or parent would say it, not syllabus phrasing. */
  name: string;
  /** Plain-English gloss: what this actually is, one or two sentences. */
  plain: string;
  /** Where students reliably get stuck. Optional but this is the real value. */
  sticking?: string;
  /** Slug of a guide in lib/guides.ts that covers this topic in depth. */
  guide?: string;
}

export interface CurriculumStrand {
  name: string;
  blurb: string;
  topics: CurriculumTopic[];
}

export interface CurriculumEntry {
  slug: string;
  /** 7-10 for WA Curriculum years. WACE courses get a separate entry per
   *  year (11 = Units 1-2, 12 = Units 3-4) rather than one spanning both. */
  year: number;
  /** Display label: "Year 9" or "Year 11". */
  yearLabel: string;
  subject: CurriculumSubject;
  stage: CurriculumStage;
  /** WACE course name, upper-school entries only. */
  courseName?: string;
  /** ATAR courses count toward the ATAR; General and Foundation don't. */
  courseType?: "ATAR" | "General" | "Foundation";
  /** e.g. "Units 1 and 2" (Year 11) or "Units 3 and 4" (Year 12). */
  unitLabel?: string;
  /** <title>. Front-load the query. */
  title: string;
  /** Meta description. Written for a parent deciding whether to click. */
  description: string;
  /** <h1>. */
  heading: string;
  /** Opening paragraph. Answers the query in the first sentence. */
  intro: string;
  strands: CurriculumStrand[];
  /** What assessment looks like at this level. */
  assessment: string[];
  faqs: { q: string; a: string }[];
  published: boolean;
  lastModified: string;
}

/* ------------------------------------------------------------------ */

const NEW_CURRICULUM_NOTE =
  "WA schools moved to the revised Western Australian Curriculum for Mathematics, Science, Humanities and Social Sciences and Technologies in 2026. If you are looking at an older topic list, or a resource written for another state, some of it no longer matches what is taught here.";

const ENGLISH_CURRICULUM_NOTE =
  "WA's English curriculum was revised for implementation in 2025 — a year ahead of the Mathematics, Science, Humanities and Technologies revision that took effect in 2026. It hasn't just changed the way those subjects have, but if you're looking at a pre-2025 topic list, or a resource written for another state, some of it may no longer match what's taught here.";

const WACE_REVIEW_NOTE =
  "WACE senior secondary syllabuses are reviewed by SCSA on a rolling basis rather than all at once — there's no single blanket revision date the way there is for the P-10 curriculum. Check senior-secondary.scsa.wa.edu.au for the current syllabus version of this specific course before relying on unit content for assessment planning.";

const ATAR_Y11_ASSESSMENT = [
  "Unit 1 and Unit 2 are entirely school-assessed — there is no external exam in Year 11.",
  "A satisfactory result in both units is required to move on to Unit 3 and Unit 4 in Year 12.",
  "Reporting is against the WACE unit grade for each unit, not an ATAR score — the ATAR is calculated from Year 12 results only.",
];

const ATAR_Y12_ASSESSMENT = [
  "Unit 3 and Unit 4 combine school assessment, moderated by SCSA, with an external written examination set by SCSA at the end of the year.",
  "The combined school and examination result is what contributes to the ATAR for this course.",
  "A course must be completed to at least a C grade average across Units 3 and 4 for the result to count toward the WACE.",
];

const GENERAL_Y11_ASSESSMENT = [
  "Unit 1 and Unit 2 are entirely school-assessed — there is no external exam in Year 11.",
  "A satisfactory result in both units is required to move on to Unit 3 and Unit 4 in Year 12.",
  "General courses don't contribute to the ATAR, but a satisfactory result does count toward completing the WACE.",
];

const GENERAL_Y12_ASSESSMENT = [
  "Unit 3 and Unit 4 combine school assessment with an external assessment component set by SCSA.",
  "General courses don't contribute to the ATAR — the result counts toward completing the WACE.",
  "Reporting is against the WACE unit grade for each unit.",
];

const foundationAssessment = (unitLabel: string) => [
  `${unitLabel} are entirely school-assessed — there is no external exam at any point in this course.`,
  "Foundation courses don't contribute to the ATAR. They're designed for students who haven't yet met the Year 10 achievement standard, with a focus on functional literacy and numeracy.",
  "Reporting is against the WACE unit grade for each unit.",
];

export const curriculum: CurriculumEntry[] = [
  /* ---------------------------------------------------------------- */
  /* PUBLISHED                                                         */
  /* ---------------------------------------------------------------- */
  {
    slug: "year-7-maths",
    year: 7,
    yearLabel: "Year 7",
    subject: "Maths",
    stage: "lower",
    title: "WA Year 7 Maths: Every Topic, Explained Simply",
    description:
      "What Year 7 students actually cover in Maths in Western Australia, topic by topic, in plain English — plus where most students get stuck in the first year of high school.",
    heading: "WA Year 7 Maths: what your child covers this year",
    intro:
      "Year 7 Maths in Western Australia is the year arithmetic turns into algebra. Students extend their number work to include negative numbers, start reasoning proportionally rather than by counting, and meet letters standing in for numbers for the first time. Geometry and measurement get formal names and notation, and probability stops being about the word \"likely\" and starts being about numbers between 0 and 1.",
    strands: [
      {
        name: "Number and algebra",
        blurb:
          "The strand that carries most of the year. Two big shifts happen here: negatives, and the arrival of algebra.",
        topics: [
          {
            name: "Integers — adding and subtracting negatives",
            plain:
              "Numbers below zero become part of ordinary calculation rather than a curiosity. Students add and subtract them fluently and place them on a number line.",
            sticking:
              "Subtracting a negative. Students who learned \"two minuses make a plus\" as a slogan apply it to multiplication problems where it does not belong. It is worth insisting they can explain why, using a number line, before they use the shortcut.",
          },
          {
            name: "Proportional reasoning",
            plain:
              "Fractions, decimals, percentages and ratios treated as different clothes on the same idea, so a problem can be moved between them freely.",
            sticking:
              "Students who can convert between the forms mechanically but cannot tell which form makes a particular problem easier. That judgement is the actual skill.",
          },
          {
            name: "Introduction to algebra",
            plain:
              "Letters used to stand for unknown or varying quantities. Building expressions, substituting values, and solving simple equations.",
            sticking:
              "Reading 3n as \"three and n\" rather than \"three lots of n\". The misreading is invisible until it produces wrong answers weeks later.",
          },
        ],
      },
      {
        name: "Measurement and geometry",
        blurb:
          "Where informal description gets replaced by proper mathematical language, notation and formulas.",
        topics: [
          {
            name: "Angles and parallel lines",
            plain:
              "Naming angle relationships formed when a line crosses two parallel lines, and reasoning from them to find unknown angles.",
            sticking:
              "Guessing the relationship from how the diagram looks rather than justifying it. Requiring a written reason for every step fixes this quickly.",
          },
          {
            name: "Classifying triangles",
            plain:
              "Sorting triangles by side lengths and by angles, and using their properties to find missing measurements.",
          },
          {
            name: "The Cartesian plane",
            plain:
              "Plotting points using coordinates and transforming them — sliding, flipping and turning shapes on the grid.",
            sticking:
              "Reversing the coordinate order. Worth over-drilling early; it causes trouble in Year 8 graphing otherwise.",
          },
          {
            name: "Perimeter, area and volume formulas",
            plain:
              "Generalising from counting squares to using formulas, so calculation stops depending on the diagram.",
            sticking:
              "Formula recall without unit awareness — answering an area question in centimetres rather than square centimetres.",
          },
          {
            name: "Australian time zones",
            plain:
              "Working with time differences across the country, which is more practically useful in WA than most places given the two- and three-hour gaps to the east coast.",
          },
        ],
      },
      {
        name: "Probability and statistics",
        blurb:
          "Chance gets a numerical definition, and data handling starts to involve judgement rather than just plotting.",
        topics: [
          {
            name: "Sample spaces and probability",
            plain:
              "Listing every possible outcome of a single-stage experiment and expressing likelihood as a number.",
            sticking:
              "Missing outcomes when listing. A systematic method — a table or a tree — is worth teaching before the arithmetic.",
          },
          {
            name: "Summary statistics and critiquing data",
            plain:
              "Calculating measures of centre and spread, then judging whether a graph or claim is actually supported by the data behind it.",
          },
        ],
      },
    ],
    assessment: [
      "Assessment is set by your child's school, not centrally. There is no external exam in Year 7.",
      "Expect a mix of in-class tests, an investigation or modelling task, and topic quizzes.",
      "Reporting is against the WA achievement standard for Year 7, which describes what most students should be able to do by the end of the year.",
    ],
    faqs: [
      {
        q: "Has WA Year 7 Maths changed recently?",
        a: NEW_CURRICULUM_NOTE,
      },
      {
        q: "Is Year 7 Maths in WA the same as in other states?",
        a: "Close, but not identical. Western Australia adapts the national curriculum rather than adopting it unchanged, so topic order and emphasis differ. Resources written for NSW or Victoria will mostly transfer, but not always at the same year level.",
      },
      {
        q: "My child was fine in primary school and is struggling now. Why?",
        a: "The usual cause is the shift from arithmetic to algebra. Primary maths rewards accurate calculation; high school maths rewards representing a situation before calculating. A student who is quick but never learned to show reasoning often stalls in Year 7 precisely because they were fast enough not to need it before.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-8-science",
    year: 8,
    yearLabel: "Year 8",
    subject: "Science",
    stage: "lower",
    title: "WA Year 8 Science: Every Topic, Explained Simply",
    description:
      "What Year 8 students cover in Science in Western Australia — cells, atoms, plate tectonics and energy — in plain English, with the parts students most often find hard.",
    heading: "WA Year 8 Science: what your child covers this year",
    intro:
      "Year 8 Science in Western Australia is the year science goes invisible. Cells, atoms and energy transfer are all things students cannot see, and each one has to be understood through a model rather than an observation. That is a genuine step up in abstraction from Year 7, and it is the most common point at which a student who liked science stops liking it.",
    strands: [
      {
        name: "Biological sciences",
        blurb: "The first look inside living things.",
        topics: [
          {
            name: "Cells",
            plain:
              "Cells as the basic unit of living things, including what the main structures inside them do.",
            sticking:
              "Memorising organelle names without connecting them to a job. A student who can list them but cannot say what a cell would fail to do without one has not understood it.",
          },
          {
            name: "Body systems in plants and animals",
            plain:
              "How specialised systems in flowering plants and in vertebrates carry out particular functions, and how those systems depend on each other.",
          },
        ],
      },
      {
        name: "Chemical sciences",
        blurb:
          "Atoms arrive, and with them the distinction that underpins all of senior chemistry.",
        topics: [
          {
            name: "Atomic structure",
            plain:
              "What atoms are made of and how that structure is represented in diagrams.",
          },
          {
            name: "Elements and compounds",
            plain:
              "Telling the difference between a substance made of one kind of atom and one made of atoms chemically joined together.",
            sticking:
              "Confusing a compound with a mixture. Both look like \"more than one thing\", and the difference — whether the substances are chemically bonded — is not visible.",
          },
          {
            name: "Metals and non-metals",
            plain:
              "Sorting elements by their physical properties, which is the first step toward reading the periodic table in Year 9.",
          },
          {
            name: "Physical versus chemical change",
            plain:
              "Whether a change produces a genuinely new substance or just a new form of the same one.",
            sticking:
              "The classic trap is treating \"it looks different now\" as evidence of a chemical change. Melting and dissolving both look dramatic and are neither.",
          },
        ],
      },
      {
        name: "Earth and space sciences",
        blurb: "Earth treated as a system that changes, not a backdrop.",
        topics: [
          {
            name: "Plate boundaries and the rock cycle",
            plain:
              "How processes at the edges of tectonic plates connect to the way rocks form, break down and re-form over long timescales.",
            sticking:
              "Timescale. Students apply everyday intuitions about speed to processes measured in millions of years, and the explanations stop making sense.",
          },
          {
            name: "Classifying rocks and minerals",
            plain:
              "Grouping rocks by physical properties, and linking how a rock formed to what it is useful for.",
          },
        ],
      },
      {
        name: "Physical sciences",
        blurb: "Energy, and the vocabulary for describing what happens to it.",
        topics: [
          {
            name: "Kinetic and potential energy",
            plain: "Sorting forms of energy into energy of motion and stored energy.",
          },
          {
            name: "Energy transfer and transformation",
            plain:
              "Tracking energy through a simple system — where it moves and what form it changes into.",
            sticking:
              "Using \"transfer\" and \"transform\" interchangeably. Assessments distinguish them, and the mark is usually lost on the wording rather than the physics.",
          },
          {
            name: "Heat and electrical energy",
            plain:
              "A closer look at how heat moves and how electrical energy is transferred and changed into other forms.",
          },
        ],
      },
      {
        name: "Science inquiry",
        blurb:
          "Assessed alongside the content, and often where marks are actually won or lost.",
        topics: [
          {
            name: "Planning reproducible investigations",
            plain:
              "Choosing equipment, managing risk, and designing a method someone else could repeat and get the same result.",
          },
          {
            name: "Analysing data and identifying anomalies",
            plain:
              "Finding patterns in results, spotting readings that do not fit, and using evidence to support a conclusion.",
            sticking:
              "Conclusions that restate the results instead of answering the original question. This is the single most common lost mark in Year 8 practical reports.",
          },
          {
            name: "Identifying sources of error",
            plain: "Saying specifically what could have gone wrong and what would fix it.",
            sticking:
              "\"Human error\" as a catch-all. It scores nothing. The mark is for naming the specific step and the specific improvement.",
          },
        ],
      },
    ],
    assessment: [
      "School-based. There is no external Science exam in Year 8.",
      "Practical investigation reports usually carry significant weight, and the inquiry skills above are assessed directly.",
      "Reporting is against the WA achievement standard for Year 8.",
    ],
    faqs: [
      {
        q: "Has WA Year 8 Science changed recently?",
        a: NEW_CURRICULUM_NOTE,
      },
      {
        q: "Does Year 8 Science affect subject choice later?",
        a: "Not directly — subject selection happens in Year 10 for Year 11. But Year 8 is where atoms, cells and energy are introduced, and all three run straight through to the Year 11 and 12 ATAR sciences. A shaky Year 8 tends to show up as a hard Year 11.",
      },
      {
        q: "Why is my child suddenly finding science harder?",
        a: "Year 8 is the first year where most of what is being studied cannot be seen. Cells, atoms and energy are all understood through models. Students who learned science by observing often need to be explicitly taught how to reason from a model instead.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-9-maths",
    year: 9,
    yearLabel: "Year 9",
    subject: "Maths",
    stage: "lower",
    title: "WA Year 9 Maths: Every Topic, Explained Simply",
    description:
      "What Year 9 students cover in Maths in Western Australia — linear graphs, Pythagoras, trigonometry and simple interest — in plain English, and why Year 9 is the year that decides Year 11 options.",
    heading: "WA Year 9 Maths: what your child covers this year",
    intro:
      "Year 9 Maths in Western Australia is the year that quietly determines which senior maths courses stay open. Students work with linear relationships both algebraically and graphically, meet gradient, apply Pythagoras' theorem to real problems, and are introduced to the trigonometric ratios. A student who leaves Year 9 shaky on gradient and on Pythagoras will find Mathematics Methods difficult in a way that is hard to recover from later.",
    strands: [
      {
        name: "Number and algebra",
        blurb:
          "Linear relationships become the central object, and money enters the syllabus properly.",
        topics: [
          {
            name: "Real numbers and exact form",
            plain:
              "Working with surds and other non-terminating values, and knowing when to leave an answer exact rather than rounding it.",
            sticking:
              "Rounding too early. It is a habit from earlier years that starts costing marks here and keeps costing them through Year 12.",
          },
          {
            name: "Financial maths — simple interest",
            plain:
              "Calculating simple interest and looking at how people actually earn and are paid.",
          },
          {
            name: "Linear equations and gradient",
            plain:
              "Moving fluently between the equation of a straight line, its graph and a table of values — and understanding gradient as a rate of change, not just rise over run.",
            sticking:
              "This is the load-bearing topic of the year. Gradient as \"the formula\" transfers nowhere; gradient as \"how fast one thing changes as another changes\" transfers to calculus, to physics and to every senior maths course.",
            guide: "what-is-a-derivative",
          },
        ],
      },
      {
        name: "Measurement and geometry",
        blurb:
          "Two of the most useful results in school mathematics arrive in the same year.",
        topics: [
          {
            name: "Perimeter and area of composite figures",
            plain: "Breaking an irregular shape into parts you already have formulas for.",
          },
          {
            name: "Pythagoras' theorem applied",
            plain:
              "Using the relationship between the sides of a right-angled triangle to solve perimeter and area problems, not just to find a missing side.",
            sticking:
              "Identifying the hypotenuse in a rotated or embedded triangle. Students who only ever saw textbook orientations struggle the moment the triangle is part of a larger figure.",
          },
          {
            name: "Congruent triangles and similar figures",
            plain:
              "Establishing when two triangles must be identical, and what stays the same when a shape is scaled up or down.",
          },
          {
            name: "The trigonometric ratios",
            plain:
              "Sine, cosine and tangent introduced as fixed relationships between the sides of a right-angled triangle.",
            sticking:
              "Treating the ratios as three unrelated buttons on a calculator. Students who understand that the ratio is fixed by the angle can reconstruct which one to use; students who memorised a mnemonic cannot.",
            guide: "trigonometry-finding-a-side",
          },
          {
            name: "Volume, capacity and surface area",
            plain: "Extending formula use to right prisms and cylinders.",
            sticking:
              "Volume and surface area confused under time pressure. The distinction is worth stating in words — how much fits inside, versus how much wrapping it needs.",
          },
        ],
      },
      {
        name: "Probability and statistics",
        blurb:
          "Two-stage experiments, and the first serious look at how statistics get misused.",
        topics: [
          {
            name: "Two-stage chance experiments",
            plain:
              "Experiments with two steps, including the difference between replacing an item between draws and not replacing it.",
            sticking:
              "Without replacement. Students correctly change the numerator and forget the denominator.",
          },
          {
            name: "Critically analysing statistical claims",
            plain:
              "Comparing data displays using proper statistical language, and evaluating claims made in the media — particularly around how a sample was drawn.",
          },
        ],
      },
    ],
    assessment: [
      "School-based assessment. There is no external Maths exam in Year 9.",
      "Year 9 NAPLAN sits alongside the course. Achieving Band 8 or higher in reading, writing and numeracy exempts a student from the corresponding OLNA component later, which is worth knowing before the tests rather than after.",
      "Reporting is against the WA achievement standard for Year 9.",
    ],
    faqs: [
      {
        q: "Has WA Year 9 Maths changed recently?",
        a: NEW_CURRICULUM_NOTE,
      },
      {
        q: "Does Year 9 Maths affect which senior maths course my child can take?",
        a: "Indirectly, and more than most families realise. Schools use Year 9 and Year 10 performance to advise on Mathematics Applications, Methods or Specialist. Gradient, algebraic fluency and Pythagoras are the specific areas that separate a comfortable Methods student from a struggling one.",
      },
      {
        q: "What is the link between Year 9 and the OLNA?",
        a: "Students who reach Band 8 or above in a Year 9 NAPLAN component are treated as having already demonstrated the required standard in that component and do not sit that part of the OLNA. Students who do not reach Band 8 sit the OLNA in Years 10 to 12 until they meet the standard, and meeting it is a WACE requirement.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  /* ---------------------------------------------------------------- */
  /* PUBLISHED (continued)                                             */
  /* ---------------------------------------------------------------- */
  {
    slug: "year-7-science",
    year: 7,
    yearLabel: "Year 7",
    subject: "Science",
    stage: "lower",
    title: "WA Year 7 Science: Every Topic, Explained Simply",
    description:
      "What Year 7 students cover in Science in Western Australia — classification, ecosystems, the particle model of matter, and forces — in plain English, with the parts students most often find hard in their first year of high school science.",
    heading: "WA Year 7 Science: what your child covers this year",
    intro:
      "Year 7 Science in Western Australia is the year science stops being a single subject and splits into the four strands your child will keep meeting all the way to Year 12: biology, chemistry, earth and space, and physics. Classification brings order to the diversity of living things, the particle model explains why matter behaves the way it does, the Earth-Sun-Moon system gets modelled properly for the first time, and forces are described precisely rather than just observed. Underneath all four sits a new expectation: writing up an investigation properly, not just doing it.",
    strands: [
      {
        name: "Biological sciences",
        blurb:
          "Classification and ecosystems, both about imposing order and structure onto living things and how they interact.",
        topics: [
          {
            name: "Classifying living things",
            plain:
              "Grouping organisms by shared features into a hierarchy, and using classification keys to identify an unfamiliar living thing.",
            sticking:
              "Treating classification as arbitrary labelling rather than as evidence of shared ancestry. Students who see it as \"just sorting\" rather than \"sorting by what's actually related\" struggle when the categories don't match everyday intuition — a whale isn't a fish.",
          },
          {
            name: "Ecosystems and food webs",
            plain:
              "Modelling how energy and matter move between organisms using food chains and food webs, and predicting what happens when one part of the system changes.",
            sticking:
              "Food chains suggest energy flows in a straight line; food webs are where students have to hold several interacting chains in their head at once. The usual failure is predicting the effect of removing one species by following only one chain instead of the whole web.",
          },
        ],
      },
      {
        name: "Chemical sciences",
        blurb: "The particle model arrives and becomes the explanation for everything matter does.",
        topics: [
          {
            name: "The particle model of matter",
            plain:
              "Explaining the arrangement and motion of particles in solids, liquids and gases, and using the model to explain changes of state.",
            sticking:
              "Believing the particles themselves expand when heated, rather than understanding that they move faster and spread further apart. Left uncorrected, this single misconception causes trouble all the way through to Year 9 chemistry.",
            guide: "states-of-matter",
          },
          {
            name: "Mixtures and separating mixtures",
            plain:
              "Distinguishing pure substances from mixtures, and choosing a separation technique — filtration, evaporation, distillation — based on the properties of what's being separated.",
            sticking:
              "Picking a technique from memory rather than from the properties of the substances involved. Students who understand why filtration works (particle size) rather than just that it does, choose correctly on unfamiliar examples.",
          },
        ],
      },
      {
        name: "Earth and space sciences",
        blurb: "The solar system, modelled rather than just described.",
        topics: [
          {
            name: "Earth, Sun and Moon",
            plain:
              "Using models of the Earth-Sun-Moon system to explain day and night, the seasons, and the phases of the Moon.",
            sticking:
              "The seasons are the classic trap: students default to \"closer to the Sun in summer\" when the actual explanation is the tilt of Earth's axis. Worth checking this explicitly, since the wrong explanation is intuitive and sticks.",
          },
        ],
      },
      {
        name: "Physical sciences",
        blurb: "Forces, described with enough precision to predict what they'll do.",
        topics: [
          {
            name: "Forces and motion",
            plain:
              "Representing the forces acting on an object and predicting the effect of unbalanced forces on its motion, including the mechanical advantage provided by simple machines like levers and pulleys.",
            sticking:
              "Assuming a moving object needs a constant force to keep moving. Unlearning this is closer to a physics rite of passage than a quick fix, and it resurfaces in Year 10 motion and Year 11 Physics if it isn't addressed properly here.",
          },
        ],
      },
      {
        name: "Science inquiry",
        blurb:
          "Assessed alongside the content, and the place where the habits for every later science subject get set.",
        topics: [
          {
            name: "Planning reproducible investigations",
            plain:
              "Proposing a question, making a prediction based on scientific knowledge, and recognising risks when planning and conducting an investigation someone else could repeat.",
          },
          {
            name: "Analysing data and evaluating claims",
            plain:
              "Constructing tables and graphs to organise data, describing patterns, and using evidence rather than opinion to support a conclusion.",
            sticking:
              "Confusing a pattern in the data with an explanation for it. \"The graph goes up\" is an observation; saying why is the actual analysis, and it's where marks are lost.",
          },
          {
            name: "Science as a human endeavour",
            plain:
              "Looking at examples of where scientific knowledge developed through collaboration, and how that knowledge has shaped human activity.",
          },
        ],
      },
    ],
    assessment: [
      "Assessment is set by your child's school, not centrally. There is no external exam in Year 7.",
      "Practical investigations are usually assessed directly against the inquiry skills above, alongside topic tests.",
      "Reporting is against the WA achievement standard for Year 7 Science.",
    ],
    faqs: [
      {
        q: "Has WA Year 7 Science changed recently?",
        a: NEW_CURRICULUM_NOTE,
      },
      {
        q: "Is this the first year my child does \"real\" science, with proper prac reports?",
        a: "Yes, in a specific sense: Year 7 is when writing up an investigation to a standard — question, prediction, method, risk assessment, evidence-based conclusion, identified sources of error — becomes an assessed skill in its own right rather than an add-on to the content. It's worth taking seriously from week one rather than as a formality, since the same structure is assessed every year afterward.",
      },
      {
        q: "My child says science got \"harder to remember\" compared to primary school. Why?",
        a: "Primary school science is mostly concrete and observed directly. Year 7 introduces the first ideas that can't be seen — particles, and the mechanics of the Earth-Sun-Moon system — so \"remembering\" stops being enough; the content has to be understood through a model instead.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-9-science",
    year: 9,
    yearLabel: "Year 9",
    subject: "Science",
    stage: "lower",
    title: "WA Year 9 Science: Every Topic, Explained Simply",
    description:
      "What Year 9 students cover in Science in Western Australia — atomic structure, the periodic table, ecosystems and energy, plate tectonics and waves — in plain English, and the parts students most often get stuck on.",
    heading: "WA Year 9 Science: what your child covers this year",
    intro:
      "Year 9 Science in Western Australia is the year chemistry gets its real foundations: atomic structure and the periodic table arrive properly, and everything in Year 10 and senior Chemistry assumes they're solid. Alongside that, ecosystems are studied as systems that respond to change rather than static diagrams, Earth's carbon and water cycles connect biology to geology, and energy transfer through waves — light and sound — gets its first formal treatment. It's a genuinely broad year, and the strand that gets shaky first is usually chemistry, because it's the most abstract of the four.",
    strands: [
      {
        name: "Biological sciences",
        blurb: "Ecosystems treated as dynamic systems, not static diagrams.",
        topics: [
          {
            name: "Ecosystems and the flow of matter and energy",
            plain:
              "Tracking how matter and energy move through an ecosystem, and how its biotic (living) and abiotic (non-living) components affect one another.",
            sticking:
              "Treating an ecosystem as a fixed list of organisms rather than a system of interacting flows. The giveaway is a student who can name every organism in a food web but can't predict what happens to the whole system if one abiotic factor — rainfall, temperature — changes.",
          },
        ],
      },
      {
        name: "Earth and space sciences",
        blurb: "Where biology and geology meet — the systems that connect life to the planet it lives on.",
        topics: [
          {
            name: "The carbon cycle and ecosystem change",
            plain:
              "Explaining how interactions between Earth's spheres — atmosphere, hydrosphere, biosphere, geosphere — drive the carbon cycle, the water cycle, and global climate.",
            sticking:
              "Seeing the carbon cycle as a diagram to memorise rather than a system to reason through. Students who can trace what happens to a specific carbon atom, rather than just labelling arrows, handle exam questions that swap the familiar diagram for an unfamiliar one.",
          },
          {
            name: "Plate tectonics",
            plain:
              "Connecting the movement of tectonic plates to the landforms, earthquakes and volcanic activity that result from it.",
          },
        ],
      },
      {
        name: "Chemical sciences",
        blurb: "The strand that decides how comfortable Year 10 and senior Chemistry will be.",
        topics: [
          {
            name: "Atomic structure",
            plain:
              "Using the structure of an atom — protons, neutrons and electrons — to determine its atomic number and mass number.",
            sticking:
              "Confusing atomic number with mass number under exam pressure. It's a small distinction with a large downstream cost, since the periodic table itself is organised by atomic number.",
          },
          {
            name: "The periodic table",
            plain: "Using the arrangement of elements on the periodic table to identify patterns in their properties.",
            sticking:
              "Treating the periodic table as a table to memorise rather than a tool that encodes information. A student who understands why it's arranged the way it is can predict properties of an unfamiliar element; a student who has memorised specific elements cannot.",
          },
          {
            name: "Chemical reactions and conservation of mass",
            plain:
              "Representing chemical reactions using word and chemical equations, and applying conservation of mass to reacting quantities.",
            sticking:
              "Balancing equations by adjusting subscripts instead of coefficients — it changes the substance rather than the amount of it, and it's a habit that's hard to unlearn once it sets in.",
          },
        ],
      },
      {
        name: "Physical sciences",
        blurb: "Energy transfer, treated through the wave and particle models for the first time.",
        topics: [
          {
            name: "Heat transfer",
            plain:
              "Distinguishing conduction, convection and radiation as three different mechanisms for transferring heat energy.",
          },
          {
            name: "Waves and transferring energy",
            plain:
              "Using wave and particle models to explain how light and sound transfer energy without transferring matter.",
            sticking:
              "The idea that a wave moves energy, not the medium itself, is genuinely counterintuitive — students picture water travelling across a pool rather than a floating object bobbing up and down in place. Worth demonstrating, not just describing.",
          },
        ],
      },
      {
        name: "Science inquiry",
        blurb:
          "The inquiry skills step up from Year 7 and 8 — accuracy, reliability and validity are now assessed as distinct ideas.",
        topics: [
          {
            name: "Working scientifically: accuracy, reliability and validity",
            plain:
              "Planning and conducting investigations that produce reproducible results, and describing sources of error and how to improve data quality.",
            sticking:
              "Treating accuracy, reliability and validity as interchangeable words. They test three different things — how close to the true value, how repeatable, and how well the method actually answers the question — and assessments reward telling them apart.",
          },
          {
            name: "Science as a human endeavour: models, ethics and society",
            plain:
              "Examining how advances in science, technology and engineering are interconnected, and how scientific responses affect society.",
          },
        ],
      },
    ],
    assessment: [
      "School-based assessment. There is no external Science exam in Year 9.",
      "Year 9 is when investigation reports start being marked on accuracy, reliability and validity as separate criteria, not just whether the experiment worked.",
      "Reporting is against the WA achievement standard for Year 9 Science.",
    ],
    faqs: [
      {
        q: "Has WA Year 9 Science changed recently?",
        a: NEW_CURRICULUM_NOTE,
      },
      {
        q: "Why does Year 9 Science suddenly involve so much chemistry?",
        a: "Atomic structure and the periodic table are the foundation every later chemistry topic is built on — bonding, reactions and stoichiometry in Year 11 and 12 all assume this year is solid. It's deliberately front-loaded so there's time to build on it, rather than teaching it under exam pressure later.",
      },
      {
        q: "My child is confident in biology but struggling with the chemistry content. Is that normal?",
        a: "Very. Chemistry in Year 9 is the most abstract of the four strands — atoms and the periodic table can't be observed directly the way an ecosystem can. A student who's strong at descriptive, observable science can still find this content genuinely harder, and that's a difference in abstraction, not effort.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-10-science",
    year: 10,
    yearLabel: "Year 10",
    subject: "Science",
    stage: "lower",
    title: "WA Year 10 Science: Every Topic, Explained Simply",
    description:
      "What Year 10 students cover in Science in Western Australia — genetics, evolution, chemical reactions, motion and the origins of the universe — in plain English, and why Year 10 is the year that shapes ATAR science choices.",
    heading: "WA Year 10 Science: what your child covers this year",
    intro:
      "Year 10 Science in Western Australia is the last year of a single combined Science subject before it splits into Biology, Chemistry, Physics and Human Biology in Year 11. Each strand this year is effectively a preview of one of those courses: genetics and evolution anticipate Biology and Human Biology, reaction rates and energy anticipate Chemistry, and motion and forces anticipate Physics. How a student finds each strand this year is genuinely informative for subject selection — a student who finds the physics content easy and the genetics content a slog is telling you something real about which Year 11 sciences will suit them.",
    strands: [
      {
        name: "Biological sciences",
        blurb: "Heredity and evolution — the mechanics of how traits are passed on and how species change.",
        topics: [
          {
            name: "DNA, genes and chromosomes",
            plain:
              "Explaining the relationship between DNA, genes and chromosomes, and how this structure carries genetic information.",
            sticking:
              "Confusing the three levels of the hierarchy — DNA is the molecule, a gene is a section of it, a chromosome is a packaged bundle of genes. Students who can't order these three struggle with everything built on top of them.",
          },
          {
            name: "Genetics and inheritance",
            plain:
              "Using models such as Punnett squares to predict the probability of inherited traits in offspring.",
            sticking:
              "Treating a Punnett square as a diagram to fill in mechanically rather than a probability tool. The genuine skill is interpreting what a 3:1 ratio actually means for a real family, not just producing the ratio.",
          },
          {
            name: "Evolution by natural selection",
            plain:
              "Explaining how natural selection acting on variation within a population can lead to evolution over time.",
            sticking:
              "The single most common error in this topic: describing evolution as something an individual organism does (\"the giraffe stretched its neck\") rather than a change in a population's traits over generations. Worth correcting explicitly and early.",
          },
        ],
      },
      {
        name: "Chemical sciences",
        blurb: "Reactions, examined in more mechanistic detail than Year 9's introduction.",
        topics: [
          {
            name: "Types of chemical reactions",
            plain:
              "Classifying chemical reactions by type and using patterns to predict the products of a reaction.",
          },
          {
            name: "Rates of reaction",
            plain:
              "Explaining how changing factors — temperature, concentration, surface area — affects how quickly a reaction proceeds.",
            sticking:
              "Explaining a faster reaction rate by saying particles \"have more energy\" without connecting it to collision frequency and the proportion of collisions with enough energy to react. Both parts of that explanation are needed for full marks.",
          },
          {
            name: "Energy in chemical reactions",
            plain:
              "Distinguishing exothermic reactions, which release energy, from endothermic reactions, which absorb it.",
          },
        ],
      },
      {
        name: "Earth and space sciences",
        blurb: "Zooming out from the planet to the universe it sits in.",
        topics: [
          {
            name: "The universe and the Big Bang theory",
            plain:
              "Describing the formation of stars, galaxies and planetary systems, and how space exploration has contributed to understanding the universe's formation and evolution.",
          },
        ],
      },
      {
        name: "Physical sciences",
        blurb: "Motion and forces, tied together with the mathematical precision Year 9 didn't yet require.",
        topics: [
          {
            name: "Motion: speed, velocity and acceleration",
            plain:
              "Distinguishing speed from velocity, and calculating acceleration as the rate of change of velocity.",
            sticking:
              "Treating speed and velocity as synonyms. Velocity includes direction; a car going around a roundabout at constant speed has changing velocity, and that distinction is exactly what separates a pass from a strong mark in this topic.",
          },
          {
            name: "Newton's laws of motion",
            plain:
              "Applying Newton's three laws to explain and predict the motion of objects under the forces acting on them.",
            sticking:
              "The third law — action and reaction — is the one that gets misapplied. Students describe the paired forces as acting on the same object and cancelling out, when they actually act on two different objects and don't cancel at all.",
            guide: "newtons-laws-of-motion",
          },
        ],
      },
      {
        name: "Science inquiry",
        blurb: "The most sophisticated inquiry expectations of the P-10 curriculum, in preparation for senior science.",
        topics: [
          {
            name: "Science as a human endeavour: research, ethics and global systems",
            plain:
              "Examining how advances in science, technology and engineering are interconnected globally, and the ethical and societal dimensions of scientific research.",
          },
        ],
      },
    ],
    assessment: [
      "School-based assessment. There is no external Science exam in Year 10.",
      "Investigation reports at this level are expected to include appropriate sample sizes and a comment on the validity and reliability of the method, not just the results.",
      "Reporting is against the WA achievement standard for Year 10 Science, the last year before Science splits into separate ATAR and General subjects.",
    ],
    faqs: [
      {
        q: "Has WA Year 10 Science changed recently?",
        a: NEW_CURRICULUM_NOTE,
      },
      {
        q: "How does Year 10 Science relate to choosing ATAR sciences for Year 11?",
        a: "Directly. This is the last year of combined Science, and each strand previews a specific Year 11 course — genetics and evolution preview Biology and Human Biology, reaction chemistry previews Chemistry, and motion and forces previews Physics. Schools generally use Year 10 performance in each strand, not just an overall grade, to advise on which ATAR sciences a student is ready for.",
      },
      {
        q: "My child enjoys science generally but hasn't picked a favourite strand. Is that a problem for subject selection?",
        a: "No — plenty of students go into Year 11 undecided between two sciences. What matters more is being honest about which strands were a genuine struggle versus which were merely less interesting, since the first is a real signal and the second usually isn't.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-8-maths",
    year: 8,
    yearLabel: "Year 8",
    subject: "Maths",
    stage: "lower",
    title: "WA Year 8 Maths: Every Topic, Explained Simply",
    description:
      "What Year 8 students cover in Maths in Western Australia — rational and irrational numbers, algebra, Pythagoras' theorem and probability — in plain English, and where students most often get stuck.",
    heading: "WA Year 8 Maths: what your child covers this year",
    intro:
      "Year 8 Maths in Western Australia is a consolidation year sitting between two bigger shifts: Year 7's introduction to algebra and negative numbers, and Year 9's move into linear graphs and trigonometry. Numbers extend to include irrational values, algebraic manipulation becomes fluent rather than tentative, and two genuinely useful results — Pythagoras' theorem and the properties of quadrilaterals — get applied for the first time. A student who leaves Year 8 comfortable manipulating algebraic expressions and confident with Pythagoras has the two things Year 9 assumes are already solid.",
    strands: [
      {
        name: "Number and algebra",
        blurb: "The strand that carries most of the year — numbers broaden, and algebra stops being tentative.",
        topics: [
          {
            name: "Operations with integers and rationals",
            plain:
              "Applying the four operations fluently and efficiently to a broader range of numbers, including negative fractions and decimals.",
          },
          {
            name: "Rational and irrational numbers",
            plain:
              "Distinguishing numbers that can be written as a fraction (rational) from those that can't (irrational), including an introduction to surds.",
            sticking:
              "Assuming every decimal that \"looks messy\" is irrational. The actual test is whether it terminates or repeats — 0.333... is rational despite going on forever, and that surprises most students the first time.",
          },
          {
            name: "Index laws (numerical)",
            plain: "Applying the index laws to simplify numerical expressions involving powers.",
          },
          {
            name: "Rates",
            plain:
              "Comparing quantities measured in different units — such as speed or price per item — using rates.",
          },
          {
            name: "Financial maths and modelling",
            plain:
              "Applying percentage and rate calculations to real financial situations like discounts, mark-ups and simple budgeting.",
          },
          {
            name: "Algebraic manipulation",
            plain:
              "Expanding, simplifying and factorising algebraic expressions fluently, extending the introduction to algebra from Year 7.",
            sticking:
              "Sign errors when expanding brackets with a negative term out the front — a mistake that looks like carelessness but is usually a genuine gap in understanding what the negative sign is distributing to. Worth diagnosing rather than just marking wrong.",
          },
          {
            name: "Graphing linear relations",
            plain:
              "Plotting a linear relationship from a table of values or an equation, and reading information back off the graph.",
          },
          {
            name: "Linear equations and inequalities",
            plain:
              "Solving linear equations and inequalities, and representing the solution to an inequality on a number line.",
            sticking:
              "Forgetting to flip the inequality sign when multiplying or dividing by a negative number. It's a one-line rule that's easy to state and easy to forget under pressure, so it's worth over-practising specifically.",
          },
          {
            name: "Modelling with linear relations",
            plain: "Using a linear equation or graph to model and solve a real-world problem.",
          },
        ],
      },
      {
        name: "Measurement and geometry",
        blurb: "Two genuinely useful results arrive this year, plus a broader measurement toolkit.",
        topics: [
          {
            name: "Perimeter and area of composite shapes",
            plain:
              "Finding the perimeter and area of shapes made up of several simpler shapes joined together.",
          },
          {
            name: "Circle circumference and area",
            plain: "Applying the formulas for the circumference and area of a circle.",
            sticking:
              "Confusing the circumference and area formulas under pressure, since both involve π and a version of the radius. Understanding what each formula is actually measuring — a distance around versus a space inside — prevents the mix-up better than memorising which formula is which.",
          },
          {
            name: "Volume and capacity of prisms",
            plain: "Calculating the volume and capacity of right prisms using the cross-sectional area.",
          },
          {
            name: "Pythagoras' theorem",
            plain:
              "Using the relationship between the sides of a right-angled triangle to find an unknown side length.",
            sticking:
              "Applying the theorem to a triangle that isn't right-angled, because the diagram wasn't checked first. This is the single most common Pythagoras error at this level, and it's easy to eliminate by making \"is there a right angle\" the first question, not an assumption.",
            guide: "pythagoras-theorem",
          },
          {
            name: "Time and time zones",
            plain: "Calculating time differences using 24-hour time and reading Australian and international time zones.",
          },
          {
            name: "Congruence and similarity",
            plain:
              "Establishing when two shapes are congruent (identical) or similar (same shape, different size), and using the tests for each.",
          },
          {
            name: "Properties of quadrilaterals",
            plain:
              "Using the properties of different quadrilaterals — parallelograms, rhombuses, trapeziums — to find unknown angles and side lengths.",
          },
          {
            name: "Position in 3D",
            plain: "Describing the position of a point in three dimensions and interpreting simple 3D diagrams and nets.",
          },
        ],
      },
      {
        name: "Probability and statistics",
        blurb: "Statistics gets a more critical edge, and probability extends to compound events.",
        topics: [
          {
            name: "Data collection and sampling",
            plain:
              "Investigating and comparing different methods of collecting data, and how the choice of sample affects the result.",
            sticking:
              "Assuming a bigger sample is automatically a better one, without considering whether it's actually representative. A large but biased sample is worse than a small, well-chosen one — a genuinely counterintuitive idea worth stating directly.",
          },
          {
            name: "Probability of compound events",
            plain:
              "Recognising complementary events and constructing sample spaces for experiments involving two events.",
          },
        ],
      },
    ],
    assessment: [
      "Assessment is set by your child's school, not centrally. There is no external Maths exam in Year 8.",
      "Expect a mix of in-class tests, and increasingly, multi-step application problems rather than single-technique questions.",
      "Reporting is against the WA achievement standard for Year 8.",
    ],
    faqs: [
      {
        q: "Has WA Year 8 Maths changed recently?",
        a: NEW_CURRICULUM_NOTE,
      },
      {
        q: "My child was strong in Year 7 Maths but Year 8 feels like a step down in confidence. Why?",
        a: "Year 8 asks students to combine skills from Year 7 rather than apply them one at a time — a Pythagoras problem embedded in a real-world context, a financial maths question that also needs percentage skills. Confidence often dips not because the individual skills got harder, but because the questions stopped being clearly labelled by topic.",
      },
      {
        q: "Is Year 8 Maths where my child's future subject options start narrowing?",
        a: "Not formally — subject selection happens after Year 10. But Year 8 is where algebraic fluency either becomes automatic or stays effortful, and that difference is the best early predictor of how comfortable Years 9 and 10 Maths will feel.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-10-maths",
    year: 10,
    yearLabel: "Year 10",
    subject: "Maths",
    stage: "lower",
    title: "WA Year 10 Maths: Every Topic, Explained Simply",
    description:
      "What Year 10 students cover in Maths in Western Australia — quadratics, simultaneous equations, trigonometry and bivariate data — in plain English, and why Year 10 results are what schools actually use to advise on Year 11 Maths.",
    heading: "WA Year 10 Maths: what your child covers this year",
    intro:
      "Year 10 Maths in Western Australia is the year that functions as an entrance exam for senior mathematics, even though no single exam is labelled that way. Quadratics are solved by every available method, simultaneous equations and exponential functions extend the algebra, and trigonometry moves from finding a side length to full triangle problems involving bearings and elevation. Schools use performance across this year — not one test — to advise whether a student is ready for Mathematics Methods or Specialist, or better suited to Mathematics Applications, so a shaky Year 10 is worth addressing before Year 11 starts, not during it.",
    strands: [
      {
        name: "Number and algebra",
        blurb: "Quadratics dominate the year, alongside the graphing skills that extend straight into Methods.",
        topics: [
          {
            name: "Indices and surds",
            plain: "Applying the index laws to algebraic expressions and simplifying expressions involving surds.",
          },
          {
            name: "Expanding and factorising",
            plain:
              "Expanding and factorising algebraic expressions, extending the techniques introduced in Year 8 and 9.",
          },
          {
            name: "Factorising quadratic expressions",
            plain:
              "Factorising quadratic expressions using common techniques, including trinomials and the difference of two squares.",
            sticking:
              "Trying to factorise every quadratic the same way. Recognising which technique a particular expression calls for — rather than forcing one method on all of them — is the actual skill, and it only comes from seeing enough varied examples.",
          },
          {
            name: "Solving quadratic equations",
            plain:
              "Solving quadratic equations by factorising, completing the square, or using the quadratic formula.",
          },
          {
            name: "The quadratic formula",
            plain:
              "Using the quadratic formula to solve equations that don't factorise neatly, and using the discriminant to determine how many solutions exist.",
            guide: "the-quadratic-formula",
          },
          {
            name: "Simultaneous linear equations",
            plain:
              "Solving two linear equations at once, algebraically and graphically, to find where two lines intersect.",
          },
          {
            name: "Linear inequalities and problem solving",
            plain: "Solving linear inequalities arising from real-world problems and representing the solution correctly.",
          },
          {
            name: "Graphing parabolas",
            plain:
              "Sketching a parabola from its equation, identifying the turning point, axis of symmetry and intercepts.",
            sticking:
              "Reading the turning point coordinates straight off the equation in the wrong order, or with the wrong sign, particularly from turning-point form. A small transcription error with an outsized effect on the final mark.",
          },
          {
            name: "Exponential relationships and graphs",
            plain: "Graphing exponential relationships and using them to model growth and decay.",
          },
          {
            name: "Circles and non-linear graphs",
            plain: "Graphing the equation of a circle and recognising other common non-linear relationships.",
          },
        ],
      },
      {
        name: "Measurement and geometry",
        blurb: "Trigonometry becomes a complete toolkit, and similarity gets formal proof.",
        topics: [
          {
            name: "Surface area of solids",
            plain: "Calculating the surface area of prisms, cylinders and composite solids.",
          },
          {
            name: "Volume of solids",
            plain: "Calculating the volume of prisms, cylinders and composite solids, extending Year 9's formulas.",
          },
          {
            name: "Trigonometry: right-angled triangles and exact values",
            plain:
              "Using the trigonometric ratios to solve right-angled triangle problems, including angles with known exact trigonometric values.",
          },
          {
            name: "Trigonometry: bearings, elevation and depression",
            plain:
              "Applying trigonometry to real-world problems described using compass bearings and angles of elevation or depression.",
            sticking:
              "Drawing the diagram incorrectly before any calculation starts — particularly angles of depression, which students often draw measured from the wrong line. Almost every error in this topic traces back to the diagram, not the trigonometry.",
          },
          {
            name: "Similar triangles and similarity",
            plain:
              "Establishing that two triangles are similar using the similarity tests, and using the scale factor to find unknown lengths.",
          },
          {
            name: "Congruence and geometric reasoning",
            plain:
              "Using formal geometric reasoning, including congruence tests, to prove properties of shapes rather than just measuring them.",
          },
        ],
      },
      {
        name: "Probability and statistics",
        blurb: "Statistics becomes genuinely about relationships between two variables, and probability handles conditional events.",
        topics: [
          {
            name: "Bivariate data and scatterplots",
            plain:
              "Displaying the relationship between two numerical variables on a scatterplot and describing the association.",
          },
          {
            name: "Line of best fit and correlation",
            plain:
              "Fitting a line to bivariate data and using it to make predictions, while understanding the limits of those predictions.",
            sticking:
              "Treating a strong correlation as proof of cause and effect. This is exactly what exam questions probe, and it's also a genuinely useful thing for a student to internalise well beyond the maths classroom.",
          },
          {
            name: "Comparing data sets",
            plain:
              "Comparing the shape, centre and spread of two or more data sets using parallel boxplots or back-to-back stem plots.",
          },
          {
            name: "Probability: Venn diagrams, two-way tables and conditional probability",
            plain:
              "Using Venn diagrams and two-way tables to solve problems involving conditional probability — the probability of one event given that another has happened.",
            sticking:
              "Confusing P(A given B) with P(B given A). They're usually different numbers, and mixing them up is one of the most common errors in senior-level probability, so it's worth being precise about the distinction from the first time it appears.",
          },
        ],
      },
    ],
    assessment: [
      "School-based assessment. There is no external Maths exam in Year 10, though OLNA numeracy sits alongside the course for students who haven't yet met the standard through NAPLAN.",
      "Year 10 results — across topics, not just a final grade — are what schools use to advise on Mathematics Applications, Methods or Specialist for Year 11.",
      "Reporting is against the WA achievement standard for Year 10, the last year before Maths splits into separate senior courses.",
    ],
    faqs: [
      {
        q: "Has WA Year 10 Maths changed recently?",
        a: NEW_CURRICULUM_NOTE,
      },
      {
        q: "How does Year 10 Maths performance affect Year 11 subject selection?",
        a: "Directly, and more than most families expect. Schools generally look at how a student handled quadratics, graphing and trigonometry specifically — not just an overall grade — when advising between Mathematics Applications, Methods and Specialist. A student who is fluent with algebraic manipulation and comfortable graphing functions is a stronger Methods candidate than one who reaches the same final grade through careful, slower work.",
      },
      {
        q: "My child is fine with the algebra but struggles with the trigonometry word problems. Is that a Year 11 red flag?",
        a: "Not necessarily — it's a very common and specific gap, usually caused by the diagram-drawing step rather than the trigonometry itself. It's worth isolating and fixing directly rather than treating it as a sign the whole strand is shaky, since the algebra is what carries the most weight into Year 11 Methods.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-7-english",
    year: 7,
    yearLabel: "Year 7",
    subject: "English",
    stage: "lower",
    title: "WA Year 7 English: Every Topic, Explained Simply",
    description:
      "What Year 7 students cover in English in Western Australia — text structure, literary devices, persuasive language and creating their own texts — in plain English, and where students most often get stuck.",
    heading: "WA Year 7 English: what your child covers this year",
    intro:
      "Year 7 English in Western Australia asks students to start noticing how a text is built, not just what it says. They learn that structure and language choices shift with audience and purpose, meet literary devices as tools an author chose deliberately rather than decoration, and are expected to create their own texts — imaginative, persuasive, informative — to a real standard rather than just complete them. The shift from primary school is less about new content and more about a new expectation: explaining why a text works, not just what happens in it.",
    strands: [
      {
        name: "Language",
        blurb: "The mechanics of a text — structure, sentences and vocabulary — treated as deliberate choices.",
        topics: [
          {
            name: "How texts are structured",
            plain:
              "Recognising how the structure of a text varies according to its purpose — a recount, a report and an argument are organised differently for a reason.",
          },
          {
            name: "Sentence structures",
            plain:
              "Building and varying sentence structures, including combining ideas with more than one clause, to control pacing and emphasis.",
          },
          {
            name: "Punctuation: colons and brackets",
            plain: "Using colons to introduce a list or explanation, and brackets to add extra information.",
            sticking:
              "Overusing brackets for anything that feels like an aside, rather than reserving them for information that's genuinely non-essential. A sentence with three bracketed asides is a sign the sentence needs restructuring, not more punctuation.",
          },
          {
            name: "Vocabulary and spelling",
            plain:
              "Extending vocabulary through wide reading and applying spelling patterns and rules to new and unfamiliar words.",
          },
          {
            name: "Language, identity and relationships",
            plain:
              "Exploring how language choices signal identity and shape relationships between speakers, writers and their audience.",
          },
        ],
      },
      {
        name: "Literature",
        blurb: "Literary texts examined for how they create meaning, not just summarised.",
        topics: [
          {
            name: "Literature in context",
            plain:
              "Considering how the time, place and culture a text was written in shapes its content and the perspectives it represents.",
          },
          {
            name: "How narratives create meaning",
            plain:
              "Analysing how plot, character and setting work together in a narrative to create meaning for a reader.",
          },
          {
            name: "Literary devices and poetry",
            plain:
              "Identifying literary devices — metaphor, simile, imagery — and explaining the effect they create, particularly in poetry.",
            sticking:
              "Naming a device correctly but stopping there. \"This is a metaphor\" is not an analysis; \"this metaphor makes the reader feel X because Y\" is. The naming is the easy half of the skill.",
          },
          {
            name: "Responding to literature",
            plain:
              "Forming and justifying a personal response to a text using evidence from it, rather than just stating an opinion.",
          },
          {
            name: "Creating imaginative texts",
            plain:
              "Writing original narratives that use structure and literary devices deliberately, rather than just telling a story chronologically.",
          },
        ],
      },
      {
        name: "Literacy",
        blurb: "Reading, viewing and creating a wide range of text types for real audiences and purposes.",
        topics: [
          {
            name: "Reading and comprehension strategies",
            plain:
              "Using strategies — predicting, questioning, summarising — to understand and interpret increasingly complex texts.",
          },
          {
            name: "Visual and multimodal texts",
            plain:
              "Interpreting how images, layout and design features work together with written text to create meaning.",
          },
          {
            name: "Analysing language for audience and purpose",
            plain:
              "Identifying how word choice, tone and structure are adapted for a specific audience and purpose.",
            sticking:
              "Describing what a text does (\"it uses persuasive language\") instead of what effect that has on a specific audience. The second version is what separates a describing answer from an analysing one.",
          },
          {
            name: "Creating written texts",
            plain:
              "Planning, drafting and editing written texts for a range of purposes — informative, persuasive, reflective.",
          },
          {
            name: "Spoken and multimodal presentations",
            plain:
              "Planning and delivering a spoken or multimodal presentation to an audience, with attention to how delivery affects meaning.",
          },
        ],
      },
    ],
    assessment: [
      "Assessment is set by your child's school, not centrally. There is no external exam in Year 7.",
      "Expect a mix of text-response tasks, creative writing, and at least one spoken or multimodal presentation.",
      "Reporting is against the WA achievement standard for Year 7 English.",
    ],
    faqs: [
      {
        q: "Has WA Year 7 English changed recently?",
        a: ENGLISH_CURRICULUM_NOTE,
      },
      {
        q: "My child reads well but struggles to write analytical responses. Why?",
        a: "Reading comprehension and analytical writing are genuinely different skills — understanding a text is not the same as being able to explain, in your own structured argument, why it works. Year 7 is where this gap first becomes visible, because analytical responses start being assessed as their own skill rather than folded into general reading tasks.",
      },
      {
        q: "Is Year 7 English mostly about grammar, or mostly about literature?",
        a: "Both, deliberately, and they're not separated in the way many parents remember from their own schooling. The Language strand (grammar, sentence structure, vocabulary) exists to serve the Literature and Literacy strands — the goal is using language precisely to analyse a text or make a persuasive point, not grammar drilled in isolation.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-8-english",
    year: 8,
    yearLabel: "Year 8",
    subject: "English",
    stage: "lower",
    title: "WA Year 8 English: Every Topic, Explained Simply",
    description:
      "What Year 8 students cover in English in Western Australia — genre, intertextuality, figurative language and academic vocabulary — in plain English, and the parts students most often find hard.",
    heading: "WA Year 8 English: what your child covers this year",
    intro:
      "Year 8 English in Western Australia is where texts stop being read in isolation. Intertextuality — how one text references or echoes another — genre conventions, and the way texts position a reader to feel a certain way all become explicit topics, not incidental observations. Sentence-level control gets more sophisticated too, with embedded clauses and nominalisation (turning verbs into nouns for a more formal, academic register) both new. It's a year that rewards a wider reading habit more than almost any other, since intertextual and genre-based analysis is hard to fake without having read reasonably widely.",
    strands: [
      {
        name: "Language",
        blurb: "Sentence-level control becomes more sophisticated, and vocabulary shifts toward a formal, academic register.",
        topics: [
          {
            name: "Clauses and embedded clauses",
            plain:
              "Using embedded clauses — a clause inserted inside another to add detail — to build more complex, information-dense sentences.",
            sticking:
              "Losing the main clause's subject-verb agreement once an embedded clause is inserted between them. It's a small technical slip, but it's exactly the kind of error that undermines an otherwise strong piece of writing.",
          },
          {
            name: "Nominalisation and academic vocabulary",
            plain:
              "Turning verbs and adjectives into nouns (\"decide\" into \"decision\") to create the more formal, condensed register expected in academic and analytical writing.",
            sticking:
              "Overusing nominalisation until the writing becomes dense and lifeless rather than precise. It's a technique to deploy deliberately in formal writing, not a habit to apply everywhere.",
          },
          {
            name: "Punctuation: semicolons and dashes",
            plain: "Using semicolons to join related independent clauses, and dashes to add emphasis or an aside.",
          },
          {
            name: "Spelling and learning new words",
            plain: "Applying strategies for spelling and learning unfamiliar or subject-specific vocabulary.",
          },
          {
            name: "Sentence patterns, tone and imagery",
            plain:
              "Varying sentence patterns deliberately to control tone and reinforce the imagery a writer is building.",
          },
        ],
      },
      {
        name: "Literature",
        blurb: "Texts read in relation to other texts and to the values embedded in them.",
        topics: [
          {
            name: "Evaluative language and figurative devices",
            plain:
              "Identifying language that carries judgement or evaluation, and analysing the effect of figurative devices in more sophisticated texts.",
          },
          {
            name: "Literature and values",
            plain:
              "Examining how a text represents particular values, and how a reader's own values shape their response to it.",
          },
          {
            name: "Intertextuality",
            plain:
              "Recognising when one text deliberately references, echoes or reworks another, and explaining why an author would do that.",
            sticking:
              "Spotting a reference but not being able to say what it adds. Identifying an allusion is only half the skill — the mark is for explaining what the connection contributes to meaning.",
          },
          {
            name: "Responding and positioning readers",
            plain:
              "Analysing the techniques a text uses to position a reader to feel sympathy, suspicion or agreement toward a character or idea.",
          },
          {
            name: "Creating literary texts",
            plain:
              "Writing original literary texts that use genre conventions and figurative language deliberately.",
          },
        ],
      },
      {
        name: "Literacy",
        blurb: "Genre and organisation, examined critically across a wider range of text types.",
        topics: [
          {
            name: "Interpreting and evaluating ideas",
            plain: "Interpreting the ideas in a text and evaluating how convincingly they're presented.",
          },
          {
            name: "Genre and hybrid texts",
            plain:
              "Identifying the conventions of common genres, and recognising when a text deliberately blends more than one genre.",
          },
          {
            name: "Cohesion, evidence and substantiation",
            plain:
              "Using cohesive devices to link ideas across a text, and supporting claims with specific evidence rather than assertion.",
            sticking:
              "Substituting a strong claim for actual evidence — \"this clearly shows\" is doing the work a quotation or specific example should be doing. This is the single most common gap between a mid-range and a strong response at this level.",
          },
          {
            name: "Visual texts and references",
            plain: "Interpreting how visual elements and references to other texts or ideas build meaning.",
          },
          {
            name: "Analysing the organisation of ideas",
            plain: "Analysing how a text sequences and organises its ideas to build an argument or narrative.",
          },
          {
            name: "Creating written and multimodal texts",
            plain: "Planning and creating written and multimodal texts that use genre conventions purposefully.",
          },
          {
            name: "Spoken and multimodal presentations",
            plain:
              "Delivering a spoken or multimodal presentation, extending Year 7's introduction with more sustained content.",
          },
        ],
      },
    ],
    assessment: [
      "Assessment is set by your child's school, not centrally. There is no external exam in Year 8.",
      "Expect text-response essays, creative and persuasive writing tasks, and continued spoken presentation assessment.",
      "Reporting is against the WA achievement standard for Year 8 English.",
    ],
    faqs: [
      {
        q: "Has WA Year 8 English changed recently?",
        a: ENGLISH_CURRICULUM_NOTE,
      },
      {
        q: "What is intertextuality, and why does it suddenly matter in Year 8?",
        a: "It's when one text deliberately references or reworks another — a modern story retelling a myth, an advertisement parodying a famous painting. It becomes an explicit topic in Year 8 because it's a genuinely useful analytical skill, and it rewards a habit — reading and watching widely — more directly than most other English topics.",
      },
      {
        q: "My child's writing is grammatically correct but feels flat. What's missing?",
        a: "Usually sentence variety and register control — the Year 8 Language strand content (embedded clauses, nominalisation, deliberate sentence patterning) exists precisely to give a writer more tools than the simple sentence structures that were sufficient in earlier years. Correct but flat writing is often a student who hasn't yet been shown these tools, not one who lacks ability.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-9-english",
    year: 9,
    yearLabel: "Year 9",
    subject: "English",
    stage: "lower",
    title: "WA Year 9 English: Every Topic, Explained Simply",
    description:
      "What Year 9 students cover in English in Western Australia — register and style, narrative voice, persuasive technique and comparing texts — in plain English, and where students most often get stuck.",
    heading: "WA Year 9 English: what your child covers this year",
    intro:
      "Year 9 English in Western Australia moves from analysing individual texts to comparing them, and from identifying technique to evaluating how well it works. Register and style become deliberate choices a student is expected to control in their own writing, not just recognise in someone else's. Persuasive analysis gets more rigorous — evaluating the quality of evidence and reasoning, not just spotting the techniques — and narrative voice is studied as a construction an author builds, not a neutral window onto events.",
    strands: [
      {
        name: "Language",
        blurb: "Register, tone and word choice become tools a student is expected to control deliberately.",
        topics: [
          {
            name: "Language, register and style",
            plain:
              "Adjusting register and style deliberately to suit different audiences, purposes and contexts, in both reading and writing.",
          },
          {
            name: "Modality and shades of meaning",
            plain:
              "Using modal verbs and adverbs (\"might\", \"must\", \"possibly\") to express degrees of certainty, obligation or possibility precisely.",
            sticking:
              "Treating all modal language as equally strong. \"It could be argued\" and \"it is certain\" make very different claims, and mixing them up under time pressure weakens an argument's precision.",
          },
          {
            name: "Sentence structure for effect",
            plain: "Manipulating sentence length and structure deliberately for rhetorical or narrative effect.",
          },
          {
            name: "Connotation and word choice",
            plain:
              "Distinguishing a word's literal meaning from its connotation, and choosing words deliberately for the associations they carry.",
          },
          {
            name: "Punctuation for clarity and effect",
            plain: "Using punctuation choices deliberately to control clarity, pacing and emphasis in writing.",
          },
        ],
      },
      {
        name: "Literature",
        blurb: "Texts compared against one another, and narrative voice examined as a deliberate construction.",
        topics: [
          {
            name: "Perspectives and representation",
            plain:
              "Analysing how a text represents particular groups or perspectives, and whose viewpoint is centred or left out.",
          },
          {
            name: "Narrative point of view and voice",
            plain:
              "Analysing how the choice of narrative point of view and voice shapes what a reader knows, trusts and feels.",
            sticking:
              "Treating a first-person narrator as automatically reliable. Recognising an unreliable or limited narrator, and explaining what that choice does for the story, is the actual analytical skill being assessed.",
          },
          {
            name: "Themes and how they develop",
            plain: "Tracing how a text's central themes develop and change across its length, not just naming them.",
          },
          {
            name: "Analysing literary style",
            plain: "Analysing the distinctive stylistic choices of a writer and their effect on a reader.",
          },
          {
            name: "Comparing texts",
            plain:
              "Comparing how two texts treat a similar theme, character type or technique, and explaining the significance of the differences.",
            sticking:
              "Writing two separate summaries side by side rather than a genuine comparison. A real comparison makes a point about the relationship between the texts — the mark is in the connective analysis, not the description of each text alone.",
          },
          {
            name: "Creating literary texts",
            plain: "Writing original literary texts with a deliberately controlled voice and stylistic choices.",
          },
        ],
      },
      {
        name: "Literacy",
        blurb: "Persuasive and evidence-based analysis, now assessed on quality rather than just identification.",
        topics: [
          {
            name: "Cohesion in extended texts",
            plain: "Maintaining cohesion and a clear line of argument across a longer, more extended piece of writing.",
          },
          {
            name: "Analysing persuasive techniques",
            plain:
              "Identifying persuasive techniques in texts such as advertisements, opinion pieces and speeches, and evaluating how effectively they're used.",
          },
          {
            name: "Evaluating evidence and reasoning",
            plain: "Assessing whether the evidence and reasoning in a text actually support the claims it makes.",
            sticking:
              "Accepting a confident tone as a substitute for actually checking the reasoning. This is the exact habit exam questions are designed to test, and it's a genuinely useful skill well beyond the English classroom.",
          },
          {
            name: "Creating persuasive and analytical texts",
            plain: "Writing original persuasive and analytical texts that use evidence and reasoning deliberately.",
          },
          {
            name: "Spoken and multimodal presentations",
            plain: "Delivering a more sustained spoken or multimodal presentation, building on Years 7 and 8.",
          },
        ],
      },
    ],
    assessment: [
      "Assessment is set by your child's school, not centrally. There is no external exam in Year 9.",
      "Expect comparative essays, persuasive writing, and analytical responses assessed on the quality of evidence used, not just its presence.",
      "Reporting is against the WA achievement standard for Year 9 English.",
    ],
    faqs: [
      {
        q: "Has WA Year 9 English changed recently?",
        a: ENGLISH_CURRICULUM_NOTE,
      },
      {
        q: "Why do comparative essays suddenly appear in Year 9?",
        a: "Comparing two texts requires holding both in mind at once and making a point about their relationship, which is a genuinely harder skill than analysing one text alone. It's introduced once single-text analysis is reasonably solid, and it's worth treating as a distinct skill to practise, not just a longer version of a normal essay.",
      },
      {
        q: "My child can spot persuasive techniques but their essays still feel thin. Why?",
        a: "Identifying a technique (\"this uses an emotive appeal\") is the easy half; evaluating how effectively it works on its intended audience, and why, is the half that actually carries marks in Year 9. This is a deliberate shift from earlier years, not a sign anything is being done wrong.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "year-10-english",
    year: 10,
    yearLabel: "Year 10",
    subject: "English",
    stage: "lower",
    title: "WA Year 10 English: Every Topic, Explained Simply",
    description:
      "What Year 10 students cover in English in Western Australia — rhetoric, critical media literacy, synthesising sources and sustained essay writing — in plain English, and why Year 10 shapes readiness for ATAR English.",
    heading: "WA Year 10 English: what your child covers this year",
    intro:
      "Year 10 English in Western Australia is the year writing is expected to sustain an argument across a genuinely extended piece, not just a few paragraphs, and the last year before English splits into ATAR and General pathways. Rhetoric and media literacy are examined critically rather than descriptively, several sources have to be synthesised into one coherent argument rather than addressed one at a time, and grammar and syntax become tools for control and precision rather than correctness for its own sake. How a student handles sustained, evidence-synthesising writing this year is one of the clearer signals for whether ATAR English will suit them.",
    strands: [
      {
        name: "Language",
        blurb: "Grammar and vocabulary treated as instruments of control, precision and identity, not just correctness.",
        topics: [
          {
            name: "Language, power and positioning",
            plain:
              "Analysing how language choices reflect and reinforce power relationships between speakers, writers and their audiences.",
          },
          {
            name: "The evolution and varieties of English",
            plain:
              "Examining how English varies across time, place and social context, and what those varieties reveal about identity and community.",
          },
          {
            name: "Grammar and syntax for control",
            plain:
              "Using grammatical and syntactic choices deliberately to control meaning, emphasis and tone in writing.",
          },
          {
            name: "Vocabulary, nuance and academic language",
            plain: "Selecting vocabulary precisely for nuance, particularly in formal and academic writing.",
          },
          {
            name: "Editing and proofreading",
            plain:
              "Editing a piece of writing systematically for clarity, precision and correctness, as a distinct stage from drafting.",
            sticking:
              "Treating editing as a final spelling-and-grammar check rather than a chance to cut, reorder and strengthen an argument. The strongest improvement to a piece of writing usually comes from structural editing, not proofreading.",
          },
        ],
      },
      {
        name: "Literature",
        blurb: "Texts read through the lens of context and values, with a genuinely critical reading position.",
        topics: [
          {
            name: "Context, values and reading positions",
            plain:
              "Analysing how the context a text was produced in, and the values it embeds, shape the reading positions available to different audiences.",
          },
          {
            name: "Interpreting literary texts",
            plain: "Constructing a sustained, evidence-based interpretation of a literary text.",
          },
          {
            name: "Comparative analysis of texts",
            plain: "Comparing texts at a more sophisticated level, focusing on how form and context shape meaning.",
          },
          {
            name: "Style, voice and experimentation",
            plain: "Analysing experimental or unconventional stylistic choices and what they achieve.",
          },
          {
            name: "Responding to literature",
            plain: "Constructing an extended, well-substantiated personal response to a literary text.",
          },
        ],
      },
      {
        name: "Literacy",
        blurb: "Multiple sources, synthesised into one sustained argument rather than treated one at a time.",
        topics: [
          {
            name: "Cohesion in complex texts",
            plain: "Maintaining a clear, cohesive line of argument across a long and structurally complex text.",
          },
          {
            name: "Analysing persuasion and rhetoric",
            plain:
              "Analysing rhetorical technique in depth — how an argument is constructed to be persuasive, not just which techniques appear in it.",
          },
          {
            name: "Critical media literacy",
            plain:
              "Critically evaluating how media texts construct and frame issues, including questions of reliability and bias.",
            sticking:
              "Equating \"has a bias\" with \"is wrong\". Every source has a perspective; the actual skill is identifying that perspective and factoring it into how the source is used as evidence, not dismissing the source outright.",
          },
          {
            name: "Synthesising multiple sources",
            plain:
              "Drawing together evidence and ideas from several sources into one coherent, original argument, rather than summarising each source in turn.",
            sticking:
              "The most common failure at this level: a \"synthesis\" that is really several source summaries placed next to each other. Genuine synthesis makes its own point and uses the sources to support that point, in an order the student chose, not the order the sources happened to be given.",
          },
          {
            name: "Crafting sustained essays",
            plain: "Planning and writing an extended essay that sustains one argument across multiple paragraphs.",
          },
          {
            name: "Spoken argument and debating",
            plain: "Constructing and delivering a spoken argument, responding to counterpoints in real time.",
          },
        ],
      },
    ],
    assessment: [
      "Assessment is set by your child's school, not centrally. There is no external exam in Year 10.",
      "Expect sustained essays, source-synthesis tasks, and formal spoken argument or debating assessment.",
      "Reporting is against the WA achievement standard for Year 10 English, the last year before English splits into ATAR and General pathways.",
    ],
    faqs: [
      {
        q: "Has WA Year 10 English changed recently?",
        a: ENGLISH_CURRICULUM_NOTE,
      },
      {
        q: "How does Year 10 English relate to choosing ATAR English for Year 11?",
        a: "Directly. The two skills that separate a comfortable ATAR English student from a struggling one — sustaining one argument across an extended essay, and synthesising several sources into original analysis rather than summarising them — are exactly what Year 10 introduces. A student who finds source synthesis genuinely difficult this year is worth watching closely before committing to ATAR English.",
      },
      {
        q: "My child writes long essays but the argument seems to wander. What's going wrong?",
        a: "Length and cohesion are different things. A wandering argument is usually a planning problem, not a writing problem — the fix is a clear plan stating the argument before drafting starts, not more editing after the fact. This is precisely the skill the Year 10 Literacy strand is built to develop.",
      },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-methods-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Methods",
    courseType: "ATAR",
    unitLabel: "Units 1 and 2",
    title: "WACE Mathematics Methods (Units 1 & 2): Course Guide",
    description:
      "What Year 11 Mathematics Methods covers in WA — functions, calculus foundations and probability — unit by unit, in plain English, for families deciding if this ATAR course is the right fit.",
    heading: "WACE Mathematics Methods, Year 11 (Units 1 and 2)",
    intro:
      "Mathematics Methods is the ATAR course most Year 11s who were comfortable with Year 10 Maths default toward, and Units 1 and 2 exist to test whether that comfort holds up. Functions are treated far more formally than in Year 10, the first real calculus content — the derivative, building from a limit rather than a formula to memorise — arrives in Unit 2, and probability is developed with genuine rigour. A student who finds Unit 1 functions and counting techniques straightforward is well placed for the calculus in Unit 2 and beyond; a student who's finding both a struggle is worth having an honest conversation with before Year 12.",
    strands: [
      {
        name: "Unit 1",
        blurb: "Functions, counting and probability get their formal foundations.",
        topics: [
          { name: "Combinations, nCr and Pascal's triangle", plain: "Counting the number of ways to choose or arrange items, using combinations and Pascal's triangle to organise the counting." },
          { name: "Language of events and sets", plain: "Using set notation and Venn diagrams to describe events and the relationships between them." },
          { name: "Fundamentals of probability", plain: "Calculating probabilities of events using the formal language and notation established in this unit." },
          { name: "Conditional probability and independence", plain: "Calculating the probability of one event given another has occurred, and testing whether two events are independent.", sticking: "Assuming two events are independent because they seem unrelated intuitively, rather than checking the actual condition mathematically. Intuition about independence is wrong often enough to be worth distrusting." },
          { name: "Lines and linear relationships", plain: "Working with the equation, gradient and intercepts of a line at a more formal, generalised level than Year 10." },
          { name: "Quadratic functions: graphs and features", plain: "Analysing quadratic functions through their graphs — turning point, axis of symmetry, intercepts — as a function, not just an equation to solve." },
          { name: "Solving quadratics: completing the square, formula and the discriminant", plain: "Solving quadratics by every available method, and using the discriminant to determine the number and nature of the solutions before solving." },
          { name: "Inverse proportion and hyperbolas", plain: "Graphing inverse proportion relationships and recognising their hyperbolic shape." },
          { name: "Power functions", plain: "Graphing and analysing functions of the form f(x) = x^n for different values of n." },
          { name: "Cubics and polynomials", plain: "Extending function analysis to cubic and higher-degree polynomials." },
          { name: "Circles and other relations", plain: "Graphing the equation of a circle and other relations that aren't functions in the strict sense." },
          { name: "Functions: concept, notation, domain and range", plain: "Formalising what a function actually is, using function notation properly, and determining domain and range.", sticking: "Treating function notation f(x) as multiplication rather than \"the output of f when the input is x\". This misreading, uncorrected, causes confusion through every function topic that follows." },
          { name: "Transformations of graphs", plain: "Predicting how a graph shifts, stretches or reflects based on changes to its equation." },
        ],
      },
      {
        name: "Unit 2",
        blurb: "Trigonometry extends, sequences arrive, and calculus formally begins.",
        topics: [
          { name: "Right-angled trigonometry and the unit circle", plain: "Extending trigonometry using the unit circle, connecting the ratios learned in Year 10 to angles beyond 90 degrees." },
          { name: "Sine and cosine rules; area and the ambiguous case", plain: "Solving non-right-angled triangles using the sine and cosine rules, including recognising when a problem has two valid solutions." },
          { name: "Radian measure; arc length, sectors and segments", plain: "Measuring angles in radians instead of degrees, and using radians to calculate arc length and sector area." },
          { name: "Indices, index laws, surds and scientific notation", plain: "Consolidating index laws and surd manipulation at ATAR-course fluency, beyond what Year 10 required." },
          { name: "Exponential functions: properties and graphs", plain: "Graphing and analysing exponential functions and their key features." },
          { name: "Modelling with exponentials and solving exponential equations", plain: "Using exponential functions to model real growth and decay situations, and solving equations involving them." },
          { name: "Arithmetic sequences", plain: "Identifying and working with sequences that increase or decrease by a constant amount." },
          { name: "Arithmetic series", plain: "Finding the sum of an arithmetic sequence using the series formula." },
          { name: "Geometric sequences", plain: "Identifying and working with sequences that multiply by a constant ratio." },
          { name: "Geometric series and applications", plain: "Finding the sum of a geometric sequence, including real applications like compound growth." },
          { name: "Average rate of change and the difference quotient", plain: "Calculating the average rate of change between two points, building the concept that calculus will formalise." },
          { name: "The derivative as a limit", plain: "Introducing the derivative as the limit of the difference quotient as the interval shrinks to zero.", guide: "what-is-a-derivative", sticking: "Treating the derivative as a formula to apply before understanding what it represents — an instantaneous rate of change, built from a limit. Students who learn the mechanical rules without this foundation struggle the moment a question asks them to interpret a derivative, not just compute one." },
          { name: "Computing derivatives: the power rule from first principles", plain: "Deriving the power rule for differentiation from the limit definition, rather than being given it as a fact." },
          { name: "The derivative as a function; differentiating polynomials", plain: "Treating the derivative itself as a function, and differentiating polynomial functions fluently." },
          { name: "Tangents and instantaneous rates of change", plain: "Using the derivative to find the gradient of a tangent line and interpret instantaneous rates of change in context." },
          { name: "Kinematics: position-time graphs and velocity", plain: "Applying derivatives to motion, connecting position, velocity and the gradient of a position-time graph." },
          { name: "Curve sketching and stationary points", plain: "Using the derivative to find stationary points and sketch the shape of a curve." },
          { name: "Optimisation problems", plain: "Using calculus to find the maximum or minimum value of a real-world quantity." },
          { name: "Anti-derivatives of polynomial functions", plain: "Reversing differentiation to find anti-derivatives of polynomial functions, previewing integration in Year 12." },
        ],
      },
    ],
    assessment: ATAR_Y11_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Is Year 10 performance a reliable guide to whether Methods is the right choice?", a: "A useful one, but not the only signal. The strongest predictor isn't the Year 10 grade itself but how a student handled algebraic manipulation and graphing specifically — Methods assumes both are close to automatic, since Unit 1 spends very little time re-teaching them before building functions on top." },
      { q: "How much does the calculus in Unit 2 actually matter for the rest of the course?", a: "A great deal — the derivative introduced here, from first principles, is the foundation for all of Unit 3 and 4 calculus. A student who gets through Unit 2 by memorising the power rule without understanding where it comes from tends to struggle when Year 12 calculus moves faster and assumes that foundation is solid." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-methods-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Methods",
    courseType: "ATAR",
    unitLabel: "Units 3 and 4",
    title: "WACE Mathematics Methods (Units 3 & 4): Course Guide",
    description:
      "What Year 12 Mathematics Methods covers in WA — calculus of exponential, logarithmic and trigonometric functions, integration, and statistical inference — unit by unit, in plain English.",
    heading: "WACE Mathematics Methods, Year 12 (Units 3 and 4)",
    intro:
      "Unit 3 and 4 Mathematics Methods is where the calculus foundations from Year 11 get applied to every function type the course covers — exponential, logarithmic, trigonometric — and integration arrives as the reverse process of differentiation. Statistics shifts from descriptive to inferential: confidence intervals ask a genuinely different kind of question than anything earlier in the course. This is also the year with an external exam, so fluency under time pressure matters as much as understanding — a student who can do every technique given unlimited time but not in an exam-paced sitting has a real, fixable gap.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Calculus extends to every function type the course covers, and integration arrives.",
        topics: [
          { name: "Derivative of exponential functions and the number e", plain: "Differentiating exponential functions, and understanding why the number e arises naturally in calculus." },
          { name: "Derivatives of trigonometric functions", plain: "Differentiating sine, cosine and related trigonometric functions." },
          { name: "The chain rule", plain: "Differentiating composite functions using the chain rule.", sticking: "Applying the chain rule mechanically without correctly identifying the \"outer\" and \"inner\" functions first. Misidentifying the composition is the single most common source of chain rule errors, not the differentiation itself." },
          { name: "The product and quotient rules", plain: "Differentiating products and quotients of functions using the product and quotient rules." },
          { name: "The second derivative: concavity and points of inflection", plain: "Using the second derivative to determine concavity and identify points of inflection." },
          { name: "Applications: curve sketching, optimisation and kinematics", plain: "Applying the full calculus toolkit to sketch curves, solve optimisation problems and analyse motion." },
          { name: "Anti-differentiation of standard functions", plain: "Extending anti-differentiation to exponential and trigonometric functions." },
          { name: "The definite integral and the fundamental theorem of calculus", plain: "Connecting the definite integral to area under a curve via the fundamental theorem of calculus.", sticking: "Treating the fundamental theorem as a computational shortcut without grasping that it connects two seemingly unrelated ideas — accumulated area and anti-differentiation. The connection is exactly what tends to get tested conceptually, not just procedurally." },
          { name: "Applications of integration: area", plain: "Using definite integrals to calculate the area between curves." },
          { name: "Discrete random variables and probability distributions", plain: "Formalising discrete random variables and their probability distributions." },
          { name: "The Bernoulli distribution", plain: "Modelling single trials with two outcomes using the Bernoulli distribution." },
          { name: "The binomial distribution", plain: "Modelling repeated independent trials using the binomial distribution." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Logarithms, continuous distributions and statistical inference bring the course together.",
        topics: [
          { name: "Logarithms and logarithm laws", plain: "Working fluently with logarithms and their laws, including as the inverse of exponential functions." },
          { name: "Calculus of logarithmic and exponential functions", plain: "Differentiating and integrating logarithmic functions and extending exponential calculus." },
          { name: "Exponential growth and decay with calculus", plain: "Using calculus to model and analyse exponential growth and decay situations rigorously." },
          { name: "Continuous random variables and probability density functions", plain: "Extending probability distributions to continuous variables using probability density functions." },
          { name: "The normal distribution", plain: "Using the normal distribution to model continuous data and calculate probabilities." },
          { name: "Random sampling and the distribution of sample proportions", plain: "Understanding how sample proportions vary from sample to sample, setting up statistical inference." },
          { name: "Confidence intervals for a population proportion", plain: "Constructing and interpreting a confidence interval for an unknown population proportion.", sticking: "Misinterpreting what a confidence interval actually claims — it's not \"a 95% chance the true value is in this range\", it's a claim about the long-run reliability of the method used to construct it. This distinction is genuinely subtle and is exactly what separates a strong Unit 4 statistics answer from a mechanically correct but conceptually wrong one." },
        ],
      },
    ],
    assessment: ATAR_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "What's the single biggest jump from Unit 2 to Unit 3?", a: "Volume and speed. Unit 3 doesn't introduce many genuinely new ideas beyond the chain, product and quotient rules — it applies Year 11's calculus foundations to more function types, faster, and under exam conditions. A student who understood Year 11 deeply but was slow tends to find Unit 3 the year that forces speed to catch up with understanding." },
      { q: "Why does confidence interval interpretation get so much attention?", a: "Because it's the one place in the course where a mechanically correct calculation can still earn a wrong mark, if the interpretation sentence misstates what the interval means. It's a small piece of the course by content volume but a disproportionately common source of lost marks in the external exam." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-specialist-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Specialist",
    courseType: "ATAR",
    unitLabel: "Units 3 and 4",
    title: "WACE Mathematics Specialist (Units 3 & 4): Course Guide",
    description:
      "What Year 12 Mathematics Specialist covers in WA — complex numbers, vectors, advanced integration and differential equations — unit by unit, in plain English, for families weighing this course alongside Methods.",
    heading: "WACE Mathematics Specialist, Year 12 (Units 3 and 4)",
    intro:
      "Mathematics Specialist is only ever studied alongside Mathematics Methods, never alone, and Units 3 and 4 make that dependency obvious — nearly every topic here extends a Methods idea into territory Methods doesn't go. Complex numbers, three-dimensional vectors, differential equations and integration techniques well beyond Methods' scope make up the bulk of the course. This is the course for students planning engineering, physical science or actuarial-adjacent degrees, and it rewards students who found Methods' calculus genuinely satisfying rather than merely manageable.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Complex numbers and three-dimensional vectors extend the number system and geometry Methods works with.",
        topics: [
          { name: "Complex Numbers in Polar Form", plain: "Representing complex numbers in polar form and converting between polar and Cartesian representations." },
          { name: "Products, Quotients and De Moivre's Theorem", plain: "Multiplying and dividing complex numbers in polar form, and using De Moivre's theorem for powers." },
          { name: "Powers and Roots of Complex Numbers", plain: "Finding powers and roots of complex numbers using De Moivre's theorem." },
          { name: "Curves and Regions in the Complex Plane", plain: "Sketching curves and regions defined by equations and inequalities in the complex plane." },
          { name: "Composition and Inverse Functions", plain: "Composing functions and finding inverse functions, extending Methods' treatment of functions." },
          { name: "Sketching Reciprocal and Related Functions", plain: "Sketching reciprocal functions and related transformations by analysing the original function's features." },
          { name: "Rational Functions and Asymptotes", plain: "Sketching rational functions, identifying asymptotes and discontinuities." },
          { name: "Vectors in Three Dimensions and the Scalar Product", plain: "Extending vector work into three dimensions and using the scalar (dot) product." },
          { name: "The Vector Product, Lines and Planes", plain: "Using the vector (cross) product, and describing lines and planes in three dimensions using vector equations." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Integration techniques and differential equations extend Methods' calculus considerably further.",
        topics: [
          { name: "Integration by Substitution", plain: "Using substitution to integrate functions that don't fit standard integration rules directly." },
          { name: "Integration Using Partial Fractions and Trigonometric Identities", plain: "Using partial fractions and trigonometric identities to integrate more complex expressions." },
          { name: "Applications of Integration: Area and Volume", plain: "Using integration to calculate areas and volumes of revolution, beyond what Methods covers." },
          { name: "Rates of Change and Related Rates", plain: "Solving related-rates problems where two or more quantities change with respect to time simultaneously.", sticking: "Trying to solve a related-rates problem without first writing an equation connecting the two quantities before differentiating. Differentiating too early, before the relationship is properly set up, is the most common way this topic goes wrong." },
          { name: "Differential Equations: Separation of Variables", plain: "Solving differential equations by separating variables, a genuinely new technique beyond anything in Methods." },
          { name: "Modelling with Differential Equations", plain: "Using differential equations to model real growth, decay and rate-based situations." },
          { name: "Sample Means and the Distribution of Sample Means", plain: "Extending statistical inference to sample means rather than sample proportions." },
          { name: "Confidence Intervals for a Population Mean", plain: "Constructing and interpreting confidence intervals for an unknown population mean." },
        ],
      },
    ],
    assessment: ATAR_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why is there no Year 11 Specialist page here?", a: "It's a genuine gap in our current content, not a claim that Year 11 Specialist doesn't exist — it does (Units 1 and 2), and is studied alongside Methods Units 1 and 2 in Year 11. We just haven't written that page yet; it's next on the list rather than intentionally skipped." },
      { q: "Can a student take Specialist without also taking Methods?", a: "No — Specialist is designed to be studied alongside Methods, not instead of it, and its content assumes Methods' calculus and functions work is being covered in parallel. It's not a standalone alternative to Methods; it's an addition for students who want more mathematical depth." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-specialist-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Specialist",
    courseType: "ATAR",
    unitLabel: "Units 1 and 2",
    title: "WA Mathematics Specialist Year 11: Every Topic, Explained Simply",
    description: "",
    heading: "WACE Mathematics Specialist, Year 11 (Units 1 and 2)",
    intro: "",
    strands: [],
    assessment: [],
    faqs: [],
    published: false,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-applications-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Applications",
    courseType: "ATAR",
    unitLabel: "Units 1 and 2",
    title: "WACE Mathematics Applications (Units 1 & 2): Course Guide",
    description:
      "What Year 11 Mathematics Applications covers in WA — matrices, measurement, statistics and trigonometry — unit by unit, in plain English, for families weighing this ATAR course against Methods.",
    heading: "WACE Mathematics Applications, Year 11 (Units 1 and 2)",
    intro:
      "Mathematics Applications is the ATAR maths course built for genuine real-world application rather than the abstract function-and-calculus track Methods follows, and it's a legitimate, rigorous ATAR choice in its own right — not a fallback. Unit 1 covers everyday financial and geometric maths at real depth, including a first look at matrices, which nothing in Year 10 previews. Unit 2 moves into full statistical investigation and non-right-angled trigonometry. It suits students who want maths to stay connected to concrete, calculable situations rather than pure abstraction.",
    strands: [
      {
        name: "Unit 1",
        blurb: "Everyday financial maths and matrices, treated with real depth.",
        topics: [
          { name: "Percentages and Percentage Change", plain: "Calculating percentages and percentage change fluently in real financial and everyday contexts." },
          { name: "Rates, Ratios and Unit Cost", plain: "Comparing quantities using rates, ratios and unit cost to make informed decisions." },
          { name: "Earning Money", plain: "Calculating income from wages, salaries and other earning arrangements." },
          { name: "Taxation, Deductions and Budgeting", plain: "Calculating tax and deductions, and applying budgeting principles to real financial planning." },
          { name: "Substitution, Formulas and Linear Equations", plain: "Substituting into formulas and solving linear equations in applied, real-world contexts." },
          { name: "Introduction to Matrices", plain: "Introducing matrices as a way to organise and represent data — genuinely new content, not previewed in Year 10.", sticking: "Treating matrix notation as just a grid of numbers without understanding what operations on it actually mean. The notation is unfamiliar enough that students often can perform the arithmetic correctly while having no sense of what a matrix represents." },
          { name: "Matrix Arithmetic", plain: "Adding, subtracting and multiplying matrices, and understanding why matrix multiplication works the way it does." },
          { name: "Applications of Matrices", plain: "Applying matrices to real problems, such as representing and solving systems of relationships." },
          { name: "Units, Perimeter and Area", plain: "Applying unit conversions and area calculations to real practical measurement problems." },
          { name: "Surface Area and Volume", plain: "Calculating surface area and volume of real objects, extending Year 10 formulas to applied contexts." },
          { name: "Similarity and Scale", plain: "Applying similarity and scale factors to real situations like maps, models and enlargements." },
          { name: "Pythagoras' Theorem and Applications", plain: "Applying Pythagoras' theorem to genuinely applied, real-world measurement problems." },
        ],
      },
      {
        name: "Unit 2",
        blurb: "Statistics becomes a full investigation process, and trigonometry extends beyond right-angled triangles.",
        topics: [
          { name: "The Statistical Investigation Process and Types of Data", plain: "Working through the full statistical investigation cycle and classifying different types of data correctly." },
          { name: "Displaying Univariate Data", plain: "Choosing and constructing appropriate displays for single-variable data." },
          { name: "Measures of Centre and Spread", plain: "Calculating and interpreting measures of centre and spread for a data set." },
          { name: "Boxplots, Outliers and Comparing Distributions", plain: "Constructing boxplots, identifying outliers, and comparing the shape of different distributions.", sticking: "Flagging any unusually large or small value as an outlier without applying the actual outlier rule (typically 1.5 times the interquartile range beyond the quartiles). \"It looks unusual\" isn't the criterion the course assesses." },
          { name: "Right-Angled Trigonometry", plain: "Consolidating right-angled trigonometry at ATAR-course fluency." },
          { name: "Angles of Elevation, Depression and Bearings", plain: "Applying trigonometry to real navigation and surveying problems using bearings and angles of elevation and depression." },
          { name: "The Sine Rule", plain: "Solving non-right-angled triangles using the sine rule, including the ambiguous case." },
          { name: "The Cosine Rule", plain: "Solving non-right-angled triangles using the cosine rule." },
          { name: "Area of a Triangle and Applications", plain: "Calculating the area of a triangle using trigonometry, without needing the height directly." },
          { name: "Linear Graphs: Gradient and Intercept", plain: "Working with linear graphs at an applied level, focused on real interpretation of gradient and intercept." },
          { name: "Equation of a Line and Linear Modelling", plain: "Finding the equation of a line and using linear models to represent real relationships." },
          { name: "Simultaneous Equations", plain: "Solving simultaneous linear equations in applied contexts." },
        ],
      },
    ],
    assessment: ATAR_Y11_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Is Applications a lesser ATAR maths course than Methods?", a: "No — it's a different, equally legitimate ATAR course with its own scaling and university relevance, particularly for degrees in business, health sciences and applied fields. The right comparison isn't \"harder versus easier\", it's whether a student prefers concrete, real-world calculation (Applications) or abstract functions and calculus (Methods)." },
      { q: "Why do matrices suddenly appear with no lead-in from Year 10?", a: "Because they genuinely are new — nothing in the WA Year 7-10 curriculum previews matrix notation or arithmetic. It's worth treating as a fresh topic requiring real practice time, not something a student should expect to pick up quickly just because the rest of Unit 1 feels familiar." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-applications-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Applications",
    courseType: "ATAR",
    unitLabel: "Units 3 and 4",
    title: "WACE Mathematics Applications (Units 3 & 4): Course Guide",
    description:
      "What Year 12 Mathematics Applications covers in WA — bivariate statistics, financial modelling and network analysis — unit by unit, in plain English.",
    heading: "WACE Mathematics Applications, Year 12 (Units 3 and 4)",
    intro:
      "Unit 3 and 4 Mathematics Applications moves from single-variable statistics into genuinely applied territory: bivariate analysis and regression, recurrence relations for growth and decay, and network and graph theory — the mathematics behind scheduling, logistics and shortest-path problems. Unit 4 shifts into finance and networks specifically, including compound interest, loan calculations and critical path analysis, all directly applicable outside the classroom. It's the most visibly \"useful\" maths course on offer, and that's a genuine strength, not a consolation prize.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Bivariate statistics, sequences and the first look at networks.",
        topics: [
          { name: "Bivariate Data: Scatterplots and Correlation", plain: "Displaying and describing the relationship between two numerical variables." },
          { name: "Least-Squares Regression", plain: "Fitting a least-squares regression line to bivariate data and using it for prediction." },
          { name: "Using Regression and Residual Analysis", plain: "Analysing residuals to assess how well a regression model actually fits the data.", sticking: "Assuming a high correlation coefficient automatically means the linear model is a good fit. A residual plot showing a clear pattern reveals a non-linear relationship even when the correlation looks strong — this is the actual test the course wants a student to apply." },
          { name: "Arithmetic Sequences and Recurrence Relations", plain: "Representing arithmetic sequences using recurrence relations, connecting to real stepwise growth." },
          { name: "Geometric Sequences", plain: "Working with geometric sequences and their recurrence relations." },
          { name: "Geometric Growth and Decay", plain: "Modelling real growth and decay situations using geometric sequences." },
          { name: "First-Order Linear Recurrence Relations", plain: "Working with recurrence relations that combine both additive and multiplicative change." },
          { name: "Graphs and Networks: Terminology", plain: "Learning the formal terminology of graph and network theory — vertices, edges, degree." },
          { name: "Adjacency Matrices and Traversals", plain: "Representing networks using adjacency matrices and analysing paths through them." },
          { name: "Planar Graphs, Euler's Formula and Trees", plain: "Working with planar graphs, Euler's formula, and tree structures within network theory." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Time series, finance and network optimisation — the most applied content in the course.",
        topics: [
          { name: "Time Series: Trends and Seasonality", plain: "Analysing time series data for trends and seasonal patterns." },
          { name: "Smoothing and Seasonal Indices", plain: "Using smoothing techniques and seasonal indices to analyse and adjust time series data." },
          { name: "Compound Interest and Future Value", plain: "Calculating compound interest and future value for real investment and savings scenarios." },
          { name: "Reducing-Balance Loans and Amortisation", plain: "Calculating loan repayments and amortisation schedules for reducing-balance loans." },
          { name: "Annuities and Regular Investments", plain: "Calculating the future and present value of annuities and regular investments." },
          { name: "Shortest Path", plain: "Finding the shortest path through a network using systematic algorithms." },
          { name: "Minimal Spanning Trees", plain: "Finding the minimal spanning tree of a network — the cheapest way to connect every point." },
          { name: "Critical Path Analysis", plain: "Using critical path analysis to schedule a project and identify which tasks control its minimum completion time.", sticking: "Assuming every task on a long project needs monitoring equally. The critical path method exists precisely to identify the small subset of tasks — the critical ones — where a delay genuinely delays the whole project, and that's the actual point of the technique." },
        ],
      },
    ],
    assessment: ATAR_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "How is Unit 3 and 4 Applications different in character from Unit 1 and 2?", a: "Unit 1 and 2 are built around everyday calculation — money, measurement, trigonometry. Unit 3 and 4 shift toward genuinely modern applied mathematics — network and graph theory in particular is closer to how logistics and scheduling problems are actually solved in industry than anything earlier in the WA maths sequence." },
      { q: "Are the finance topics in Unit 4 just an extension of Unit 1's money maths?", a: "They build on the same foundation but go considerably further — compound interest, amortisation and annuities involve genuine formulas and multi-step calculations, not just percentage arithmetic. A student who found Unit 1's financial maths easy shouldn't assume Unit 4's finance content will be equally straightforward." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-essential-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Essential",
    courseType: "General",
    unitLabel: "Units 1 and 2",
    title: "WACE Mathematics Essential (Units 1 & 2): Course Guide",
    description:
      "What Year 11 Mathematics Essential covers in WA — practical calculation, measurement and data — unit by unit, in plain English, for families weighing this General maths pathway.",
    heading: "WACE Mathematics Essential, Year 11 (Units 1 and 2)",
    intro:
      "Mathematics Essential is a General course, not an ATAR one — it doesn't contribute to the ATAR, but it's a legitimate, useful pathway for students whose plans after school don't depend on a maths-heavy university entry score. Units 1 and 2 focus on calculation students will genuinely use: estimation, percentages and rates in real contexts, practical measurement, and reading formulas and graphs rather than manipulating them abstractly. It suits students who want maths that stays close to daily life and the workplace.",
    strands: [
      {
        name: "Unit 1",
        blurb: "Calculation and measurement, grounded in real, everyday use.",
        topics: [
          { name: "Basic Calculations, Estimation and Order of Operations", plain: "Building fluency and confidence with core calculation, including sensible estimation." },
          { name: "Percentages and Rates in Context", plain: "Applying percentages and rates to real, everyday situations rather than abstract exercises." },
          { name: "Measurement: Length, Area, Volume and Units", plain: "Applying measurement and unit conversion to genuinely practical situations." },
          { name: "Formulas and Reading Graphs", plain: "Substituting into formulas and reading information directly off graphs used in real contexts.", sticking: "Reading a graph's axis labels and scale too quickly. Misreading what a graph's axes actually represent, before any calculation starts, is the single most common source of error at this level — worth checking every time as a first step." },
        ],
      },
      {
        name: "Unit 2",
        blurb: "Data and further percentage-based financial calculation.",
        topics: [
          { name: "Representing and Comparing Data", plain: "Constructing and comparing simple data displays for real, everyday data sets." },
          { name: "Working with Percentages: Discount, GST and Profit", plain: "Applying percentage calculations to discounts, GST and profit in real shopping and business contexts." },
          { name: "Rates and Ratios", plain: "Applying rates and ratios to real practical comparison problems." },
          { name: "Time and Motion", plain: "Applying calculation to real time, distance and motion problems, such as travel planning." },
        ],
      },
    ],
    assessment: GENERAL_Y11_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Does choosing Mathematics Essential close off any future options?", a: "It doesn't contribute to the ATAR, so if a student later decides they need an ATAR score, they'd need to have also completed an ATAR course. It's the right choice for a student confident their post-school plans don't require an ATAR-contributing maths result, not a default to fall back into without that being deliberate." },
      { q: "Is Essential just an easier version of Applications?", a: "Not quite — it's a differently purposed course, focused on functional, everyday numeracy rather than the more abstract statistical and geometric reasoning Applications builds toward. A student who finds Applications genuinely too fast-paced may do better with Essential's pace and practical focus, rather than thinking of it purely as a difficulty downgrade." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-essential-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Essential",
    courseType: "General",
    unitLabel: "Units 3 and 4",
    title: "WACE Mathematics Essential (Units 3 & 4): Course Guide",
    description:
      "What Year 12 Mathematics Essential covers in WA — practical measurement, probability, earth geometry and loans — unit by unit, in plain English.",
    heading: "WACE Mathematics Essential, Year 12 (Units 3 and 4)",
    intro:
      "Unit 3 and 4 Mathematics Essential stays firmly practical: measurement and estimation for real trade and design contexts, reading media graphs and tables critically, and — in Unit 4 — earth geometry, time zones and loan calculations that connect directly to travel and personal finance. It's a genuinely useful course for day-to-day adult numeracy, and it completes the WACE without requiring the abstraction of an ATAR maths course.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Measurement, scale and data, applied to real practical and media contexts.",
        topics: [
          { name: "Measurement and Estimation in Practical Contexts", plain: "Applying measurement and estimation skills to genuinely practical, trade-relevant contexts." },
          { name: "Scales, Plans and Models", plain: "Reading and interpreting scaled plans and models, and converting between scale and real size." },
          { name: "Graphs and Tables in the Media", plain: "Critically reading graphs and tables as they actually appear in news and media reporting.", sticking: "Accepting a media graph's visual impression at face value without checking the axis scale. A truncated y-axis can make a small change look dramatic, and this course explicitly tests whether a student notices." },
          { name: "Data Collection and the Statistical Process", plain: "Working through a simplified, practically-focused statistical investigation process." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Earth geometry, time and personal finance round out the course.",
        topics: [
          { name: "Probability and Relative Frequency", plain: "Estimating probability using relative frequency from real, observed data." },
          { name: "Earth Geometry: Latitude and Longitude", plain: "Using latitude and longitude to describe location and calculate distances on Earth." },
          { name: "Time Zones and Travel", plain: "Calculating time differences and travel times across time zones, genuinely relevant for a WA-based student." },
          { name: "Loans, Credit and Compound Interest", plain: "Calculating the real cost of loans and credit using compound interest, directly applicable to personal finance." },
        ],
      },
    ],
    assessment: GENERAL_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why does earth geometry and time zones appear in a maths course?", a: "It's genuinely useful applied geometry — calculating distance and time difference from latitude, longitude and time zone data is a real-world skill, and it fits Essential's consistent focus on practical numeracy over abstraction." },
      { q: "Is the loans and credit content actually useful, or just exam content?", a: "It's about as directly useful as school maths gets — understanding what compound interest actually does to a loan balance over time is a genuinely protective piece of financial literacy, independent of whatever mark it earns." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-foundation-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Foundation",
    courseType: "Foundation",
    unitLabel: "Units 1 and 2",
    title: "WACE Mathematics Foundation (Units 1 & 2): Course Guide",
    description:
      "What Year 11 Mathematics Foundation covers in WA — whole numbers, money, measurement and time — unit by unit, in plain English, for families whose child hasn't yet met the Year 10 numeracy standard.",
    heading: "WACE Mathematics Foundation, Year 11 (Units 1 and 2)",
    intro:
      "Mathematics Foundation exists for students who haven't yet met the Year 10 numeracy achievement standard, and it's built entirely around functional numeracy for daily life — whole number operations, handling money confidently, and measurement and time in contexts a student will genuinely encounter after school. It doesn't contribute to the ATAR and isn't meant to; its purpose is making sure a student leaves school able to manage everyday numeracy demands confidently, which is a real and worthwhile goal in its own right.",
    strands: [
      {
        name: "Unit 1",
        blurb: "Whole numbers and money, at a genuinely functional level.",
        topics: [
          { name: "Whole Numbers, Place Value and the Four Operations", plain: "Building confidence and fluency with whole number place value and the four operations." },
          { name: "Money: Counting, Change and Budgeting Basics", plain: "Building practical confidence handling money, giving and checking change, and basic budgeting." },
          { name: "Length, Mass and Capacity", plain: "Measuring and comparing length, mass and capacity using everyday units." },
          { name: "Time and the Calendar", plain: "Reading time and calendars confidently and applying this to everyday planning." },
        ],
      },
      {
        name: "Unit 2",
        blurb: "Fractions, percentages and simple data, kept close to daily application.",
        topics: [
          { name: "Fractions, Percentages and Simple Data", plain: "Working with straightforward fractions and percentages, and reading simple data displays." },
        ],
      },
    ],
    assessment: foundationAssessment("Unit 1 and Unit 2"),
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "What does completing Foundation actually achieve?", a: "It contributes toward the WACE and, most importantly, toward meeting the numeracy standard the WACE requires — a student who doesn't meet that standard through NAPLAN can meet it through the OLNA or through demonstrated achievement in this course. It's a genuine, necessary pathway, not a lesser one." },
      { q: "Is Unit 2 really only one listed topic — is that accurate?", a: "That reflects what's in our current source data specifically, not necessarily the complete official unit content — this page may understate Unit 2's actual scope. Treat this as a partial picture and check the SCSA syllabus directly for the full unit content." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "mathematics-foundation-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Maths",
    stage: "upper",
    courseName: "Mathematics Foundation",
    courseType: "Foundation",
    unitLabel: "Units 3 and 4",
    title: "WACE Mathematics Foundation (Units 3 & 4): Course Guide",
    description:
      "What Year 12 Mathematics Foundation covers in WA — money, measurement, timetables and workplace numeracy — unit by unit, in plain English.",
    heading: "WACE Mathematics Foundation, Year 12 (Units 3 and 4)",
    intro:
      "Unit 3 and 4 Mathematics Foundation continues the functional-numeracy focus of Units 1 and 2, extending into wages and shopping, everyday measurement tasks, and reading tables, graphs and timetables confidently — finishing with numeracy skills specifically framed around the workplace. It's designed to leave a student genuinely equipped for the numeracy demands of everyday adult and working life.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Money and measurement, extended toward independent adult life.",
        topics: [
          { name: "Working with Money: Wages, Shopping and Saving", plain: "Applying numeracy confidently to wages, shopping decisions and saving." },
          { name: "Measurement for Everyday Tasks", plain: "Applying measurement skills to genuinely everyday practical tasks." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Reading real information sources, with an explicit workplace focus.",
        topics: [
          { name: "Reading Tables, Graphs and Timetables", plain: "Confidently reading and using tables, graphs and timetables encountered in daily life." },
          { name: "Numeracy in the Workplace", plain: "Applying numeracy skills directly to workplace situations a student is likely to encounter after school." },
        ],
      },
    ],
    assessment: foundationAssessment("Unit 3 and Unit 4"),
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why does the final unit focus specifically on the workplace?", a: "Because Foundation's whole purpose is functional numeracy for life after school, and for most students in this course that means starting work relatively soon after finishing Year 12 — so the final unit deliberately targets that transition directly, rather than more abstract content that wouldn't serve the same purpose." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "biology-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Science",
    stage: "upper",
    courseName: "Biology",
    courseType: "ATAR",
    unitLabel: "Unit 1",
    title: "WACE Biology (Unit 1): Course Guide",
    description:
      "What Year 11 Biology covers in WA — classification, ecosystems, energy flow and human impact — unit by unit, in plain English. Currently covers Unit 1 only; Unit 2 isn't yet in our content.",
    heading: "WACE Biology, Year 11 (Unit 1)",
    intro:
      "Biology ATAR opens by zooming out to the whole-ecosystem scale before it zooms in — Unit 1 is about how living things are classified, how energy and matter move through an ecosystem, and how populations and communities change over time. It's a genuinely different starting point from Human Biology, which goes straight to the human body — Biology's Unit 1 is closer to environmental science, and suits a student who finds systems and field-based thinking more engaging than physiology specifically. Note: this page currently covers Unit 1 only — Unit 2 content isn't yet in our dataset, so treat this as a partial picture of the full Year 11 course.",
    strands: [
      {
        name: "Unit 1",
        blurb: "Classification, ecosystems, energy flow and human impact.",
        topics: [
          { name: "Biodiversity and Classification", plain: "Understanding biodiversity at different scales and how it's used to classify living things." },
          { name: "Naming and Grouping Organisms", plain: "Using taxonomic classification and binomial nomenclature to name and group organisms." },
          { name: "Sampling and Measuring Biodiversity", plain: "Using field sampling techniques to measure and estimate biodiversity in a real ecosystem." },
          { name: "Ecosystem Components and Habitats", plain: "Describing the biotic and abiotic components of an ecosystem and how they define a habitat." },
          { name: "Energy Flow: Food Chains and Trophic Levels", plain: "Tracking energy flow through an ecosystem using food chains and trophic levels." },
          { name: "Food Webs, Ecological Pyramids and Productivity", plain: "Analysing food webs and ecological pyramids to understand productivity within an ecosystem.", sticking: "Assuming energy transfers efficiently between trophic levels. Only a small fraction of energy passes to the next level — this inefficiency is precisely why food chains rarely extend beyond four or five levels, and it's a common gap in otherwise solid answers." },
          { name: "Cycling of Matter", plain: "Explaining how matter, unlike energy, cycles repeatedly through an ecosystem rather than being lost." },
          { name: "Population Dynamics and Carrying Capacity", plain: "Analysing how populations grow and are limited by a habitat's carrying capacity." },
          { name: "Interactions Between Organisms", plain: "Classifying the different types of interactions between organisms within a community — competition, predation, symbiosis." },
          { name: "Ecological Succession", plain: "Explaining how an ecosystem changes over time through the stages of ecological succession." },
          { name: "Human Impact, Conservation and Measuring Change", plain: "Evaluating human impact on ecosystems and the methods used to measure and manage that change." },
        ],
      },
    ],
    assessment: ATAR_Y11_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why does this page only cover Unit 1?", a: "It's a genuine gap in our current content, not a claim that Unit 2 doesn't exist. Unit 2 (cells, genetics and reproduction, typically) is part of the real Year 11 Biology course — we just haven't written that portion yet." },
      { q: "How is Biology different from Human Biology?", a: "They're two separate WACE courses, not the same course under different names. Biology (this course) is broader ecosystem and organism-level biology; Human Biology focuses specifically on human body systems and genetics. A student can take either, both, or neither — they don't have to be taken as a pair the way Methods and Specialist do." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "biology-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Science",
    stage: "upper",
    courseName: "Biology",
    courseType: "ATAR",
    unitLabel: "Units 3 and 4",
    title: "WA Biology Year 12: Every Topic, Explained Simply",
    description: "",
    heading: "WACE Biology, Year 12 (Units 3 and 4)",
    intro: "",
    strands: [],
    assessment: [],
    faqs: [],
    published: false,
    lastModified: "2026-08-09",
  },

  {
    slug: "human-biology-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Science",
    stage: "upper",
    courseName: "Human Biology",
    courseType: "ATAR",
    unitLabel: "Units 1 and 2",
    title: "WA Human Biology Year 11: Every Topic, Explained Simply",
    description: "",
    heading: "WACE Human Biology, Year 11 (Units 1 and 2)",
    intro: "",
    strands: [],
    assessment: [],
    faqs: [],
    published: false,
    lastModified: "2026-08-09",
  },

  {
    slug: "human-biology-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Science",
    stage: "upper",
    courseName: "Human Biology",
    courseType: "ATAR",
    unitLabel: "Units 3 and 4",
    title: "WACE Human Biology (Units 3 & 4): Course Guide",
    description:
      "What Year 12 Human Biology covers in WA — the nervous and endocrine systems, homeostasis, immunity, genetics and evolution — unit by unit, in plain English.",
    heading: "WACE Human Biology, Year 12 (Units 3 and 4)",
    intro:
      "Unit 3 and 4 Human Biology is where the course earns its reputation as content-heavy: Unit 3 covers how the nervous and endocrine systems coordinate the body and keep it in balance through homeostasis, plus how the immune system defends it. Unit 4 shifts to genetics, biotechnology and human evolution — DNA and gene expression, the lab techniques used to study them, and the evidence for how humans evolved. It's a genuinely content-dense course, and students who keep up with the volume week to week fare far better than those who try to catch up before the exam.",
    strands: [
      {
        name: "Unit 3",
        blurb: "How the body coordinates itself and defends itself, at real physiological depth.",
        topics: [
          { name: "Neurons and Nerve Impulse Transmission", plain: "Explaining how neurons transmit nerve impulses electrically and chemically." },
          { name: "The Central and Peripheral Nervous Systems", plain: "Describing the structure and function of the central and peripheral nervous systems." },
          { name: "The Brain and Reflex Arcs", plain: "Describing key brain regions and how reflex arcs allow rapid, automatic responses." },
          { name: "The Endocrine System and Hormone Action", plain: "Explaining how hormones are released and act on target tissues throughout the body." },
          { name: "Coordination of Nervous and Endocrine Control", plain: "Comparing how the nervous and endocrine systems coordinate body functions differently and together." },
          { name: "Homeostasis and Feedback Mechanisms", plain: "Explaining homeostasis through negative feedback mechanisms that keep the body's internal environment stable.", sticking: "Describing a feedback mechanism's direction backwards — confusing what triggers a corrective response with the response itself. Being precise about the sequence (stimulus, detection, response, correction) is what separates a strong homeostasis answer from a vague one." },
          { name: "Thermoregulation", plain: "Applying homeostatic principles specifically to how the body regulates its temperature." },
          { name: "Regulation of Blood Glucose", plain: "Explaining how insulin and glucagon regulate blood glucose levels." },
          { name: "Regulation of Respiratory Gases and Blood pH", plain: "Explaining how the body regulates blood gas levels and pH." },
          { name: "Osmoregulation and the Kidney", plain: "Explaining how the kidney regulates water and solute balance in the body." },
          { name: "Pathogens, Transmission and Non-Specific Defence", plain: "Classifying pathogens and describing the body's non-specific (innate) defences against them." },
          { name: "Specific Immunity, Immunisation and Treatment", plain: "Explaining the specific (adaptive) immune response and how immunisation works with it." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Genetics, biotechnology and the evidence for human evolution.",
        topics: [
          { name: "DNA Structure and Gene Expression", plain: "Explaining the structure of DNA and how genes are expressed as proteins." },
          { name: "Mutations and Sources of Variation", plain: "Describing how mutations and other sources create genetic variation within a population." },
          { name: "Biotechnology: PCR and Gel Electrophoresis", plain: "Explaining how PCR and gel electrophoresis are used to amplify and analyse DNA." },
          { name: "Bioinformatics and Genome Analysis", plain: "Using bioinformatics tools and concepts to analyse genome data." },
          { name: "Comparative Analysis: Biochemistry and Anatomy", plain: "Using biochemical and anatomical comparisons as evidence of evolutionary relationships between species." },
          { name: "Population Genetics and Evolutionary Mechanisms", plain: "Explaining how allele frequencies change in a population through evolutionary mechanisms." },
          { name: "Evidence for Evolution: Fossils and Dating Techniques", plain: "Using fossil evidence and dating techniques to support the evidence for evolution." },
          { name: "Hominin Evolution: Locomotion, Features and Tool Culture", plain: "Tracing hominin evolution through changes in locomotion, physical features and tool use.", sticking: "Treating human evolution as a straight line from an ancestor species to modern humans. The real fossil record shows multiple hominin species existing at overlapping times, and questions that test genuine understanding usually probe this branching picture, not a simplified single-line version." },
          { name: "Contemporary Human Variation and Dispersal", plain: "Explaining patterns of contemporary human variation in terms of historical migration and dispersal." },
        ],
      },
    ],
    assessment: ATAR_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why is there no Year 11 Human Biology page here?", a: "It's a genuine gap in our current content, not a claim Year 11 Human Biology doesn't exist — it does (Units 1 and 2, typically covering body systems and reproduction), and it's the normal prerequisite for Units 3 and 4. We just haven't written that page yet." },
      { q: "Is Human Biology considered an easier science than Biology, Chemistry or Physics?", a: "It has a reputation for being more content-heavy and memorisation-dependent than conceptually difficult, which is a different thing from \"easy\" — the sheer volume of detail across Unit 3 and 4, especially the nervous and endocrine systems, catches out students who assume a lighter workload." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "chemistry-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Science",
    stage: "upper",
    courseName: "Chemistry",
    courseType: "ATAR",
    unitLabel: "Units 1 and 2",
    title: "WACE Chemistry (Units 1 & 2): Course Guide",
    description:
      "What Year 11 Chemistry covers in WA — atomic structure, bonding, the mole concept, solutions, rates of reaction and acids and bases — unit by unit, in plain English.",
    heading: "WACE Chemistry, Year 11 (Units 1 and 2)",
    intro:
      "Chemistry ATAR Units 1 and 2 build the foundation every later chemistry topic assumes is solid: atomic structure and bonding first, then the mole concept — the single idea most Year 11 Chemistry students find hardest to internalise, since it requires thinking in terms of colossal numbers of particles rather than the tangible quantities Year 10 dealt with. Unit 2 shifts to solutions, reaction rates and acid-base chemistry, all of which lean heavily on quantitative calculation. A student who gets genuinely comfortable with moles in Unit 1 finds almost everything downstream easier; a student who doesn't tends to struggle at every subsequent calculation-heavy topic.",
    strands: [
      {
        name: "Unit 1",
        blurb: "Atomic structure, bonding and the mole concept — the calculation foundation for the whole course.",
        topics: [
          { name: "Atomic Structure and the Periodic Table", plain: "Extending atomic structure and periodic table understanding to ATAR-course depth." },
          { name: "Periodic Trends", plain: "Explaining trends in atomic radius, ionisation energy and other properties across the periodic table." },
          { name: "Ionic Bonding and Ionic Compounds", plain: "Explaining how ionic bonds form and predicting the properties of ionic compounds." },
          { name: "Covalent Bonding and Molecular Substances", plain: "Explaining covalent bonding and predicting the properties of molecular substances." },
          { name: "Metallic Bonding and Comparing Structures", plain: "Explaining metallic bonding and comparing the properties of ionic, covalent and metallic structures." },
          { name: "The Mole Concept and Molar Mass", plain: "Using the mole as a counting unit for particles, and calculating molar mass.", sticking: "Treating the mole as an abstract formula-plugging exercise rather than what it actually is — a very large counting number, like \"dozen\" but for chemistry. Students who never build that intuition struggle with every mole calculation that follows, not just this topic." },
          { name: "Chemical Equations and Stoichiometry", plain: "Using balanced chemical equations and stoichiometry to calculate reacting quantities." },
          { name: "Energy Changes in Chemical Reactions", plain: "Explaining and calculating the energy changes that accompany chemical reactions." },
        ],
      },
      {
        name: "Unit 2",
        blurb: "Solutions, rates and acid-base chemistry — largely quantitative, calculation-heavy content.",
        topics: [
          { name: "Intermolecular Forces", plain: "Explaining the different types of intermolecular forces and how they affect a substance's properties." },
          { name: "The Unique Properties of Water", plain: "Explaining water's unusual properties in terms of hydrogen bonding." },
          { name: "Solutions and Concentration Calculations", plain: "Calculating the concentration of solutions and performing dilution calculations." },
          { name: "Solubility, Precipitation and Ionic Equations", plain: "Predicting precipitation reactions and writing ionic equations for them." },
          { name: "Rates of Reaction and Collision Theory", plain: "Explaining reaction rates using collision theory." },
          { name: "Gases and the Gas Laws", plain: "Applying the gas laws to calculate the behaviour of gases under changing conditions." },
          { name: "Acids and Bases", plain: "Defining acids and bases and explaining their reactions." },
          { name: "Volumetric Analysis and Titration", plain: "Using titration and volumetric analysis to determine an unknown concentration.", sticking: "Rounding intermediate values during a multi-step titration calculation. Small rounding errors compound across the several steps a titration calculation typically requires, and this is a common, avoidable source of a wrong final answer." },
        ],
      },
    ],
    assessment: ATAR_Y11_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why do so many students find the mole concept the hardest part of Unit 1?", a: "Because it requires switching between three completely different scales at once — the everyday scale of grams on a balance, the invisible scale of individual atoms and molecules, and the mole itself as a bridge between them. Nothing in Year 10 Science asks students to move between scales this fluidly, so it takes real, deliberate practice rather than clicking into place naturally." },
      { q: "Is Chemistry Unit 1 and 2 mostly memorisation or mostly calculation?", a: "More calculation than most students expect coming from Year 10 Science, particularly from the mole concept onward. There's genuine content to learn — bonding types, periodic trends — but a large share of the marks in Unit 1 and 2 assessments come from multi-step numerical problems, not recall." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "chemistry-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Science",
    stage: "upper",
    courseName: "Chemistry",
    courseType: "ATAR",
    unitLabel: "Unit 3",
    title: "WACE Chemistry (Unit 3): Course Guide",
    description:
      "What Year 12 Chemistry covers in WA — equilibrium, acid-base calculations and electrochemistry — unit by unit, in plain English. Currently covers Unit 3 only; Unit 4 isn't yet in our content.",
    heading: "WACE Chemistry, Year 12 (Unit 3)",
    intro:
      "Unit 3 Chemistry moves into equilibrium — reactions that don't go to completion but settle into a dynamic balance — and this reframing trips up students who spent Year 11 assuming every reaction runs to completion. Le Chatelier's principle, acid-base equilibria and pH calculations, and electrochemistry (galvanic cells, electrolysis) round out the unit, all building on Unit 1 and 2's bonding and stoichiometry foundations. Note: this page currently covers Unit 3 only — Unit 4 content isn't yet in our dataset, so treat this as a partial picture of the full Year 12 course.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Equilibrium, acid-base calculations and electrochemistry.",
        topics: [
          { name: "Chemical Equilibrium and Dynamic Equilibrium", plain: "Explaining dynamic equilibrium as a state where forward and reverse reactions continue at equal rates.", sticking: "Assuming equilibrium means the reaction has stopped. It hasn't — both the forward and reverse reactions are still happening, just at matched rates, so the concentrations stay constant rather than the reaction itself being over. This distinction underpins everything else in the unit." },
          { name: "Le Chatelier's Principle", plain: "Predicting how an equilibrium system responds to a change in conditions using Le Chatelier's principle." },
          { name: "The Equilibrium Constant and Calculations", plain: "Calculating and interpreting the equilibrium constant for a reaction." },
          { name: "Acid-Base Equilibria, Ka and pH", plain: "Calculating pH and using Ka to compare the strength of weak acids." },
          { name: "Titration Curves and Buffers", plain: "Interpreting titration curves and explaining how buffer solutions resist pH change." },
          { name: "Oxidation, Reduction and Oxidation Numbers", plain: "Assigning oxidation numbers and identifying oxidation and reduction in a reaction." },
          { name: "Galvanic Cells and Standard Electrode Potentials", plain: "Explaining how galvanic cells generate electricity and using standard electrode potentials to predict reactions." },
          { name: "Electrolysis and Industrial Electrochemistry", plain: "Explaining electrolysis and its industrial applications." },
          { name: "Redox Titrations, Corrosion and Electrochemical Cells", plain: "Applying redox chemistry to titrations, corrosion and electrochemical cell problems." },
        ],
      },
    ],
    assessment: ATAR_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why does this page only cover Unit 3?", a: "It's a genuine gap in our current content, not a claim that Unit 4 doesn't exist. Unit 4 (typically organic chemistry) is part of the real Year 12 Chemistry course — we just haven't written that portion yet." },
      { q: "What's the biggest conceptual shift from Year 11 into Unit 3?", a: "Accepting that not every reaction goes to completion. Year 11 stoichiometry treats reactions as running until a reactant runs out; equilibrium chemistry in Unit 3 is built around reactions that reach a stable balance instead, and a lot of early Unit 3 confusion traces back to still thinking in Year 11 terms." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "physics-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "Science",
    stage: "upper",
    courseName: "Physics",
    courseType: "ATAR",
    unitLabel: "Units 1 and 2",
    title: "WACE Physics (Units 1 & 2): Course Guide",
    description:
      "What Year 11 Physics covers in WA — motion, forces, momentum and energy, then waves, sound, light and electricity — unit by unit, in plain English.",
    heading: "WACE Physics, Year 11 (Units 1 and 2)",
    intro:
      "Physics ATAR Units 1 and 2 split cleanly into mechanics (Unit 1) and waves-plus-electricity (Unit 2), and the two halves reward genuinely different strengths. Unit 1's motion, forces and momentum content is heavily mathematical and builds directly on Mathematics Methods' functions and later calculus — students taking both together tend to find the connections reinforcing. Unit 2's waves, nuclear physics and circuits content is more conceptual and model-based. A student who's strong in one half and weaker in the other isn't unusual; it's worth identifying which is which early rather than assuming a flat level of difficulty across the whole year.",
    strands: [
      {
        name: "Unit 1",
        blurb: "Motion, forces, momentum and energy — the mathematically heaviest content in the course.",
        topics: [
          { name: "Measurement, Uncertainty and Data Analysis", plain: "Applying formal measurement uncertainty and data analysis techniques to experimental physics." },
          { name: "Scalars, Vectors and Vector Analysis", plain: "Distinguishing scalar and vector quantities and performing vector addition and resolution." },
          { name: "Linear Motion: Displacement, Velocity and Acceleration", plain: "Analysing linear motion using displacement, velocity and acceleration, including from graphs." },
          { name: "Equations of Motion and Free Fall", plain: "Applying the equations of motion to constant-acceleration problems, including free fall." },
          { name: "Projectile Motion", plain: "Analysing projectile motion by treating horizontal and vertical motion independently.", sticking: "Forgetting that horizontal and vertical motion in a projectile are independent of each other. Students who try to solve a projectile problem with one combined equation, instead of separating the two directions first, consistently get stuck." },
          { name: "Forces and Newton's Laws of Motion", plain: "Applying Newton's three laws at ATAR-course mathematical rigour." },
          { name: "Friction, Inclined Planes and Connected Bodies", plain: "Solving force problems involving friction, inclined planes and multiple connected objects." },
          { name: "Momentum and Impulse", plain: "Applying momentum and impulse to collisions and other force-over-time situations." },
          { name: "Work, Energy and Power", plain: "Calculating work, energy and power, and applying the conservation of energy to mechanical systems." },
          { name: "Thermal Energy and Heat Transfer", plain: "Applying thermal energy concepts and heat transfer calculations." },
        ],
      },
      {
        name: "Unit 2",
        blurb: "Waves, nuclear physics and electricity — more conceptual and model-based.",
        topics: [
          { name: "Wave Fundamentals", plain: "Establishing the fundamental properties and behaviour common to all waves." },
          { name: "Wave Behaviour: Reflection, Refraction, Diffraction and Interference", plain: "Explaining wave behaviour through reflection, refraction, diffraction and interference." },
          { name: "Sound Waves", plain: "Applying wave principles specifically to sound." },
          { name: "Light and the Electromagnetic Spectrum", plain: "Explaining light's properties and its place within the electromagnetic spectrum." },
          { name: "Nuclear Structure, Isotopes and Radioactivity", plain: "Explaining nuclear structure, isotopes and the basics of radioactivity." },
          { name: "Nuclear Decay Equations and Half-Life", plain: "Writing nuclear decay equations and applying the concept of half-life." },
          { name: "Nuclear Reactions: Fission, Fusion and Mass-Energy", plain: "Explaining fission and fusion and the mass-energy relationship underlying them." },
          { name: "Electric Charge, Current and Voltage", plain: "Establishing the fundamental relationships between electric charge, current and voltage." },
          { name: "Resistance and Ohm's Law", plain: "Applying Ohm's law and calculating resistance in circuits." },
          { name: "Electric Circuits, Power and Household Electricity", plain: "Analysing electric circuits and applying power calculations to real household electricity contexts." },
        ],
      },
    ],
    assessment: ATAR_Y11_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Does Physics require Mathematics Methods to be taken alongside it?", a: "It's not a formal prerequisite, but Unit 1 in particular assumes real comfort with algebra, graphing and rearranging formulas — the kind of fluency Methods builds. A student taking Physics without also taking an ATAR maths course tends to find the mathematical demands, not the physics concepts, the bigger obstacle." },
      { q: "My child is strong in the Unit 1 mechanics but finding Unit 2 harder. Is that unusual?", a: "Not at all — the two units reward genuinely different strengths. Unit 1 is heavily mathematical and procedural; Unit 2's waves and nuclear content is more about building and reasoning from a correct mental model. Being strong in one and weaker in the other is common, not a sign of a broader problem." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "physics-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "Science",
    stage: "upper",
    courseName: "Physics",
    courseType: "ATAR",
    unitLabel: "Units 3 and 4",
    title: "WACE Physics (Units 3 & 4): Course Guide",
    description:
      "What Year 12 Physics covers in WA — circular motion, gravitation, fields, electromagnetism and modern physics — unit by unit, in plain English.",
    heading: "WACE Physics, Year 12 (Units 3 and 4)",
    intro:
      "Unit 3 and 4 Physics moves from Year 11's linear mechanics into circular and orbital motion, gravitational and electric fields, and the electromagnetism that underpins how generators and transformers actually work. Unit 4 is where the course changes character most sharply: special relativity and quantum physics ask students to accept that the classical, intuitive physics of Units 1 through 3 breaks down at very high speeds and very small scales. It's conceptually the most demanding stretch of WA's entire senior physics sequence, and it rewards students who are comfortable being told their everyday intuition is, in a precise sense, wrong.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Circular motion, gravitation and electromagnetism.",
        topics: [
          { name: "Uniform Circular Motion", plain: "Analysing uniform circular motion, including centripetal force and acceleration." },
          { name: "Universal Gravitation and Gravitational Fields", plain: "Applying Newton's law of universal gravitation and the concept of a gravitational field." },
          { name: "Satellites, Orbits and Kepler's Laws", plain: "Applying gravitation and circular motion to satellites and orbits, using Kepler's laws." },
          { name: "Electric Fields and Coulomb's Law", plain: "Applying Coulomb's law and the concept of an electric field to charged particles." },
          { name: "Magnetic Fields and the Motor Effect", plain: "Explaining magnetic fields and the force on a current-carrying conductor (the motor effect)." },
          { name: "Electromagnetic Induction", plain: "Explaining how a changing magnetic field induces an electric current." },
          { name: "Generators and Alternating Current", plain: "Explaining how generators produce alternating current using electromagnetic induction." },
          { name: "Transformers and Power Transmission", plain: "Explaining how transformers work and why they matter for efficient power transmission." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Special relativity and quantum physics — where classical intuition genuinely breaks down.",
        topics: [
          { name: "Special Relativity: Frames of Reference and Einstein's Postulates", plain: "Introducing special relativity through Einstein's postulates and the concept of reference frames." },
          { name: "Time Dilation and Length Contraction", plain: "Explaining and calculating time dilation and length contraction at relativistic speeds.", sticking: "Trying to reconcile relativistic effects with everyday intuition instead of accepting the postulates and following the mathematics. This topic is one of the few in the entire WA physics sequence where intuition is actively unhelpful, and that's worth saying explicitly rather than expecting it to eventually \"make sense\" the ordinary way." },
          { name: "Mass-Energy Equivalence and Relativistic Momentum", plain: "Applying mass-energy equivalence and relativistic momentum." },
          { name: "The Quantum Nature of Light: Black-Body Radiation and the Photoelectric Effect", plain: "Explaining the evidence for light's quantum nature through black-body radiation and the photoelectric effect." },
          { name: "Wave-Particle Duality and Matter Waves", plain: "Explaining wave-particle duality and the concept of matter waves." },
          { name: "The Quantum Atom: Energy Levels and Atomic Spectra", plain: "Explaining atomic energy levels and how they produce atomic spectra." },
          { name: "The Standard Model of Particle Physics", plain: "Introducing the standard model of particle physics." },
          { name: "Particle Accelerators and the Frontier of Physics", plain: "Explaining how particle accelerators are used to investigate the frontier of physics." },
        ],
      },
    ],
    assessment: ATAR_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why is Unit 4 considered the hardest stretch of the course?", a: "Because it's the point where the physics genuinely stops matching everyday intuition — relativity and quantum mechanics describe a universe that doesn't behave the way lived experience suggests it should. Units 1 through 3 extend and refine intuitive physics; Unit 4 asks a student to trust the mathematics over their intuition, which is a different and harder kind of demand." },
      { q: "Does Unit 3's electromagnetism connect back to anything in Unit 1 or 2?", a: "Yes, closely — generators and transformers in Unit 3 are a direct, practical application of the electric circuit and magnetic principles introduced in Unit 2, now combined with the circular motion concepts from earlier in Unit 3 itself. It's one of the more satisfying connections in the course for a student who's kept up with the sequence." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "english-atar-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "English",
    stage: "upper",
    courseName: "English",
    courseType: "ATAR",
    unitLabel: "Units 1 and 2",
    title: "WACE English ATAR (Units 1 & 2): Course Guide",
    description:
      "What Year 11 English ATAR covers in WA — the purpose-context-audience triad, text types, stylistic analysis and creating original texts — unit by unit, in plain English.",
    heading: "WACE English ATAR, Year 11 (Units 1 and 2)",
    intro:
      "English ATAR formalises something Years 7-10 have been building toward all along: reading and writing a text as a deliberate response to purpose, audience and context, not in isolation. Unit 1 establishes that triad as the lens for everything else in the course, then works through imaginative, interpretive and persuasive text types in turn. Unit 2 shifts to comparison — reading two texts against each other and analysing how genre, rhetoric and representation shape meaning. It's the ATAR English pathway, distinct from General, and it assumes a student is comfortable with sustained analytical writing already.",
    strands: [
      {
        name: "Unit 1",
        blurb: "The purpose-context-audience triad, established as the lens for the whole course.",
        topics: [
          { name: "The Purpose-Context-Audience Triad", plain: "Establishing purpose, context and audience as the three lenses used to analyse and create every text in the course." },
          { name: "Language Modes and Metalanguage", plain: "Using the correct metalanguage to discuss spoken, written and multimodal language modes precisely." },
          { name: "Imaginative, Interpretive and Persuasive Text Types", plain: "Distinguishing the conventions of imaginative, interpretive and persuasive text types." },
          { name: "Text Structures and Conventions", plain: "Analysing how text structures and conventions serve a text's purpose." },
          { name: "Stylistic Features and How They Shape Meaning", plain: "Analysing how an author's stylistic choices shape the meaning a reader takes from a text." },
          { name: "Vocabulary, Idiom and Rhetoric", plain: "Analysing precise vocabulary, idiom and rhetorical choices at ATAR-course depth." },
          { name: "Description and Imagery: Evaluating Impact", plain: "Evaluating the impact of descriptive language and imagery on a reader." },
          { name: "Visual Elements and Multimodal Meaning", plain: "Analysing how visual elements contribute to meaning in multimodal texts." },
          { name: "How Context Shapes Response", plain: "Analysing how a reader's own context shapes their response to a text." },
          { name: "Creating Texts: Form, Content, Style and Tone", plain: "Creating original texts with deliberate control over form, content, style and tone." },
          { name: "Evidence, Argument and Referencing", plain: "Constructing an evidence-based argument with correct academic referencing." },
          { name: "Planning, Drafting, Editing and the Mechanics of Writing", plain: "Applying a full, disciplined writing process from planning through to final editing." },
          { name: "Reflecting: Assessing Purpose and Context", plain: "Reflecting critically on how well a student's own text achieved its intended purpose for its context." },
        ],
      },
      {
        name: "Unit 2",
        blurb: "Comparison, genre and how texts position an audience.",
        topics: [
          { name: "Comparing Texts: The Purpose-Context Relationship", plain: "Comparing two texts by analysing how their differing purposes and contexts shape their content.", sticking: "Comparing two texts by describing each one separately rather than making a genuine connective argument about the relationship between them. At ATAR level, this is the single most consistent gap between a strong and a mediocre comparative response." },
          { name: "Analysing the Style and Structure of Texts", plain: "Analysing style and structure across texts at a more sophisticated comparative level." },
          { name: "Hybrid Texts and Genre", plain: "Analysing texts that deliberately blend genre conventions and explaining the effect." },
          { name: "Representation of Ideas, Attitudes and Voices", plain: "Analysing how a text represents particular ideas, attitudes and voices." },
          { name: "Rhetorical Devices and Persuasive Techniques", plain: "Analysing rhetorical devices and persuasive techniques at ATAR-course depth." },
          { name: "Multimodal and Digital Effects", plain: "Analysing the effects created specifically by multimodal and digital text features." },
          { name: "Attitude, Mood and Atmosphere", plain: "Analysing how a text builds attitude, mood and atmosphere." },
          { name: "Positioning Audiences", plain: "Analysing the specific techniques a text uses to position its audience toward a particular response." },
          { name: "Creating Voice, Tone and Style", plain: "Creating original texts with a controlled, deliberate voice, tone and style." },
          { name: "Reflecting on Values and Positioning", plain: "Reflecting critically on the values embedded in a student's own text and how it positions its reader." },
        ],
      },
    ],
    assessment: ATAR_Y11_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Is English ATAR much harder than the Year 10 English a student is used to?", a: "It's a real step up in sustained analytical depth and in the volume of independent writing expected, more than in genuinely new concepts — a student who was comfortable with Year 10's comparative essays and source synthesis has the right foundation, but should expect Unit 1 to ask for that at greater length and precision." },
      { q: "How is English ATAR different from English General?", a: "ATAR is built around sustained literary and textual analysis and contributes to the ATAR; General is built around everyday, workplace and media texts and doesn't contribute to the ATAR. The right choice depends on whether a student's post-school plans need an ATAR-contributing English result, and how much they enjoy sustained literary analysis specifically." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "english-atar-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "English",
    stage: "upper",
    courseName: "English",
    courseType: "ATAR",
    unitLabel: "Units 3 and 4",
    title: "WACE English ATAR (Units 3 & 4): Course Guide",
    description:
      "What Year 12 English ATAR covers in WA — perspectives and representation, intertextuality, synthesis and exam technique — unit by unit, in plain English.",
    heading: "WACE English ATAR, Year 12 (Units 3 and 4)",
    intro:
      "Unit 3 and 4 English ATAR pushes the analysis from Year 11 toward genuinely critical reading — ideology, assumption and the deliberate manipulation of genre convention all become explicit topics, not just close-reading exercises. Unit 4 turns outward to synthesis across multiple texts and, distinctively, to exam technique itself as a taught skill: responding under timed conditions is treated as something to practise deliberately, not something that just happens on the day. This is the year with the external written exam, so writing at speed without losing analytical depth is the real, practical challenge.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Critical reading — ideology, genre manipulation and intertextuality.",
        topics: [
          { name: "Perspectives and Representation", plain: "Analysing how a text represents particular perspectives at a more critical, sophisticated level than Year 11." },
          { name: "How Language Represents Ideas and Concepts", plain: "Analysing precisely how language choices construct and represent abstract ideas and concepts." },
          { name: "Genre Conventions and Their Manipulation", plain: "Analysing how a text deliberately manipulates genre conventions for effect." },
          { name: "Analysing Voice and Point of View", plain: "Analysing voice and point of view at ATAR-exam depth." },
          { name: "Intertextuality and Allusion", plain: "Analysing intertextual references and allusion at a sophisticated level." },
          { name: "Creating Analytical and Interpretive Responses", plain: "Creating sustained, original analytical and interpretive responses to texts." },
          { name: "Comparing Representations Across Texts", plain: "Comparing how different texts represent similar ideas or groups." },
          { name: "Reading Critically: Ideology and Assumptions", plain: "Reading a text critically for the ideology and unstated assumptions embedded within it.", sticking: "Treating \"critical reading\" as finding something to criticise, rather than what it actually means — identifying the values and assumptions a text takes for granted, which may or may not be ones the reader shares. This distinction is exactly what Unit 3 is testing." },
          { name: "Creating Texts That Represent a Perspective", plain: "Creating original texts that deliberately construct and represent a chosen perspective." },
          { name: "Sustained Interpretation and Reflection", plain: "Sustaining a single interpretation across an extended analytical response, with critical reflection." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Synthesis across texts, sustained creation, and exam technique as a taught skill.",
        topics: [
          { name: "Comparison of Texts: Ideas, Perspectives and Contexts", plain: "Comparing texts on ideas, perspectives and contexts at the course's most sophisticated level." },
          { name: "Evaluating the Effectiveness of Texts", plain: "Evaluating how effectively a text achieves its purpose, not just describing what it does." },
          { name: "Synthesis: Drawing Ideas Across Texts", plain: "Synthesising ideas across multiple texts into one original, coherent argument." },
          { name: "Creating Sustained Persuasive Texts", plain: "Creating an extended, sustained persuasive text under exam-realistic conditions." },
          { name: "Creating Sustained Imaginative and Interpretive Texts", plain: "Creating an extended imaginative or interpretive text with sustained control." },
          { name: "Reflecting on and Evaluating Your Own Creative Choices", plain: "Critically reflecting on and justifying the creative choices made in a student's own writing." },
          { name: "Exam Technique: Responding Under Timed Conditions", plain: "Practising writing sustained, high-quality analytical responses under real exam time pressure.", sticking: "Practising essay content extensively but never practising it under an actual timer. A student who writes strong essays untimed but has never rehearsed the same standard at exam pace is likely to be caught out by the external exam specifically, not by the content itself." },
          { name: "Consolidation: Integrating the Skills of the Course", plain: "Integrating all the analytical and creative skills built across the course into exam-ready responses." },
        ],
      },
    ],
    assessment: ATAR_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Why does exam technique get its own explicit topic in Unit 4?", a: "Because writing a strong analytical response with unlimited time and writing an equally strong one in a fixed exam block are genuinely different skills, and the second doesn't develop automatically just from being good at the first. Unit 4 treats timed practice as something to build deliberately, which is a realistic acknowledgement of what the external exam actually demands." },
      { q: "What's the difference between Unit 3's \"critical reading\" and ordinary analysis?", a: "Ordinary analysis explains what a text does and how. Critical reading in Unit 3 goes a layer further — it asks what the text assumes is true or normal without saying so, and whose perspective that assumption serves. It's a more demanding, more adult way of reading than anything asked for in earlier years." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "english-general-year-11",
    year: 11,
    yearLabel: "Year 11",
    subject: "English",
    stage: "upper",
    courseName: "English",
    courseType: "General",
    unitLabel: "Units 1 and 2",
    title: "WACE English General (Units 1 & 2): Course Guide",
    description:
      "What Year 11 English General covers in WA — everyday and workplace texts, media literacy and creating informative and persuasive texts — unit by unit, in plain English.",
    heading: "WACE English General, Year 11 (Units 1 and 2)",
    intro:
      "English General is built around the texts students will actually encounter day to day and at work — everyday and workplace documents, media texts, advertising — rather than the sustained literary analysis ATAR English is built around. Unit 1 establishes comprehension and creation of informative and persuasive texts; Unit 2 shifts to media specifically, including how advertising and news framing persuade and represent issues. It's a genuinely practical course, well suited to a student whose interests and post-school plans lean toward direct communication rather than literary criticism.",
    strands: [
      {
        name: "Unit 1",
        blurb: "Comprehension and creation of everyday and workplace texts.",
        topics: [
          { name: "Comprehending Texts: Main Ideas and Detail", plain: "Identifying main ideas and supporting detail in a range of everyday texts." },
          { name: "Purpose, Audience and Context in Everyday Texts", plain: "Identifying purpose, audience and context in texts encountered in daily and working life." },
          { name: "Everyday and Workplace Text Types", plain: "Recognising the conventions of common everyday and workplace text types." },
          { name: "Vocabulary and Meaning in Context", plain: "Determining word meaning from context in a range of practical texts." },
          { name: "Visual and Graphic Texts", plain: "Interpreting visual and graphic texts such as signs, infographics and instructions." },
          { name: "Fact, Opinion and Bias", plain: "Distinguishing fact from opinion and identifying bias in everyday texts.", sticking: "Assuming a confident or authoritative tone is the same as factual accuracy. Learning to separate how something is said from whether it's actually true is the core skill this topic is building." },
          { name: "Creating Informative Texts", plain: "Creating clear, well-organised informative texts for a real audience and purpose." },
          { name: "Creating Persuasive Texts", plain: "Creating persuasive texts using techniques appropriate to a real audience." },
          { name: "Planning, Drafting and Editing", plain: "Applying a full writing process — planning, drafting and editing — to produce a polished text." },
        ],
      },
      {
        name: "Unit 2",
        blurb: "Media literacy — how media texts inform, persuade and represent issues.",
        topics: [
          { name: "Media Texts: How They Inform and Persuade", plain: "Analysing how media texts are constructed to inform and persuade an audience." },
          { name: "Advertising and Persuasive Techniques", plain: "Analysing the specific persuasive techniques used in advertising." },
          { name: "Representation in Texts", plain: "Analysing how media texts represent particular people, groups or issues." },
          { name: "Point of View and Bias in Media", plain: "Identifying point of view and bias specifically within media reporting." },
          { name: "Comparing How Texts Present the Same Topic", plain: "Comparing how two different media texts present the same topic or event." },
          { name: "Digital and Multimodal Texts", plain: "Interpreting digital and multimodal texts, including social media content." },
          { name: "Creating Texts for a Specific Audience and Purpose", plain: "Creating a text with deliberate control over how it addresses a specific audience and purpose." },
          { name: "Oral Communication and Presenting", plain: "Planning and delivering an oral or multimodal presentation to a real audience." },
        ],
      },
    ],
    assessment: GENERAL_Y11_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "Does English General limit university options later?", a: "It doesn't contribute to the ATAR, so a student who later needs an ATAR-contributing English result would need to have completed ATAR English instead or alongside it. It's the right choice for a student whose post-school plans are clear and don't depend on an ATAR pathway, not something to fall into without that being a considered decision." },
      { q: "Is the media literacy content in Unit 2 just about spotting fake news?", a: "That's part of it, but it goes further — analysing how legitimate, non-deceptive media still frames and represents issues through genuine editorial choices (what's included, what's left out, which voices are centred) is the deeper skill, and it's more broadly useful than simply flagging obviously false content." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },

  {
    slug: "english-general-year-12",
    year: 12,
    yearLabel: "Year 12",
    subject: "English",
    stage: "upper",
    courseName: "English",
    courseType: "General",
    unitLabel: "Units 3 and 4",
    title: "WACE English General (Units 3 & 4): Course Guide",
    description:
      "What Year 12 English General covers in WA — persuasive technique, media representation and creating texts for community and workplace contexts — unit by unit, in plain English.",
    heading: "WACE English General, Year 12 (Units 3 and 4)",
    intro:
      "Unit 3 and 4 English General extends Year 11's practical focus into longer, more sustained texts and a sharper critical edge on media representation and reliability. Unit 4 turns toward texts genuinely useful beyond school — community, workplace and further-study contexts — and closes with reflecting on and improving a student's own writing, treating revision as a real, transferable skill rather than an assessment formality.",
    strands: [
      {
        name: "Unit 3",
        blurb: "Persuasive technique and workplace-relevant comprehension, at greater length.",
        topics: [
          { name: "How Texts Influence Audiences", plain: "Analysing the range of techniques texts use to influence an audience's thinking or behaviour." },
          { name: "Analysing Persuasive Techniques in Texts", plain: "Analysing persuasive technique at a more sustained, detailed level than Year 11." },
          { name: "Point of View, Perspective and Values", plain: "Analysing how point of view, perspective and values are embedded in a text." },
          { name: "Comprehending Community and Workplace Texts", plain: "Comprehending texts genuinely encountered in community and workplace settings." },
          { name: "Creating Extended Persuasive Texts", plain: "Creating a longer, more sustained persuasive text than Year 11 required." },
          { name: "Creating Informative and Explanatory Texts", plain: "Creating clear, well-structured informative and explanatory texts." },
          { name: "Planning and Structuring Longer Texts", plain: "Planning and structuring a longer piece of writing so it stays coherent from start to finish.", sticking: "Starting to write before planning a longer text's overall structure. A text that runs long without a plan tends to drift, and the fix is a genuine structural outline before drafting starts, not more editing afterward." },
        ],
      },
      {
        name: "Unit 4",
        blurb: "Media representation and creating texts genuinely useful beyond school.",
        topics: [
          { name: "Representations in the Media and Popular Culture", plain: "Analysing representation across media and popular culture texts." },
          { name: "Comparing Representations Across Texts", plain: "Comparing how different texts represent the same group, issue or idea." },
          { name: "Evaluating the Reliability and Effectiveness of Texts", plain: "Evaluating how reliable and how effective a text actually is, not just describing its features." },
          { name: "Creating Texts for Community, Workplace or Further Study", plain: "Creating texts genuinely suited to community, workplace or further-study purposes." },
          { name: "Multimodal and Oral Presentations", plain: "Planning and delivering a sustained multimodal or oral presentation." },
          { name: "Reflecting on and Improving Your Own Texts", plain: "Critically reflecting on a student's own writing and using that reflection to genuinely improve it." },
        ],
      },
    ],
    assessment: GENERAL_Y12_ASSESSMENT,
    faqs: [
      { q: "Has this syllabus changed recently?", a: WACE_REVIEW_NOTE },
      { q: "How is Unit 3 and 4 different in character from Unit 1 and 2?", a: "The text types stay similar — everyday, workplace and media texts rather than literary ones — but the length and sustained quality expected increases considerably. A student comfortable with Year 11's shorter tasks should expect Year 12 to ask for the same skills over a longer, more demanding piece of writing." },
      { q: "Does this course prepare a student for workplace writing after school?", a: "Genuinely, yes — Unit 4 in particular is explicitly built around texts for community, workplace and further-study contexts, which makes it one of the more directly transferable English courses on offer, independent of its WACE contribution." },
    ],
    published: true,
    lastModified: "2026-08-09",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers — everything downstream reads through these                 */
/* ------------------------------------------------------------------ */

export const publishedCurriculum = (): CurriculumEntry[] =>
  curriculum.filter((c) => c.published);

export const curriculumBySlug = (slug: string): CurriculumEntry | undefined =>
  curriculum.find((c) => c.slug === slug && c.published);

/** Hub route. Changing this needs a matching update to app/curriculum/. */
export const curriculumHref = (slug: string): string => `/curriculum/${slug}/`;

/**
 * Display label used on cards, breadcrumbs and related-year lists.
 * "Mathematics Essential"/"Mathematics Foundation" already name their own
 * pathway, so courseType is only appended for ATAR (a genuine disambiguator
 * on every course) and for English General (English is the only subject
 * where the bare courseName is shared between two different course types).
 */
export const curriculumCardLabel = (entry: CurriculumEntry): string => {
  if (!entry.courseName) return `${entry.yearLabel} ${entry.subject}`;
  const suffix =
    entry.courseType === "ATAR" ? " ATAR" : entry.courseType === "General" && entry.courseName === "English" ? " General" : "";
  return `${entry.courseName}${suffix} — ${entry.yearLabel}`;
};

/** P-10 syllabuses live on the K-10 Outline site; WACE course syllabuses
 *  live on the separate senior-secondary site — these are not the same URL. */
export const curriculumSyllabusUrl = (entry: CurriculumEntry): string =>
  entry.stage === "upper" ? "https://senior-secondary.scsa.wa.edu.au/" : "https://k10outline.scsa.wa.edu.au/";

/**
 * P-10 hubs: same year, other subject — plus the same subject either side.
 * WACE course hubs (entries with a courseName): the other year of the SAME
 * course only (e.g. Methods Year 11 <-> Methods Year 12) — relating every
 * course sitting in the same year would produce a long, unhelpful list.
 */
export const relatedCurriculum = (entry: CurriculumEntry): CurriculumEntry[] =>
  publishedCurriculum()
    .filter((c) => c.slug !== entry.slug)
    .filter((c) =>
      entry.courseName
        ? c.courseName === entry.courseName
        : (c.year === entry.year && c.stage === entry.stage) ||
          (c.subject === entry.subject && Math.abs(c.year - entry.year) === 1)
    );

/** Grouped for the /curriculum/ index. Lower school first, then upper. */
export const curriculumByStage = (): {
  stage: CurriculumStage;
  label: string;
  entries: CurriculumEntry[];
}[] => [
  {
    stage: "lower",
    label: "Years 7–10 — Western Australian Curriculum",
    entries: publishedCurriculum()
      .filter((c) => c.stage === "lower")
      .sort((a, b) => a.year - b.year || a.subject.localeCompare(b.subject)),
  },
  {
    stage: "upper",
    label: "Years 11–12 — WACE courses",
    entries: publishedCurriculum()
      .filter((c) => c.stage === "upper")
      .sort(
        (a, b) =>
          (a.courseName ?? "").localeCompare(b.courseName ?? "") || a.year - b.year
      ),
  },
];

/** Feed straight into app/sitemap.ts so routes can never drift. Matches the
 *  sitemap's own convention of a bare path with no trailing slash. */
export const curriculumSitemapEntries = (): {
  path: string;
  lastModified: string;
}[] =>
  publishedCurriculum().map((c) => ({
    path: `/curriculum/${c.slug}`,
    lastModified: c.lastModified,
  }));

/** Course structured data for a hub — topics as `about` entries. */
export const curriculumCourseJsonLd = (entry: CurriculumEntry, href: string) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: entry.title,
  description: entry.description,
  provider: {
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  educationalLevel: entry.yearLabel,
  about: entry.strands.flatMap((s) => s.topics.map((t) => t.name)),
  url: `${SITE_URL}${href}`,
});
