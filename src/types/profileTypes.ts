export interface ProfilesI {
  id: number,
  userName: string,
  password: string,
  pfpPath: string,
  order: number
}

export interface RegisterFormI {
  userName: string,
  password: string,
  pfp: File,
}

export interface LoginFormI {
  loginName: string,
  loginPass: string,
}