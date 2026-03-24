// =============================================================================
// The State of Peace 2025 — Annual Report Data
// A comprehensive assessment of global conflict trends and peace progress
// =============================================================================

export const reportData = {
  title: 'The State of Peace 2025',
  subtitle: 'A comprehensive assessment of global conflict trends and peace progress',
  lastUpdated: 'March 2025',

  // ---------------------------------------------------------------------------
  // Executive Summary
  // ---------------------------------------------------------------------------
  executiveSummary:
    'The global peace landscape in early 2025 remains deeply strained. The number of active armed conflicts worldwide has reached its highest level since the end of the Cold War, with at least 56 state-based conflicts recorded in 2024 according to the Uppsala Conflict Data Programme. The wars in Ukraine, Sudan, and Gaza have each produced catastrophic humanitarian consequences, while lower-intensity conflicts across the Sahel, Myanmar, and the Democratic Republic of Congo have continued to displace millions with minimal international attention.' +
    '\n\n' +
    'Displacement figures tell a stark story. UNHCR estimates that the number of forcibly displaced people surpassed 120 million by mid-2024, a figure that has more than doubled in the past decade. Sudan alone generated over 10 million internally displaced persons and more than 2 million refugees in under two years of civil war, making it the largest displacement crisis in the world. Meanwhile, the international humanitarian system is severely overstretched, with the UN humanitarian appeal funded at less than 35 percent of requirements.' +
    '\n\n' +
    'Yet the picture is not uniformly bleak. Ethiopia and Eritrea\'s Tigray war ended with the 2022 Cessation of Hostilities Agreement, and while implementation remains incomplete, large-scale fighting has not resumed. Colombia\'s "Total Peace" policy has produced ceasefires with multiple armed groups, even as negotiations face setbacks. Several long-dormant peace processes have shown flickers of renewed engagement. The challenge in 2025 is whether the international community can muster the political will to convert these openings into durable settlements while preventing the further deterioration of the most acute crises.' +
    '\n\n' +
    'This report assesses the state of 15 active conflicts and 10 historical ones, grades their peace processes, and identifies the trends, risks, and opportunities that will shape the global peace landscape in the year ahead.',

  // ---------------------------------------------------------------------------
  // Key Findings
  // ---------------------------------------------------------------------------
  keyFindings: [
    {
      finding: 'Active armed conflicts have reached a post-Cold War high',
      detail:
        'The Uppsala Conflict Data Programme recorded 56 state-based armed conflicts in 2024, the highest figure since systematic tracking began in 1946. This includes both interstate wars and internationalized internal conflicts, reflecting a broad-based deterioration in global security.',
      trend: 'worsening',
      icon: '📈',
    },
    {
      finding: 'Sudan has become the world\'s worst humanitarian crisis',
      detail:
        'The war between the Sudanese Armed Forces and the Rapid Support Forces has killed an estimated 150,000 people, displaced over 10 million internally, and pushed roughly 25 million people into acute food insecurity. Famine conditions have been confirmed in multiple areas of Darfur and Kordofan. International mediation efforts have failed to produce a sustained ceasefire.',
      trend: 'worsening',
      icon: '🚨',
    },
    {
      finding: 'Global forced displacement has exceeded 120 million people',
      detail:
        'For the first time in recorded history, more than 120 million people are forcibly displaced worldwide. This figure includes refugees, asylum seekers, and internally displaced persons. The growth is driven primarily by the wars in Sudan, Ukraine, Myanmar, and the DRC, but also by protracted crises in Syria, Afghanistan, and Somalia that continue to prevent returns.',
      trend: 'worsening',
      icon: '🏚️',
    },
    {
      finding: 'Peace agreements reached their lowest annual total in two decades',
      detail:
        'Only three formal peace agreements were signed in 2024, the fewest since 2003. This reflects both the intractability of current conflicts and the declining capacity of international mediators to bring parties to the table. Major powers are increasingly aligned with conflict parties rather than serving as neutral brokers.',
      trend: 'worsening',
      icon: '📉',
    },
    {
      finding: 'Climate-related resource competition is intensifying existing conflicts',
      detail:
        'In the Sahel, the Horn of Africa, and parts of South and Southeast Asia, climate-driven water scarcity, desertification, and extreme weather events are compounding conflict dynamics. The Lake Chad basin, which has lost roughly 90 percent of its surface area since the 1960s, remains a flashpoint for intercommunal violence linked to competition over dwindling resources.',
      trend: 'worsening',
      icon: '🌡️',
    },
    {
      finding: 'Nuclear risk is at its highest level since the 1962 Cuban Missile Crisis',
      detail:
        'Russia\'s repeated nuclear threats in the context of its war in Ukraine, combined with the expansion of Chinese and North Korean nuclear arsenals and the erosion of arms control frameworks, have elevated nuclear risk to levels not seen in decades. The New START treaty\'s inspection regime remains suspended, and no successor negotiations are underway.',
      trend: 'worsening',
      icon: '☢️',
    },
    {
      finding: 'Ethiopia\'s Tigray ceasefire has broadly held despite implementation gaps',
      detail:
        'The November 2022 Cessation of Hostilities Agreement between the Ethiopian federal government and Tigrayan forces has largely ended large-scale fighting, though Eritrean forces remain present in parts of Tigray. Humanitarian access has improved but remains insufficient. The ceasefire represents one of the few positive peace developments in recent years.',
      trend: 'improving',
      icon: '🕊️',
    },
    {
      finding: 'Democratic backsliding is creating conditions for future conflicts',
      detail:
        'The number of countries classified as autocracies now exceeds those classified as democracies for the first time since 2003, according to V-Dem data. Authoritarian consolidation in Myanmar, the Sahel, and parts of Central Asia is associated with increased political repression, the closing of civic space, and in several cases the escalation of armed violence.',
      trend: 'worsening',
      icon: '⚖️',
    },
  ],

  // ---------------------------------------------------------------------------
  // Global Trends
  // ---------------------------------------------------------------------------
  globalTrends: [
    {
      title: 'Forced Displacement: A Crisis Without Precedent',
      direction: 'up',
      content:
        'The global displacement crisis has entered uncharted territory. UNHCR reported that more than 120 million people were forcibly displaced as of mid-2024, a figure that has grown every year for the past twelve years. The pace of growth is accelerating: the total rose by approximately 10 million in the past year alone, driven primarily by the wars in Sudan, Gaza, and Myanmar.' +
        '\n\n' +
        'What makes the current crisis particularly intractable is the near-total absence of large-scale return movements. The conflicts generating the most displacement are either intensifying or frozen, meaning displaced populations face indefinite exile. At the same time, host countries are reaching the limits of their absorptive capacity. Uganda, which hosts over 1.6 million refugees, has seen per-capita funding for refugees decline sharply. Jordan and Lebanon, which host large Syrian refugee populations, face severe economic pressures of their own.' +
        '\n\n' +
        'The international response remains grossly inadequate. The 2024 UN humanitarian appeal was only 34 percent funded, one of the lowest rates on record. Several major donor governments have cut aid budgets while simultaneously tightening asylum policies. The gap between humanitarian need and available resources is widening, with consequences that extend well beyond the displaced populations themselves to the stability of host communities and entire regions.',
      stats: [
        { label: 'Forcibly displaced people worldwide', value: '120M+', context: 'Surpassed mid-2024, a twelvefold increase since 2012' },
        { label: 'Internally displaced by conflict (2024)', value: '75.9M', context: 'Sudan, DRC, and Myanmar are the largest contributors' },
        { label: 'UN humanitarian appeal funding rate', value: '34%', context: 'One of the lowest rates since the consolidated appeal process began' },
        { label: 'Countries hosting over 1 million refugees', value: '12', context: 'Most are low- or middle-income nations' },
      ],
    },
    {
      title: 'Conflict Deaths: Reversal of a Long Decline',
      direction: 'up',
      content:
        'After decades of gradual decline, annual conflict deaths have risen sharply. The wars in Ethiopia (2020-2022), Ukraine (2022-present), Sudan (2023-present), and Gaza (2023-present) have collectively killed hundreds of thousands of people. ACLED recorded over 167,000 reported fatalities from political violence and armed conflict events in 2024, a figure that significantly understates actual mortality given the difficulty of collecting data in active war zones.' +
        '\n\n' +
        'The character of contemporary conflict has also shifted in ways that increase civilian harm. Siege warfare in Sudan and Gaza has deliberately restricted food, water, and medical supplies to civilian populations. Urban warfare in multiple theaters has caused massive infrastructure destruction. The use of explosive weapons in populated areas, despite a 2022 political declaration committing signatory states to restrict such use, remains widespread.' +
        '\n\n' +
        'The reversal of the long-term decline in conflict deaths is not simply a statistical artifact of a few large wars. The number of distinct armed conflicts has also risen, and many existing conflicts have intensified. This suggests a systemic deterioration in the norms and institutions that previously helped contain armed violence, rather than a temporary spike caused by idiosyncratic factors.',
      stats: [
        { label: 'Reported conflict fatalities (2024)', value: '167,000+', context: 'ACLED data, likely a significant undercount' },
        { label: 'State-based armed conflicts', value: '56', context: 'Highest annual total since 1946' },
        { label: 'Conflicts with over 1,000 battle deaths', value: '8', context: 'Double the average of the 2010s' },
        { label: 'Civilian share of conflict casualties', value: '~60%', context: 'Driven by urban warfare and siege tactics' },
      ],
    },
    {
      title: 'Peace Agreements: The Mediation Deficit',
      direction: 'down',
      content:
        'International mediation and peace negotiation efforts are at a low ebb. Only three formal peace agreements were signed in 2024, the lowest total in two decades. Several major conflicts have no active peace process at all. The wars in Sudan, Myanmar, and the Sahel are proceeding without meaningful negotiation between the parties, while the Russia-Ukraine and Israel-Gaza conflicts have defied diplomatic efforts by multiple actors.' +
        '\n\n' +
        'The decline in peace agreements reflects several structural shifts. Great power competition has reduced the willingness of major states to act as neutral mediators, as they are increasingly aligned with one side of a given conflict. The United Nations Security Council remains largely paralyzed on the most consequential crises due to the veto power of its permanent members. Regional organizations, such as the African Union and ASEAN, have struggled to exercise effective conflict resolution mandates in the face of sovereignty concerns and internal divisions.' +
        '\n\n' +
        'Where negotiations do exist, they tend to be fragile. Colombia\'s "Total Peace" strategy has produced ceasefires with some armed groups, but the overall architecture of negotiations is sprawling and vulnerable to spoilers. The Jeddah-brokered talks on Sudan have been intermittent and have not produced a durable ceasefire. The lesson of recent years is that reaching an agreement is only the first step; the harder challenge is implementation, as incomplete agreements in Ethiopia, South Sudan, and Libya have demonstrated.',
      stats: [
        { label: 'Peace agreements signed (2024)', value: '3', context: 'Lowest annual total since 2003' },
        { label: 'Active UN-led mediation processes', value: '7', context: 'Down from 11 in 2020' },
        { label: 'Conflicts with no active peace process', value: '12+', context: 'Including Sudan, Myanmar, and the Sahel states' },
        { label: 'UNSC resolutions vetoed on conflict issues (2023-2024)', value: '9', context: 'Reflecting deep divisions among permanent members' },
      ],
    },
    {
      title: 'Democratic Backsliding and Political Instability',
      direction: 'up',
      content:
        'The global retreat from democratic governance continues to create fertile ground for armed conflict. According to V-Dem\'s 2024 Democracy Report, 71 percent of the world\'s population now lives in autocracies, the highest share since 2003. Military coups have returned as a prominent feature of political life, particularly in West Africa and the Sahel, where Mali, Burkina Faso, Guinea, Niger, and most recently Gabon experienced military takeovers between 2020 and 2023.' +
        '\n\n' +
        'The relationship between autocratization and conflict is not deterministic, but the correlation is strong. Countries undergoing democratic backsliding are significantly more likely to experience political violence, repression of dissent, and escalation toward armed conflict. In Myanmar, the military coup of February 2021 triggered a civil war that has now engulfed most of the country. In the Sahel, military juntas have struggled to contain the jihadist insurgencies they pledged to defeat, while simultaneously cracking down on civil society and the press.' +
        '\n\n' +
        'The weakening of democratic norms also undermines the institutional frameworks that facilitate peaceful conflict resolution. Elections increasingly serve as flashpoints for violence rather than mechanisms for peaceful transitions of power, as seen in disputed processes in Bangladesh, Venezuela, and Mozambique in 2024.',
      stats: [
        { label: 'Share of world population living in autocracies', value: '71%', context: 'V-Dem 2024, highest since 2003' },
        { label: 'Military coups since 2020', value: '13', context: 'Concentrated in Africa and parts of Asia' },
        { label: 'Countries experiencing democratic erosion', value: '42', context: 'Including some previously consolidated democracies' },
        { label: 'Elections marred by significant violence (2024)', value: '11', context: 'Up from 7 in 2023' },
      ],
    },
    {
      title: 'Climate Change as a Conflict Multiplier',
      direction: 'up',
      content:
        'The linkages between climate change and armed conflict are becoming increasingly difficult to dismiss as speculative. While climate change rarely causes conflict on its own, it intensifies existing vulnerabilities: competition over water and arable land, migration pressures, food insecurity, and the erosion of state capacity in regions already prone to instability. The Sahel is the most cited example, where desertification, erratic rainfall, and the shrinking of Lake Chad have contributed to intercommunal violence between pastoralist and farming communities.' +
        '\n\n' +
        'But the climate-conflict nexus extends well beyond the Sahel. In South and Southeast Asia, sea-level rise and increasingly severe cyclones threaten to displace tens of millions of people in coming decades, with Bangladesh, Myanmar, and the Philippines among the most exposed. In the Horn of Africa, consecutive failed rainy seasons between 2020 and 2023 pushed pastoral communities into humanitarian crisis and contributed to resource-based conflicts in southern Ethiopia and northern Kenya.' +
        '\n\n' +
        'International policy responses remain fragmented. The Loss and Damage fund established at COP28 is insufficiently capitalized, and climate adaptation funding for conflict-affected states remains a fraction of what is needed. The countries most vulnerable to climate-driven instability are precisely those with the least capacity to adapt, creating a vicious cycle of environmental degradation, displacement, and conflict.',
      stats: [
        { label: 'Countries facing acute food insecurity linked to climate and conflict', value: '18', context: 'WFP and FAO convergence zones' },
        { label: 'Climate-related displacement events (2024)', value: '26M+', context: 'IDMC data, many in conflict-affected regions' },
        { label: 'Lake Chad surface area loss since 1960s', value: '~90%', context: 'Affecting 30 million people across four countries' },
        { label: 'COP28 Loss and Damage fund pledges', value: '$700M', context: 'Against estimated needs of $400 billion annually by 2030' },
      ],
    },
    {
      title: 'Nuclear Risk and the Erosion of Arms Control',
      direction: 'up',
      content:
        'The global nuclear order is under greater strain than at any point since the end of the Cold War. Russia has suspended participation in the New START treaty\'s inspection regime, the last remaining bilateral arms control agreement between the world\'s two largest nuclear powers. Russia\'s deployment of tactical nuclear weapons to Belarus and its repeated references to nuclear use in the context of the Ukraine war have undermined the nuclear taboo that has held since 1945.' +
        '\n\n' +
        'The nuclear landscape is also shifting in Asia. China is undergoing a significant expansion of its nuclear arsenal, with the Pentagon estimating that Beijing will possess over 1,000 warheads by 2030, up from roughly 350 in 2021. North Korea continues to expand its nuclear and missile programs, conducting multiple intercontinental ballistic missile tests and declaring itself an irreversible nuclear power. These developments have prompted debates about nuclear latency or hedging strategies in South Korea and Japan.' +
        '\n\n' +
        'The Bulletin of the Atomic Scientists set its Doomsday Clock to 89 seconds to midnight in January 2025, the closest it has ever been. The combination of active interstate warfare involving a nuclear power, the expansion of multiple nuclear arsenals, and the collapse of arms control verification mechanisms creates a risk environment that demands urgent diplomatic attention but is receiving almost none.',
      stats: [
        { label: 'Doomsday Clock setting (2025)', value: '89 seconds', context: 'Closest to midnight in the clock\'s 78-year history' },
        { label: 'Global nuclear warheads (estimated)', value: '~12,100', context: 'Russia and the US hold roughly 88% of the total' },
        { label: 'China\'s projected arsenal by 2030', value: '1,000+', context: 'Up from roughly 350 in 2021' },
        { label: 'Active bilateral nuclear arms control treaties', value: '0 (effective)', context: 'New START inspection regime suspended since 2023' },
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Regional Assessments
  // ---------------------------------------------------------------------------
  regionalAssessments: [
    {
      region: 'Sub-Saharan Africa',
      status: 'critical',
      summary:
        'Sub-Saharan Africa faces the most severe concentration of armed conflicts of any region. The civil war in Sudan has become the world\'s largest humanitarian crisis, while the eastern DRC continues to experience intense fighting between M23, backed by Rwanda, and Congolese forces and allied militias. The Sahel remains mired in overlapping jihadist insurgencies and military governance following a wave of coups. Somalia\'s al-Shabaab insurgency persists despite an African Union military presence, and northern Mozambique\'s insurgency has flared again after a period of relative calm. Ethiopia\'s post-Tigray trajectory remains fragile, with ethnic violence in Amhara and Oromia regions continuing.',
      conflicts: ['sudan', 'ethiopia', 'drc', 'sahel', 'somalia'],
      keyDevelopment:
        'The most significant development is the catastrophic escalation in Sudan, where the war between the SAF and RSF has produced famine conditions in Darfur, targeted ethnic violence reminiscent of the 2003-2004 genocide, and a complete collapse of state services across much of the country. International mediation has failed to gain traction, and there is a real risk of state fragmentation.',
    },
    {
      region: 'Middle East & North Africa',
      status: 'critical',
      summary:
        'The Middle East experienced a severe escalation of violence following Hamas\'s October 7, 2023 attack on Israel and the subsequent Israeli military campaign in Gaza, which has killed over 45,000 Palestinians according to Gaza health authorities and caused near-total destruction of civilian infrastructure. The conflict expanded into Lebanon, with Israel conducting a major military operation against Hezbollah, and into Yemen, where the Houthis launched attacks on Red Sea shipping, prompting US and UK military strikes. Syria remains fractured, Libya is split between rival governments, and Yemen\'s civil war persists despite a fragile truce. Iran\'s regional posture and its nuclear program continue to be sources of acute tension.',
      conflicts: ['israel-palestine', 'syria', 'yemen', 'libya'],
      keyDevelopment:
        'The war in Gaza and its regional spillover represent the most destabilizing development in the Middle East in decades. The scale of destruction in Gaza, the collapse of the humanitarian situation, the expansion of hostilities to Lebanon and the Red Sea, and the direct military exchange between Israel and Iran in April 2024 have fundamentally altered the regional security landscape and set back prospects for Israeli-Palestinian peace by a generation.',
    },
    {
      region: 'Europe',
      status: 'critical',
      summary:
        'Europe faces its most severe security crisis since the end of the Cold War. Russia\'s full-scale invasion of Ukraine, now in its fourth year, continues with no end in sight. The war has killed tens of thousands, displaced over 10 million Ukrainians, and fundamentally redrawn European security architecture. NATO has expanded to include Finland and Sweden, defense spending across the alliance has surged, and the European Union has undertaken unprecedented sanctions and military assistance programs. The conflict between Armenia and Azerbaijan over Nagorno-Karabakh ended with Azerbaijan\'s complete recapture of the territory in September 2023, creating a new displaced population and unresolved tensions.',
      conflicts: ['russia-ukraine', 'armenia-azerbaijan'],
      keyDevelopment:
        'The Ukraine war\'s trajectory in 2024-2025 has been defined by grinding attrition, with Russia making incremental territorial gains in the Donbas at enormous human cost while Ukraine has struggled with ammunition shortages and mobilization challenges. The potential for a shift in US policy toward Ukraine following the 2024 presidential election has introduced significant uncertainty into the conflict\'s diplomatic future.',
    },
    {
      region: 'Asia-Pacific',
      status: 'concerning',
      summary:
        'The Asia-Pacific region presents a mixed but increasingly concerning picture. Myanmar\'s civil war has intensified dramatically, with resistance forces making significant territorial gains against the military junta in late 2023 and 2024, but the junta responding with devastating airstrikes on civilian areas. The conflict has displaced over 3 million people and destabilized border regions in Thailand, India, and Bangladesh. Tensions in the South China Sea and over Taiwan remain elevated, with regular Chinese military activities near Taiwan and confrontations between Chinese and Philippine vessels in disputed waters. The Korean Peninsula remains a frozen flashpoint, with North Korea\'s expanding nuclear and missile capabilities adding to regional risk.',
      conflicts: ['myanmar', 'afghanistan', 'korea'],
      keyDevelopment:
        'Myanmar\'s resistance forces, particularly the Three Brotherhood Alliance, achieved their most significant military gains since the 2021 coup, capturing multiple towns and border crossings. While this has weakened the junta, it has not produced a path to political resolution, and the humanitarian toll on civilians continues to mount.',
    },
    {
      region: 'Americas',
      status: 'concerning',
      summary:
        'The Americas do not host interstate wars, but the region faces severe challenges from armed non-state actors, organized crime, and political instability. Colombia\'s "Total Peace" policy represents the most ambitious attempt to address multiple armed conflicts simultaneously, but negotiations with the ELN and dissident FARC factions have produced mixed results. Haiti has descended into near-total state collapse, with armed gangs controlling most of Port-au-Prince and a Kenyan-led multinational security mission struggling to restore order. Drug trafficking-related violence in Mexico, Ecuador, and Central America continues to produce death tolls that rival those of recognized armed conflicts.',
      conflicts: ['colombia'],
      keyDevelopment:
        'Haiti\'s crisis has deepened to the point where the state has effectively ceased to function across much of the country. The deployment of the Multinational Security Support mission has been insufficient to reverse the gangs\' territorial control, and political negotiations toward elections remain stalled. Haiti represents one of the starkest examples of international failure to prevent state collapse.',
    },
    {
      region: 'South Caucasus',
      status: 'mixed',
      summary:
        'The South Caucasus is in a period of tense transition following Azerbaijan\'s seizure of Nagorno-Karabakh in September 2023, which resulted in the displacement of virtually the entire ethnic Armenian population of the territory. Armenia and Azerbaijan are engaged in negotiations toward a bilateral peace treaty, but fundamental disagreements remain over border demarcation, transport corridors, and the rights of displaced Karabakh Armenians. Russia\'s peacekeeping role in the region has been diminished by its focus on Ukraine, creating both risks and opportunities for a new regional security order.',
      conflicts: ['armenia-azerbaijan'],
      keyDevelopment:
        'The Armenia-Azerbaijan peace negotiations represent a genuine, if fragile, opportunity. Both sides have expressed willingness to reach an agreement, and several draft articles have reportedly been agreed upon. However, the unresolved status of displaced Karabakh Armenians and disputes over territorial enclaves could derail progress. A signed treaty would be one of the most significant peace achievements in years.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Peace Process Scorecard
  // ---------------------------------------------------------------------------
  peaceProcessScorecard: [
    {
      conflict: 'Russia-Ukraine',
      conflictId: 'russia-ukraine',
      grade: 'F',
      gradeLabel: 'No meaningful process',
      assessment:
        'There is no active peace process between Russia and Ukraine. Russia\'s stated preconditions, including Ukrainian acceptance of territorial losses and abandonment of NATO aspirations, are non-starters for Kyiv. Ukraine\'s 10-point peace formula has not gained Russian engagement. Multiple international initiatives, including those by China, Saudi Arabia, and various African and Latin American states, have failed to produce negotiations. The conflict remains on a trajectory of prolonged attrition.',
    },
    {
      conflict: 'Israel-Palestine (Gaza)',
      conflictId: 'israel-palestine',
      grade: 'F',
      gradeLabel: 'No viable peace framework',
      assessment:
        'Ceasefire negotiations brokered by Qatar, Egypt, and the United States have produced temporary pauses in fighting but no durable cessation of hostilities. The broader Israeli-Palestinian peace process is moribund, with the two-state solution further from realization than at any point in the Oslo era. The scale of destruction in Gaza and the political dynamics in both Israeli and Palestinian politics make near-term progress extremely unlikely.',
    },
    {
      conflict: 'Sudan',
      conflictId: 'sudan',
      grade: 'F',
      gradeLabel: 'Failed mediation efforts',
      assessment:
        'The Jeddah-brokered talks between the SAF and RSF have not produced a sustained ceasefire. Both sides have violated previous commitments and shown little genuine interest in negotiation. The conflict has fragmented further with the emergence of local militias and the deepening involvement of external actors. The absence of a credible mediation framework is one of the most alarming features of this crisis.',
    },
    {
      conflict: 'Myanmar',
      conflictId: 'myanmar',
      grade: 'F',
      gradeLabel: 'No negotiations underway',
      assessment:
        'There is no peace process in Myanmar. The military junta has shown no willingness to negotiate with resistance forces or the National Unity Government. ASEAN\'s five-point consensus has been ignored by the junta. The conflict is being decided on the battlefield, with resistance forces gaining ground but no political framework for a transition emerging.',
    },
    {
      conflict: 'Ethiopia (Tigray & Others)',
      conflictId: 'ethiopia',
      grade: 'C',
      gradeLabel: 'Agreement holding, implementation lagging',
      assessment:
        'The Pretoria Agreement of November 2022 ended the Tigray war and has largely held, a significant achievement. However, implementation is incomplete: Eritrean forces remain in parts of Tigray, disarmament of Tigrayan forces has been slow, and transitional justice mechanisms have not been established. Meanwhile, armed conflicts in Amhara and Oromia have escalated, and these have no peace process at all.',
    },
    {
      conflict: 'Democratic Republic of Congo',
      conflictId: 'drc',
      grade: 'D',
      gradeLabel: 'Processes exist but ineffective',
      assessment:
        'Multiple diplomatic tracks are underway, including the Luanda process and the Nairobi process, but none has produced a cessation of hostilities. The M23 offensive, with documented Rwandan support, has intensified despite international condemnation. The withdrawal of MONUSCO and its replacement by SADC forces has not changed the military dynamic. Diplomatic efforts have not addressed the fundamental issue of Rwandan involvement.',
    },
    {
      conflict: 'Sahel Region (Mali, Burkina Faso, Niger)',
      conflictId: 'sahel',
      grade: 'F',
      gradeLabel: 'No peace processes active',
      assessment:
        'The Sahel military juntas have abandoned previous peace frameworks, including Mali\'s 2015 Algiers Accord, and adopted purely military approaches to the jihadist threat. Their withdrawal from ECOWAS and partnership with Russia\'s Africa Corps have further isolated them from international mediation efforts. Civilian populations are caught between jihadist groups and military operations with little prospect of negotiated solutions.',
    },
    {
      conflict: 'Somalia',
      conflictId: 'somalia',
      grade: 'D+',
      gradeLabel: 'Limited progress amid persistent threats',
      assessment:
        'The Somali government has pursued a military offensive against al-Shabaab with some territorial gains, but has not combined this with a political strategy for stabilization of recovered areas. The transition from ATMIS to a Somali-led security framework is underway but faces serious capacity gaps. Clan-based reconciliation processes exist at the local level but are not integrated into a national peace strategy.',
    },
    {
      conflict: 'Syria',
      conflictId: 'syria',
      grade: 'F',
      gradeLabel: 'Political process frozen',
      assessment:
        'The UN-led Geneva/Astana processes have produced no meaningful progress toward a political transition. The Assad government, with Russian and Iranian backing, has shown no interest in the reforms demanded by UN Security Council Resolution 2254. Arab states have normalized relations with Damascus without extracting political concessions. Syria remains de facto partitioned among regime, SDF, Turkish-backed, and HTS-controlled zones.',
    },
    {
      conflict: 'Yemen',
      conflictId: 'yemen',
      grade: 'C-',
      gradeLabel: 'Fragile truce, no comprehensive deal',
      assessment:
        'The 2022 UN-brokered truce has largely held in terms of reducing direct hostilities between the Saudi-led coalition and the Houthis, though it was never formally renewed. Saudi-Houthi bilateral talks have made progress on some humanitarian issues. However, the Houthi attacks on Red Sea shipping have introduced a new dimension that complicates diplomacy. A comprehensive political settlement addressing Yemen\'s governance remains distant.',
    },
    {
      conflict: 'Libya',
      conflictId: 'libya',
      grade: 'D',
      gradeLabel: 'Elections perpetually delayed',
      assessment:
        'Libya remains split between the Tripoli-based Government of National Unity and the eastern-based government backed by Khalifa Haftar. Elections have been repeatedly postponed since 2021 due to disputes over candidacy rules and the constitutional basis for voting. The UN Support Mission has cycled through special envoys without breakthrough. Oil revenue distribution and the role of foreign forces remain fundamental unresolved issues.',
    },
    {
      conflict: 'Colombia',
      conflictId: 'colombia',
      grade: 'B-',
      gradeLabel: 'Ambitious but fragile',
      assessment:
        'President Petro\'s "Total Peace" strategy is the most ambitious peace initiative in any active conflict, encompassing simultaneous negotiations with the ELN, dissident FARC factions, and urban armed groups. Some ceasefires have been achieved and bilateral agreements signed. However, the process is overstretched, ceasefires have been repeatedly violated, and the approach faces political headwinds domestically. Implementation of the 2016 FARC accord also remains incomplete.',
    },
    {
      conflict: 'Armenia-Azerbaijan',
      conflictId: 'armenia-azerbaijan',
      grade: 'B',
      gradeLabel: 'Negotiations progressing',
      assessment:
        'Armenia and Azerbaijan have made tangible progress toward a bilateral peace treaty, reportedly agreeing on several draft articles. Both leaders have expressed commitment to reaching an agreement. The main obstacles remain border demarcation, the Zangezur corridor question, and the status of displaced Karabakh Armenians. While significant risks remain, this is one of the most promising peace processes currently active.',
    },
    {
      conflict: 'Afghanistan',
      conflictId: 'afghanistan',
      grade: 'F',
      gradeLabel: 'No process, no engagement',
      assessment:
        'There is no peace process in Afghanistan. The Taliban government has consolidated control and shown no interest in inclusive governance or negotiations with former opposition groups. International engagement has been limited to humanitarian access discussions and counterterrorism cooperation. Women\'s rights have been systematically eliminated. The international community has neither recognized the Taliban government nor developed an effective strategy for engagement.',
    },
    {
      conflict: 'North Korea',
      conflictId: 'korea',
      grade: 'F',
      gradeLabel: 'Diplomacy abandoned',
      assessment:
        'Diplomatic engagement with North Korea has effectively ceased since the collapse of the Trump-Kim summit process in 2019. Pyongyang has declared itself an irreversible nuclear weapons state and rejected further denuclearization talks. Inter-Korean relations are at their lowest point in decades, with North Korea having constitutionally redefined South Korea as a hostile state. No diplomatic framework exists for addressing the nuclear issue.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Outlook
  // ---------------------------------------------------------------------------
  outlook: {
    title: 'Looking Ahead: 2025 and Beyond',
    content:
      'The coming year presents a global conflict landscape defined more by risk than by opportunity. The most acute danger is the continued escalation of existing wars. In Sudan, the trajectory points toward further famine, ethnic cleansing, and possible state collapse unless a sustained ceasefire can be achieved. In Gaza, the humanitarian catastrophe will continue to deepen absent a political solution that addresses both the immediate crisis and the underlying conflict. In Ukraine, the war\'s trajectory depends heavily on the durability of Western military and financial support.' +
      '\n\n' +
      'The shifting posture of the United States will be a defining variable. Changes in US policy toward Ukraine, the Middle East, and multilateral institutions could significantly alter the diplomatic landscape across multiple conflicts. European allies will face the challenge of sustaining their own defense and foreign policy commitments in a potentially more uncertain transatlantic relationship.' +
      '\n\n' +
      'At the structural level, the weakness of international conflict resolution mechanisms is perhaps the most troubling trend. The UN Security Council remains deadlocked, regional organizations are struggling to fill the gap, and there is no great-power consensus on the rules governing the use of force. The erosion of arms control regimes, the expansion of autonomous weapons systems, and the weaponization of information technology are adding new dimensions of risk that existing institutions are ill-equipped to manage.' +
      '\n\n' +
      'Yet history demonstrates that peace processes often advance when they are least expected. The most productive period of the Northern Ireland peace process followed some of its worst violence. The Colombia accord was reached after decades of failed attempts. The task for policymakers, civil society, and citizens in 2025 is to sustain pressure for negotiated solutions even when the political environment appears most hostile to them, because the cost of failing to do so is measured in human lives.',

    risksToWatch: [
      {
        risk: 'Sudan state collapse and regional destabilization, with famine and displacement spreading across the Horn of Africa and the Sahel',
        likelihood: 'high',
      },
      {
        risk: 'Escalation of the Russia-Ukraine war beyond current parameters, whether through strikes on critical infrastructure, nuclear threats, or involvement of additional parties',
        likelihood: 'medium',
      },
      {
        risk: 'Expansion of the Middle East conflict into a wider regional war involving direct confrontation between Israel and Iran',
        likelihood: 'medium',
      },
      {
        risk: 'Collapse of Myanmar\'s military junta without a political framework, leading to prolonged fragmentation and warlordism',
        likelihood: 'medium',
      },
      {
        risk: 'A major cyber or AI-enabled escalation in an existing conflict, outpacing legal and normative frameworks for response',
        likelihood: 'medium',
      },
      {
        risk: 'Democratic backsliding triggering new conflicts in electorally fragile states, particularly in West Africa and South Asia',
        likelihood: 'high',
      },
    ],

    opportunitiesForPeace: [
      {
        opportunity: 'An Armenia-Azerbaijan peace treaty, which would be the most significant peace agreement in years and could stabilize the South Caucasus',
        potential: 'high',
      },
      {
        opportunity: 'Consolidation of Ethiopia\'s Tigray ceasefire into a durable peace, including Eritrean withdrawal and transitional justice mechanisms',
        potential: 'medium',
      },
      {
        opportunity: 'Progress in Colombia\'s negotiations with the ELN, which could reduce violence in the country\'s most affected regions',
        potential: 'medium',
      },
      {
        opportunity: 'A comprehensive Yemen settlement building on the Saudi-Houthi track, particularly if Red Sea tensions can be de-escalated',
        potential: 'medium',
      },
      {
        opportunity: 'Renewed international commitment to conflict prevention and mediation, potentially catalyzed by the Summit of the Future process and reform of the UN peace and security architecture',
        potential: 'medium',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Call to Action
  // ---------------------------------------------------------------------------
  callToAction:
    'The state of global peace in 2025 demands more than concern; it demands action. Every conflict documented in this report is sustained not only by the belligerents who wage it, but by the international systems that fail to prevent it, the arms transfers that fuel it, the diplomatic inertia that ignores it, and the public indifference that permits it. Citizens have more power than they often realize: to demand accountability from their governments for arms exports and foreign policy choices, to support humanitarian organizations operating in the most dangerous environments on earth, to amplify the voices of peacebuilders and civil society actors who are doing the hardest work with the fewest resources. Peace is not a passive state that arrives when fighting stops. It is an active condition that must be built, defended, and demanded. This report is an invitation to engage with the conflicts that shape our world, to understand their causes, to recognize the human cost, and to insist that the pursuit of peace is not naive but necessary.',
};
