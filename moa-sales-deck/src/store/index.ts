import { create } from 'zustand'
import type { SectionId, ModuleId, InquiryType } from '../types'

interface NavigationSlice {
  activeSection: SectionId
  isNavOpen: boolean
  visitedSections: SectionId[]
  theme: 'dark' | 'light'
  setActiveSection: (id: SectionId) => void
  setNavOpen: (open: boolean) => void
  markVisited: (id: SectionId) => void
  toggleTheme: () => void
}

interface VideoSlice {
  isMuted: boolean
  hasInteracted: boolean
  setMuted: (muted: boolean) => void
  setHasInteracted: () => void
}

interface ModuleSlice {
  activeModule: ModuleId
  setActiveModule: (id: ModuleId) => void
}

interface LeadSlice {
  name: string
  company: string
  email: string
  inquiryType: InquiryType
  message: string
  submitted: boolean
  setField: (field: string, value: string) => void
  setInquiryType: (type: InquiryType) => void
  setSubmitted: (v: boolean) => void
}

type Store = NavigationSlice & VideoSlice & ModuleSlice & LeadSlice

export const useStore = create<Store>((set) => ({
  // Navigation
  activeSection: 'hero',
  isNavOpen: false,
  visitedSections: [],
  theme: 'dark',
  setActiveSection: (id) => set({ activeSection: id }),
  setNavOpen: (open) => set({ isNavOpen: open }),
  markVisited: (id) =>
    set((s) => ({
      visitedSections: s.visitedSections.includes(id)
        ? s.visitedSections
        : [...s.visitedSections, id],
    })),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

  // Video
  isMuted: true,
  hasInteracted: false,
  setMuted: (muted) => set({ isMuted: muted }),
  setHasInteracted: () => set({ hasInteracted: true }),

  // Modules
  activeModule: null,
  setActiveModule: (id) => set({ activeModule: id }),

  // Lead form
  name: '',
  company: '',
  email: '',
  inquiryType: 'retail',
  message: '',
  submitted: false,
  setField: (field, value) => set({ [field]: value } as Partial<Store>),
  setInquiryType: (type) => set({ inquiryType: type }),
  setSubmitted: (v) => set({ submitted: v }),
}))
