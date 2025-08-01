import {CurrencyCode} from '../enums/currency.enum';
import {ServiceBreakdownItem} from '../types/billing.type';

export const COMMON_CONSTANTS = {
  APP_NAME: 'Insurance Portal',
  APP_REGION: 'MY',
  EMPTY_STRING: '',
  SPACE: ' ',
  DASH: '-',
  EMPTY: '',
  SLASH: '/',
  COLON: ':',
  COMMA: ',',
  DOT: '.',
  PIPE: '|',
  UNDERSCORE: '_',
  NEWLINE: '\n',

  DEFAULT_CURRENCY: CurrencyCode.MYR,
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_DATE_FORMAT: 'YYYY-MM-DD',
  DEFAULT_IMG: 'assets/logos/aposin_logo.ico',
}

export const EXPERIENCE_DATA = {
  DEFAULT_START_DATE: '2022-01-01',
  DEFAULT_END_DATE: '2024-08-01',
}

export const AWS_SERVICE_META_DATA: Record<string, Partial<ServiceBreakdownItem>> = {
  'Amazon Elastic Compute Cloud - Compute': {
    method: 'AWS EC2',
    description: 'EC2 instance usage',
    category: 'Compute'
  },
  'EC2 - Other': {
    method: 'AWS EC2',
    description: 'Other EC2 charges',
    category: 'Compute'
  },
  'Amazon Simple Storage Service': {
    method: 'AWS S3',
    description: 'S3 storage usage',
    category: 'Storage'
  },
  'Amazon Relational Database Service': {
    method: 'AWS RDS',
    description: 'Managed DB instance usage',
    category: 'Database'
  },
  'Amazon Virtual Private Cloud': {
    method: 'AWS VPC',
    description: 'VPC network usage',
    category: 'Networking'
  },
  'Amazon CloudFront': {
    method: 'AWS CloudFront',
    description: 'CDN traffic',
    category: 'Delivery'
  },
  'AmazonCloudWatch': {
    method: 'AWS CloudWatch',
    description: 'Monitoring service usage',
    category: 'Monitoring'
  },
  'Tax': {
    method: 'AWS Billing',
    description: 'Applicable taxes',
    category: 'Financial'
  }
};
