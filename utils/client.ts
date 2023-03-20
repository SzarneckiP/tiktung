import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'gqqx8jm3',
  dataset: 'production',
  apiVersion: '2023-03-20',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
