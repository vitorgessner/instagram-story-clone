export interface ProfilesI {
    id: number,
    userName: string,
    pfpPath: string,
    order?: number
}

export const profiles: Array<ProfilesI> = [
    { id: 1, userName: 'tinho', order: 1, pfpPath: '../../public/images/tinho.jpg' },
    { id: 2, userName: 'phos', order: 2, pfpPath: '../../public/images/phos.jpg' },
    { id: 3, userName: 'vic', order: 102, pfpPath: '../../public/images/vic.png' },
    { id: 4, userName: 'ash', order: 4, pfpPath: '../../public/images/ash.jpg' },
    { id: 5, userName: 'voticomer', order: 104, pfpPath: '../../public/images/voticomer.webp' },
]

export interface StoriesI {
    id: number,
    userId: number,
    isSeen: boolean,
    date: number,
    imgPath: string,
}

export const stories: Array<StoriesI> = [
    { id: 1, userId: 1, isSeen: false, date: new Date('2026-02-20T22:00:00').getTime(), imgPath: '../../public/images/new planet, restart of all.png'},
    { id: 2, userId: 1, isSeen: false, date: new Date('2026-02-19').getTime(), imgPath: '../../public/images/vampiros.webp'},
    { id: 11, userId: 1, isSeen: false, date: new Date('2026-02-19').getTime(), imgPath: '../../public/images/vampiros.webp'},
    { id: 3, userId: 2, isSeen: false, date: new Date().getTime(), imgPath: '../../public/images/hq720.jpg'},
    { id: 4, userId: 2, isSeen: false, date: new Date().getTime(), imgPath: '../../public/images/kid a.jpg'},
    { id: 5, userId: 3, isSeen: true, date: new Date().getTime(), imgPath: '../../public/images/prantos.jpg'},
    { id: 6, userId: 3, isSeen: false, date: new Date().getTime(), imgPath: '../../public/images/tarta.jpg'},
    { id: 7, userId: 4, isSeen: false, date: new Date().getTime(), imgPath: '../../public/images/teste.jpg'},
    { id: 8, userId: 4, isSeen: false, date: new Date().getTime(), imgPath: '../../public/images/cao1.jpg'},
    { id: 9, userId: 5, isSeen: true, date: new Date().getTime(), imgPath: '../../public/images/cao3.jpg'},
    { id: 10, userId: 5, isSeen: true, date: new Date().getTime(), imgPath: '../../public/images/gato4.jpg'},
]