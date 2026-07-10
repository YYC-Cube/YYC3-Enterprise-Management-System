/**
 * 全局模块声明 - 为未安装或缺少类型声明的第三方模块提供占位类型
 * 这些声明让 TypeScript 编译通过，实际运行时由对应模块提供实现
 */

declare module 'next-auth' {
  export interface Session {
    user?: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
    accessToken?: string
    expires?: string
  }
  export interface JWT {
    [key: string]: unknown
    id?: string
    role?: string
  }
  export type GetSessionOptions = Record<string, unknown>
  export async function getSession(): Promise<Session | null>
}

declare module 'next-auth/providers/credentials' {
  import type { Provider } from 'next-auth'
  export interface CredentialsConfig extends Provider {
    credentials: Record<string, { label: string; type: string }>
    authorize: (credentials: Record<string, unknown>) => Promise<unknown>
  }
  export default function Credentials(config: CredentialsConfig): CredentialsConfig
}

declare module 'bcryptjs' {
  export function hash(data: string, saltOrRounds: string | number): Promise<string>
  export function hashSync(data: string, saltOrRounds: string | number): string
  export function compare(data: string, encrypted: string): Promise<boolean>
  export function compareSync(data: string, encrypted: string): boolean
  export function genSaltSync(rounds?: number): string
  export function genSalt(rounds?: number): Promise<string>
  const _default: { hash: typeof hash; compare: typeof compare; genSalt: typeof genSalt }
  export default _default
}

declare module '@redis/client' {
  export interface RedisClientOptions {
    url?: string
    socket?: Record<string, unknown>
  }
  export function createClient(options?: RedisClientOptions): {
    connect(): Promise<void>
    on(event: string, listener: (...args: unknown[]) => void): void
    get(key: string): Promise<string | null>
    set(key: string, value: string, opts?: unknown): Promise<string>
    setEx(key: string, seconds: number, value: string): Promise<string>
    del(...keys: string[]): Promise<number>
    keys(pattern: string): Promise<string[]>
    ping(): Promise<string>
    quit(): Promise<void>
    isOpen: boolean
  }
}

declare module 'file-saver' {
  export function saveAs(blob: Blob | string, filename?: string, opts?: unknown): void
  const _default: { saveAs: typeof saveAs }
  export default _default
}

declare module 'pg' {
  export interface PoolConfig {
    connectionString?: string
    host?: string
    port?: number
    database?: string
    user?: string
    password?: string
    max?: number
    [key: string]: unknown
  }
  export interface QueryResult<T = unknown> {
    rows: T[]
    rowCount: number
    command: string
    oid: number
    fields: unknown[]
  }
  export class Pool {
    constructor(config?: PoolConfig)
    query<T = unknown>(text: string, params?: unknown[]): Promise<QueryResult<T>>
    connect(): Promise<PoolClient>
    end(): Promise<void>
    on(event: string, listener: (...args: unknown[]) => void): void
  }
  export interface PoolClient {
    query<T = unknown>(text: string, params?: unknown[]): Promise<QueryResult<T>>
    release(): void
  }
  export class Client {
    constructor(config?: PoolConfig)
    connect(): Promise<void>
    query<T = unknown>(text: string, params?: unknown[]): Promise<QueryResult<T>>
    end(): Promise<void>
  }
}
