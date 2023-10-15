/** @type {import('next').NextConfig} */

const repo = 'web-amp'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

const nextConfig = {
    assetPrefix: assetPrefix,
    basePath: basePath,
    output: 'export'
}

module.exports = nextConfig
