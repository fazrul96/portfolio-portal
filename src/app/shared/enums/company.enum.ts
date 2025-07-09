export enum CompanyCategoryCode {
  MNC = 'MNC',
  SME = 'SME',
  STARTUP = 'STARTUP',
  GOVERNMENT = 'GOVERNMENT',
  GLC = 'GLC',
  NGO = 'NGO',
  FREELANCE = 'FREELANCE',
}

export const CompanyCategoryLabels: Record<CompanyCategoryCode, string> = {
  [CompanyCategoryCode.MNC]: 'Multinational Corporation (MNC)',
  [CompanyCategoryCode.SME]: 'Small & Medium Enterprise (SME)',
  [CompanyCategoryCode.STARTUP]: 'Startup',
  [CompanyCategoryCode.GOVERNMENT]: 'Government',
  [CompanyCategoryCode.GLC]: 'Government-Linked Company (GLC)',
  [CompanyCategoryCode.NGO]: 'Non-Governmental Organization (NGO)',
  [CompanyCategoryCode.FREELANCE]: 'Freelancer / Independent',
};
