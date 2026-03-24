// ============================================
// Quick Answers — Pre-written Q&A for offline mode
// ============================================
//
// When the AI backend isn't available (e.g. GitHub Pages),
// the chat widget falls back to these curated answers.
// Each entry has a category matching site sections so
// getCurrentSection() can prioritize relevant questions.

export const quickAnswers = [
  {
    category: 'current',
    question: 'Why is there war in Sudan?',
    answer: 'The Sudan civil war began in April 2023 as a power struggle between two military factions \u2014 the SAF led by Gen. al-Burhan and the RSF led by Gen. Hemedti \u2014 who had jointly staged a coup in 2021 and then turned on each other for control of the state and its resources, especially gold. The resulting conflict has displaced millions and created one of the world\'s worst humanitarian crises.',
    link: '#/conflict/sudan',
    linkText: 'Full Sudan analysis'
  },
  {
    category: 'current',
    question: 'What is the current state of the Russia-Ukraine war?',
    answer: 'Russia launched a full-scale invasion of Ukraine in February 2022, escalating a conflict that began in 2014 with the annexation of Crimea. The war has become a grinding attritional conflict with enormous casualties on both sides, extensive destruction of Ukrainian infrastructure, and significant global economic ripple effects through energy and food markets.',
    link: '#/conflict/russia-ukraine',
    linkText: 'Full Russia-Ukraine analysis'
  },
  {
    category: 'current',
    question: 'What is happening in the Israel-Palestine conflict?',
    answer: 'The Israel-Palestine conflict is one of the world\'s longest-running disputes, rooted in competing national claims to the same territory. The situation escalated dramatically in October 2023 and has produced devastating humanitarian consequences in Gaza, with ongoing international debate about paths toward a lasting resolution.',
    link: '#/conflict/israel-palestine',
    linkText: 'Full Israel-Palestine analysis'
  },
  {
    category: 'endings',
    question: 'How do wars typically end?',
    answer: 'Research shows wars end through five main paths: military victory (one side wins), negotiated settlement (both sides agree to terms), ceasefire that freezes the conflict, exhaustion and stalemate, or external intervention. Negotiated settlements that address root causes tend to produce the most durable peace, though they are the hardest to achieve.',
    link: '#/endings',
    linkText: 'Explore how wars end'
  },
  {
    category: 'causes',
    question: 'What are the root causes of most wars?',
    answer: 'Most armed conflicts stem from a combination of factors: resource competition (land, water, minerals, oil), identity-based grievances (ethnic, religious, national), governance failures (corruption, exclusion, repression), and external interference (arms sales, proxy conflicts, colonial legacies). Rarely does a single cause explain a war \u2014 it is usually a toxic combination.',
    link: '#/causes',
    linkText: 'Explore root causes'
  },
  {
    category: 'actions',
    question: 'What can ordinary people do to promote peace?',
    answer: 'Individual actions that contribute to peace include contacting elected representatives about foreign policy, supporting verified humanitarian organizations, educating yourself and others about conflicts, practicing media literacy to resist propaganda, and building bridges across divides in your own community. Collective civic pressure has historically been a key driver of policy change.',
    link: '#/actions',
    linkText: 'See what you can do'
  },
  {
    category: 'arms-trade',
    question: 'How does the global arms trade fuel conflict?',
    answer: 'The global arms trade is worth over $100 billion annually, with the US, Russia, France, China, and Germany as the top exporters. Weapons sold for profit or geopolitical influence often end up prolonging wars, enabling human rights abuses, and destabilizing entire regions. Arms embargoes exist but are frequently circumvented through illicit networks.',
    link: '#/arms-trade',
    linkText: 'Explore the arms trade'
  },
  {
    category: 'historical',
    question: 'How did the Northern Ireland conflict end?',
    answer: 'The Troubles in Northern Ireland ended through the 1998 Good Friday Agreement after 30 years of violence that killed over 3,500 people. Key ingredients included war-weary populations, backchannel negotiations, inclusive power-sharing structures, external mediation (the US and EU), and a willingness by former enemies to share governance. It remains one of history\'s best examples of a negotiated peace.',
    link: '#/conflict/northern-ireland',
    linkText: 'Northern Ireland case study'
  },
  {
    category: 'historical',
    question: 'What lessons does the Rwandan genocide teach us?',
    answer: 'The 1994 Rwandan genocide, which killed an estimated 800,000 people in 100 days, demonstrated the catastrophic consequences of dehumanizing propaganda, international inaction, and ethnic divisions weaponized by political leaders. Rwanda\'s post-genocide recovery, while imperfect, offers lessons about justice mechanisms, reconciliation processes, and the importance of early warning systems.',
    link: '#/conflict/rwanda',
    linkText: 'Rwanda case study'
  },
  {
    category: 'patterns',
    question: 'Are there patterns in how conflicts escalate?',
    answer: 'Yes, conflict researchers have identified recurring escalation patterns: dehumanization of the other side, arms buildups, breakdown of communication channels, mobilization of identity-based grievances, and economic crises that create desperation. Recognizing these patterns early is essential for prevention \u2014 it is far cheaper and more effective to prevent a war than to end one.',
    link: '#/patterns',
    linkText: 'Explore conflict patterns'
  },
  {
    category: 'current',
    question: 'How serious is the risk of nuclear conflict?',
    answer: 'The risk of nuclear conflict is the highest it has been since the Cold War, driven by the erosion of arms control treaties, modernization of nuclear arsenals, the Russia-Ukraine war, and rising tensions between nuclear-armed states. Even a limited nuclear exchange would cause catastrophic humanitarian and environmental consequences globally.',
    link: '#/current',
    linkText: 'View current conflicts'
  },
  {
    category: 'peace-progress',
    question: 'Is the world actually getting more peaceful?',
    answer: 'The picture is mixed. Interstate wars between countries have declined significantly since 1945, and global battle deaths per capita are lower than historical averages. However, civil wars and non-state conflicts remain persistent, and recent years have seen an uptick in armed conflicts worldwide. The peace tracker monitors both progress and setbacks in real time.',
    link: '#/peace-progress',
    linkText: 'View the peace tracker'
  },
];

/**
 * Map of site sections to quick-answer categories.
 * Used by getCurrentSection() to filter relevant questions.
 */
export const sectionCategoryMap = {
  '/': 'current',
  '/current': 'current',
  '/causes': 'causes',
  '/endings': 'endings',
  '/patterns': 'patterns',
  '/actions': 'actions',
  '/arms-trade': 'arms-trade',
  '/peace-progress': 'peace-progress',
  '/educators': 'historical',
  '/methodology': 'patterns',
  '/report': 'current',
};
