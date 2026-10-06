export const REGIONS = [
  'Asia',
  'Middle East',
  'Europe',
  'Africa',
  'North America',
  'South America',
  'Oceania',
] as const

export type Region = (typeof REGIONS)[number]

export interface Country {
  code: string
  name: string
  dial: string
  region: Region
}

type Row = [code: string, name: string, dial: string]

const DATA: Record<Region, Row[]> = {
  Asia: [
    ['AF', 'Afghanistan', '+93'], ['AM', 'Armenia', '+374'], ['AZ', 'Azerbaijan', '+994'],
    ['BD', 'Bangladesh', '+880'], ['BT', 'Bhutan', '+975'], ['BN', 'Brunei', '+673'],
    ['KH', 'Cambodia', '+855'], ['CN', 'China', '+86'], ['GE', 'Georgia', '+995'],
    ['HK', 'Hong Kong', '+852'], ['IN', 'India', '+91'], ['ID', 'Indonesia', '+62'],
    ['JP', 'Japan', '+81'], ['KZ', 'Kazakhstan', '+7'], ['KG', 'Kyrgyzstan', '+996'],
    ['LA', 'Laos', '+856'], ['MO', 'Macau', '+853'], ['MY', 'Malaysia', '+60'],
    ['MV', 'Maldives', '+960'], ['MN', 'Mongolia', '+976'], ['MM', 'Myanmar', '+95'],
    ['NP', 'Nepal', '+977'], ['KP', 'North Korea', '+850'], ['PK', 'Pakistan', '+92'],
    ['PH', 'Philippines', '+63'], ['SG', 'Singapore', '+65'], ['KR', 'South Korea', '+82'],
    ['LK', 'Sri Lanka', '+94'], ['TW', 'Taiwan', '+886'], ['TJ', 'Tajikistan', '+992'],
    ['TH', 'Thailand', '+66'], ['TL', 'Timor-Leste', '+670'], ['TM', 'Turkmenistan', '+993'],
    ['UZ', 'Uzbekistan', '+998'], ['VN', 'Vietnam', '+84'],
  ],
  'Middle East': [
    ['BH', 'Bahrain', '+973'], ['CY', 'Cyprus', '+357'], ['EG', 'Egypt', '+20'],
    ['IR', 'Iran', '+98'], ['IQ', 'Iraq', '+964'], ['IL', 'Israel', '+972'],
    ['JO', 'Jordan', '+962'], ['KW', 'Kuwait', '+965'], ['LB', 'Lebanon', '+961'],
    ['OM', 'Oman', '+968'], ['PS', 'Palestine', '+970'], ['QA', 'Qatar', '+974'],
    ['SA', 'Saudi Arabia', '+966'], ['SY', 'Syria', '+963'], ['TR', 'Turkey', '+90'],
    ['AE', 'United Arab Emirates', '+971'], ['YE', 'Yemen', '+967'],
  ],
  Europe: [
    ['AL', 'Albania', '+355'], ['AD', 'Andorra', '+376'], ['AT', 'Austria', '+43'],
    ['BY', 'Belarus', '+375'], ['BE', 'Belgium', '+32'], ['BA', 'Bosnia and Herzegovina', '+387'],
    ['BG', 'Bulgaria', '+359'], ['HR', 'Croatia', '+385'], ['CZ', 'Czech Republic', '+420'],
    ['DK', 'Denmark', '+45'], ['EE', 'Estonia', '+372'], ['FI', 'Finland', '+358'],
    ['FR', 'France', '+33'], ['DE', 'Germany', '+49'], ['GR', 'Greece', '+30'],
    ['HU', 'Hungary', '+36'], ['IS', 'Iceland', '+354'], ['IE', 'Ireland', '+353'],
    ['IT', 'Italy', '+39'], ['XK', 'Kosovo', '+383'], ['LV', 'Latvia', '+371'],
    ['LI', 'Liechtenstein', '+423'], ['LT', 'Lithuania', '+370'], ['LU', 'Luxembourg', '+352'],
    ['MT', 'Malta', '+356'], ['MD', 'Moldova', '+373'], ['MC', 'Monaco', '+377'],
    ['ME', 'Montenegro', '+382'], ['NL', 'Netherlands', '+31'], ['MK', 'North Macedonia', '+389'],
    ['NO', 'Norway', '+47'], ['PL', 'Poland', '+48'], ['PT', 'Portugal', '+351'],
    ['RO', 'Romania', '+40'], ['RU', 'Russia', '+7'], ['SM', 'San Marino', '+378'],
    ['RS', 'Serbia', '+381'], ['SK', 'Slovakia', '+421'], ['SI', 'Slovenia', '+386'],
    ['ES', 'Spain', '+34'], ['SE', 'Sweden', '+46'], ['CH', 'Switzerland', '+41'],
    ['UA', 'Ukraine', '+380'], ['GB', 'United Kingdom', '+44'],
  ],
  Africa: [
    ['DZ', 'Algeria', '+213'], ['AO', 'Angola', '+244'], ['BJ', 'Benin', '+229'],
    ['BW', 'Botswana', '+267'], ['BF', 'Burkina Faso', '+226'], ['BI', 'Burundi', '+257'],
    ['CM', 'Cameroon', '+237'], ['CV', 'Cape Verde', '+238'], ['CF', 'Central African Republic', '+236'],
    ['TD', 'Chad', '+235'], ['KM', 'Comoros', '+269'], ['CD', 'DR Congo', '+243'],
    ['CG', 'Congo', '+242'], ['CI', "Côte d'Ivoire", '+225'], ['DJ', 'Djibouti', '+253'],
    ['GQ', 'Equatorial Guinea', '+240'], ['ER', 'Eritrea', '+291'], ['SZ', 'Eswatini', '+268'],
    ['ET', 'Ethiopia', '+251'], ['GA', 'Gabon', '+241'], ['GM', 'Gambia', '+220'],
    ['GH', 'Ghana', '+233'], ['GN', 'Guinea', '+224'], ['KE', 'Kenya', '+254'],
    ['LS', 'Lesotho', '+266'], ['LR', 'Liberia', '+231'], ['LY', 'Libya', '+218'],
    ['MG', 'Madagascar', '+261'], ['MW', 'Malawi', '+265'], ['ML', 'Mali', '+223'],
    ['MR', 'Mauritania', '+222'], ['MU', 'Mauritius', '+230'], ['MA', 'Morocco', '+212'],
    ['MZ', 'Mozambique', '+258'], ['NA', 'Namibia', '+264'], ['NE', 'Niger', '+227'],
    ['NG', 'Nigeria', '+234'], ['RW', 'Rwanda', '+250'], ['SN', 'Senegal', '+221'],
    ['SC', 'Seychelles', '+248'], ['SL', 'Sierra Leone', '+232'], ['SO', 'Somalia', '+252'],
    ['ZA', 'South Africa', '+27'], ['SS', 'South Sudan', '+211'], ['SD', 'Sudan', '+249'],
    ['TZ', 'Tanzania', '+255'], ['TG', 'Togo', '+228'], ['TN', 'Tunisia', '+216'],
    ['UG', 'Uganda', '+256'], ['ZM', 'Zambia', '+260'], ['ZW', 'Zimbabwe', '+263'],
  ],
  'North America': [
    ['BS', 'Bahamas', '+1'], ['BB', 'Barbados', '+1'], ['BZ', 'Belize', '+501'],
    ['CA', 'Canada', '+1'], ['CR', 'Costa Rica', '+506'], ['CU', 'Cuba', '+53'],
    ['DO', 'Dominican Republic', '+1'], ['SV', 'El Salvador', '+503'], ['GT', 'Guatemala', '+502'],
    ['HT', 'Haiti', '+509'], ['HN', 'Honduras', '+504'], ['JM', 'Jamaica', '+1'],
    ['MX', 'Mexico', '+52'], ['NI', 'Nicaragua', '+505'], ['PA', 'Panama', '+507'],
    ['PR', 'Puerto Rico', '+1'], ['TT', 'Trinidad and Tobago', '+1'], ['US', 'United States', '+1'],
  ],
  'South America': [
    ['AR', 'Argentina', '+54'], ['BO', 'Bolivia', '+591'], ['BR', 'Brazil', '+55'],
    ['CL', 'Chile', '+56'], ['CO', 'Colombia', '+57'], ['EC', 'Ecuador', '+593'],
    ['GY', 'Guyana', '+592'], ['PY', 'Paraguay', '+595'], ['PE', 'Peru', '+51'],
    ['SR', 'Suriname', '+597'], ['UY', 'Uruguay', '+598'], ['VE', 'Venezuela', '+58'],
  ],
  Oceania: [
    ['AU', 'Australia', '+61'], ['FJ', 'Fiji', '+679'], ['NZ', 'New Zealand', '+64'],
    ['PG', 'Papua New Guinea', '+675'], ['WS', 'Samoa', '+685'], ['SB', 'Solomon Islands', '+677'],
    ['TO', 'Tonga', '+676'], ['VU', 'Vanuatu', '+678'],
  ],
}

export const COUNTRIES: Country[] = REGIONS.flatMap(region =>
  DATA[region].map(([code, name, dial]) => ({ code, name, dial, region }))
)

export const DEFAULT_COUNTRY_CODE = 'PK'

export function findCountry(code?: string | null): Country | undefined {
  if (!code) return undefined
  const upper = code.toUpperCase()
  return COUNTRIES.find(c => c.code === upper)
}

export function countriesInRegion(region: Region): Country[] {
  return COUNTRIES.filter(c => c.region === region)
}

const TIMEZONE_COUNTRY: Record<string, string> = {
  'Asia/Karachi': 'PK', 'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Asia/Qatar': 'QA',
  'Asia/Kuwait': 'KW', 'Asia/Bahrain': 'BH', 'Asia/Muscat': 'OM', 'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN', 'Asia/Dhaka': 'BD', 'Asia/Shanghai': 'CN', 'Asia/Tokyo': 'JP',
  'Asia/Singapore': 'SG', 'Asia/Kuala_Lumpur': 'MY', 'Asia/Jakarta': 'ID', 'Asia/Manila': 'PH',
  'Asia/Bangkok': 'TH', 'Asia/Seoul': 'KR', 'Asia/Kabul': 'AF', 'Asia/Tehran': 'IR',
  'Asia/Baghdad': 'IQ', 'Asia/Amman': 'JO', 'Asia/Beirut': 'LB', 'Europe/Istanbul': 'TR',
  'Europe/London': 'GB', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE', 'Europe/Madrid': 'ES',
  'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL', 'Europe/Moscow': 'RU', 'Africa/Cairo': 'EG',
  'Africa/Lagos': 'NG', 'Africa/Nairobi': 'KE', 'Africa/Johannesburg': 'ZA', 'Africa/Casablanca': 'MA',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US', 'America/Los_Angeles': 'US',
  'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Mexico_City': 'MX', 'America/Sao_Paulo': 'BR',
  'America/Argentina/Buenos_Aires': 'AR', 'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU',
  'Pacific/Auckland': 'NZ',
}

export function countryFromTimezone(): string | undefined {
  try {
    return TIMEZONE_COUNTRY[Intl.DateTimeFormat().resolvedOptions().timeZone]
  } catch {
    return undefined
  }
}
