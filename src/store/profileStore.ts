import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import bcrypt from 'bcryptjs';
import type { LoginFormI, RegisterFormI, ProfilesI } from '../types/profileTypes';
import fileToBase64 from '../utils/fileToBase64';

interface ProfilesStore {
  profiles: ProfilesI[]
  loggedProfile: ProfilesI | null

  formData: Partial<RegisterFormI> & Partial<LoginFormI>
  setFormData: (data: Partial<RegisterFormI> & Partial<LoginFormI>) => void
  clearForm: () => void

  addProfile: () => void
  login: () => void
  logoff: () => void
  clearProfiles: () => void,

  getProfileById: (id: number) => ProfilesI | null,
  getProfileByUser: (user: string) => ProfilesI | null,
}

const useProfilesStore = create<ProfilesStore>()(persist((set, get) => ({
  profiles: [],
  loggedProfile: null,
  formData: {},

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data }
    })),

  clearForm: () =>
    set({ formData: {} }),

  addProfile: async () => {
    const data = get().formData

    if (!data.userName || !data.pfp || !data.password) return

    const base64Image = await fileToBase64(data.pfp)

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newProfile: ProfilesI = {
      id: Date.now(),
      userName: data.userName,
      password: hashedPassword,
      pfpPath: base64Image,
      order: 0
    }

    set((state) => ({
      profiles: [...state.profiles, newProfile],
      loggedProfile: newProfile,
      formData: {}
    }))
  },

  logoff: () => {
    set(() => ({
      loggedProfile: null
    }))
  },

  login: async () => {
    const data = get().formData
    const profiles = get().profiles

    if (!data.loginName || !data.loginPass) return

    const profile = profiles.find(profile => profile.userName === data.loginName);
    if (!profile) return null

    if (await bcrypt.compare(data.loginPass, profile.password)) {
      set(() => ({
        loggedProfile: profile
      }))
    }

    set(() => ({
      formData: {}
    }))
  },

  getProfileById: (id) => {
    const profiles = get().profiles;
    if (!profiles) return null

    const profile = profiles.find(profile => profile.id === id);
    if (!profile) return null
    return profile
  },

  getProfileByUser: (user) => {
    const profiles = get().profiles;
    if (!profiles) return null

    const profile = profiles.find(profile => profile.userName === user);
    if (!profile) return null
    return profile
  },

  clearProfiles: () => {
    set(() => ({
      profiles: []
    }))
  }
}), { name: 'profiles' }))

export default useProfilesStore