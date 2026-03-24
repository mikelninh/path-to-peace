// ============================================
// Cause Categories & Root Causes Data
// ============================================

import { icon } from '../components/icons.js';

export const causeCategories = [
  { icon: icon('fuel'), title: 'Resources & Territory', desc: 'Oil, water, minerals, land, and strategic access points', color: '#e67e22' },
  { icon: icon('crown'), title: 'Power & Governance', desc: 'Authoritarian control, failed states, coups, and political exclusion', color: '#e74c3c' },
  { icon: icon('dove'), title: 'Identity & Religion', desc: 'Ethnic tensions, sectarian divides, and cultural suppression', color: '#9b59b6' },
  { icon: icon('columns'), title: 'Colonial Legacy', desc: 'Arbitrary borders, unresolved grievances, and institutional fractures', color: '#3498db' },
  { icon: icon('radiation'), title: 'Nuclear & Arms', desc: 'Weapons proliferation, deterrence failures, and arms races', color: '#f1c40f' },
  { icon: icon('coins'), title: 'Economic Inequality', desc: 'Poverty, corruption, resource extraction, and exploitation', color: '#1abc9c' },
  { icon: icon('globe'), title: 'Geopolitical Rivalry', desc: 'Great power competition, proxy wars, and spheres of influence', color: '#2ecc71' },
  { icon: icon('thermometer'), title: 'Climate & Scarcity', desc: 'Drought, displacement, food insecurity driving instability', color: '#e74c3c' },
];

export const rootCauses = [
  {
    number: '01',
    title: 'Resources & Economic Greed',
    color: '#e67e22',
    shortDesc: 'Control of oil, minerals, water, and land drives or sustains most conflicts',
    fullDesc: 'Throughout history, control of valuable resources has been one of the most persistent drivers of conflict. In the modern era, this extends beyond traditional resources like land and water to include critical minerals for technology, energy supplies, and even drug trafficking routes. Resource conflicts are particularly dangerous because they create self-sustaining war economies \u2014 armed groups fund themselves through resource extraction, making peace economically disadvantageous for those in power.',
    examples: [
      { name: 'DR Congo', detail: 'Coltan and cobalt in your phone and electric car fund armed groups' },
      { name: 'Sudan', detail: 'Gold mining revenue finances both warring factions, especially RSF' },
      { name: 'South China Sea', detail: '$5.3 trillion in annual trade and vast oil/gas reserves' },
      { name: 'Yemen', detail: 'Control of the Bab el-Mandeb strait and its global shipping leverage' },
      { name: 'Iraq (2003)', detail: 'Oil-rich nation invaded under disputed pretexts' },
    ]
  },
  {
    number: '02',
    title: 'Power, Authoritarianism & Governance Failure',
    color: '#e74c3c',
    shortDesc: 'When governments serve the few, exclude the many, or collapse entirely',
    fullDesc: 'The single biggest predictor of internal conflict is governance quality. Authoritarian regimes that concentrate power, exclude ethnic or political groups, and use violence to maintain control create the conditions for rebellion. Conversely, states that collapse \u2014 losing the monopoly on violence and the ability to provide basic services \u2014 create vacuums that armed groups fill. Democratic backsliding and coups have increased globally since the mid-2010s, reversing decades of progress.',
    examples: [
      { name: 'Myanmar', detail: 'Military coup overthrew democracy, sparking nationwide resistance' },
      { name: 'Sudan', detail: 'Two generals fighting for control of the state after blocking civilian rule' },
      { name: 'Syria', detail: '13 years of war began when Assad responded to protests with military force' },
      { name: 'Haiti', detail: 'Complete state collapse, gangs filling the governance vacuum' },
      { name: 'Sahel', detail: 'Military coups in Mali, Burkina Faso, Niger \u2014 promising but not delivering security' },
    ]
  },
  {
    number: '03',
    title: 'Identity, Ethnicity & Religion',
    color: '#9b59b6',
    shortDesc: 'When identity becomes politicized and used to divide, dehumanize, and mobilize',
    fullDesc: 'Identity conflicts are rarely about identity alone \u2014 they are about power, access, and belonging. When political leaders weaponize ethnic or religious differences to gain or maintain power, they create deep social fractures. Dehumanization of an "other" group is a consistent precursor to mass atrocities. However, diverse societies can be remarkably peaceful when governance is inclusive. The key variable is not diversity itself but whether political systems manage diversity through inclusion or exploitation.',
    examples: [
      { name: 'Israel-Palestine', detail: 'Competing national identities and claims to the same land' },
      { name: 'Ethiopia', detail: 'Ethnic federalism turned identity into the primary political currency' },
      { name: 'Myanmar', detail: 'Rohingya genocide \u2014 ethnic persecution as state policy' },
      { name: 'Balkans (1990s)', detail: 'Ethnic mobilization tore apart a multiethnic state' },
      { name: 'Rwanda (1994)', detail: 'Hutu-Tutsi divisions manipulated into genocide' },
    ]
  },
  {
    number: '04',
    title: 'Colonial Legacy & Historical Grievance',
    color: '#3498db',
    shortDesc: 'Borders drawn by colonizers, institutions designed for extraction, and debts of injustice',
    fullDesc: 'The borders of most countries in Africa, the Middle East, and parts of Asia were drawn by European colonial powers with little regard for ethnic, linguistic, or cultural realities. This created states with built-in tensions \u2014 different groups forced together, or single groups divided across borders. Colonial economic systems designed for extraction rather than development left institutional weakness. And the psychological and economic damage of colonialism \u2014 including forced debt, as in Haiti\'s case \u2014 creates grievances that compound over generations.',
    examples: [
      { name: 'DRC', detail: 'Belgian colonial brutality left institutional weakness exploited for decades' },
      { name: 'Haiti', detail: 'Forced to pay France $21 billion (modern value) for its own freedom' },
      { name: 'Israel-Palestine', detail: 'British Mandate-era promises to both Jews and Arabs' },
      { name: 'Sahel', detail: 'French colonial boundaries and post-colonial economic extraction' },
      { name: 'Myanmar', detail: 'British divide-and-rule policies entrenched ethnic hierarchies' },
    ]
  },
  {
    number: '05',
    title: 'Nuclear Weapons & Arms Proliferation',
    color: '#f1c40f',
    shortDesc: 'Weapons that can end civilization, and the arms trade that fuels every war',
    fullDesc: 'Nuclear weapons create an existential paradox: they may have prevented direct great-power war through mutually assured destruction (MAD), but they also create the risk of civilization-ending catastrophe through miscalculation, accident, or escalation. Meanwhile, the conventional arms trade floods conflict zones with weapons \u2014 the five permanent UN Security Council members are also the world\'s top five arms exporters. Small arms and light weapons cause the vast majority of conflict deaths.',
    examples: [
      { name: 'North Korea', detail: 'Nuclear arsenal as regime survival insurance, resisting all disarmament' },
      { name: 'Russia-Ukraine', detail: 'Nuclear threats constraining Western response to invasion' },
      { name: 'Taiwan', detail: 'Nuclear deterrence underpins the strategic balance' },
      { name: 'Iran', detail: 'Nuclear program creating regional proliferation fears' },
      { name: 'Global arms trade', detail: 'UN Security Council members sell 76% of global arms exports' },
    ]
  },
  {
    number: '06',
    title: 'Geopolitical Rivalry & Proxy Wars',
    color: '#2ecc71',
    shortDesc: 'When great powers compete for influence, smaller nations become battlefields',
    fullDesc: 'Many conflicts that appear local are actually theaters of great-power competition. During the Cold War, the US and USSR fought through proxies across three continents. Today, US-China competition, the Saudi-Iran rivalry, and Russia\'s attempts to maintain influence create similar dynamics. Proxy involvement makes conflicts harder to resolve because external powers have their own interests that may not align with peace. Foreign arms supplies, funding, and diplomatic backing sustain conflicts that might otherwise reach a tipping point toward negotiation.',
    examples: [
      { name: 'Yemen', detail: 'Saudi-Iran rivalry turned a civil war into a regional conflict' },
      { name: 'Syria', detail: 'Russia, Iran, Turkey, US \u2014 each backing different factions' },
      { name: 'Sahel', detail: 'Russia (Wagner) vs. France/West for influence in Africa' },
      { name: 'Sudan', detail: 'UAE backing RSF, Egypt supporting SAF, regional power plays' },
      { name: 'DRC', detail: 'Rwanda\'s backing of M23 for strategic and economic interests' },
    ]
  },
  {
    number: '07',
    title: 'Climate Change & Resource Scarcity',
    color: '#1abc9c',
    shortDesc: 'The threat multiplier \u2014 climate change intensifies every existing tension',
    fullDesc: 'Climate change doesn\'t directly cause wars, but it dramatically intensifies existing tensions. Droughts displace farmers, creating competition for shrinking resources. Rising seas threaten island nations and coastal populations. Water scarcity creates interstate tensions (like the Nile dispute). The World Bank estimates 216 million people could be internally displaced by climate by 2050. Climate-driven instability is already visible in the Sahel, Horn of Africa, and Middle East.',
    examples: [
      { name: 'Sahel', detail: 'Desertification driving farmer-herder conflicts and displacement' },
      { name: 'Somalia', detail: 'Repeated droughts creating food insecurity and fueling recruitment' },
      { name: 'Syria', detail: 'Severe drought (2006-2010) contributed to rural-urban displacement before the war' },
      { name: 'Ethiopia/Egypt', detail: 'Nile water dispute intensified by changing rainfall patterns' },
      { name: 'Lake Chad Basin', detail: 'Lake shrunk 90% since 1960s, fueling Boko Haram recruitment' },
    ]
  },
];
