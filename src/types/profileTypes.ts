export interface ProfilesI {
  id: number,
  username: string,
  password: string,
  pfpPath: string,
  order: number
}

export interface RegisterFormI {
  username: string,
  password: string,
  image: File,
}

export interface LoginFormI {
  username: string,
  password: string,
}