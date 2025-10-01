// next.config.ts
import type { NextConfig } from 'next'
import type { RemotePattern } from 'next/dist/shared/lib/image-config'

const api = process.env.LARAVEL_API_BASE ?? ''
let apiHost = ''
try { apiHost = new URL(api).hostname } catch {}

const remotePatterns: RemotePattern[] = []
if (apiHost) {
  remotePatterns.push(
    { protocol: 'http',  hostname: '127.0.0.1', pathname: '/templates/**' },
    { protocol: 'https', hostname: '127.0.0.1', pathname: '/templates/**' },
    { protocol: 'http',  hostname: apiHost, pathname: '/storage/**' },
    { protocol: 'https', hostname: apiHost, pathname: '/storage/**' },
  )
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    // or: domains: apiHost ? [apiHost] : []
  },
}

export default nextConfig
