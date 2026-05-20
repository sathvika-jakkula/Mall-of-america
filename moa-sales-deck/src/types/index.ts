export type SectionId =
  | 'hero'
  | 'why-moa'
  | 'retail'
  | 'luxury'
  | 'dining'
  | 'attractions'
  | 'events'
  | 'contact'

export type ModuleId = 'events' | 'sponsorship' | 'leasing' | 'venue' | null

export interface SectionMeta {
  id: SectionId
  label: string
  order: number
}

export interface StatItem {
  value: number
  suffix: string
  label: string
  prefix?: string
}

export interface BrandItem {
  name: string
  category: 'luxury' | 'anchor' | 'fashion' | 'lifestyle' | 'food'
}

export interface AttractionItem {
  id: string
  name: string
  tagline: string
  detail: string
  image: string
}

export interface ModuleConfig {
  id: ModuleId
  label: string
  contactEmail: string
  color: string
}

export type InquiryType = 'retail' | 'sponsorship' | 'events'

export interface LeadFormData {
  name: string
  company: string
  email: string
  inquiryType: InquiryType
  message: string
}
