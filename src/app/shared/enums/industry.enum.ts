export enum IndustryCode {
  // Tech & Finance
  FINTECH = 'FINTECH',
  ECOMMERCE = 'ECOMMERCE',
  SOFTWARE = 'SOFTWARE',
  IT_SERVICES = 'IT_SERVICES',
  TELECOMMUNICATION = 'TELECOMMUNICATION',
  BANKING = 'BANKING',
  INSURANCE = 'INSURANCE',

  // Health & Science
  HEALTHCARE = 'HEALTHCARE',
  BIOTECH = 'BIOTECH',
  PHARMACEUTICAL = 'PHARMACEUTICAL',

  // Public & Education
  EDUCATION = 'EDUCATION',
  GOVERNMENT = 'GOVERNMENT',
  NON_PROFIT = 'NON_PROFIT',

  // Industrial & Trade
  MANUFACTURING = 'MANUFACTURING',
  CONSTRUCTION = 'CONSTRUCTION',
  ENGINEERING = 'ENGINEERING',
  ENERGY = 'ENERGY',
  LOGISTICS = 'LOGISTICS',
  RETAIL = 'RETAIL',
  AUTOMOTIVE = 'AUTOMOTIVE',
  AGRICULTURE = 'AGRICULTURE',

  // Media & Lifestyle
  MEDIA = 'MEDIA',
  ENTERTAINMENT = 'ENTERTAINMENT',
  TRAVEL = 'TRAVEL',
  FOOD_BEVERAGE = 'FOOD_BEVERAGE',
  REAL_ESTATE = 'REAL_ESTATE',

  // Professional Services
  LEGAL = 'LEGAL',
  CONSULTING = 'CONSULTING',
  ACCOUNTING = 'ACCOUNTING',
}

export const IndustryLabels: Record<IndustryCode, string> = {
  [IndustryCode.FINTECH]: 'Fintech',
  [IndustryCode.ECOMMERCE]: 'E-Commerce',
  [IndustryCode.SOFTWARE]: 'Software Development',
  [IndustryCode.IT_SERVICES]: 'IT Services',
  [IndustryCode.TELECOMMUNICATION]: 'Telecommunication',
  [IndustryCode.BANKING]: 'Banking',
  [IndustryCode.INSURANCE]: 'Insurance',

  [IndustryCode.HEALTHCARE]: 'Healthcare',
  [IndustryCode.BIOTECH]: 'Biotechnology',
  [IndustryCode.PHARMACEUTICAL]: 'Pharmaceutical',

  [IndustryCode.EDUCATION]: 'Education',
  [IndustryCode.GOVERNMENT]: 'Government',
  [IndustryCode.NON_PROFIT]: 'Non-Profit / NGO',

  [IndustryCode.MANUFACTURING]: 'Manufacturing',
  [IndustryCode.CONSTRUCTION]: 'Construction',
  [IndustryCode.ENGINEERING]: 'Engineering',
  [IndustryCode.ENERGY]: 'Energy / Oil & Gas',
  [IndustryCode.LOGISTICS]: 'Logistics & Supply Chain',
  [IndustryCode.RETAIL]: 'Retail',
  [IndustryCode.AUTOMOTIVE]: 'Automotive',
  [IndustryCode.AGRICULTURE]: 'Agriculture',

  [IndustryCode.MEDIA]: 'Media & Publishing',
  [IndustryCode.ENTERTAINMENT]: 'Entertainment',
  [IndustryCode.TRAVEL]: 'Travel & Hospitality',
  [IndustryCode.FOOD_BEVERAGE]: 'Food & Beverage',
  [IndustryCode.REAL_ESTATE]: 'Real Estate',

  [IndustryCode.LEGAL]: 'Legal',
  [IndustryCode.CONSULTING]: 'Consulting',
  [IndustryCode.ACCOUNTING]: 'Accounting & Audit',
};
