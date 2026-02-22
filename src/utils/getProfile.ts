import { profiles, type ProfilesI } from "./data";

export const getProfileById: (id: number) => ProfilesI = (id) => {
    const profile = profiles.find(profile => profile.id === id);

    if (!profile) throw new Error('User not found');

    return profile;
}

export const getProfileByUser: (user: string) => ProfilesI = (user) => {
    const profile = profiles.find(profile => profile.userName === user);

    if (!profile) throw new Error('User not found');

    return profile;
}