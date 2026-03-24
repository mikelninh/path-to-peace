// ============================================
// Education Data Module
// Lesson Plans, Learning Modules, Quizzes & Discussion Guides
// ============================================

// ============================================
// 1. LESSON PLANS
// ============================================

export const lessonPlans = [
  {
    id: 'why-do-wars-start',
    title: 'Why Do Wars Start?',
    subtitle: 'Exploring the root causes of armed conflict through real-world examples',
    gradeLevel: 'high-school',
    duration: '3 class periods (50 min each)',
    subjects: ['History', 'Social Studies', 'Geography', 'Civics'],
    conflictLinks: ['russia-ukraine', 'sudan'],
    objectives: [
      'Identify and explain the 7 root causes of armed conflict: resources, governance failure, identity, colonial legacy, nuclear proliferation, geopolitical rivalry, and climate change',
      'Analyze how multiple root causes interact and overlap in real-world conflicts such as the Russia-Ukraine war and the Sudan civil war',
      'Evaluate primary sources and data to determine which root causes are most significant in a given conflict',
      'Construct an evidence-based argument about how understanding root causes can inform conflict prevention',
    ],
    materials: [
      'Access to "The Path to Peace" interactive map and Root Causes section',
      'Printed conflict profile handouts for Russia-Ukraine and Sudan (or student devices)',
      'Root Cause Analysis worksheet (7 categories with space for evidence and examples)',
      'Large poster paper and markers for group mapping activity',
    ],
    activities: [
      {
        title: 'Conflict Mapping Warm-Up',
        duration: '15 min',
        desc: 'Students explore the interactive conflict map on the site, clicking on at least 5 different conflicts. For each, they record: the name, region, severity, and the listed root causes. After exploring, the class discusses patterns they noticed. Are certain causes more common than others? Do some regions share causes? This builds familiarity with the data before deeper analysis.',
      },
      {
        title: 'Root Causes Deep Dive',
        duration: '25 min',
        desc: 'Divide the class into 7 groups, one per root cause category. Each group reads the full description and examples from the Root Causes section of the site. They must prepare a 3-minute presentation explaining: (1) What the root cause is and how it works, (2) Two real-world examples, and (3) Why this cause is difficult to resolve. Groups present to the class, building a shared vocabulary for the rest of the lesson.',
      },
      {
        title: 'Case Study: Russia-Ukraine',
        duration: '30 min',
        desc: 'Using the Russia-Ukraine conflict profile from the site, students work in pairs to identify every root cause present in the conflict. They should find at least 4 (territory, geopolitics, identity, resources). For each cause identified, students must cite specific evidence from the profile — for example, the role of Crimea, NATO expansion concerns, Russian-speaking populations in eastern Ukraine, and energy pipeline politics. Pairs create a cause-and-effect diagram showing how the causes interconnect.',
      },
      {
        title: 'Comparative Analysis: Sudan',
        duration: '25 min',
        desc: 'Students repeat the root cause analysis for the Sudan civil war, identifying causes such as governance failure (two generals competing for power), resources (gold mining financing the RSF), geopolitical rivalry (UAE backing vs. Egypt backing), and colonial legacy. They then compare their Sudan analysis to their Russia-Ukraine analysis. Which causes overlap? Which are unique? Students complete a Venn diagram and write a paragraph explaining what the comparison reveals about the nature of conflict.',
      },
      {
        title: 'Synthesis and Prevention Discussion',
        duration: '20 min',
        desc: 'Whole-class discussion guided by the question: "If we understand the root causes of conflict, can we prevent wars before they start?" Students reference their analyses to argue for or against. Introduce the concept of "early warning signs" — if we see resource competition intensifying, governance deteriorating, or identity being weaponized, what could the international community do? Each student writes a one-paragraph exit ticket proposing one preventive measure for a conflict of their choice.',
      },
    ],
    discussionQuestions: [
      'Why do you think the same root causes appear across conflicts on different continents? What does this tell us about the nature of conflict?',
      'The site lists 7 root causes, but are some more fundamental than others? Could you argue that governance failure is the "master cause" that enables all others?',
      'Russia justified its invasion partly on security grounds (NATO expansion). Ukraine asserts its sovereign right to choose alliances. How do we evaluate competing claims when both sides believe they are right?',
      'The Sudan conflict involves two military leaders fighting for control after blocking civilian rule. How does this pattern — where those with weapons refuse to share power — repeat across conflicts?',
      'If you were an advisor to the United Nations, which root cause would you prioritize addressing? Why? What resources would you need?',
    ],
    assessment: 'Students write a 500-word analytical essay selecting one current conflict from the site (not Russia-Ukraine or Sudan) and identifying its root causes with evidence. They must explain how at least two causes interact with each other, propose one preventive measure that could have reduced the likelihood of conflict, and reflect on why the international community failed to act. Grading rubric: identification of causes (25%), quality of evidence (25%), analysis of cause interaction (25%), and quality of proposed prevention (25%).',
  },
  {
    id: 'how-wars-end',
    title: 'How Wars End: Paths to Peace',
    subtitle: 'Examining the mechanisms that bring armed conflicts to a close',
    gradeLevel: 'high-school',
    duration: '4 class periods (50 min each)',
    subjects: ['History', 'Social Studies', 'Government', 'Ethics'],
    conflictLinks: ['israel-palestine', 'ethiopia', 'drc'],
    objectives: [
      'Describe and compare the 6 mechanisms through which wars end: negotiated settlement, international mediation, economic interdependence, truth and reconciliation, post-conflict reconstruction, and power-sharing',
      'Analyze historical case studies — the Good Friday Agreement, the Colombia-FARC peace deal, and South Africa\'s Truth and Reconciliation Commission — to identify factors that made peace possible',
      'Evaluate why some peace processes succeed while others fail, using evidence from multiple conflicts',
      'Design a peace framework for a current conflict that incorporates at least three different peace mechanisms',
    ],
    materials: [
      'Access to "The Path to Peace" How Wars End section',
      'Case study packets: Good Friday Agreement, Colombia-FARC Peace Deal, South Africa TRC (teacher-prepared or from site resources)',
      'Peace Process Evaluation rubric handout',
      'Role-play character cards for the negotiation simulation',
    ],
    activities: [
      {
        title: 'The Mechanisms of Peace',
        duration: '20 min',
        desc: 'Students explore the How Wars End section of the site, taking notes on each of the 6 mechanisms. For each, they record: the definition, the historical examples listed, and the stated success rate. Class discussion focuses on a key insight: most successful peace processes use multiple mechanisms simultaneously, not just one. The Good Friday Agreement, for example, combined negotiated settlement, international mediation, and power-sharing.',
      },
      {
        title: 'Case Study Stations',
        duration: '50 min (full period)',
        desc: 'Set up three stations around the room. Station 1: Good Friday Agreement — students analyze how decades of violence in Northern Ireland ended through multi-party negotiations, a public referendum, and power-sharing between unionists and nationalists. Station 2: Colombia-FARC Peace Deal — students examine how a 52-year guerrilla war ended through negotiations in Havana, a (failed) referendum, and a revised agreement, plus the Special Jurisdiction for Peace transitional justice system. Station 3: South Africa TRC — students explore how apartheid ended not through military victory but through negotiation, and how the Truth and Reconciliation Commission attempted to heal a divided society by prioritizing truth over punishment. Each station has guided questions. Students rotate in 15-minute intervals.',
      },
      {
        title: 'Comparative Analysis Workshop',
        duration: '30 min',
        desc: 'Back in their seats, students complete a comparative analysis chart. Columns: the three case studies. Rows: Which mechanisms were used? What role did international actors play? Was justice prioritized or peace? How long did negotiations take? Was the peace durable? Students identify commonalities — all three required difficult compromises, all involved some form of amnesty or reduced punishment, and all required sustained implementation over years, not just a signing ceremony.',
      },
      {
        title: 'Peace Negotiation Simulation',
        duration: '40 min',
        desc: 'Students participate in a simplified negotiation simulation based on a fictionalized conflict (a divided country where two ethnic groups contest control of a resource-rich border region). Roles include: Group A representatives, Group B representatives, international mediators, civil society advocates, and victims\' representatives. Each role has specific interests, red lines, and leverage. Students must negotiate a peace framework within the time limit. Debriefing focuses on: What compromises were hardest? What role did the mediator play? Did justice for victims conflict with the peace deal?',
      },
      {
        title: 'Design a Peace Framework',
        duration: '30 min',
        desc: 'Working in pairs, students select a current conflict from the site and design a realistic peace framework that incorporates at least three of the six mechanisms. They must justify each choice by explaining why that mechanism fits the specific conflict dynamics. For example, a framework for Ethiopia might prioritize a negotiated settlement with ethnic power-sharing, international mediation through the African Union, and a truth and reconciliation process for Tigray war crimes. Pairs present their frameworks to the class for feedback.',
      },
    ],
    discussionQuestions: [
      'The Colombia peace deal was rejected by voters in a referendum by a narrow margin, then revised and passed through Congress instead. Was this democratic? Should peace agreements require popular approval?',
      'South Africa chose truth over justice — most apartheid perpetrators were not imprisoned. Was this the right choice? Could lasting peace have been built if thousands of former officials were imprisoned instead?',
      'The Good Friday Agreement required both sides to share power even though they deeply disagreed. How do you govern with people you fundamentally oppose? Is power-sharing genuine peace or just managed conflict?',
      'Some wars end because one side wins decisively. Is military victory ever a legitimate "path to peace"? What historical examples support or challenge this?',
      'The site shows success rates for different peace mechanisms. Why does economic interdependence have the highest success rate (75%)? What does this tell us about what sustains peace?',
    ],
    assessment: 'Students submit a written peace framework (800-1000 words) for a current conflict of their choice. The framework must: (1) briefly analyze the conflict\'s root causes, (2) propose a multi-mechanism approach to peace, (3) explain who needs to be at the negotiation table and why, (4) address justice and accountability, and (5) identify the biggest obstacle to peace and how to overcome it. Assessment criteria: understanding of mechanisms (20%), quality of analysis (20%), realism of proposal (20%), consideration of justice (20%), and quality of writing (20%).',
  },
  {
    id: 'media-propaganda-conflict',
    title: 'Media, Propaganda & Conflict',
    subtitle: 'How media narratives shape public opinion about wars and peace',
    gradeLevel: 'high-school',
    duration: '3 class periods (50 min each)',
    subjects: ['Media Studies', 'Social Studies', 'English Language Arts', 'History'],
    conflictLinks: ['russia-ukraine', 'israel-palestine', 'syria'],
    objectives: [
      'Analyze how different media outlets frame the same conflict events and identify the narrative choices involved in framing',
      'Identify common propaganda techniques used during wartime including dehumanization, selective reporting, emotional manipulation, and information overload',
      'Evaluate the role of social media in spreading both information and misinformation during active conflicts',
      'Apply media literacy skills to critically assess news coverage of current conflicts featured on the site',
    ],
    materials: [
      'Curated examples of news coverage of the same event from 3-4 different outlets (teacher-prepared)',
      'Propaganda Techniques reference sheet (with historical and modern examples)',
      'Access to "The Path to Peace" conflict profiles for media narrative comparison',
      'Media Literacy Checklist handout (source, evidence, framing, missing perspectives, purpose)',
    ],
    activities: [
      {
        title: 'The Same Event, Different Stories',
        duration: '25 min',
        desc: 'Present students with 3-4 headlines and opening paragraphs from different outlets covering the same conflict event (e.g., a military operation, a peace negotiation, or a civilian casualty report). Students work in small groups to identify: What language choices differ? What facts are included or omitted? What emotional response does each version aim to create? Who is positioned as the protagonist or victim? Groups share their findings, and the class discusses how editorial choices shape understanding even when no outlet is technically lying.',
      },
      {
        title: 'Propaganda Through History',
        duration: '20 min',
        desc: 'A brief lecture with visuals covering the evolution of conflict propaganda: WWI recruitment posters, WWII radio broadcasts, Cold War fear campaigns, and modern social media manipulation. Students identify recurring techniques: dehumanization of the enemy (comparing them to animals or diseases), appeals to patriotism, selective use of statistics, manufactured atrocity stories, and the creation of false binaries (you are either with us or against us). Students then identify which of these techniques they have seen in current coverage of conflicts on the site.',
      },
      {
        title: 'Social Media Battlefield',
        duration: '30 min',
        desc: 'Examine how social media has transformed conflict reporting. Discussion topics: the democratization of information (anyone with a phone can document events), the speed problem (stories spread before verification), algorithmic amplification (outrage gets more engagement), bot networks and state-sponsored manipulation, and the emotional toll on viewers exposed to graphic content. Students analyze example social media posts about the Russia-Ukraine or Syria conflicts and practice fact-checking: Can the image be verified? Is the account authentic? Is the claim supported by multiple credible sources?',
      },
      {
        title: 'Critical Analysis Workshop',
        duration: '25 min',
        desc: 'Using the Media Literacy Checklist, students select a current conflict from the site and find two recent news articles about it from different sources. They complete the checklist for each article, analyzing: the credibility and potential biases of the source, the quality of evidence cited, how the conflict is framed (who is the aggressor, who is the victim, what is omitted), which perspectives are missing, and what purpose the article seems to serve. Students write a one-page comparative analysis.',
      },
      {
        title: 'Responsible Reporting Redesign',
        duration: '20 min',
        desc: 'Students work in pairs to "redesign" a biased or incomplete article about a conflict. They rewrite the headline to be more accurate, add missing context from the site\'s conflict profiles, include a perspective that was absent, and remove emotionally manipulative language while preserving the essential facts. Each pair presents their original and revised versions, explaining every change. The class discusses: Is perfectly objective reporting possible? If not, what standards should journalists aspire to?',
      },
    ],
    discussionQuestions: [
      'The phrase "one person\'s terrorist is another person\'s freedom fighter" is often used in conflict reporting. What does this mean, and how does it affect media coverage? Should journalists ever use the word "terrorist"?',
      'Social media allows civilians in conflict zones to share their experiences directly with the world. How has this changed conflict reporting compared to eras when all information was filtered through professional journalists?',
      'Governments at war often restrict press access and control information. Is this ever justified for security reasons, or is it always a form of propaganda? Where is the line?',
      'The site presents data on casualties, displacement, and root causes. Can data itself be biased? How might the way statistics are collected, categorized, and presented shape our understanding?',
      'You encounter a viral social media post showing a graphic image from a conflict zone with a caption blaming one side. What steps should you take before sharing it? What responsibilities do you have as a consumer and sharer of information?',
    ],
    assessment: 'Students produce a "Media Literacy Report Card" for coverage of one conflict from the site. They collect 5 news articles or social media posts about the conflict from different sources, evaluate each using the Media Literacy Checklist, identify the overall narrative patterns (which perspectives dominate, which are absent), and write a 600-word analysis concluding with recommendations for how a reader should approach coverage of this conflict. Grading: thoroughness of source collection (20%), quality of analysis (30%), identification of patterns (25%), and quality of recommendations (25%).',
  },
  {
    id: 'refugees-displacement',
    title: 'Refugees & Displacement: The Human Cost',
    subtitle: 'Understanding what it means to lose your home, your community, and your sense of safety',
    gradeLevel: 'middle-school',
    duration: '3 class periods (45 min each)',
    subjects: ['Social Studies', 'Geography', 'Language Arts', 'Health'],
    conflictLinks: ['sudan', 'syria', 'drc'],
    objectives: [
      'Define and distinguish between refugees, internally displaced persons (IDPs), and asylum seekers',
      'Use data from the site\'s dashboard to understand the scale of displacement in current conflicts including Sudan, Syria, and the DRC',
      'Describe the daily challenges faced by displaced people including loss of education, healthcare, livelihoods, and community',
      'Demonstrate empathy through perspective-taking activities and articulate why the protection of displaced people is a global responsibility',
    ],
    materials: [
      'Access to "The Path to Peace" dashboard section showing displacement statistics',
      'Printed "What Would You Take?" activity cards (listing common household items)',
      'World map with refugee route markings (teacher-prepared or printed)',
      'First-person narrative excerpts from displaced people (age-appropriate, teacher-curated)',
    ],
    activities: [
      {
        title: 'By the Numbers',
        duration: '15 min',
        desc: 'Students explore the site\'s dashboard and conflict profiles, recording the displacement statistics for Sudan (~10 million), Syria (~13 million since 2011), and the DRC (~7 million). The teacher contextualizes these numbers: 10 million displaced in Sudan is like every person in New York City and Los Angeles combined suddenly having to leave their home. Students calculate what percentage of each country\'s population has been displaced and mark major displacement routes on their maps.',
      },
      {
        title: 'What Would You Take?',
        duration: '20 min',
        desc: 'Students are told: "You have 15 minutes to leave your home. You might never return. You can carry one small bag." Each student receives a card listing 20 common items (family photos, phone, medicine, schoolbooks, favorite toy, water, food, blanket, money, ID documents, change of clothes, etc.) and must choose only 5. After choosing, students share in small groups: What did you prioritize and why? What was hardest to leave behind? Then the teacher adds complications: "The road is dangerous, and you must walk for 3 days. Remove 2 more items." This visceral exercise builds empathy for the impossible choices displaced people face.',
      },
      {
        title: 'Three Stories of Displacement',
        duration: '25 min',
        desc: 'Students read age-appropriate first-person narrative excerpts from three displaced people: a teenager who fled Sudan when fighting reached their city, a Syrian family that has been in a refugee camp for years, and a child from eastern DRC who was separated from their parents during an attack. For each story, students answer guided questions: What caused this person to flee? What challenges did they face during their journey? What do they miss most? What are they hoping for? Class discussion focuses on the common threads across all three stories despite different conflicts and continents.',
      },
      {
        title: 'The Refugee Journey Map',
        duration: '20 min',
        desc: 'In small groups, students create an illustrated journey map for a fictional displaced family based on the patterns they observed in the stories and data. The map includes: their home (what it was like before), the trigger event (what made them leave), the journey (obstacles, dangers, border crossings), arrival at a camp or new country (what they found), and daily life in displacement (school, food, shelter, safety). Groups share their maps and discuss: What support did their fictional family need at each stage? Who should provide that support?',
      },
      {
        title: 'What Can We Do?',
        duration: '15 min',
        desc: 'Students brainstorm actions they can take in response to displacement crises. The teacher guides them from the personal level (learning more, telling others, showing empathy to newcomers in their community) to the community level (supporting local refugee resettlement organizations, collecting supplies, volunteering) to the systemic level (understanding why people are displaced and supporting conflict prevention). Each student writes a personal pledge: one specific thing they will do in the next month.',
      },
    ],
    discussionQuestions: [
      'What is the difference between a refugee and an immigrant? Why does this distinction matter in terms of legal protections and how people are treated?',
      'The site shows that Sudan has approximately 10 million displaced people. That is almost one in every four people in the country. How would your community change if one in four people suddenly had to leave?',
      'Some countries welcome refugees while others close their borders. What are the arguments on both sides? What do you think countries owe to people fleeing war?',
      'Many displaced children cannot attend school, sometimes for years. How does losing access to education affect a person\'s future? How does it affect an entire generation and the possibility of future peace?',
      'How can we show empathy and support for displaced people in our own communities without treating them as helpless? Why is it important to recognize refugees as people with skills, dreams, and agency?',
    ],
    assessment: 'Students create a "Displacement Awareness Project" in a format of their choice: a poster, a short illustrated story, a letter to a political leader, or a presentation. The project must include: (1) accurate statistics about displacement from at least one conflict on the site, (2) a description of the human experience of displacement based on what they learned, (3) at least one concrete action they or their community could take, and (4) a personal reflection on how this lesson changed their understanding. Grading: accuracy of information (25%), empathy and understanding shown (25%), quality of action proposal (25%), and effort and presentation (25%).',
  },
  {
    id: 'nuclear-weapons-global-security',
    title: 'Nuclear Weapons & Global Security',
    subtitle: 'Understanding the weapons that could end civilization and the fragile systems that prevent their use',
    gradeLevel: 'university',
    duration: '4 class periods (75 min each)',
    subjects: ['Political Science', 'International Relations', 'History', 'Ethics', 'Security Studies'],
    conflictLinks: ['north-korea', 'taiwan', 'russia-ukraine'],
    objectives: [
      'Explain the theory of mutually assured destruction (MAD), its historical development, and its strengths and limitations as a deterrence framework',
      'Trace the evolution of nuclear arms control from the Partial Test Ban Treaty through New START, identifying what made agreements possible and what caused them to erode',
      'Analyze current nuclear tensions including North Korea\'s arsenal, the role of nuclear threats in the Russia-Ukraine conflict, and the strategic calculus surrounding Taiwan',
      'Evaluate competing perspectives on nuclear policy — from abolition to modernization — and construct a reasoned argument for a specific policy position',
    ],
    materials: [
      'Access to "The Path to Peace" Root Causes section (Nuclear Weapons & Arms Proliferation) and relevant conflict profiles',
      'Excerpts from foundational texts: Schelling\'s "The Strategy of Conflict," Sagan\'s "The Limits of Safety," and the Bulletin of the Atomic Scientists\' Doomsday Clock statements',
      'Nuclear arsenals data visualization (current stockpiles by country)',
      'Arms control treaty timeline handout (1963 PTBT through 2021 TPNW)',
    ],
    activities: [
      {
        title: 'The Logic of MAD',
        duration: '30 min',
        desc: 'Lecture and Socratic seminar on the theory and history of nuclear deterrence. Beginning with the Manhattan Project and Hiroshima, trace how deterrence theory developed through the Cold War: first-strike capability, second-strike capability, the triad, launch-on-warning postures, and the concept of "mutually assured destruction." Introduce the key debate: has MAD prevented great-power war since 1945, or have we been lucky? Discuss the Stanislav Petrov incident (1983), the Able Archer scare (1983), and other near-misses. Students engage with the paradox: weapons designed never to be used must be credibly threatening to work, but any miscalculation could end civilization.',
      },
      {
        title: 'Arms Control: Building and Losing Trust',
        duration: '40 min',
        desc: 'Students analyze the history of nuclear arms control as a case study in international cooperation. Working through the timeline: PTBT (1963), NPT (1968), SALT I/II, INF Treaty (1987), START I/II, New START (2010), and the TPNW (2017). For each agreement, identify: What made it possible? What did it achieve? Why did some agreements collapse? Focus on the current erosion: the US withdrew from the INF Treaty in 2019, Russia suspended New START in 2023, and no successor framework exists. Students debate: Is arms control dead, or can it be revived? What would a new framework need to address that previous ones did not (e.g., hypersonic weapons, cyberwarfare, AI-enabled systems)?',
      },
      {
        title: 'Current Nuclear Flashpoints',
        duration: '45 min',
        desc: 'Using the site\'s conflict profiles, students conduct deep analyses of three nuclear flashpoints. Group 1: North Korea — Why has deterrence not prevented proliferation? Analyze the regime\'s nuclear calculus, the failure of the Agreed Framework (1994) and Six-Party Talks, and whether denuclearization is still achievable. Group 2: Russia-Ukraine — How have Russian nuclear threats constrained Western response? Analyze nuclear signaling, the doctrine of "escalate to de-escalate," and the implications for the NPT. Group 3: Taiwan — How does the US nuclear umbrella factor into cross-strait deterrence? Analyze the strategic ambiguity policy, China\'s nuclear modernization, and escalation pathways. Groups present findings and the class discusses interconnections.',
      },
      {
        title: 'Policy Debate: The Future of Nuclear Weapons',
        duration: '40 min',
        desc: 'Structured debate on four positions: (1) Global abolition — nuclear weapons are an existential threat that must be eliminated (TPNW advocates), (2) Minimum deterrence — reduce arsenals to the minimum needed for deterrence, (3) Modernization — update and maintain current arsenals to ensure deterrence remains credible in an era of new technologies, (4) Arms control revival — prioritize a new framework of bilateral and multilateral treaties. Students are assigned positions regardless of personal views. Each team presents arguments, cross-examines opponents, and offers rebuttals. Debriefing focuses on: What assumptions underlie each position? Which position accounts best for the world as it actually is versus as we wish it were?',
      },
      {
        title: 'Emerging Threats Seminar',
        duration: '30 min',
        desc: 'Discussion seminar on how new technologies are destabilizing the nuclear order. Topics include: hypersonic missiles (compressing decision time), AI in command-and-control (autonomous launch capabilities), cyber threats to nuclear systems (spoofing warnings), the weaponization of space (anti-satellite weapons threatening early warning), and the blurring line between conventional and nuclear weapons (dual-capable delivery systems). For each threat, students assess: How does this change the calculus of deterrence? What new risks does it create? What governance or treaty mechanisms would be needed? Students write a policy brief proposing how to address one emerging threat.',
      },
    ],
    discussionQuestions: [
      'The philosopher Daniel Ellsberg argued that the very existence of nuclear weapons means nuclear war is inevitable given enough time — that we are playing Russian roulette with civilization. How do you evaluate this argument? What is the counter-argument?',
      'The NPT creates a two-tier system: five recognized nuclear states and everyone else. Countries like India, Pakistan, and Israel never signed. Is this framework fundamentally unjust? Does that injustice undermine its effectiveness?',
      'Russia has made implicit and explicit nuclear threats during the Ukraine invasion. How should NATO and the West respond? Does backing down reward nuclear blackmail? Does escalating risk nuclear war?',
      'North Korea argues that it developed nuclear weapons because it watched what happened to Libya and Iraq — states that gave up their weapons programs and were subsequently attacked or overthrown. Is this a rational argument? What does it imply for non-proliferation efforts?',
      'If you could design the ideal nuclear governance framework for 2030, what would it include? How would you address the tension between sovereign nations\' right to self-defense and the collective interest in preventing nuclear catastrophe?',
    ],
    assessment: 'Students write a 2000-word policy paper addressed to their country\'s national security advisor. The paper must: (1) assess the current nuclear threat landscape with reference to at least two flashpoints from the site, (2) evaluate the effectiveness of existing arms control frameworks, (3) analyze one emerging technology that threatens nuclear stability, (4) propose a specific policy recommendation with supporting arguments, and (5) address the strongest counter-argument to their proposal. Grading: quality of threat assessment (20%), understanding of arms control history (20%), analysis of emerging threats (20%), strength of policy proposal (20%), and engagement with counter-arguments (20%).',
  },
  {
    id: 'building-peace-theory-to-action',
    title: 'Building Peace: From Theory to Action',
    subtitle: 'Turning knowledge about conflict and peace into personal and collective action',
    gradeLevel: 'high-school',
    duration: '5 class periods (50 min each)',
    subjects: ['Social Studies', 'Civics', 'Service Learning', 'Ethics'],
    conflictLinks: ['sudan', 'myanmar', 'haiti'],
    objectives: [
      'Connect the site\'s "Path Forward" and "What You Can Do" frameworks to their own capacity for meaningful action',
      'Analyze how historical peace movements — from anti-apartheid to nuclear disarmament — translated individual action into systemic change',
      'Design a realistic peace initiative that addresses a specific aspect of a current conflict or conflict-related issue',
      'Present and defend their peace initiative to peers, incorporating feedback to strengthen the proposal',
    ],
    materials: [
      'Access to "The Path to Peace" Path Forward and Take Action sections',
      'Case study briefs on successful citizen-led peace movements (anti-apartheid, nuclear freeze, landmine ban)',
      'Peace Initiative Design template (problem, goal, audience, actions, timeline, resources, measurement)',
      'Peer review rubric for initiative presentations',
    ],
    activities: [
      {
        title: 'The Power of Ordinary People',
        duration: '25 min',
        desc: 'Students explore three case studies of citizen-led movements that changed the course of conflicts. Case 1: The anti-apartheid movement — how boycotts, divestment campaigns, and sustained international pressure helped end apartheid in South Africa. Case 2: The International Campaign to Ban Landmines — how a coalition of NGOs, led by Jody Williams, achieved an international treaty banning antipersonnel mines. Case 3: The nuclear freeze movement of the 1980s — how millions of ordinary citizens marching and organizing contributed to pressure for arms reduction treaties. For each, students identify the key strategies used and why they were effective.',
      },
      {
        title: 'From the Site to the Self',
        duration: '20 min',
        desc: 'Students explore the Take Action section of the site in detail, reading through each category of action: educating yourself and others, demanding action from leaders, supporting peace organizations, and using economic power. For each category, students rate themselves honestly: "I already do this / I could start doing this / I had not considered this." Students then identify the three most impactful actions they could realistically take in their current lives. Class discussion: What barriers prevent us from acting? How can we overcome them? Why does "I\'m just one person" thinking persist despite historical evidence to the contrary?',
      },
      {
        title: 'Peace Initiative Design Workshop (Day 1)',
        duration: '50 min',
        desc: 'Students begin designing their own peace initiative. This must be a realistic, actionable project — not a fantasy. Examples: organizing a school awareness campaign about a specific conflict, creating an educational social media account, writing letters to elected officials about arms exports, organizing a fundraiser for a specific humanitarian organization, or starting a discussion group. Using the design template, students define: the specific problem they want to address, their concrete goal, their target audience, the specific actions they will take, a realistic timeline, what resources they need, and how they will measure success. Teacher circulates and provides guidance, pushing students toward specificity and realism.',
      },
      {
        title: 'Peace Initiative Design Workshop (Day 2)',
        duration: '50 min',
        desc: 'Students refine their initiatives based on teacher feedback and conduct peer review. Each student pairs with a partner who critiques their plan using a structured rubric: Is the problem clearly defined? Is the goal realistic? Are the actions specific enough? Is the timeline achievable? What could go wrong? Pairs work together to strengthen each other\'s proposals. In the final 20 minutes, students prepare a 3-minute presentation of their initiative. The presentation must answer: What problem are you addressing? Why does it matter? What specifically will you do? How will you know if you succeeded?',
      },
      {
        title: 'Initiative Presentations and Commitment',
        duration: '50 min',
        desc: 'Students deliver their 3-minute presentations to the class. After each presentation, two peers offer one piece of positive feedback and one constructive suggestion. After all presentations, the class votes on the "Most Impactful," "Most Creative," and "Most Achievable" initiatives. The lesson concludes with a commitment ceremony: students who wish to actually implement their initiative sign a public commitment board and exchange contact information with classmates who want to help. The teacher establishes a check-in date 4 weeks later to discuss progress.',
      },
    ],
    discussionQuestions: [
      'The site\'s Take Action section says "every purchase is a vote." What does this mean in the context of conflicts fueled by resources like coltan in the DRC or oil in various conflicts? Can consumer choices really affect wars?',
      'Social media activism is sometimes dismissed as "slacktivism" — performative actions that feel good but accomplish nothing. When is online activism effective and when is it not? What distinguishes meaningful digital engagement from empty gestures?',
      'The anti-apartheid movement took decades to succeed. How do you sustain motivation for change when progress is slow or invisible? What keeps peace activists going?',
      'Is there a tension between understanding all sides of a conflict (as the site encourages) and taking a moral stand? Can you be both empathetic to all perspectives and committed to justice?',
      'What is the relationship between local action and global change? Can organizing a school awareness campaign about the Sudan conflict actually help people in Sudan? If so, how? If not, is there still value in it?',
    ],
    assessment: 'Assessment has two components. Component 1 (40%): The written peace initiative proposal, evaluated on: clarity of problem definition, realism of goals, specificity of actions, quality of implementation plan, and thoughtfulness of success metrics. Component 2 (40%): The oral presentation, evaluated on: clarity of communication, persuasiveness, engagement with audience questions, and demonstrated passion and understanding. Component 3 (20%): A personal reflection essay (300-500 words) answering: What did you learn about the gap between understanding a problem and acting on it? How has your sense of personal agency changed? What will you actually do going forward?',
  },
];


// ============================================
// 2. LEARNING MODULES
// ============================================

export const learningModules = [
  {
    id: 'understanding-conflict',
    title: 'Understanding Conflict',
    subtitle: 'What causes wars, why they persist, and the toll they take',
    icon: '🔍',
    color: '#3498db',
    estimatedTime: '45 minutes',
    steps: [
      {
        title: 'What Is Conflict — And When Does It Become Violence?',
        content: 'Conflict is a natural part of human existence. Whenever people or groups have competing interests, values, or needs, conflict arises. In itself, conflict is not inherently destructive — political disagreements, labor disputes, and territorial negotiations are all forms of conflict that societies manage peacefully every day. The critical question is not whether conflict exists but whether it is managed through institutions, dialogue, and compromise, or whether it escalates into organized violence.\n\nThe transition from conflict to armed violence typically follows a pattern. Political scientists have identified several preconditions: a grievance (real or perceived) that a significant group holds against the state or another group; the failure of existing institutions to address that grievance through legitimate channels; the availability of weapons and fighters; and often, leaders who benefit from escalation and actively choose violence over compromise. This last factor — the role of individual leaders and their calculations — is frequently underestimated. Many societies with deep grievances remain peaceful because their leaders choose negotiation. Others descend into war because leaders calculate that violence serves their interests.\n\nIt is also important to distinguish between different types of armed conflict. Interstate wars between countries (like the Russia-Ukraine war) are relatively rare in the modern era but enormously destructive. Civil wars within countries (like Sudan and Syria) are far more common and tend to last longer. Internationalized civil wars — where external powers intervene on different sides — are the deadliest and hardest to resolve because they involve so many actors with competing interests. Finally, there are non-state conflicts between armed groups, which are increasingly common in areas of weak governance like the Sahel.\n\nUnderstanding these distinctions matters because each type of conflict has different drivers, dynamics, and pathways to resolution. A border dispute between two countries requires different tools than an ethnic civil war or a conflict over resource extraction. Effective peacebuilding starts with accurately diagnosing what kind of conflict you are looking at.',
        keyInsight: 'Conflict is natural and manageable; it is the failure of institutions, the choices of leaders, and the availability of weapons that turn conflict into war.',
        linkedSection: '#root-causes',
      },
      {
        title: 'The 7 Root Causes of Armed Conflict',
        content: 'Research across hundreds of conflicts reveals that wars tend to arise from a set of recurring root causes. This site identifies seven, and understanding them is the foundation of conflict literacy.\n\nFirst, resources and economic greed — the competition for oil, minerals, water, land, and strategic trade routes has driven conflict throughout history. In the modern era, this extends to critical minerals like coltan and cobalt in the DRC, whose extraction funds armed groups. Second, power and governance failure — when governments exclude major groups, concentrate power in an authoritarian leader, or collapse entirely, the conditions for rebellion emerge. The single strongest predictor of civil war is poor governance. Third, identity, ethnicity, and religion — when political leaders weaponize ethnic or religious differences to gain or maintain power, they create fractures that can explode into violence. Identity conflicts are rarely about identity alone; they are about who has power and who is excluded.\n\nFourth, colonial legacy — the borders drawn by European colonial powers across Africa, the Middle East, and Asia often forced different groups together or split single groups apart, creating states with built-in tensions. The institutional weakness left by extractive colonial economies compounds the problem. Fifth, nuclear weapons and arms proliferation — the existence of weapons that can end civilization creates unique risks, while the global arms trade floods conflict zones with the weapons that do the actual killing. Sixth, geopolitical rivalry — when great powers compete for influence, smaller nations become battlefields for proxy wars, as seen throughout the Cold War and today in Yemen, Syria, and the Sahel. Seventh, climate change — not a direct cause of war, but a threat multiplier that intensifies every existing tension by driving drought, displacement, and resource competition.\n\nThe critical insight is that these causes rarely operate in isolation. The Sudan civil war involves governance failure, resource competition, geopolitical rivalry, and colonial legacy simultaneously. Effective conflict prevention requires addressing multiple causes at once, not just the most visible one.',
        keyInsight: 'Wars almost never have a single cause — they emerge from the interaction of multiple root causes, and effective prevention must address this complexity.',
        linkedSection: '#root-causes',
      },
      {
        title: 'How Root Causes Interact and Overlap',
        content: 'One of the most important lessons from studying armed conflict is that root causes do not exist in neat, separate categories. They interact, reinforce, and amplify each other in ways that make conflicts more intense, more durable, and harder to resolve.\n\nConsider the pattern of a "conflict trap." A country with weak governance (cause 2) fails to manage ethnic tensions (cause 3), leading to violence. The violence destroys infrastructure and disrupts the economy, creating poverty and desperation (cause 1 — resources). Neighboring countries intervene to support different sides for their own strategic interests (cause 6 — geopolitical rivalry). The influx of weapons and money from external patrons sustains the fighting even when both sides are exhausted. Meanwhile, climate change (cause 7) worsens food insecurity, driving more people into the arms of armed groups who offer food and protection. The original colonial borders (cause 4) that created the multi-ethnic state remain unchanged, and the conflict takes on an identity dimension as each side dehumanizes the other.\n\nThis pattern — where causes compound and create feedback loops — explains why some conflicts last for decades. The Syria conflict began with governance failure (Assad\'s brutal response to protests) but rapidly accumulated additional causes: sectarian identity (Sunni vs. Alawite), geopolitical rivalry (Russia and Iran vs. the US and Gulf states), resource competition (oil fields), and climate stress (a severe drought preceded the war). Each new layer made resolution more complex because any peace deal would need to address all of them.\n\nThe overlap also explains why peace agreements so often fail. A deal that addresses the political power-sharing question but ignores economic grievances or external interference will not hold. Research shows that peace agreements are most durable when they address the full range of root causes, not just the most prominent one. This is why the most successful peace processes — like the Northern Ireland peace process — took years and addressed political, economic, cultural, and security dimensions simultaneously.\n\nUnderstanding cause interaction also reveals leverage points. If climate change amplifies existing tensions, then climate adaptation can reduce conflict risk. If weak governance enables all other causes, then governance reform has outsized impact. Effective policy targets the connections between causes, not just individual causes in isolation.',
        keyInsight: 'Root causes create feedback loops that trap societies in cycles of violence — breaking these loops requires addressing multiple causes simultaneously, not just the most visible one.',
        linkedSection: '#root-causes',
      },
      {
        title: 'Why Some Conflicts Last Decades',
        content: 'The average civil war lasts about ten years, but many persist for far longer. The Israel-Palestine conflict has roots going back over 75 years. The DRC has experienced cycles of violence for nearly three decades. Colombia\'s civil war lasted 52 years before the 2016 peace deal. Understanding why conflicts become protracted is essential for finding ways to end them.\n\nThe first factor is war economies. When armed groups can finance themselves through resource extraction — diamonds in Sierra Leone, coltan in the DRC, gold in Sudan, opium in Afghanistan — peace becomes economically disadvantageous for those in power. The commanders and warlords who control mines, trade routes, or drug production have a direct financial incentive to keep fighting. This creates what economists call a "greed-based" conflict that persists even when the original political grievance has faded.\n\nThe second factor is external intervention. When foreign powers supply weapons, money, and diplomatic support to different sides, they sustain conflicts that might otherwise reach a stalemate forcing negotiation. The Cold War extended dozens of conflicts across Africa, Asia, and Latin America by decades. Today, the same pattern plays out: the UAE\'s support for the RSF in Sudan, Iran\'s support for the Houthis in Yemen, and Russia\'s support for Assad in Syria all prolonged those wars.\n\nThe third factor is identity hardening. As conflicts persist, identities solidify around the conflict itself. Communities that have suffered together develop strong in-group bonds and deep distrust of the other side. Children born during war grow up knowing nothing else. The conflict becomes part of who people are, making compromise feel like betrayal of those who died. This psychological dimension is why truth and reconciliation processes are so important — they attempt to create space for new identities not defined by enmity.\n\nThe fourth factor is institutional destruction. War destroys the very institutions needed to manage peace — courts, schools, civil services, infrastructure. The longer a war lasts, the harder it is to rebuild these institutions, and without them, any peace agreement lacks the administrative capacity for implementation. This is why post-conflict reconstruction, as the site\'s How Wars End section explains, is not a luxury but a necessity.\n\nFinally, spoilers — individuals or groups who benefit from continued conflict and actively sabotage peace efforts — play a crucial role. Peace processes are often derailed not by the main parties but by hardliners on both sides who fear that peace will reduce their power.',
        keyInsight: 'Wars persist because powerful actors profit from them, external powers sustain them, identities harden around them, institutions are destroyed by them, and spoilers sabotage every attempt to end them.',
        linkedSection: '#current',
      },
      {
        title: 'The Human Cost: Beyond the Numbers',
        content: 'Statistics tell part of the story. The site\'s dashboard tracks casualties, displacement, and other metrics for each conflict. But numbers alone cannot capture the full human cost of war.\n\nThe most immediate cost is death, but the pattern of killing in modern conflicts has shifted dramatically. In World War I, approximately 90% of casualties were soldiers. In contemporary conflicts, civilians account for an estimated 90% of casualties — a complete inversion. Modern wars are fought in cities and towns, with artillery, airstrikes, and siege tactics that do not discriminate between combatants and civilians. The consequences extend far beyond direct violence: for every person killed in combat, many more die from the collapse of healthcare systems, the spread of disease, malnutrition, and the destruction of water and sanitation infrastructure.\n\nDisplacement is another devastating consequence. As of 2024, over 120 million people worldwide were forcibly displaced — more than at any time in recorded history. Displacement means losing not just your home but your livelihood, your community, your children\'s education, and your sense of belonging and safety. Many displaced people spend years or even decades in temporary situations, unable to return home and unable to fully rebuild their lives elsewhere. Children displaced by conflict are far more likely to miss years of schooling, with cascading effects on their future opportunities and on the economic recovery of their entire society.\n\nThe psychological toll is enormous and long-lasting. Trauma from violence, loss, and displacement affects not just individuals but entire communities. Post-traumatic stress, depression, and anxiety are widespread in conflict-affected populations. And trauma can be transmitted across generations — children of traumatized parents show higher rates of psychological difficulties even if they did not directly experience the violence themselves. This intergenerational trauma helps explain why some societies struggle to build peace even decades after a war ends.\n\nConflict also reverses development gains. Wars destroy schools, hospitals, roads, and power systems that took decades to build. Countries that experience civil war see an average decline in GDP of about 15%, and it takes an average of 14 years after peace to return to pre-war economic levels. In some cases, like the DRC and Somalia, decades of conflict have prevented development entirely.\n\nThese costs fall disproportionately on the most vulnerable: women, children, the elderly, and people with disabilities. Conflict-related sexual violence is used as a deliberate weapon of war in many conflicts. Children are recruited as soldiers. The elderly and disabled are the least able to flee when violence comes.',
        keyInsight: 'Modern wars kill far more civilians than soldiers, displace millions for years, inflict psychological wounds that span generations, and destroy the foundations of development that took decades to build.',
        linkedSection: '#dashboard',
      },
    ],
    quiz: 'quiz-understanding-conflict',
  },
  {
    id: 'how-peace-is-built',
    title: 'How Peace Is Built',
    subtitle: 'The mechanisms, institutions, and choices that end wars and sustain peace',
    icon: '🕊️',
    color: '#2ecc71',
    estimatedTime: '40 minutes',
    steps: [
      {
        title: 'Negotiation and Compromise: The Hardest Path',
        content: 'Research consistently shows that negotiated settlements, when properly implemented, produce more durable peace than military victories. Yet negotiation is agonizingly difficult because it requires both sides to accept less than they want and to sit across the table from people they may consider enemies or war criminals.\n\nSuccessful negotiations share several common features. First, they typically require a "mutually hurting stalemate" — a point at which both sides recognize they cannot achieve their goals through continued fighting and that the cost of war has become unbearable. This does not mean both sides are equally damaged, but both must conclude that negotiation offers a better outcome than continued conflict. Second, successful negotiations require credible mediators — third parties trusted by both sides who can facilitate communication, propose solutions, and provide guarantees.\n\nThe Good Friday Agreement (1998) illustrates these principles. After nearly 30 years of violence in Northern Ireland (the Troubles), a combination of war-weariness, changing demographics, strong mediators (US Senator George Mitchell), and political courage produced an agreement that ended most of the violence. The agreement addressed multiple dimensions: political power-sharing between unionists and nationalists, cross-border institutions linking Northern Ireland and the Republic of Ireland, decommissioning of paramilitary weapons, early release of prisoners, and police reform. Each element was controversial, and the agreement was far from perfect, but it ended a conflict that had killed over 3,500 people.\n\nThe Colombia-FARC peace deal (2016) shows both the promise and difficulty of negotiation. After 52 years of guerrilla warfare, the Colombian government and FARC rebels reached a comprehensive agreement covering land reform, political participation for former rebels, drug crop substitution, transitional justice, and victims\' rights. When the agreement was narrowly rejected in a public referendum — partly due to opposition to reduced sentences for FARC commanders who committed atrocities — the government revised the deal and passed it through Congress. Implementation has been uneven, with former FARC areas still experiencing violence, but the overall level of conflict has dramatically decreased.\n\nNegotiation requires something deeply counterintuitive: the willingness to offer your enemy a future they can accept. Peace deals that humiliate or exclude the losing side almost always fail, because desperate people with nothing to lose return to violence.',
        keyInsight: 'Lasting peace requires both sides to accept less than they want — deals that humiliate or exclude the losing side almost always collapse back into war.',
        linkedSection: '#how-wars-end',
      },
      {
        title: 'International Institutions and Mediation',
        content: 'No conflict exists in isolation. The international community — through the United Nations, regional organizations, and individual mediating nations — plays a crucial role in ending wars and keeping peace. Understanding how these institutions work, and why they sometimes fail, is essential.\n\nThe United Nations was founded in 1945 with the explicit mission of preventing future wars. Its Security Council can authorize peacekeeping operations, impose sanctions, and refer cases to the International Criminal Court. UN peacekeeping missions, despite their limitations, have a strong track record: research shows that the deployment of UN peacekeepers reduces the recurrence of violence by approximately 50%. Countries like Mozambique, El Salvador, Cambodia, and Timor-Leste transitioned from war to peace with significant UN support.\n\nRegional organizations often play equally important roles. The African Union mediated the Pretoria Agreement (2022) that ended active fighting in the Tigray war in Ethiopia — a conflict that killed hundreds of thousands. The European Union, originally designed as a peace project to prevent another European war, has been remarkably successful at that core mission. ASEAN played a key role in the Cambodian peace process in the early 1990s.\n\nHowever, international institutions face serious limitations. The UN Security Council is frequently paralyzed by vetoes from its five permanent members (the US, Russia, China, France, and the UK), particularly when one of those powers is involved in or allied with a party to the conflict. Russia\'s veto power has blocked UN action on Syria and Ukraine. The US has used its veto to shield Israel from Security Council resolutions. This structural problem means that the UN is often most effective in conflicts where no great power has a strong stake.\n\nMediation by individual nations can sometimes succeed where multilateral institutions fail. Norway facilitated the Oslo Accords between Israel and the PLO in 1993. Switzerland has long served as a neutral host for sensitive negotiations. Qatar mediated between warring factions in several conflicts. The effectiveness of these mediators depends on their perceived neutrality, their willingness to commit resources and sustained attention, and the willingness of the warring parties to engage.\n\nThe most important lesson is that international institutions are tools — they are only as effective as the political will behind them. When powerful nations prioritize peace and commit resources to mediation, peacekeeping, and post-conflict support, the results can be transformative. When they do not, even the best-designed institutions are impotent.',
        keyInsight: 'International institutions reduce conflict recurrence by 50% when deployed, but they are only as effective as the political will of the powerful nations behind them.',
        linkedSection: '#how-wars-end',
      },
      {
        title: 'Economic Interdependence: Making War Irrational',
        content: 'One of the most powerful forces for peace is making war economically irrational. When nations\' economies are deeply intertwined — through trade, investment, shared infrastructure, and integrated supply chains — the cost of conflict becomes prohibitively high for both sides. This is not a modern insight: the philosopher Immanuel Kant argued in 1795 that commerce would make war obsolete because nations would have too much to lose.\n\nThe most dramatic example is the European Union. After centuries of devastating wars culminating in two world wars that killed over 70 million people, European leaders decided to bind their economies together so tightly that war would become impossible. The European Coal and Steel Community (1951) — which pooled the very resources used to make weapons — evolved into the European Economic Community and eventually the EU. Today, a war between France and Germany is essentially unthinkable, not because they have forgotten their grievances but because their economies, institutions, and societies are so deeply interconnected that separation would be catastrophic for both.\n\nThe Asia-Pacific region offers another example. Despite serious tensions — North Korea\'s nuclear program, the Taiwan situation, territorial disputes in the South China Sea — the region has avoided major interstate war for decades partly because economic integration through ASEAN and bilateral trade relationships has created powerful incentives for stability. China is simultaneously a major trading partner and a strategic rival to many of its neighbors, creating a complex web of interests that restrains escalation.\n\nHowever, economic interdependence has limitations as a peace strategy. It works best between states with comparable economic power and where the economic relationship is mutually beneficial. It is less effective when the relationship is asymmetric or exploitative — colonial economic relationships did not prevent colonized peoples from eventually revolting. It also may not prevent war when leaders calculate that short-term political or strategic gains outweigh long-term economic costs, as Russia\'s invasion of Ukraine demonstrated despite significant economic ties with Europe.\n\nThe post-conflict application is equally important. The Marshall Plan — America\'s massive investment in rebuilding Europe after World War II, including former enemies Germany and Japan — is perhaps history\'s most successful peace initiative. By helping devastated nations rebuild prosperous economies, it eliminated the economic desperation that had fueled extremism and created new partners rather than permanent enemies. The lesson: investing in the economic recovery of former adversaries is not charity but strategic peacebuilding.\n\nModern applications include trade agreements between former adversaries, joint economic development zones in border areas, and international investment in conflict-affected regions. The key principle is that people who prosper together are far less likely to fight each other.',
        keyInsight: 'When economies are deeply intertwined, war becomes irrational — the European Union proved that binding former enemies together economically is the most durable peace strategy in history.',
        linkedSection: '#how-wars-end',
      },
      {
        title: 'Truth, Justice, and Reconciliation',
        content: 'After a war or period of mass violence, societies face an agonizing dilemma: How do you reckon with the past without being destroyed by it? How do you achieve justice for victims without making peace impossible? How do you enable former enemies to live side by side? There are no easy answers, but decades of practice have produced models that, while imperfect, offer paths forward.\n\nTruth commissions investigate and document what happened during a conflict, creating an authoritative record that both acknowledges victims\' suffering and prevents future denial. South Africa\'s Truth and Reconciliation Commission (TRC), chaired by Archbishop Desmond Tutu, is the most famous example. Perpetrators of apartheid-era violence could receive amnesty in exchange for full, public disclosure of their crimes. The process was painful and controversial — many victims felt that amnesty was unjust, while many perpetrators felt humiliated by public exposure. Yet the TRC is widely credited with helping South Africa avoid the retaliatory bloodbath that many predicted during the transition from apartheid.\n\nWar crimes tribunals take a different approach, prioritizing criminal accountability. The International Criminal Tribunal for the former Yugoslavia (ICTY) prosecuted leaders responsible for genocide and war crimes during the Balkan wars of the 1990s, including former Serbian president Slobodan Milosevic. The International Criminal Court (ICC), established in 2002, provides a permanent institution for prosecuting the worst atrocities. However, tribunals face criticism: they are slow (ICTY operated for 24 years), expensive, and can be perceived as "victors\' justice" if they only prosecute one side.\n\nCommunity-based justice offers a third model. Rwanda\'s Gacaca courts processed nearly two million genocide cases through community tribunals where perpetrators confessed before their neighbors and victims. This approach was far faster and more accessible than formal courts, though critics raised concerns about due process and the pressure on defendants to confess. Colombia\'s Special Jurisdiction for Peace attempts to combine elements of all three approaches: truth-telling, reduced sentences (not amnesty) for those who confess fully, and reparations for victims.\n\nThe fundamental tension is between peace and justice. Strict justice — prosecuting and imprisoning all perpetrators — can make peace negotiations impossible because leaders will never agree to a deal that sends them to prison. Complete amnesty can leave victims feeling betrayed and create a culture of impunity. Most successful transitions find a middle ground, but what that middle ground looks like depends on the specific context, the balance of power, and what victims themselves want.\n\nReconciliation — the long-term process of rebuilding trust between former enemies — goes beyond any formal mechanism. It requires education, contact between divided communities, shared economic opportunities, and time. Generations may need to pass before reconciliation is truly achieved, but the process must start somewhere.',
        keyInsight: 'Societies emerging from war must navigate the tension between justice and peace — too much of either can undermine the other, and finding the right balance is the hardest question in peacebuilding.',
        linkedSection: '#how-wars-end',
      },
      {
        title: 'What Makes Peace Last?',
        content: 'Ending a war is only the beginning. Roughly half of all countries that experience civil war relapse into conflict within a decade. Understanding what distinguishes durable peace from temporary ceasefires is perhaps the most important question in the study of conflict.\n\nThe evidence points to several factors that make peace last. First, inclusive political settlements. Peace agreements that include all major stakeholders — not just the armed groups but also civil society, women\'s organizations, business leaders, and marginalized communities — are significantly more durable. Research by the International Peace Institute found that peace processes with women\'s participation are 35% more likely to last at least 15 years. Exclusion breeds resentment, and resentment breeds a return to violence.\n\nSecond, economic recovery and opportunity. People who can see a peaceful future that is materially better than a return to war have a powerful incentive to sustain peace. This is why post-conflict economic investment — jobs, infrastructure, education — is not secondary to the political settlement but integral to it. The Marshall Plan worked because it gave Europeans a stake in peace. Post-conflict societies that experience economic stagnation are far more likely to relapse.\n\nThird, security sector reform. The transition from war to peace requires transforming the security forces — integrating former combatants, professionalizing the military and police, and establishing civilian oversight. Without this, armed groups retain the capacity to resume fighting, and the security forces themselves may become predatory. The failure to reform the military in Sudan after the 2019 revolution directly contributed to the current civil war between two military factions that were never brought under civilian control.\n\nFourth, international commitment. Peace processes need sustained international attention, resources, and pressure — not just during negotiations but for years afterward during implementation. The international community often moves on to the next crisis, leaving fragile peace agreements without the support needed to succeed. UN peacekeeping missions that stay long enough to help build institutions have a strong track record; premature withdrawal often leads to relapse.\n\nFifth, addressing root causes. A peace agreement that stops the fighting but leaves the underlying causes unaddressed — inequality, governance failure, identity-based exclusion, resource competition — is building peace on sand. The most durable peace processes are those that tackle the structural issues that caused the war in the first place, even though this is slower and more difficult than a simple ceasefire.\n\nFinally, a culture of peace. Sustainable peace requires changes in how societies think about conflict, identity, and the other side. Education, media, cultural exchange, and intergroup contact programs all contribute to building a social fabric that can withstand future tensions without resorting to violence. This is the slowest and most intangible factor, but arguably the most important for long-term stability.',
        keyInsight: 'Peace lasts when it is inclusive, economically supported, backed by reformed security forces, sustained by international commitment, rooted in addressing root causes, and embedded in a culture that rejects violence.',
        linkedSection: '#path-forward',
      },
    ],
    quiz: 'quiz-how-peace-is-built',
  },
  {
    id: 'media-literacy-for-conflict',
    title: 'Media Literacy for Conflict',
    subtitle: 'How to critically evaluate what you see, read, and share about wars',
    icon: '📰',
    color: '#e67e22',
    estimatedTime: '35 minutes',
    steps: [
      {
        title: 'How Conflict Is Reported',
        content: 'The way wars are reported shapes how the public understands them, which in turn shapes the political will to act — or not. Understanding the mechanics of conflict journalism is the first step toward being a critical consumer of information about wars.\n\nConflict reporting faces inherent challenges. Journalists working in war zones risk their lives: the Committee to Protect Journalists has documented the deaths of hundreds of reporters in conflict zones over the past two decades. Access is often restricted — governments and armed groups control who can enter, what they can see, and who they can interview. This means that coverage is often skewed toward whichever side grants access. In the Gaza conflict, for example, the restriction of international journalists from entering Gaza means that much coverage relies on local journalists operating under extreme danger, or on information provided by the parties to the conflict.\n\nThe economics of modern media also shape coverage. News organizations have dramatically reduced their foreign correspondent networks over the past two decades. Where major outlets once maintained bureaus across Africa, Asia, and the Middle East, many now rely on freelancers, stringers, or parachute journalists who fly in during major escalations and leave when the cameras move on. This creates a pattern of coverage that focuses on dramatic events — bombings, offensives, refugee crises — rather than the slow-building causes and the quiet work of peacebuilding.\n\nThe concept of framing is essential. Every news story involves choices: what to include, what to leave out, which voices to center, what context to provide, and what language to use. These choices create a "frame" through which the audience understands the conflict. A story about a military operation can be framed as a necessary security measure, an act of aggression, a humanitarian disaster, or a strategic development — and the same facts can support each frame. The frame chosen depends on the outlet\'s editorial perspective, the journalist\'s access and sources, and the broader political context.\n\nConsumers of conflict news rarely see a single, objective picture. They see a mosaic of fragments, each shaped by the specific conditions under which it was produced. Recognizing this is not cause for cynicism but for intellectual humility: understanding that your picture of any conflict is necessarily incomplete and shaped by the sources you consume.',
        keyInsight: 'Every piece of conflict reporting involves choices about access, framing, and emphasis that shape your understanding — no single source gives you the full picture.',
        linkedSection: '#current',
      },
      {
        title: 'Identifying Bias in Conflict Coverage',
        content: 'All media has some form of bias, and this is especially important to recognize in conflict reporting where the stakes — including public support for military action or humanitarian intervention — are enormous. Bias in conflict coverage takes several forms, and learning to identify them is a core media literacy skill.\n\nSelection bias is the most fundamental: which conflicts get covered at all? The major American and European media outlets devote extensive coverage to the Russia-Ukraine war and the Israel-Palestine conflict but comparatively little to the wars in Sudan, the DRC, or Myanmar, despite those conflicts producing comparable or greater human suffering. This selection is not random — it reflects geopolitical proximity, perceived relevance to the audience, and the availability of compelling visuals and narratives. The result is that some suffering is visible and politically actionable while other suffering is invisible.\n\nSource bias occurs when reporters consistently rely on certain types of sources — government officials, military spokespeople, or one side of the conflict — while underrepresenting others. In many conflicts, the voices of ordinary civilians, humanitarian workers, and local journalists are drowned out by official narratives from the warring parties. Pay attention to who is being quoted and who is absent.\n\nLanguage bias is often subtle but powerful. The choice between "terrorist" and "fighter," between "invasion" and "military operation," between "occupation" and "administration," and between "collateral damage" and "civilian deaths" shapes perception. No term is truly neutral, but some choices are more loaded than others. Notice when outlets use passive voice to obscure agency — "a school was destroyed" versus "forces destroyed a school" — and when euphemisms soften the reality of violence.\n\nNarrative bias involves fitting complex events into simple, familiar storylines: good versus evil, David versus Goliath, ancient hatreds. These narratives are satisfying but almost always oversimplify. The framing of conflicts as driven by "ancient hatreds" is particularly misleading — it suggests that violence is inevitable and timeless, when in fact most conflicts have specific, identifiable, and often recent causes rooted in political choices.\n\nVisual bias matters enormously in an image-driven media landscape. Which images are shown — grieving mothers, destroyed buildings, soldiers in action, diplomatic handshakes — shapes emotional responses and thus political attitudes. The absence of images can be as powerful as their presence: conflicts that lack compelling visuals receive less coverage and less public attention.\n\nRecognizing these biases does not mean that all reporting is equally unreliable or that truth is unknowable. It means approaching any single source with appropriate skepticism and seeking out multiple perspectives to build a more complete picture.',
        keyInsight: 'Bias in conflict reporting operates through selection (which wars get covered), sources (who gets to speak), language (which words are chosen), narrative (which stories are told), and visuals (which images are shown).',
        linkedSection: '#current',
      },
      {
        title: 'Propaganda Techniques in War',
        content: 'Propaganda — the deliberate manipulation of information to influence public opinion — has been a tool of warfare for as long as wars have been fought. Understanding the most common propaganda techniques is essential for anyone trying to make sense of information during a conflict.\n\nDehumanization is the most dangerous propaganda technique. By depicting the enemy as subhuman — comparing them to animals, insects, or diseases — propagandists make violence against them seem acceptable or even necessary. This technique preceded every major genocide of the 20th century: the Nazis compared Jews to rats, Rwandan Hutu extremists called Tutsis "cockroaches," and Serb nationalists dehumanized Bosnian Muslims. When you see language or imagery that strips an entire group of their humanity, recognize it as a deliberate strategy to lower the psychological barriers to violence.\n\nAtrocity propaganda involves fabricating or exaggerating enemy atrocities to generate outrage and support for military action. While many reported atrocities are real and documented, the deliberate fabrication or amplification of false stories has a long history. The challenge for consumers of information is distinguishing genuine documentation of war crimes from manufactured outrage — which is why verification through multiple credible sources is so important.\n\nSelective truth is more insidious than outright lies because it is harder to detect. A government might accurately report that an enemy group committed a specific atrocity while omitting the context that provoked it, or accurately cite a statistic while ignoring a contradictory one. Everything stated is technically true, but the overall impression is deeply misleading. This is the most common form of propaganda in modern democracies, where outright lies are more easily fact-checked.\n\nEmotional manipulation uses images, stories, and language designed to bypass rational analysis and trigger emotional responses — fear, anger, grief, patriotism. The use of children in propaganda imagery, the strategic release of graphic content, and the drumbeat repetition of threat narratives all serve to create emotional states in which critical thinking is difficult. When you feel a strong emotional reaction to conflict coverage, that is precisely the moment to pause and analyze what is driving that reaction.\n\nInformation overload is a modern technique that works not by pushing a single narrative but by flooding the information space with so many competing claims, theories, and counter-narratives that people give up trying to determine the truth. This creates confusion, apathy, and a sense that "nobody really knows what is happening" — which benefits the side that has something to hide.\n\nRecognizing propaganda does not mean becoming paranoid or assuming everything is a lie. It means developing the habit of asking: Who created this content? What do they want me to think, feel, or do? What evidence supports these claims? What might be missing?',
        keyInsight: 'The most effective modern propaganda does not lie outright — it selects, frames, and emotionally manipulates real information to create a misleading picture that is harder to challenge than a simple falsehood.',
        linkedSection: '#root-causes',
      },
      {
        title: 'Social Media and Misinformation in Conflict',
        content: 'Social media has fundamentally transformed the information landscape during conflicts, creating both unprecedented opportunities and unprecedented dangers. Understanding this transformation is critical for anyone who encounters conflict-related content online.\n\nThe positive side is real and significant. Social media has democratized conflict reporting. Civilians in war zones can document events in real time, bypassing government censors and reaching global audiences directly. Human rights organizations use social media posts to verify and document atrocities. The Syrian Archive, for example, has preserved millions of videos from the Syrian civil war that serve as evidence of war crimes. During the early days of the Russia-Ukraine invasion, Ukrainian civilians sharing footage on social media shaped global understanding and policy responses in ways that traditional media alone could not have achieved.\n\nHowever, the same features that make social media powerful also make it dangerous. The speed of sharing means that false information can spread globally before anyone has time to verify it. Research has consistently shown that false stories spread faster and more widely on social media than true ones, because falsehoods tend to be more novel and emotionally arousing. During active conflicts, this creates a fog of misinformation that can be as disorienting as the fog of war itself.\n\nAlgorithmic amplification compounds the problem. Social media platforms are designed to maximize engagement, and content that generates strong emotional reactions — outrage, fear, grief — gets more engagement than nuanced analysis. This means that the most extreme, sensational, and emotionally manipulative content about a conflict is systematically amplified while careful, contextual reporting is buried. Users who click on one piece of conflict content are fed more, often of escalating intensity, creating a distorted picture.\n\nState-sponsored manipulation has become a sophisticated tool. Russia\'s Internet Research Agency, for example, operated thousands of fake accounts across multiple platforms to spread disinformation about the Ukraine conflict. Similar operations have been documented by China, Iran, and other states. These operations create fake personas, manufacture fake grassroots movements, amplify divisive narratives, and sow confusion. Detecting them requires attention to account histories, posting patterns, and coordinated behavior.\n\nThe emotional toll on consumers is also significant. Constant exposure to graphic conflict content — which social media algorithms actively push — can cause secondary traumatic stress, compassion fatigue, and a sense of helplessness. Research shows that heavy consumption of conflict-related social media is associated with increased anxiety and decreased well-being, without necessarily increasing understanding.\n\nPractical steps for navigating social media during conflicts include: waiting before sharing (the first reports are often wrong or misleading); checking the source (is this an established journalist, an eyewitness, or an anonymous account?); looking for corroboration from multiple credible sources; being skeptical of content that seems designed to make you extremely angry or afraid; and being willing to say "I do not know enough yet to have an opinion."',
        keyInsight: 'Social media gives civilians a voice during war but also amplifies misinformation faster than truth — the most responsible thing you can do is slow down, verify, and resist the urge to share before you understand.',
        linkedSection: '#current',
      },
      {
        title: 'Being a Critical Consumer of Conflict Information',
        content: 'Having explored how conflict is reported, where bias lurks, how propaganda works, and how social media distorts information, the final step is building a practical framework for consuming conflict information critically and responsibly.\n\nStart with source diversity. No single outlet, journalist, or social media account gives you the full picture. Make a deliberate effort to read coverage from different countries, different editorial perspectives, and different types of outlets (major newspapers, wire services, specialized conflict analysis organizations like the International Crisis Group, and local media from the affected region). When multiple independent sources report the same fact, your confidence can increase. When they disagree, investigate why.\n\nApply the "who benefits?" test to every piece of information. When a government releases casualty figures, ask whether they have an incentive to inflate or minimize them. When an armed group posts a video, consider what narrative it serves. When a think tank publishes an analysis, understand who funds it and what perspective that might encourage. This is not cynicism — it is the same critical thinking you would apply to an advertisement trying to sell you a product.\n\nDistinguish between facts, analysis, and opinion. Facts are verifiable: a bomb hit a specific location at a specific time. Analysis interprets facts: this bombing represents an escalation in the conflict because of specific strategic reasons. Opinion evaluates: this bombing was justified or unjustified. Many consumers of news conflate these categories, accepting analysis or opinion as if it were fact. Good journalism clearly distinguishes between them.\n\nPay attention to what is not being covered. The conflicts that receive the most attention are not necessarily the most deadly or the most important. The site\'s conflict map can help you identify wars that are largely absent from mainstream media coverage. Ask yourself: Why am I hearing so much about this conflict and so little about that one? What does that tell me about whose suffering is considered newsworthy?\n\nBe honest about your own biases. Everyone approaches conflict information with pre-existing beliefs, values, and emotional investments. If you find yourself accepting information that confirms your existing view without scrutiny and rejecting information that challenges it, you are engaging in confirmation bias. The goal is not to have no perspective — that is neither possible nor desirable — but to be aware of your perspective and to actively challenge it.\n\nFinally, act on what you learn. Media literacy is not just an intellectual exercise. When you understand how information about conflicts is shaped and distorted, you have a responsibility to share that understanding with others, to support quality journalism, and to demand better coverage from the outlets you consume. An informed, critical public is one of the most powerful forces for peace.',
        keyInsight: 'Critical consumption of conflict information requires source diversity, the "who benefits?" test, distinguishing fact from analysis and opinion, attending to what is missing, and honest awareness of your own biases.',
        linkedSection: '#take-action',
      },
    ],
    quiz: 'quiz-media-literacy',
  },
  {
    id: 'what-you-can-do',
    title: 'What You Can Do',
    subtitle: 'Turning awareness into meaningful action for peace',
    icon: '✊',
    color: '#9b59b6',
    estimatedTime: '30 minutes',
    steps: [
      {
        title: 'Why Individual Action Matters',
        content: 'Faced with the scale of global conflict — millions displaced, hundreds of thousands killed, entire countries devastated — it is natural to feel overwhelmed and powerless. What can one person possibly do about a war on the other side of the world? The honest answer is that no individual can stop a war. But the equally honest answer is that every major shift in history — every peace movement, every human rights advance, every change in policy — started with individuals who refused to accept that nothing could be done.\n\nThe anti-apartheid movement did not begin with governments imposing sanctions on South Africa. It began with individuals who organized boycotts, divested their personal funds, protested outside embassies, and pressured their elected representatives. It took decades, but the cumulative weight of millions of individual actions created the political conditions for change. The same pattern holds for the nuclear freeze movement, the campaign to ban landmines, the push for the International Criminal Court, and the growing movement for climate action.\n\nIndividual action matters through several mechanisms. First, it shapes the information environment. When you educate yourself about a conflict and share accurate information with your network, you combat the misinformation and apathy that allow wars to continue unchallenged. Second, it creates political pressure. Elected officials pay attention to what their constituents care about. Letters, calls, and votes on foreign policy issues signal that the public is watching and will hold leaders accountable. Third, it provides direct support. Donations to humanitarian organizations, even small ones, fund the food, shelter, medical care, and education that keep displaced people alive and preserve their dignity. Fourth, it builds solidarity. When people in safe countries demonstrate that they care about people in war-torn ones, it strengthens the international norms that protect civilians, restrain aggression, and mandate accountability.\n\nThe psychological barrier to action is often the belief that it must be dramatic to matter. But the most impactful actions are usually consistent, sustained, and unglamorous: regularly donating to a reputable humanitarian organization, consistently contacting your representatives about foreign policy, staying informed about conflicts beyond the headlines, and integrating awareness into your daily conversations. One-time gestures fade; sustained engagement creates change.\n\nThe site you are using right now is itself an example of individual action. Someone decided that making conflict data accessible and understandable mattered enough to build it. Your decision to engage with this content and to share what you learn is another link in the chain.',
        keyInsight: 'No individual can stop a war, but every peace breakthrough in history began with individuals who refused to accept that nothing could be done — sustained engagement, not dramatic gestures, creates change.',
        linkedSection: '#take-action',
      },
      {
        title: 'Educating Yourself and Others',
        content: 'The foundation of all meaningful action is understanding. You cannot effectively advocate for peace, pressure leaders, or support organizations if you do not understand what is happening and why. Education is not a preliminary step before "real" action — it is itself one of the most powerful forms of action.\n\nStart by committing to go beyond headlines. The major events of a conflict — a bombing, a peace talk, a refugee crisis — are just the visible surface of much deeper dynamics. Use resources like this site to understand the root causes, the history, the key actors, and the pathways to resolution. When you understand why a conflict is happening, you can evaluate proposed solutions, identify manipulation, and advocate for approaches that address causes rather than just symptoms.\n\nDiversify your information sources. If you only consume news from outlets in your own country, you are getting a perspective shaped by your country\'s strategic interests. Seek out reporting from the region where the conflict is occurring, from independent conflict analysis organizations, and from journalists who specialize in the area. Wire services like Reuters and the Associated Press provide relatively straightforward factual reporting. Organizations like the International Crisis Group publish detailed, expert analyses of specific conflicts. Local media outlets provide perspectives that international coverage often misses.\n\nOnce you have developed a solid understanding, share it. This does not mean lecturing people or posting inflammatory content on social media. It means having informed conversations with friends, family, and colleagues. It means asking questions that prompt others to think: "Did you know that the conflict in Sudan has displaced 10 million people? That is more than the population of New York City." It means recommending resources, sharing well-sourced articles, and gently correcting misinformation when you encounter it.\n\nOrganizing more structured educational activities multiplies your impact. Start a discussion group at your school, university, or workplace focused on a specific conflict or theme. Organize a screening of a documentary about a peace process or refugee experience, followed by a facilitated discussion. Invite a speaker from a humanitarian or conflict resolution organization. Create a reading list and share it.\n\nEducation also means lifelong learning. Conflicts evolve, new crises emerge, and understanding deepens over time. The commitment is not to learn everything at once but to stay engaged — to continue reading, questioning, and updating your understanding. In a world where most people tune out after the initial shock of a crisis fades, sustained attention is itself a radical act.',
        keyInsight: 'Going beyond headlines to understand root causes transforms you from a passive consumer of crisis news into an informed citizen capable of meaningful advocacy and educating others.',
        linkedSection: '#take-action',
      },
      {
        title: 'Engaging With Your Leaders',
        content: 'In democratic societies, citizens have a tool that is more powerful than most realize: the ability to influence their elected representatives. Politicians are acutely sensitive to what their constituents care about, and foreign policy — including responses to armed conflicts, arms exports, humanitarian aid, and diplomacy — is shaped by public pressure far more than most people believe.\n\nThe most direct form of engagement is contacting your representatives. Write letters, send emails, make phone calls, and attend town hall meetings. Be specific: do not just say you care about peace. Name a specific conflict, reference a specific policy (arms sales to a warring party, funding for humanitarian relief, diplomatic initiatives), and make a clear ask. Representatives track constituent contacts by issue, and a surge of communications on a specific topic signals political salience.\n\nVoting on foreign policy issues is another form of engagement. During elections, ask candidates about their positions on specific conflicts, arms exports, diplomatic funding, and international cooperation. Most voters never ask about foreign policy, which allows candidates to ignore it. When voters consistently raise these issues, candidates must develop positions and make commitments.\n\nCoalition building amplifies individual voices. Join or support organizations that lobby for peace-related policies: conflict prevention, arms trade regulation, humanitarian funding, refugee protection, and diplomatic engagement. These organizations coordinate campaigns, provide expert analysis to policymakers, and mobilize collective action during critical moments. The International Campaign to Ban Landmines — which won the Nobel Peace Prize and achieved an international treaty — was a coalition of over a thousand organizations coordinating a single sustained push.\n\nDemand transparency and accountability. Governments often make decisions about arms sales, military interventions, and diplomatic priorities behind closed doors. Citizens have the right to know where their tax money goes and what policies are being pursued in their name. Support freedom of information requests, investigative journalism, and parliamentary oversight of foreign policy and defense spending.\n\nHold leaders accountable for their rhetoric as well as their actions. When politicians use dehumanizing language about people in conflict zones, when they spread misinformation about refugees, or when they prioritize arms sales over peace negotiations, call it out publicly. Political accountability depends on an informed and engaged citizenry.\n\nEngagement is not a one-time act but a practice. The most effective citizen advocates are those who build ongoing relationships with their representatives\' offices, who follow up on previous communications, and who show that they are paying sustained attention. One letter may be ignored; a constituent who writes consistently, shows up at town halls, and brings others along is impossible to ignore.',
        keyInsight: 'Elected officials respond to constituent pressure more than most people realize — specific, sustained, and organized engagement on conflict and peace issues directly shapes policy.',
        linkedSection: '#take-action',
      },
      {
        title: 'Using Your Economic Power',
        content: 'Every economic decision — what you buy, where you invest, which companies you support — is connected to global systems that can either fuel or restrain conflict. Understanding and leveraging these connections is a form of action that is available to nearly everyone, every day.\n\nThe most direct connection between consumer behavior and conflict is in supply chains. The minerals in your smartphone, laptop, and electric car — coltan, cobalt, tantalum, tin, and tungsten — are partly sourced from conflict zones, particularly the eastern DRC, where their extraction has funded armed groups for decades. The Dodd-Frank Act in the US and similar regulations in the EU require companies to audit their supply chains for conflict minerals, but enforcement is uneven. As a consumer, you can demand transparency from tech companies, support brands that demonstrate responsible sourcing, and advocate for stronger regulations.\n\nDivestment is a proven strategy for creating pressure. During the anti-apartheid era, a global campaign to divest from companies doing business in South Africa played a significant role in ending the regime. Today, similar campaigns target companies that profit from arms sales to warring parties, companies that operate in occupied territories, and fossil fuel companies whose products contribute to climate-driven instability. If you have investment accounts, retirement funds, or bank accounts, investigate whether your money is invested in companies that profit from conflict.\n\nFair trade purchasing supports economic stability in vulnerable communities. Buying fair trade coffee, chocolate, clothing, and other products from conflict-affected or post-conflict regions provides economic opportunities that can serve as alternatives to recruitment into armed groups. While fair trade alone cannot end wars, it contributes to the economic foundations that make peace sustainable.\n\nCorporate advocacy is increasingly powerful. Major corporations respond to consumer pressure, shareholder resolutions, and public campaigns. When consumers demand that tech companies audit their supply chains, that banks divest from arms manufacturers, or that clothing brands ensure their factories are not in exploitation zones, it works — not instantly, but cumulatively. The trend toward environmental, social, and governance (ESG) investing reflects growing awareness that economic activity has ethical dimensions.\n\nThe underlying principle is that economic systems are not natural forces beyond human control. They are built by human choices and can be reshaped by human choices. The same global trade system that fuels conflicts by creating markets for conflict minerals and arms sales can be reformed through regulation, consumer pressure, corporate accountability, and strategic investment in peace.\n\nYou do not need to be wealthy to use economic power. Every person who asks a company about its supply chain, who chooses a fair trade product, who moves their savings to a responsible bank, or who supports stronger trade regulations is contributing to a shift in the economic incentives that sustain conflict.',
        keyInsight: 'Your economic choices are connected to global conflict through supply chains, investments, and corporate behavior — informed consumer and investor pressure has ended regimes and changed corporate practices.',
        linkedSection: '#take-action',
      },
      {
        title: 'Building Bridges in Your Own Community',
        content: 'Global peace begins locally. The skills, habits, and values that prevent armed conflict between nations — empathy, dialogue, compromise, respect for difference, rejection of dehumanization — are the same ones needed in our schools, workplaces, and communities. Building bridges across divides in your immediate environment is both intrinsically valuable and a contribution to the broader culture of peace.\n\nStart by engaging with people who are different from you. This is not a platitude but an evidence-based practice. Research on intergroup contact, pioneered by psychologist Gordon Allport and confirmed by decades of subsequent studies, consistently shows that meaningful contact between members of different groups — ethnic, religious, political, national — reduces prejudice and increases empathy. The key word is "meaningful": superficial contact can reinforce stereotypes, but collaborative interactions toward shared goals consistently reduce hostility.\n\nIf your community includes refugees or immigrants from conflict-affected countries, engaging with them is particularly impactful. Volunteer with refugee resettlement organizations. Mentor a newcomer student. Attend cultural events organized by diaspora communities. Learn about their experiences not through news coverage but through direct conversation. This kind of engagement benefits both parties: newcomers gain social connections and support, while community members gain firsthand understanding of what conflict and displacement actually mean.\n\nChallenge dehumanizing language and stereotypes when you encounter them. When someone in your social circle makes a sweeping negative generalization about an ethnic, religious, or national group, push back — not with confrontation but with questions and information. Dehumanization of "the other" is the first step on the path to justifying violence, and it begins in everyday conversation long before it reaches the level of state propaganda. Your willingness to interrupt this process in your immediate environment matters more than you might think.\n\nPractice and promote constructive conflict resolution in your daily life. How you handle disagreements at home, at school, or at work either reinforces the norm that conflict is resolved through dialogue and compromise or reinforces the norm that it is resolved through dominance and force. Teaching children conflict resolution skills, supporting restorative justice programs in schools, and modeling respectful disagreement are all contributions to a culture of peace.\n\nFinally, recognize that building peace is a long-term commitment, not a project with a completion date. The world will always have conflicts. New crises will always emerge. The question is not whether you can solve everything but whether you are contributing to a direction — toward more understanding, more empathy, more justice, and less violence. Every conversation, every act of solidarity, every decision to engage rather than look away is a step on the path to peace.\n\nYou are already on that path. You are here, reading this, learning about the forces that drive conflict and the forces that can end it. The next step is yours to decide.',
        keyInsight: 'Global peace starts with local bridge-building — meaningful contact with people different from you, challenging dehumanization, practicing constructive conflict resolution, and committing to the long-term work of building a culture of peace.',
        linkedSection: '#take-action',
      },
    ],
    quiz: 'quiz-what-you-can-do',
  },
];


// ============================================
// 3. QUIZZES
// ============================================

export const quizzes = [
  {
    id: 'quiz-understanding-conflict',
    title: 'Understanding Conflict Quiz',
    moduleId: 'understanding-conflict',
    questions: [
      {
        question: 'What is the key distinction between conflict and armed violence?',
        options: [
          'Conflict involves competing interests managed through institutions and dialogue; armed violence is the failure of those systems',
          'Conflict only happens between nations; armed violence only happens within nations',
          'Conflict is always negative; armed violence is sometimes justified',
          'There is no meaningful distinction — all conflict leads to violence eventually',
        ],
        correct: 0,
        explanation: 'Conflict is a natural part of human interaction that can be managed peacefully through institutions, dialogue, and compromise. Armed violence emerges when those management systems fail, when leaders choose escalation, and when weapons are available. Many societies with deep conflicts remain peaceful because their institutions function.',
      },
      {
        question: 'According to research, what is the single biggest predictor of internal armed conflict within a country?',
        options: [
          'Ethnic or religious diversity',
          'Poverty and economic inequality',
          'Quality of governance',
          'Proximity to other conflict zones',
        ],
        correct: 2,
        explanation: 'Research consistently shows that governance quality — whether a government is inclusive, accountable, and capable — is the strongest predictor of civil conflict. Diverse societies can be peaceful with good governance, and homogeneous societies can experience violence with poor governance. The key variable is whether political systems manage diversity through inclusion or exploitation.',
      },
      {
        question: 'Why are "internationalized civil wars" — civil wars with external power involvement — the hardest to resolve?',
        options: [
          'They always involve nuclear weapons',
          'External powers sustain fighting by providing arms and money, and their own interests may not align with peace',
          'International law prohibits mediation in these conflicts',
          'The civilians in these wars are less willing to negotiate',
        ],
        correct: 1,
        explanation: 'When external powers intervene in civil wars by supplying weapons, funding, and diplomatic support to different sides, they sustain conflicts that might otherwise reach a stalemate forcing negotiation. Each external power has its own strategic interests that may be served by continued conflict rather than peace, as seen in Syria, Yemen, and Sudan.',
      },
      {
        question: 'What is a "war economy" and why does it make conflicts last longer?',
        options: [
          'A recession caused by military spending that forces governments to seek peace',
          'An economic system where armed groups fund themselves through resource extraction, making peace economically disadvantageous for those in power',
          'The global arms trade between wealthy nations',
          'The economic sanctions imposed by the UN to end conflicts',
        ],
        correct: 1,
        explanation: 'War economies develop when armed groups finance themselves through resource extraction — diamonds, gold, minerals, drugs — creating a financial incentive to keep fighting. Commanders who control mines or trade routes profit from conflict, making peace a threat to their wealth and power. This is why resource-rich conflict zones like the DRC have experienced decades of violence.',
      },
      {
        question: 'How has the pattern of casualties in armed conflict changed from World War I to modern conflicts?',
        options: [
          'Casualties have decreased dramatically due to precision weapons',
          'Military casualties now outnumber civilian casualties by an even greater margin',
          'The ratio has inverted: WWI was 90% military casualties; modern conflicts are approximately 90% civilian',
          'The ratio has remained roughly constant at 50-50',
        ],
        correct: 2,
        explanation: 'In World War I, approximately 90% of casualties were soldiers. In contemporary conflicts, civilians account for an estimated 90% of casualties. Modern wars are fought in populated areas with weapons that do not discriminate between combatants and civilians, and many additional deaths result from the collapse of healthcare, sanitation, and food systems.',
      },
      {
        question: 'What does the term "intergenerational trauma" mean in the context of armed conflict?',
        options: [
          'The tendency for wars to recur in the same region every generation',
          'The economic debt that wars create for future generations',
          'The transmission of psychological trauma from war-affected parents to their children, even if the children did not directly experience the violence',
          'The destruction of cultural heritage sites that affects future generations\' sense of identity',
        ],
        correct: 2,
        explanation: 'Intergenerational trauma refers to the documented phenomenon where children of traumatized parents show higher rates of psychological difficulties even without direct exposure to the original violence. This helps explain why some societies struggle to build peace decades after a war ends — the psychological wounds persist across generations and can fuel renewed cycles of conflict.',
      },
      {
        question: 'Which statement best describes how climate change relates to armed conflict?',
        options: [
          'Climate change directly causes wars by making people violent',
          'Climate change has no proven connection to armed conflict',
          'Climate change acts as a "threat multiplier" — it does not directly cause wars but intensifies existing tensions by driving drought, displacement, and resource competition',
          'Climate change only affects conflicts in coastal regions',
        ],
        correct: 2,
        explanation: 'Climate change does not directly cause wars, but it dramatically intensifies existing tensions. Droughts displace farmers, creating competition for shrinking resources. The Sahel, Horn of Africa, and parts of the Middle East already show this pattern. The World Bank estimates 216 million people could be internally displaced by climate change by 2050, creating massive potential for instability.',
      },
      {
        question: 'Why does the site identify 7 root causes instead of treating each conflict as unique?',
        options: [
          'Because all conflicts are essentially the same',
          'To simplify complex situations for a general audience',
          'Because recurring patterns across hundreds of conflicts reveal common structural drivers that interact in different combinations',
          'Because the United Nations officially recognizes exactly 7 causes of conflict',
        ],
        correct: 2,
        explanation: 'While every conflict has unique characteristics, research across hundreds of conflicts reveals recurring structural patterns. The same root causes — resources, governance, identity, colonial legacy, weapons, geopolitics, and climate — appear in different combinations across contexts. Recognizing these patterns is essential for conflict prevention, because it means addressing structural issues rather than treating each crisis as unprecedented.',
      },
    ],
  },
  {
    id: 'quiz-how-peace-is-built',
    title: 'How Peace Is Built Quiz',
    moduleId: 'how-peace-is-built',
    questions: [
      {
        question: 'Research shows that negotiated settlements, when properly implemented, tend to produce peace that is:',
        options: [
          'Less durable than military victories, because the losing side resents the compromise',
          'More durable than military victories, because both sides have ownership of the outcome',
          'Exactly as durable as military victories',
          'Only durable when enforced by an occupying military force',
        ],
        correct: 1,
        explanation: 'Research consistently shows that negotiated settlements produce more durable peace than military victories when properly implemented. This is because negotiations give both sides a stake in the outcome, address underlying grievances, and create frameworks for ongoing dispute resolution. Military victories often leave the defeated side resentful and ready to fight again when the opportunity arises.',
      },
      {
        question: 'What is a "mutually hurting stalemate" and why is it important for peace negotiations?',
        options: [
          'A situation where both sides are equally strong militarily',
          'A point where both sides recognize they cannot win through fighting and the cost of war has become unbearable, making negotiation more attractive',
          'A tactic where mediators deliberately hurt both sides to force them to negotiate',
          'A period of equal economic sanctions on both parties to a conflict',
        ],
        correct: 1,
        explanation: 'A mutually hurting stalemate occurs when both sides conclude that continued fighting will not achieve their goals and the costs have become unacceptable. This creates a "ripe moment" for negotiation because both parties see compromise as preferable to continued conflict. It does not require equal suffering, but both sides must believe the status quo is worse than a negotiated outcome.',
      },
      {
        question: 'The European Union was originally designed as a peace project. What was its core strategy for preventing war?',
        options: [
          'Creating a European army that could deter any member state from attacking another',
          'Establishing a court system that would punish any nation that started a war',
          'Binding European economies together so tightly — starting with coal and steel — that war would become economically irrational',
          'Imposing a single European identity to replace national identities',
        ],
        correct: 2,
        explanation: 'The EU began as the European Coal and Steel Community (1951), which deliberately pooled the very resources used to make weapons. The strategy was to make European economies so interdependent that war between member states would be economically catastrophic for all. This approach has been remarkably successful: war between France and Germany is now essentially unthinkable after centuries of devastating conflict.',
      },
      {
        question: 'South Africa\'s Truth and Reconciliation Commission (TRC) offered perpetrators of apartheid-era violence amnesty in exchange for:',
        options: [
          'Monetary compensation to the government',
          'Full, public disclosure of their crimes',
          'Military service in the new South African army',
          'Permanent exile from South Africa',
        ],
        correct: 1,
        explanation: 'The TRC offered amnesty to perpetrators who provided full, public, and truthful accounts of their crimes during the apartheid era. The philosophy was that truth — having the full scope of what happened officially acknowledged — was more important than punishment for enabling South Africa to move forward without the retaliatory bloodbath many feared during the transition.',
      },
      {
        question: 'What happened when the Colombia-FARC peace deal was put to a public referendum in 2016?',
        options: [
          'It passed overwhelmingly with 80% approval',
          'It was narrowly rejected, revised, and then passed through Congress instead',
          'It was rejected, and the war resumed for another decade',
          'The referendum was cancelled due to violence',
        ],
        correct: 1,
        explanation: 'The peace deal was narrowly rejected in a public referendum, partly due to opposition to reduced sentences for FARC commanders who committed atrocities. The government then revised certain provisions and passed the agreement through Congress. This raises important questions about whether peace agreements should require popular approval and about the tension between justice demands and the pragmatic need for compromise to end 52 years of war.',
      },
      {
        question: 'Research by the International Peace Institute found that peace processes with women\'s participation are:',
        options: [
          'No more or less likely to succeed than those without',
          '35% more likely to last at least 15 years',
          'Important symbolically but have no measurable impact on outcomes',
          'Only effective in certain cultural contexts',
        ],
        correct: 1,
        explanation: 'Research shows that peace processes including women\'s meaningful participation are 35% more likely to last at least 15 years. This is because inclusive processes that involve civil society and women\'s organizations tend to address a broader range of concerns, build wider public support for the agreement, and create more comprehensive frameworks that address the needs of the entire population rather than just armed combatants.',
      },
      {
        question: 'Approximately what percentage of countries that experience civil war relapse into conflict within a decade?',
        options: [
          'About 10%',
          'About 25%',
          'About 50%',
          'About 75%',
        ],
        correct: 2,
        explanation: 'Roughly half of all countries that experience civil war relapse into conflict within a decade. This sobering statistic underscores that ending a war is only the beginning — sustainable peace requires inclusive political settlements, economic recovery, security sector reform, sustained international support, and addressing the root causes that triggered the conflict in the first place.',
      },
      {
        question: 'Why is post-conflict economic investment (like the Marshall Plan) considered a security strategy, not just charity?',
        options: [
          'Because wealthy nations profit from selling goods to recovering economies',
          'Because economic recovery gives people a stake in peace — people who see a prosperous future are less likely to return to violence',
          'Because it creates economic dependency that prevents rebellion',
          'Because international donors require military loyalty in return',
        ],
        correct: 1,
        explanation: 'The Marshall Plan demonstrated that investing in the economic recovery of former enemies creates lasting peace by giving people a material stake in the peaceful order. When people can see that a peaceful future is materially better than a return to war, they have powerful incentives to sustain peace. Post-conflict societies that experience economic stagnation are far more likely to relapse into violence.',
      },
    ],
  },
  {
    id: 'quiz-media-literacy',
    title: 'Media Literacy for Conflict Quiz',
    moduleId: 'media-literacy-for-conflict',
    questions: [
      {
        question: 'What is "selection bias" in conflict reporting?',
        options: [
          'When journalists select only quotes that support their argument',
          'When media outlets decide which conflicts receive significant coverage and which are largely ignored, based on geopolitical relevance and audience interest rather than severity',
          'When governments select which journalists are allowed into a conflict zone',
          'When readers select news sources that confirm their existing beliefs',
        ],
        correct: 1,
        explanation: 'Selection bias in conflict reporting refers to the systematic pattern of certain conflicts receiving extensive coverage while others of comparable or greater severity are largely ignored. This is shaped by geopolitical proximity, perceived relevance to the outlet\'s audience, and the availability of compelling visuals. The result is that some suffering becomes politically visible while other suffering remains invisible.',
      },
      {
        question: 'What is the most dangerous propaganda technique, according to historical evidence?',
        options: [
          'Exaggerating military capabilities',
          'Dehumanization — depicting the enemy as subhuman to lower psychological barriers to violence',
          'Controlling the flow of information through censorship',
          'Using patriotic music and symbols in messaging',
        ],
        correct: 1,
        explanation: 'Dehumanization — comparing the enemy to animals, insects, or diseases — has preceded every major genocide of the 20th century. By stripping an entire group of their humanity, propagandists make violence against them seem acceptable or even necessary. When you encounter language or imagery that systematically dehumanizes an entire group, recognize it as a deliberate strategy to enable violence.',
      },
      {
        question: 'Research has shown that on social media, false stories about conflicts tend to:',
        options: [
          'Get flagged and removed quickly by platform moderation',
          'Spread slower than true stories because people can tell they are false',
          'Spread faster and more widely than true stories because they tend to be more novel and emotionally arousing',
          'Have no significant difference in spread compared to true stories',
        ],
        correct: 2,
        explanation: 'Multiple studies have confirmed that false information spreads faster and reaches more people on social media than true information. False stories tend to be more novel and emotionally arousing, generating stronger reactions and more shares. During active conflicts, this creates a fog of misinformation that can be as disorienting as the fog of war itself.',
      },
      {
        question: 'What is "selective truth" as a propaganda technique?',
        options: [
          'Only reporting facts that are 100% verified',
          'Presenting technically accurate information while omitting context that would change the audience\'s interpretation',
          'Selecting the most reliable sources for reporting',
          'Choosing which conflicts to cover based on editorial priorities',
        ],
        correct: 1,
        explanation: 'Selective truth is more insidious than outright lies because it is harder to detect. A government might accurately report an enemy atrocity while omitting the context that provoked it, or cite a real statistic while ignoring a contradictory one. Everything stated is technically true, but the overall impression is deeply misleading. This is the most common form of propaganda in modern democracies.',
      },
      {
        question: 'How has social media positively transformed conflict reporting?',
        options: [
          'It has made professional journalism unnecessary',
          'It has eliminated propaganda because anyone can fact-check',
          'It has allowed civilians in war zones to document and share events directly, bypassing government censors and reaching global audiences',
          'It has reduced the emotional impact of conflict coverage',
        ],
        correct: 2,
        explanation: 'Social media has democratized conflict reporting by enabling civilians to document events in real time and reach global audiences without going through traditional media gatekeepers. This has been valuable for documenting human rights abuses, holding perpetrators accountable, and shaping international understanding and policy responses, as demonstrated during the early days of the Russia-Ukraine invasion.',
      },
      {
        question: 'What does the "information overload" propaganda technique aim to achieve?',
        options: [
          'Convincing the audience that one specific narrative is true',
          'Educating the public about all sides of a conflict',
          'Flooding the information space with so many competing claims that people give up trying to determine the truth, creating confusion and apathy',
          'Providing too much factual information for audiences to process',
        ],
        correct: 2,
        explanation: 'Information overload as a propaganda technique works not by pushing a single narrative but by creating such a confusing information environment that people conclude nobody really knows what is happening. This confusion and apathy benefits whichever side has something to hide, because a disengaged public is unlikely to demand accountability or action.',
      },
      {
        question: 'When evaluating a piece of conflict reporting, what question should you always ask?',
        options: [
          '"Is this outlet popular and widely read?"',
          '"Does this confirm what I already believe about this conflict?"',
          '"Who created this content, what do they want me to think or do, and what evidence supports their claims?"',
          '"Was this article published by a government-approved source?"',
        ],
        correct: 2,
        explanation: 'The most important questions for evaluating any piece of conflict information are: Who created it? What do they want me to think, feel, or do? What evidence supports the claims? What might be missing? These questions apply to all sources — mainstream media, social media, government statements, and NGO reports — and help you assess reliability without descending into blanket cynicism.',
      },
      {
        question: 'Why is the "ancient hatreds" framing of conflicts particularly misleading?',
        options: [
          'Because ancient history has no relevance to modern conflicts',
          'Because it suggests violence is inevitable and timeless, when most conflicts have specific, identifiable, and often recent causes rooted in political choices',
          'Because most conflicts are actually less than 10 years old',
          'Because ancient hatreds are only found in European conflicts',
        ],
        correct: 1,
        explanation: 'The "ancient hatreds" narrative is misleading because it implies that violence between certain groups is inevitable and has always existed, when in fact most conflicts have specific, identifiable causes rooted in political choices, often made in the recent past. This framing discourages action by suggesting nothing can be done about millennia-old hatreds, when in reality specific policies and decisions created the conditions for violence.',
      },
    ],
  },
  {
    id: 'quiz-what-you-can-do',
    title: 'What You Can Do Quiz',
    moduleId: 'what-you-can-do',
    questions: [
      {
        question: 'What is the most common psychological barrier that prevents people from taking action on global conflicts?',
        options: [
          'Lack of information about what is happening',
          'Fear of personal danger from getting involved',
          'The belief that individual action is too small to matter against problems of such enormous scale',
          'Disagreement about which side to support',
        ],
        correct: 2,
        explanation: 'The most common barrier is the feeling of powerlessness — the belief that one person cannot possibly affect a war on the other side of the world. However, every major peace breakthrough in history started with individuals who refused to accept this. The anti-apartheid movement, the landmine ban, and the nuclear freeze all began with ordinary citizens taking sustained action.',
      },
      {
        question: 'What connection exists between the minerals in your smartphone and armed conflict?',
        options: [
          'There is no connection — electronics supply chains are fully regulated',
          'Minerals like coltan and cobalt are partly sourced from conflict zones like the DRC, where their extraction has funded armed groups',
          'Smartphone companies directly fund armed groups to secure mining rights',
          'Only phones made in certain countries use conflict minerals',
        ],
        correct: 1,
        explanation: 'Minerals essential for electronics — coltan, cobalt, tantalum, tin, and tungsten — are partly sourced from conflict zones, particularly the eastern DRC, where their extraction has funded armed groups for decades. While regulations exist requiring supply chain audits (like the Dodd-Frank Act), enforcement is uneven, and consumers can push for greater transparency.',
      },
      {
        question: 'How did the global divestment campaign contribute to ending apartheid in South Africa?',
        options: [
          'It had no measurable impact — apartheid ended for other reasons',
          'It created economic pressure by convincing companies, universities, and governments to withdraw investments from South Africa, making the regime economically unsustainable',
          'It funded military opposition to the apartheid government',
          'It only affected South African companies, not international ones',
        ],
        correct: 1,
        explanation: 'The anti-apartheid divestment campaign was one of the most successful examples of economic pressure for peace. By convincing institutions worldwide to withdraw investments from companies doing business in South Africa, the campaign created economic isolation that, combined with other pressures, contributed to making the apartheid regime unsustainable. This demonstrates the power of organized economic action.',
      },
      {
        question: 'What does research on intergroup contact (the "contact hypothesis") show about reducing prejudice?',
        options: [
          'Contact between different groups always increases understanding',
          'Meaningful, collaborative contact between members of different groups consistently reduces prejudice, though superficial contact can reinforce stereotypes',
          'Contact between groups has no effect on prejudice',
          'Only contact between groups of similar economic status reduces prejudice',
        ],
        correct: 1,
        explanation: 'Research pioneered by Gordon Allport and confirmed by decades of subsequent studies shows that meaningful contact between different groups — where people work together toward shared goals as equals — consistently reduces prejudice and increases empathy. However, the contact must be substantive; superficial interactions can actually reinforce existing stereotypes.',
      },
      {
        question: 'Why is sustained engagement more effective than dramatic one-time gestures in peace advocacy?',
        options: [
          'Because politicians only respond to people who contact them repeatedly',
          'Because one-time gestures attract negative media attention',
          'Because sustained engagement builds consistent pressure, deepens understanding over time, and signals to decision-makers that the public is watching continuously',
          'Because dramatic gestures are illegal in most countries',
        ],
        correct: 2,
        explanation: 'One-time gestures — a single donation, one social media post, one letter — fade quickly. Sustained engagement creates cumulative pressure: regularly contacting representatives, consistently donating to organizations, staying informed beyond the initial crisis, and integrating awareness into daily conversations. Decision-makers respond to constituents who demonstrate ongoing commitment because they represent lasting political consequences.',
      },
      {
        question: 'What is the most effective way to contact your elected representative about a conflict?',
        options: [
          'Send a generic message saying you care about world peace',
          'Name a specific conflict, reference a specific policy, and make a clear, concrete ask',
          'Sign an online petition and assume your representative will see it',
          'Wait until election season to raise the issue',
        ],
        correct: 1,
        explanation: 'Specific, actionable communications are far more effective than vague expressions of concern. Representatives track constituent contacts by issue, so naming a specific conflict, referencing a specific policy (arms sales, humanitarian funding, diplomatic initiatives), and making a clear ask signals that you are informed and watching. Generic messages are easily dismissed.',
      },
      {
        question: 'How does challenging dehumanizing language in everyday conversation relate to preventing armed conflict?',
        options: [
          'It does not relate — everyday language has no connection to armed conflict',
          'Dehumanization of "the other" in everyday discourse is the first step on the path that, at its extreme, justifies mass violence — interrupting it at the ground level prevents normalization',
          'It only matters if the person using the language is a political leader',
          'It is only relevant in countries that are currently at war',
        ],
        correct: 1,
        explanation: 'Dehumanization of the "other" group is a consistent precursor to mass atrocities, and it begins in everyday conversation long before reaching the level of state propaganda. Every major genocide was preceded by years of normalized dehumanizing language. Challenging such language in your immediate environment interrupts the normalization process and contributes to a culture that rejects the preconditions for violence.',
      },
      {
        question: 'What is "compassion fatigue" and how does it relate to taking action on conflicts?',
        options: [
          'A medical condition that prevents people from feeling empathy',
          'The emotional exhaustion from constant exposure to suffering, which can lead to disengagement and apathy — the opposite of the sustained engagement that creates change',
          'A strategy used by humanitarian organizations to increase donations',
          'A political term for voters who are tired of foreign policy issues',
        ],
        correct: 1,
        explanation: 'Compassion fatigue is the emotional exhaustion that results from constant exposure to images and stories of suffering, particularly through social media. It leads to numbness, disengagement, and apathy — which is why managing your consumption of conflict media, focusing on actionable responses rather than passive consumption, and sustaining engagement through concrete actions rather than emotional absorption is important.',
      },
    ],
  },
];


// ============================================
// 4. DISCUSSION GUIDES
// ============================================

export const discussionGuides = [
  {
    id: 'ground-rules-for-conflict',
    title: 'Ground Rules for Discussing Conflict',
    context: 'Use this guide at the beginning of any classroom or group discussion about armed conflict. Establishing shared norms before sensitive conversations begin prevents misunderstandings and creates space for honest engagement.',
    groundRules: [
      'Listen to understand, not to respond. When someone is speaking, focus on their perspective rather than preparing your rebuttal.',
      'Distinguish between the person and the argument. You can strongly disagree with an idea while still respecting the person expressing it. Critique arguments, not individuals.',
      'Speak from your own experience using "I" statements. Say "I believe" or "In my understanding" rather than making absolute claims. Acknowledge that your perspective is shaped by your background and information.',
      'Respect emotional responses. Conflict topics can trigger strong feelings, especially for students with personal connections to affected regions. If someone needs a moment, that is valid and should be honored.',
      'Commit to intellectual honesty. If you do not know something, say so. If you realize your position was wrong, changing your mind is a sign of strength, not weakness.',
      'Acknowledge complexity. Resist the urge to reduce conflicts to simple good-versus-evil narratives. Most real-world situations involve multiple legitimate perspectives, even when serious injustices are occurring.',
    ],
    prompts: [
      'What is one thing about global conflicts that you feel confident you understand, and one thing you are uncertain or confused about?',
      'Has your perspective on a conflict ever changed significantly after learning new information? What changed it?',
      'What makes it difficult to discuss conflicts involving real people suffering right now? How can we honor that difficulty while still learning?',
      'Where do you get most of your information about world events? How confident are you in those sources?',
      'What responsibilities do we have as people discussing conflicts that we are not personally affected by?',
      'How do you decide what is "true" when different sources present contradictory information about a conflict?',
    ],
    reflectionQuestion: 'What assumptions or biases do you carry into discussions about conflict, and how might they affect your ability to listen and learn?',
  },
  {
    id: 'discussing-war-and-violence',
    title: 'Discussing War & Violence',
    context: 'Use this guide when the discussion involves active fighting, military operations, casualty reports, or graphic content. These topics require particular sensitivity and structured guidelines to prevent retraumatization and ensure productive learning.',
    groundRules: [
      'Recognize that war involves real human suffering. Every statistic represents real people with families, hopes, and lives. Avoid treating conflicts as abstract strategy games or intellectual exercises divorced from their human cost.',
      'Be mindful that students in the room may have personal connections to active conflict zones through family, heritage, or refugee experience. Do not ask individuals to represent or explain "their" conflict.',
      'Do not share graphic images or detailed descriptions of violence unless they serve a specific educational purpose that has been clearly articulated. The goal is understanding, not shock.',
      'Distinguish between understanding why violence happens and justifying it. Analyzing the motivations behind a military action is not the same as endorsing it.',
      'Acknowledge when a topic is overwhelming. It is appropriate to say "This is hard to discuss" and to take brief pauses when needed.',
      'Avoid the temptation to rank suffering or compare body counts between conflicts as if more deaths make one conflict more "important" than another. All human suffering demands attention.',
    ],
    prompts: [
      'When we see casualty numbers in the news, how do we process those numbers? What is lost when human lives become statistics?',
      'Is there a difference between a "just war" and a "justified military action"? Can violence ever be morally legitimate? Under what conditions?',
      'How do we hold two truths simultaneously — that civilians on all sides suffer and that the causes and responsibilities of a conflict may not be equally distributed?',
      'What obligations do nations that are not directly involved in a war have toward the civilians being affected?',
      'How does the way media reports on military operations influence public support or opposition? Can you think of examples where coverage shaped policy?',
      'What is the difference between being "neutral" and being "balanced" when discussing an active war? Is neutrality always desirable?',
    ],
    reflectionQuestion: 'How do you personally cope with learning about active wars and human suffering — and is your coping mechanism one that leads toward engagement or away from it?',
  },
  {
    id: 'understanding-different-perspectives',
    title: 'Understanding Different Perspectives',
    context: 'Use this guide when discussing conflicts where students may hold strong, opposing opinions — particularly conflicts with significant diaspora populations in your community or with high political polarization in public discourse.',
    groundRules: [
      'You do not have to agree with a perspective to try to understand it. "Steel-manning" — articulating the strongest version of an argument you disagree with — is a valuable intellectual exercise.',
      'Avoid conflating governments with entire peoples. Criticizing a government\'s actions is not the same as criticizing every citizen of that country or every member of an ethnic or religious group.',
      'Recognize that having a perspective informed by personal experience is valid, but personal experience does not make someone the sole authority on a complex geopolitical situation. Multiple types of knowledge are valuable.',
      'If you feel strongly about a conflict, challenge yourself to read and engage with one credible source from a perspective you disagree with before the discussion. Come prepared to articulate what you learned.',
      'Avoid whataboutism — deflecting from the topic by pointing to other conflicts or injustices. Every situation deserves to be discussed on its own terms, even while acknowledging broader patterns.',
      'Accept that some discussions will not end in consensus, and that is acceptable. The goal is deeper understanding, not winning an argument.',
    ],
    prompts: [
      'Can you articulate the perspective of a party to a conflict you personally disagree with? What would they say their legitimate grievances are?',
      'When people with direct experience of a conflict share their perspective, how should we weigh that against analysis by outside experts? What are the strengths and limitations of each?',
      'Why do you think this particular conflict generates such strong emotions in people who are not directly affected? What is it about this conflict that makes it resonate?',
      'How do historical experiences — including collective trauma, displacement, and oppression — shape the way different groups understand a current conflict? Can both sides have legitimate historical claims?',
      'What would it take for you to change your mind about this conflict? What evidence or argument would you need to see?',
      'Is it possible to support the rights of civilians on all sides of a conflict while also holding specific parties accountable for specific actions? How?',
    ],
    reflectionQuestion: 'When you encounter a perspective on a conflict that makes you angry or uncomfortable, what is driving that reaction — and is the discomfort a signal that you should engage more deeply rather than turn away?',
  },
  {
    id: 'colonial-legacy-historical-injustice',
    title: 'Colonial Legacy & Historical Injustice',
    context: 'Use this guide when discussing how colonialism, imperialism, and historical injustices have shaped current conflicts. These discussions can surface strong feelings about responsibility, reparations, and the enduring impacts of historical power structures.',
    groundRules: [
      'Acknowledge the factual historical record. Colonialism caused enormous suffering, disrupted existing societies, and created structures whose effects persist. This is documented historical fact, not a matter of opinion.',
      'Distinguish between collective historical responsibility and individual guilt. Discussing the legacies of colonialism is not about blaming any living individual for what happened generations ago — it is about understanding how historical structures shape the present.',
      'Recognize that the effects of colonialism are not equally distributed. Some people benefit from historical structures of advantage while others continue to bear the costs. This is observable and measurable, not a judgment of character.',
      'Avoid "competitive suffering" — the idea that acknowledging one historical injustice diminishes another. Multiple histories of suffering can coexist and be acknowledged simultaneously.',
      'Be precise with language. "Colonialism" encompasses very different experiences — Belgian rule in the Congo, British rule in India, French rule in Algeria, and American expansion involved different structures and different impacts. Specificity matters.',
      'Welcome discomfort as a sign of learning. These topics should be uncomfortable because the history is uncomfortable. Sitting with that discomfort rather than deflecting from it is part of the educational process.',
    ],
    prompts: [
      'The site describes how colonial borders drawn with little regard for ethnic, linguistic, or cultural realities created states with built-in tensions. Can you identify specific examples where this is visible in current conflicts?',
      'Haiti was forced to pay France the equivalent of $21 billion in modern value for its own independence. How does this kind of structural economic injustice compound over generations?',
      'Many former colonial powers now sell weapons to former colonies experiencing conflict. How should we understand this relationship? What ethical obligations, if any, do former colonial powers have?',
      'Some argue that colonialism was "a long time ago" and that current conflicts should be understood on their own terms. Others argue that colonial structures continue to shape the present. How do you evaluate these positions?',
      'What does meaningful accountability for historical injustice look like? Is it reparations, institutional reform, formal acknowledgment, education, or something else?',
      'How do we study colonial legacy without reducing the agency of people in formerly colonized countries — recognizing them as actors shaping their own futures rather than passive victims of history?',
    ],
    reflectionQuestion: 'How does your own position in the world — your nationality, ethnicity, economic status — shape how you think about historical injustice, and what blind spots might that position create?',
  },
  {
    id: 'refugees-and-migration',
    title: 'Refugees & Migration',
    context: 'Use this guide when discussing displacement, refugee crises, and migration related to conflict. These discussions should build empathy while also engaging with the complex policy questions surrounding refugee protection.',
    groundRules: [
      'Use precise terminology. A refugee is someone fleeing persecution or conflict who crosses an international border. An internally displaced person (IDP) is displaced within their own country. An asylum seeker is someone who has applied for but not yet received refugee status. These distinctions have legal and practical significance.',
      'Center the humanity of displaced people. They are doctors, teachers, farmers, students, parents, and children — not a faceless mass or a "crisis" to be managed. Language matters: say "people seeking refuge" rather than reducing anyone to a single label.',
      'Recognize that displacement is overwhelmingly regional. The vast majority of refugees flee to neighboring countries, not to wealthy Western nations. Turkey, Colombia, Germany, Pakistan, and Uganda host the largest refugee populations. The narrative that refugees are "flooding" wealthy countries is not supported by data.',
      'Acknowledge that there are legitimate policy questions about refugee resettlement, integration, and resource allocation. Empathy for displaced people and serious engagement with policy challenges are not mutually exclusive.',
      'If students in the room have personal refugee or immigrant experience, do not put them in the position of being "the spokesperson" for refugees. Invite but never pressure sharing of personal experiences.',
      'Avoid portraying displaced people only as helpless victims. Many refugees show extraordinary resilience, entrepreneurship, and community-building. A complete picture includes both suffering and strength.',
    ],
    prompts: [
      'Over 120 million people worldwide are currently forcibly displaced. If they formed a country, it would be the 12th largest in the world. What does this scale tell us about the state of the world?',
      'The 1951 Refugee Convention established the principle of non-refoulement — that you cannot return refugees to a place where they face serious threats. Why is this principle important, and what happens when countries violate it?',
      'What challenges do refugees face that go beyond physical safety — including loss of identity, community, purpose, and hope? How might you feel if you were in that situation?',
      'How does the way media portrays refugees shape public attitudes and policy? Think about the images and language you have seen — what story do they tell?',
      'What are the arguments for and against your country accepting more refugees? How do you weigh humanitarian obligations against practical concerns?',
      'What can communities do to welcome and support refugees beyond just providing basic necessities? How can integration be a two-way process that enriches everyone?',
    ],
    reflectionQuestion: 'If conflict erupted in your city tomorrow and you had to flee, what would you want people in the country you fled to to know about you — beyond the fact that you are a refugee?',
  },
  {
    id: 'nuclear-weapons-existential-risk',
    title: 'Nuclear Weapons & Existential Risk',
    context: 'Use this guide when discussing nuclear weapons, deterrence theory, and the broader category of existential risks to human civilization. These topics can generate anxiety, and the discussion should balance honest engagement with the gravity of the threat without inducing hopelessness.',
    groundRules: [
      'Take the topic seriously without catastrophizing. Nuclear weapons are the most dangerous things humanity has created, and honest discussion requires neither minimizing the threat nor spiraling into despair.',
      'Acknowledge the emotional weight. It is normal to feel anxiety when contemplating weapons that could end civilization. Name that feeling rather than suppressing it, and recognize that constructive engagement is more useful than avoidance.',
      'Engage with the genuine ethical complexity. Nuclear deterrence may have prevented great-power war since 1945, but it also risks the destruction of everything. There are no simple answers to this paradox.',
      'Distinguish between the positions of nuclear-armed states and the experiences of people in countries that have been threatened with or affected by nuclear weapons (including Hiroshima and Nagasaki survivors and people living near test sites).',
      'Recognize that nuclear policy is not abstract — decisions about arsenals, deployments, and doctrines are made by specific people in specific political contexts, and those decisions can be influenced by public pressure.',
      'Maintain intellectual humility. Nuclear strategy involves genuine uncertainty, and experts disagree about fundamental questions. Be wary of anyone who claims to have all the answers.',
    ],
    prompts: [
      'Nuclear weapons have existed for 80 years and have not been used in war since 1945. Does this mean deterrence "works"? Or does it mean we have been lucky? How would you evaluate these competing explanations?',
      'If nuclear weapons make great-power war less likely but risk civilizational destruction through miscalculation or accident, how do we weigh these two outcomes against each other?',
      'North Korea argues it needs nuclear weapons for survival, pointing to the fates of Libya and Iraq. Is there a way to address legitimate security concerns of states while also preventing proliferation?',
      'The five permanent UN Security Council members are also the world\'s five recognized nuclear powers. How does this concentration of nuclear and political power shape the international order? Is it stable?',
      'New technologies — AI, hypersonic missiles, cyber capabilities — are changing the nuclear landscape. Should this make us more or less worried? Why?',
      'If you could design the world\'s nuclear policy from scratch, what would it look like? Is abolition realistic? Is continued deterrence sustainable?',
    ],
    reflectionQuestion: 'How do you think about long-term risks to human civilization in a way that motivates action rather than paralysis — and what role should young people play in shaping nuclear policy?',
  },
  {
    id: 'from-understanding-to-action',
    title: 'From Understanding to Action',
    context: 'Use this guide at the conclusion of a unit on conflict and peace, or when transitioning from learning about problems to discussing solutions. The goal is to bridge the gap between intellectual understanding and personal responsibility.',
    groundRules: [
      'Be honest about the gap between knowing and doing. Most people who understand the scale of global conflict do not take sustained action. Exploring why without judgment is more productive than guilt.',
      'Reject the false choice between "saving the world" and "doing nothing." The range of meaningful actions is enormous, from daily habits to career choices to community organizing. Find where you fit.',
      'Respect different forms of engagement. Some people are drawn to direct humanitarian work, others to policy advocacy, others to education, others to journalism, and others to creative expression. All are valid contributions to peace.',
      'Be specific and realistic. "I want to help" is a feeling. "I will donate $10 monthly to Doctors Without Borders and write to my senator about Sudan every quarter" is a plan. Plans create change; feelings alone do not.',
      'Acknowledge privilege honestly. The ability to choose whether to engage with conflict is itself a privilege. People living in war zones do not have the option to "tune out." This recognition should motivate, not paralyze.',
      'Commit to long-term engagement. The news cycle moves on. Public attention fades. The conflicts persist. The most valuable thing you can offer is sustained attention and action, even when no one is watching.',
    ],
    prompts: [
      'You have now learned about the root causes of conflict, how wars end, media manipulation, displacement, and paths to peace. What is the single most important thing you have learned, and why?',
      'What is the difference between awareness and action? At what point does awareness without action become a form of complicity?',
      'If you were going to commit to one sustained action related to global peace for the next year, what would it be? What would make that commitment realistic and achievable?',
      'How do you balance caring about global conflicts with taking care of your own mental health and well-being? Is there a sustainable way to stay engaged without burning out?',
      'Who in your life could you share what you have learned with? How would you begin that conversation?',
      'Twenty years from now, what do you hope the world looks like in terms of armed conflict? What would need to happen to get there, and what is your role in that?',
    ],
    reflectionQuestion: 'If every person who understood the causes of war took one concrete, sustained action for peace, what would the cumulative effect be — and what is stopping you from being one of those people?',
  },
];
