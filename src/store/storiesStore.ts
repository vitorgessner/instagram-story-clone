import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AddStoryFormI, StoriesI } from '../types/storiesTypes';
import fileToBase64 from '../utils/fileToBase64';
import { ValidationError } from '../utils/ValidationError';
import { getPixelColor } from '../utils/getPixelColor';

interface StoriesStore {
    stories: StoriesI[],
    addToStories: (id: number, data: Partial<AddStoryFormI>) => Promise<StoriesI | null | undefined>,
    setStoryToSeen: (id: number) => void
    getStories: (id: number) => StoriesI[] | null,
    getFirstUnseenStory: (id: number) => StoriesI | null,
    getLastSeenStory: (id: number) => StoriesI | null,
    clearStories: () => void,
    removeFromStories: (id: number) => void,
}

const useStoriesStore = create<StoriesStore>()(persist((set, get) => ({
    stories: [],

    addToStories: async (id, data) => {
        try {

            if (!data.image) return null;

            if (data.image.type.split('/')[0] !== 'image') throw new ValidationError({ message: 'Only images are supported' });

            const base64Image = await fileToBase64(data.image)
            const image = new Image();
            image.src = base64Image;
            return new Promise(resolve => {
                image.onload = () => {
                    const color = getPixelColor(image)

                    const newStory: StoriesI = {
                        id: Date.now(),
                        date: Date.now(),
                        imgPath: base64Image,
                        dominantColor: color,
                        isSeen: false,
                        userId: id
                    }

                    set((state) => ({
                        stories: [...state.stories, newStory],
                        formData: {}
                    }))

                    resolve(newStory);
                }
            })
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
        }
    },

    removeFromStories: (id) => {
        set((state) => ({
            stories: [...state.stories.filter(story => story.id !== id)]
        }))
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

        const userStories: StoriesI[] = stories.filter(story => story.userId === id);

        if (userStories.length <= 0) return null

        return userStories
    },

    getFirstUnseenStory: (id) => {
        const userStories = get().getStories(id)
        if (!userStories) return null

        const story = userStories.find(story => !story.isSeen);

        if (!story) return userStories[0]
        return story
    },

    getLastSeenStory: (id) => {
        const userStories = get().getStories(id);
        if (!userStories) return null;

        const story = userStories.findLast(story => story.isSeen);

        if (!story) return null;
        return story;
    },

    clearStories: () => {
        set(() => ({
            stories: []
        }))
    }
}), { name: 'stories' }))

export default useStoriesStore