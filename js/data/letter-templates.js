export const concernTypes = [
  { id: 'arms-sales', label: 'Arms Sales & Weapons', icon: '🔫', desc: 'Demand transparency and restrictions on arms exports to conflict zones' },
  { id: 'humanitarian', label: 'Humanitarian Aid', icon: '🏥', desc: 'Push for increased funding and access for humanitarian organizations' },
  { id: 'diplomacy', label: 'Ceasefire & Diplomacy', icon: '🕊️', desc: 'Urge support for peace talks, ceasefires, and diplomatic solutions' },
  { id: 'sanctions', label: 'Targeted Sanctions', icon: '⚖️', desc: 'Call for sanctions against individuals and entities fueling conflict' },
  { id: 'refugees', label: 'Refugee Support', icon: '🏠', desc: 'Advocate for refugee resettlement and support programs' },
];

export const conflictFacts = {
  'russia-ukraine': {
    name: 'Russia-Ukraine War',
    keyFacts: [
      'Over 500,000 military casualties estimated since February 2022',
      'Approximately 14 million people displaced internally and across borders',
      'Global food price spikes affecting vulnerable nations worldwide due to disrupted grain exports',
    ],
    policyAsks: {
      'arms-sales': 'Support continued defensive military assistance to Ukraine while pushing for diplomatic channels to remain open and ensuring weapons oversight mechanisms prevent diversion.',
      'humanitarian': 'Increase funding for UNHCR and ICRC operations in Ukraine and neighboring host countries, with particular attention to winterization programs and mine clearance.',
      'diplomacy': 'Support international frameworks for a just and lasting peace that respects Ukraine\'s sovereignty and territorial integrity while maintaining open diplomatic channels.',
      'sanctions': 'Maintain and strengthen targeted sanctions against Russian officials and entities funding the war effort, and close loopholes enabling sanctions evasion through third countries.',
      'refugees': 'Ensure continued Temporary Protection Status for Ukrainian refugees and fund integration programs in host countries including Poland, Germany, and the Czech Republic.',
    },
  },
  'israel-palestine': {
    name: 'Israel-Palestine Conflict',
    keyFacts: [
      'Over 40,000 Palestinians killed in Gaza since October 2023, with vast civilian infrastructure destroyed',
      'Approximately 1,200 Israelis killed in the October 7, 2023 Hamas attack, with hostages still held',
      'Over 1.9 million people in Gaza displaced, facing severe shortages of food, water, and medical supplies',
    ],
    policyAsks: {
      'arms-sales': 'Condition arms transfers on compliance with international humanitarian law and ensure U.S.-supplied weapons are not used against civilian populations or infrastructure.',
      'humanitarian': 'Demand unimpeded humanitarian access to Gaza, restore UNRWA funding, and support field hospitals and emergency medical evacuations.',
      'diplomacy': 'Push for an immediate and sustained ceasefire, the release of all hostages, and a credible political process toward a two-state solution.',
      'sanctions': 'Impose targeted sanctions on extremist settlers engaged in violence in the West Bank and on Hamas leadership profiting from the conflict.',
      'refugees': 'Fund UNRWA operations, support neighboring countries hosting Palestinian refugees, and plan for safe return and rebuilding in Gaza.',
    },
  },
  'sudan': {
    name: 'Sudan Civil War',
    keyFacts: [
      'Over 12,000 people killed and 33,000 injured since fighting erupted between the SAF and RSF in April 2023',
      'More than 10 million people displaced, making it the world\'s largest displacement crisis',
      'Widespread reports of ethnic cleansing in Darfur and deliberate targeting of civilians by both sides',
    ],
    policyAsks: {
      'arms-sales': 'Enforce the existing UN arms embargo on Darfur and expand it nationwide, and pressure UAE and other states to halt arms supplies to the RSF.',
      'humanitarian': 'Dramatically increase funding for Sudan humanitarian response, which remains critically underfunded, and demand both parties allow aid access.',
      'diplomacy': 'Support the Jeddah peace process and African Union mediation efforts, and appoint a dedicated high-level envoy to Sudan.',
      'sanctions': 'Impose targeted sanctions on RSF and SAF commanders responsible for atrocities, and refer the situation to the International Criminal Court.',
      'refugees': 'Increase resettlement quotas for Sudanese refugees and fund host countries including Chad, South Sudan, and Egypt.',
    },
  },
  'myanmar': {
    name: 'Myanmar Civil War',
    keyFacts: [
      'Over 4,000 civilians killed by the military junta since the February 2021 coup',
      'Approximately 2.6 million people internally displaced across the country',
      'Resistance forces now control significant territory, but the junta continues airstrikes on civilian areas',
    ],
    policyAsks: {
      'arms-sales': 'Impose a comprehensive global arms embargo on the Myanmar military and sanction aviation fuel suppliers enabling airstrikes on civilians.',
      'humanitarian': 'Fund cross-border humanitarian operations through resistance-controlled areas where most displaced populations are located.',
      'diplomacy': 'Engage directly with the National Unity Government and ethnic resistance organizations as legitimate stakeholders in any peace process.',
      'sanctions': 'Strengthen sanctions on military-owned conglomerates and their international business partners, and target junta leaders\' overseas assets.',
      'refugees': 'Increase support for Rohingya refugees in Bangladesh and fund protection programs for displaced communities along the Thai and Indian borders.',
    },
  },
  'ethiopia': {
    name: 'Ethiopia Tigray & Regional Conflicts',
    keyFacts: [
      'An estimated 300,000 to 500,000 people died in the Tigray war from 2020 to 2022',
      'Despite the Pretoria Agreement, Eritrean forces remain in Tigray and abuses continue',
      'New conflicts have erupted in Amhara and Oromia regions, threatening national stability',
    ],
    policyAsks: {
      'arms-sales': 'Restrict military assistance to Ethiopia until there is verified withdrawal of Eritrean forces from Tigray and accountability for atrocities.',
      'humanitarian': 'Ensure full humanitarian access to Tigray, Amhara, and Oromia, and fund recovery programs for conflict-affected communities.',
      'diplomacy': 'Press for full implementation of the Pretoria Agreement including Eritrean withdrawal, disarmament timelines, and transitional justice mechanisms.',
      'sanctions': 'Impose targeted sanctions on Eritrean military leaders and Ethiopian officials obstructing the peace agreement and accountability processes.',
      'refugees': 'Support the return and reintegration of displaced Tigrayans and fund refugee programs in Sudan and Djibouti for those unable to return.',
    },
  },
  'yemen': {
    name: 'Yemen War',
    keyFacts: [
      'Over 150,000 people killed directly by fighting since 2014, with 227,000 total excess deaths estimated',
      'Twenty-one million people need humanitarian assistance, making it one of the worst humanitarian crises globally',
      'Houthi attacks on Red Sea shipping have disrupted global trade and drawn international military responses',
    ],
    policyAsks: {
      'arms-sales': 'Halt arms sales to Saudi Arabia and UAE that are used in airstrikes on Yemeni civilian infrastructure, and support the Arms Trade Treaty.',
      'humanitarian': 'Fully fund the Yemen humanitarian response plan and pressure all parties to allow unimpeded aid delivery to besieged areas.',
      'diplomacy': 'Support the UN Special Envoy\'s roadmap for a nationwide ceasefire and inclusive political settlement involving all Yemeni factions.',
      'sanctions': 'Impose sanctions on individuals from all parties who obstruct peace efforts or are responsible for attacks on civilians and aid workers.',
      'refugees': 'Increase support for Yemeni refugees in Djibouti, Somalia, and Oman, and fund internal displacement response programs.',
    },
  },
  'drc': {
    name: 'Democratic Republic of Congo - Eastern Conflict',
    keyFacts: [
      'Over 120 armed groups operate in eastern DRC, with M23 rebels backed by Rwanda seizing major territory',
      'Nearly 7 million people internally displaced, the largest displacement crisis in Africa',
      'Conflict is fueled by competition over minerals critical to global electronics including cobalt and coltan',
    ],
    policyAsks: {
      'arms-sales': 'Enforce the UN arms embargo on armed groups in eastern DRC and sanction countries supplying weapons to M23 and other militias.',
      'humanitarian': 'Increase funding for the DRC humanitarian crisis, which consistently ranks among the most underfunded globally.',
      'diplomacy': 'Pressure Rwanda to cease support for M23, support the Luanda and Nairobi peace processes, and strengthen the East African Community force mandate.',
      'sanctions': 'Impose targeted sanctions on M23 leadership and Rwandan military officials supporting armed groups in DRC, and enforce existing mineral tracing requirements.',
      'refugees': 'Fund protection programs for displaced populations in North Kivu and Ituri, and support host communities absorbing displaced families.',
    },
  },
  'sahel': {
    name: 'Sahel Crisis (Mali, Burkina Faso, Niger)',
    keyFacts: [
      'Over 17,000 people killed in the Sahel region by armed groups and military operations since 2012',
      'Military coups in Mali, Burkina Faso, and Niger have expelled Western forces and turned to Russian Wagner Group mercenaries',
      'More than 3.8 million displaced across the region, with food insecurity affecting 30 million people',
    ],
    policyAsks: {
      'arms-sales': 'Restrict arms exports to military juntas in the Sahel that have committed human rights abuses, and track weapons flows to prevent diversion to armed groups.',
      'humanitarian': 'Maintain humanitarian funding despite political disagreements with junta governments, ensuring aid reaches vulnerable populations.',
      'diplomacy': 'Engage with ECOWAS and the African Union on governance transition frameworks while maintaining dialogue with junta governments on civilian protection.',
      'sanctions': 'Impose targeted sanctions on Wagner Group operatives and junta officials responsible for civilian massacres and human rights violations.',
      'refugees': 'Fund regional refugee response plans and support coastal West African countries absorbing displacement from the Sahel.',
    },
  },
  'syria': {
    name: 'Syria Conflict',
    keyFacts: [
      'Over 500,000 people killed since the civil war began in 2011',
      'The Assad regime fell in late 2024 after a rapid rebel offensive, creating a fragile transition period',
      'Over 6 million Syrians remain refugees abroad, with 6.9 million internally displaced',
    ],
    policyAsks: {
      'arms-sales': 'Restrict weapons flows to all armed factions and support disarmament and security sector reform under any transitional government.',
      'humanitarian': 'Scale up humanitarian access across all of Syria during the transition period and fund early recovery programs.',
      'diplomacy': 'Support an inclusive Syrian-led political transition that represents all communities including minorities, and engage constructively with new governing authorities.',
      'sanctions': 'Ease broad economic sanctions that harm civilians while maintaining targeted sanctions on individuals responsible for war crimes during the Assad era.',
      'refugees': 'Support voluntary, safe, and dignified refugee return programs while maintaining protection for those who cannot yet return.',
    },
  },
  'haiti': {
    name: 'Haiti Crisis',
    keyFacts: [
      'Armed gangs control an estimated 80% of Port-au-Prince, with thousands killed annually',
      'Over 700,000 people internally displaced by gang violence, half of them children',
      'The Multinational Security Support mission led by Kenya remains severely under-resourced and under-staffed',
    ],
    policyAsks: {
      'arms-sales': 'Crack down on illegal arms trafficking from the United States to Haitian gangs through stronger port enforcement and ATF operations.',
      'humanitarian': 'Fully fund the Haiti humanitarian response and ensure aid delivery to communities cut off by gang-controlled territory.',
      'diplomacy': 'Support the Multinational Security Support mission with adequate resources and push for Haitian-led governance solutions and elections.',
      'sanctions': 'Expand sanctions on gang leaders and their financial networks, and prosecute arms traffickers supplying weapons to Haitian gangs.',
      'refugees': 'Extend Temporary Protected Status for Haitians, halt deportations to active conflict zones, and fund refugee support in the Dominican Republic and the Bahamas.',
    },
  },
  'south-china-sea': {
    name: 'South China Sea Tensions',
    keyFacts: [
      'China has built and militarized artificial islands in disputed waters claimed by six nations',
      'Frequent confrontations between Chinese coast guard and Philippine vessels at Second Thomas Shoal and Scarborough Shoal',
      'The 2016 Hague tribunal ruling rejecting China\'s claims has been ignored by Beijing',
    ],
    policyAsks: {
      'arms-sales': 'Provide defensive maritime capabilities to claimant states while avoiding an arms race, and ensure transparency in regional military buildups.',
      'humanitarian': 'Protect the livelihoods of fishing communities displaced by militarization and environmental destruction of coral reef ecosystems.',
      'diplomacy': 'Press for a binding Code of Conduct between ASEAN and China, and uphold the 2016 Hague tribunal ruling as the basis for resolving disputes.',
      'sanctions': 'Sanction Chinese entities involved in illegal island-building and environmental destruction in protected waters.',
      'refugees': 'Support fishing communities economically displaced by militarization and fund environmental restoration programs.',
    },
  },
  'taiwan': {
    name: 'Taiwan Strait Tensions',
    keyFacts: [
      'China has dramatically increased military exercises near Taiwan, with record numbers of air and naval incursions',
      'A conflict over Taiwan could cause trillions in global economic damage and disrupt semiconductor supply chains',
      'Taiwan produces over 90% of the world\'s most advanced semiconductors, critical to global technology',
    ],
    policyAsks: {
      'arms-sales': 'Expedite defensive arms deliveries to Taiwan while maintaining strategic ambiguity to avoid provocation.',
      'humanitarian': 'Develop contingency plans for civilian protection and evacuation in the event of a military crisis in the Taiwan Strait.',
      'diplomacy': 'Maintain the One China policy framework while clearly communicating that any unilateral change to the status quo by force is unacceptable.',
      'sanctions': 'Prepare coordinated sanctions packages with allies that would be triggered by any military action against Taiwan.',
      'refugees': 'Develop regional contingency plans with Japan, the Philippines, and other neighbors for potential mass displacement scenarios.',
    },
  },
  'north-korea': {
    name: 'Korean Peninsula Tensions',
    keyFacts: [
      'North Korea has tested over 100 missiles since 2022, including ICBMs capable of reaching the continental United States',
      'North Korea has supplied artillery shells and ballistic missiles to Russia for use in Ukraine',
      'An estimated 120,000 people remain in political prison camps under conditions the UN has called crimes against humanity',
    ],
    policyAsks: {
      'arms-sales': 'Intercept weapons transfers from North Korea to Russia and other conflict zones, and strengthen Proliferation Security Initiative operations.',
      'humanitarian': 'Push for humanitarian access to North Korea\'s civilian population while maintaining pressure on the regime.',
      'diplomacy': 'Pursue a phased diplomatic approach offering sanctions relief in exchange for verifiable steps toward denuclearization.',
      'sanctions': 'Enforce existing sanctions more rigorously, particularly targeting ship-to-ship transfers, cyber theft revenue, and overseas labor schemes.',
      'refugees': 'Protect North Korean defectors, fund resettlement programs in South Korea, and press China to stop forcibly repatriating refugees.',
    },
  },
  'somalia': {
    name: 'Somalia - Al-Shabaab Insurgency',
    keyFacts: [
      'Al-Shabaab controls significant rural territory and continues to carry out devastating attacks on civilians',
      'Over 3.8 million people internally displaced, with 8.25 million needing humanitarian assistance',
      'Climate shocks including recurring droughts compound the conflict, driving displacement and competition over resources',
    ],
    policyAsks: {
      'arms-sales': 'Ensure arms provided to Somali security forces are tracked and do not end up with clan militias or diverted to armed groups.',
      'humanitarian': 'Increase funding for Somalia humanitarian operations and support integration of climate adaptation into aid programming.',
      'diplomacy': 'Support the African Union transition mission and Somali-led stabilization efforts while encouraging inclusive governance that addresses clan grievances.',
      'sanctions': 'Maintain sanctions on Al-Shabaab leadership and their financial networks including charcoal trade and extortion revenue.',
      'refugees': 'Fund the Dadaab and Kakuma refugee complex operations in Kenya and support voluntary return programs with adequate reintegration support.',
    },
  },
  'nagorno-karabakh': {
    name: 'Nagorno-Karabakh / Armenia-Azerbaijan',
    keyFacts: [
      'Azerbaijan\'s September 2023 military offensive displaced over 100,000 ethnic Armenians from Nagorno-Karabakh',
      'The entire Armenian population fled, effectively ending a centuries-long presence in the region',
      'Tensions continue over border demarcation, the Lachin corridor, and Armenian enclaves in Azerbaijan',
    ],
    policyAsks: {
      'arms-sales': 'Restrict arms sales to Azerbaijan until there is accountability for the forced displacement and protection of Armenian cultural heritage.',
      'humanitarian': 'Fund resettlement and integration programs for displaced Karabakh Armenians in Armenia, many of whom lost everything.',
      'diplomacy': 'Push for a comprehensive Armenia-Azerbaijan peace treaty that includes border demarcation, minority rights guarantees, and return of prisoners.',
      'sanctions': 'Sanction Azerbaijani officials responsible for ethnic cleansing and destruction of Armenian cultural and religious sites.',
      'refugees': 'Support the over 100,000 displaced Karabakh Armenians with housing, employment, and psychological support in Armenia.',
    },
  },
};

export function generateLetter(conflictId, concernType) {
  const conflict = conflictFacts[conflictId];
  if (!conflict) {
    return 'Error: Unknown conflict specified.';
  }

  const policyAsk = conflict.policyAsks[concernType];
  if (!policyAsk) {
    return 'Error: Unknown concern type specified.';
  }

  const concern = concernTypes.find(c => c.id === concernType);
  const factsSection = conflict.keyFacts
    .map(fact => `- ${fact}`)
    .join('\n');

  const concernLabels = {
    'arms-sales': 'the flow of arms fueling',
    'humanitarian': 'the humanitarian catastrophe caused by',
    'diplomacy': 'the urgent need for diplomatic action regarding',
    'sanctions': 'the need for targeted accountability measures regarding',
    'refugees': 'the displacement crisis resulting from',
  };

  const closingActions = {
    'arms-sales': 'I urge you to support legislation requiring transparency in arms exports and to vote for restrictions on weapons transfers to parties committing violations of international humanitarian law.',
    'humanitarian': 'I urge you to support full funding of humanitarian response plans and to press for unimpeded aid access in all conflict-affected areas.',
    'diplomacy': 'I urge you to publicly advocate for diplomatic engagement and to support funding for international mediation and peacebuilding efforts.',
    'sanctions': 'I urge you to co-sponsor targeted sanctions legislation and to push for enforcement mechanisms that hold violators accountable.',
    'refugees': 'I urge you to support expanded refugee resettlement programs and to vote for funding that helps displaced families rebuild their lives in safety.',
  };

  return `Dear [Representative],

I am writing to you as a concerned constituent about ${concernLabels[concernType]} the ${conflict.name}. This crisis demands immediate attention and meaningful action from our elected officials.

The situation is dire. Consider these facts:
${factsSection}

As someone who believes in our nation's responsibility to promote peace and protect human rights, I am deeply troubled by the ongoing suffering. I am specifically writing to urge action on ${concern.label.toLowerCase()}.

${policyAsk}

${closingActions[concernType]}

The people affected by this conflict are counting on leaders like you to act with courage and moral clarity. History will judge how we responded to this moment. I look forward to hearing your position on this critical issue and learning what concrete steps you plan to take.

Thank you for your time and service.

Sincerely,
[Your Name]
[Your Address]`;
}
