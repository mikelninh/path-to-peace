export const armsExporters = [
  { id: 'us', name: 'United States', share: 40, value: 15800, color: '#3498db' },
  { id: 'ru', name: 'Russia', share: 16, value: 6300, color: '#e74c3c' },
  { id: 'fr', name: 'France', share: 11, value: 4300, color: '#2ecc71' },
  { id: 'cn', name: 'China', share: 5.2, value: 2050, color: '#f1c40f' },
  { id: 'de', name: 'Germany', share: 4.2, value: 1650, color: '#e67e22' },
  { id: 'uk', name: 'United Kingdom', share: 3.7, value: 1460, color: '#9b59b6' },
  { id: 'it', name: 'Italy', share: 3.5, value: 1380, color: '#1abc9c' },
  { id: 'kr', name: 'South Korea', share: 2.8, value: 1100, color: '#34495e' },
  { id: 'il', name: 'Israel', share: 2.4, value: 940, color: '#7f8c8d' },
  { id: 'es', name: 'Spain', share: 1.7, value: 670, color: '#d35400' },
];

export const armsFlows = [
  // United States flows
  { from: 'us', to: 'Middle East', value: 8200, conflicts: ['israel-palestine', 'yemen', 'syria'] },
  { from: 'us', to: 'East Asia', value: 3100, conflicts: ['taiwan', 'south-china-sea'] },
  { from: 'us', to: 'South Korea & Japan', value: 2400, conflicts: ['north-korea'] },
  { from: 'us', to: 'Europe (Ukraine)', value: 1200, conflicts: ['russia-ukraine'] },
  { from: 'us', to: 'East Africa', value: 450, conflicts: ['somalia', 'ethiopia'] },

  // Russia flows
  { from: 'ru', to: 'South & Southeast Asia', value: 2100, conflicts: ['south-china-sea'] },
  { from: 'ru', to: 'Middle East', value: 1400, conflicts: ['syria'] },
  { from: 'ru', to: 'East Africa', value: 1200, conflicts: ['ethiopia', 'sudan'] },
  { from: 'ru', to: 'Sahel Region', value: 800, conflicts: ['sahel'] },
  { from: 'ru', to: 'South Caucasus', value: 500, conflicts: ['nagorno-karabakh'] },

  // France flows
  { from: 'fr', to: 'Middle East (Gulf States)', value: 1800, conflicts: ['yemen'] },
  { from: 'fr', to: 'South & Southeast Asia', value: 1200, conflicts: ['south-china-sea'] },
  { from: 'fr', to: 'West & Central Africa', value: 650, conflicts: ['sahel', 'drc'] },
  { from: 'fr', to: 'Europe (Ukraine)', value: 400, conflicts: ['russia-ukraine'] },

  // China flows
  { from: 'cn', to: 'South & Southeast Asia', value: 750, conflicts: ['myanmar', 'south-china-sea'] },
  { from: 'cn', to: 'Sub-Saharan Africa', value: 520, conflicts: ['sudan', 'drc'] },
  { from: 'cn', to: 'Middle East', value: 480, conflicts: ['syria'] },

  // Germany flows
  { from: 'de', to: 'Europe (Ukraine)', value: 650, conflicts: ['russia-ukraine'] },
  { from: 'de', to: 'Middle East', value: 500, conflicts: ['israel-palestine', 'yemen'] },
  { from: 'de', to: 'East Asia', value: 350, conflicts: ['south-china-sea'] },

  // United Kingdom flows
  { from: 'uk', to: 'Middle East (Gulf States)', value: 820, conflicts: ['yemen', 'israel-palestine'] },
  { from: 'uk', to: 'Europe (Ukraine)', value: 380, conflicts: ['russia-ukraine'] },

  // Italy flows
  { from: 'it', to: 'Middle East & North Africa', value: 680, conflicts: ['yemen', 'israel-palestine'] },
  { from: 'it', to: 'Europe (Ukraine)', value: 320, conflicts: ['russia-ukraine'] },

  // South Korea flows
  { from: 'kr', to: 'Europe (Poland/Ukraine)', value: 540, conflicts: ['russia-ukraine'] },
  { from: 'kr', to: 'Southeast Asia', value: 310, conflicts: ['south-china-sea'] },

  // Israel flows
  { from: 'il', to: 'South Caucasus', value: 420, conflicts: ['nagorno-karabakh'] },
  { from: 'il', to: 'South & Southeast Asia', value: 350, conflicts: ['myanmar', 'south-china-sea'] },

  // Spain flows
  { from: 'es', to: 'Middle East', value: 280, conflicts: ['yemen'] },
  { from: 'es', to: 'Europe (Ukraine)', value: 190, conflicts: ['russia-ukraine'] },
];

export const keyStats = [
  { label: 'Global arms trade value (2023)', value: '$39.4 billion' },
  { label: 'UN Security Council members\' share', value: '76%' },
  { label: 'Top recipient region', value: 'Middle East' },
  { label: 'Arms sold to active conflict zones', value: 'Est. $12B+' },
  { label: 'Number of countries with arms embargoes', value: '13' },
  { label: 'Arms Trade Treaty signatories', value: '113 states' },
  { label: 'Largest single arms deal (2019-2023)', value: 'US-Saudi Arabia' },
  { label: 'Fastest growing exporter', value: 'South Korea (+12%)' },
];

export const conflictArmsSummary = {
  'russia-ukraine': {
    topSuppliers: ['United States', 'Germany', 'United Kingdom', 'France', 'South Korea'],
    keyWeapons: ['HIMARS', 'Leopard 2 tanks', 'Storm Shadow missiles', 'Patriot air defense'],
    note: 'Western coalition has provided over $100B in military aid to Ukraine since 2022. Russia relies heavily on domestic production supplemented by Iranian drones and North Korean munitions.',
  },
  'israel-palestine': {
    topSuppliers: ['United States', 'Germany'],
    keyWeapons: ['F-35 fighter jets', 'precision-guided munitions', 'Iron Dome interceptors'],
    note: 'The US provides $3.8B in annual military aid to Israel under a 10-year MOU. Arms transfers came under intense scrutiny during the Gaza operation.',
  },
  'sudan': {
    topSuppliers: ['Russia', 'China', 'UAE', 'Egypt'],
    keyWeapons: ['Armored vehicles', 'small arms', 'drones', 'artillery'],
    note: 'UAE is widely reported to supply the RSF through intermediaries. China and Russia supply the SAF. No comprehensive arms embargo exists.',
  },
  'myanmar': {
    topSuppliers: ['Russia', 'China', 'India', 'Israel'],
    keyWeapons: ['Fighter jets', 'attack helicopters', 'radar systems', 'naval vessels'],
    note: 'Russia and China continue supplying the junta despite international condemnation. Aviation fuel imports enable airstrikes on civilian targets.',
  },
  'ethiopia': {
    topSuppliers: ['Russia', 'China', 'UAE', 'Turkey', 'Iran'],
    keyWeapons: ['Drones (Turkish Bayraktar)', 'artillery', 'small arms', 'armored vehicles'],
    note: 'Turkish drones played a decisive role in the Tigray war. Eritrea received arms from Gulf states and deployed them in Tigray.',
  },
  'yemen': {
    topSuppliers: ['United States', 'United Kingdom', 'France', 'Iran'],
    keyWeapons: ['Fighter jets', 'precision-guided bombs', 'missiles', 'drones'],
    note: 'Saudi and UAE air campaigns rely on Western-supplied aircraft and munitions. Iran supplies the Houthis with missile and drone technology.',
  },
  'drc': {
    topSuppliers: ['Rwanda (diverted)', 'China', 'Various black market'],
    keyWeapons: ['Small arms', 'ammunition', 'RPGs', 'mortars'],
    note: 'M23 receives weapons through Rwanda despite UN arms embargo. Mineral wealth funds arms purchases by multiple armed groups.',
  },
  'sahel': {
    topSuppliers: ['Russia', 'Turkey', 'China', 'Various'],
    keyWeapons: ['Drones', 'armored personnel carriers', 'small arms', 'helicopters'],
    note: 'Wagner/Africa Corps has replaced Western military partners. Turkey has become a growing arms supplier to the region.',
  },
  'syria': {
    topSuppliers: ['Russia', 'Iran', 'Turkey', 'United States'],
    keyWeapons: ['Air defense systems', 'fighter jets', 'armored vehicles', 'anti-tank weapons'],
    note: 'Russia and Iran were the primary suppliers of the Assad regime. Turkey and the US armed opposing rebel factions.',
  },
  'haiti': {
    topSuppliers: ['United States (illicit trafficking)'],
    keyWeapons: ['Handguns', 'assault rifles', 'ammunition'],
    note: 'Most gang weapons are trafficked from the United States through Florida and the Dominican Republic. This is primarily an illicit arms flow problem.',
  },
  'south-china-sea': {
    topSuppliers: ['United States', 'Russia', 'France', 'Israel'],
    keyWeapons: ['Submarines', 'frigates', 'anti-ship missiles', 'fighter jets'],
    note: 'Claimant states are engaged in a naval arms buildup. The Philippines, Vietnam, and Indonesia are all increasing maritime defense spending.',
  },
  'taiwan': {
    topSuppliers: ['United States'],
    keyWeapons: ['F-16 fighters', 'Harpoon missiles', 'M1 Abrams tanks', 'HIMARS'],
    note: 'The US is Taiwan\'s sole major arms supplier under the Taiwan Relations Act. Backlog of approved sales exceeds $19B.',
  },
  'north-korea': {
    topSuppliers: ['Domestic production', 'China (historical)', 'Russia (technology exchange)'],
    keyWeapons: ['ICBMs', 'submarine-launched missiles', 'nuclear warheads', 'artillery'],
    note: 'North Korea is now an arms exporter, supplying Russia with artillery shells and short-range ballistic missiles for use in Ukraine.',
  },
  'somalia': {
    topSuppliers: ['Turkey', 'United States', 'Various (diverted)'],
    keyWeapons: ['Small arms', 'armored vehicles', 'counter-IED equipment'],
    note: 'The UN arms embargo on Somalia was lifted in 2023 but armed group diversion remains a major concern.',
  },
  'nagorno-karabakh': {
    topSuppliers: ['Israel', 'Turkey', 'Russia'],
    keyWeapons: ['Bayraktar TB2 drones', 'Harop loitering munitions', 'LORA missiles'],
    note: 'Israeli and Turkish drones were decisive in Azerbaijan\'s 2020 and 2023 victories. Russia supplied Armenia but also maintained relations with Azerbaijan.',
  },
};
