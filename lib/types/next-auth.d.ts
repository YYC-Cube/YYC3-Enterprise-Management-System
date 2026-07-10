import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      department?: string
      position?: string
      phone?: string
      roles?: string[]
    }
  }

  interface User {
    id: string
    department?: string
    position?: string
    phone?: string
    roles?: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}
