import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AddStoryFormI, StoriesI } from '../types/storiesTypes';
import fileToBase64 from '../utils/fileToBase64';

interface StoriesStore {
    stories: StoriesI[],
    formData: Partial<AddStoryFormI>,
    setFormData: (data: Partial<AddStoryFormI>) => void,
    clearForm: () => void,
    addToStories: (id: number) => Promise<StoriesI | null>,
    setStoryToSeen: (id: number) => void
    getStories: (id: number) => StoriesI[] | null,
    getFirstUnseenStory: (id: number) => StoriesI | null,
    getFirstSeenStory: (id: number) => StoriesI | null,
    clearStories: () => void
}

const useStoriesStore = create<StoriesStore>()(persist((set, get) => ({
    stories: [],
    formData: {},

    setFormData: (data) => {
        set((state) => ({
            formData: { ...state.formData, ...data }
        }))
    },

    clearForm: () => {
        set(() => ({ formData: {} }))
    },

    addToStories: async (id: number) => {
        const data = get().formData;

        if (!data.storyImage) return null

        const base64Image = await fileToBase64(data.storyImage)

        const newStory: StoriesI = {
            id: Date.now(),
            date: Date.now(),
            imgPath: base64Image,
            isSeen: false,
            userId: id
        }

        set((state) => ({
            stories: [...state.stories, newStory],
            formData: {}
        }))

        return newStory;
    },

    setStoryToSeen: (id) => {
        set((state) => ({
            stories: state.stories.map((story) =>
                story.id === id
                    ? { ...story, isSeen: true }
                    : story)
        }))
    },

    getStories: (id) => {
        const stories = get().stories;

        if (!stories) return null

        const userStories: StoriesI[] = [];

        stories.map(story => {
            if (story.userId === id) userStories.push(story)
        })

        if (userStories.length <= 0) return null

        return userStories
    },

    getFirstUnseenStory: (id) => {
        const userStories = get().getStories(id)
        if (!userStories) return null

        const story = userStories.find(story => !story.isSeen);
        
        if (!story) return null
        return story
    },

    getFirstSeenStory: (id) => {
        const userStories = get().getStories(id);
        if (!userStories) return null

        return userStories[0]
    },

    clearStories: () => {
        set(() => ({
            stories: []
        }))
    }
}), { name: 'stories' }))

export default useStoriesStore