import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

const withMDX = createMDX({});

export default withMDX(config);
