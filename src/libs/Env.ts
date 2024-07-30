import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
    server: {
        CLERK_SECRET_KEY: z.string().min(1),
        DATABASE_URL: z.string().optional(),
        LOGTAIL_SOURCE_TOKEN: z.string().optional(),
        API_URL: z.string().url(),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().optional(),
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    },
    shared: {
        NODE_ENV: z.enum(['development', 'production']),
    },
    // You need to destructure all the keys manually
    runtimeEnv: {
        API_URL: process.env.API_URL,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
        LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NODE_ENV: process.env.NODE_ENV,
    },
})
