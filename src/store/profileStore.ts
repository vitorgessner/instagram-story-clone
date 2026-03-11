import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import bcrypt from 'bcryptjs';
import type { LoginFormI, RegisterFormI, ProfilesI } from '../types/profileTypes';
import fileToBase64 from '../utils/fileToBase64';
import { ValidationError } from '../utils/ValidationError';

interface ProfilesStore {
  profiles: ProfilesI[]
  loggedProfile: ProfilesI | null

  addProfile: (data: RegisterFormI) => Promise<void>
  login: (data: LoginFormI) => Promise<ProfilesI | null | undefined>
  logoff: () => void
  clearProfiles: () => void,

  getProfileById: (id: number) => ProfilesI | null,
  getProfileByUser: (user: string) => ProfilesI | null,
}

const useProfilesStore = create<ProfilesStore>()(persist((set, get) => ({
  profiles: [],
  loggedProfile: null,

  addProfile: async (data) => {
    try {

      if (!data.username || !data.image || !data.password) return

      if (data.image.type.split('/')[0] !== 'image') throw new ValidationError({ message: 'Only images are suportted' })

      const base64Image = await fileToBase64(data.image)

      const hashedPassword = await bcrypt.hash(data.password, 10)

      const newProfile: ProfilesI = {
        id: Date.now(),
        username: data.username,
        password: hashedPassword,
        pfpPath: base64Image,
      }

      set((state) => ({
        profiles: [...state.profiles, newProfile],
        loggedProfile: newProfile,
        formData: {}
      }))
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
    }
  },

  logoff: () => {
    set(() => ({
      loggedProfile: null
    }))
  },

  login: async (data) => {
    try {
      const profiles = get().profiles

      if (!data.username || !data.password) return null;

      const profile = profiles.find(profile => profile.username === data.username);
      if (!profile) throw new ValidationError({ message: 'User or password incorrect' })

      if (await bcrypt.compare(data.password, profile.password)) {
        set(() => ({
          loggedProfile: profile
        }))

        return profile
      } else {
        throw new ValidationError({ message: 'User or password incorrect' })
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
    }
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

    const profile = profiles.find(profile => profile.username === user);
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