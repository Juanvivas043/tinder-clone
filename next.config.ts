import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Añade el dominio de tu proyecto de Supabase Storage aquí
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ehtxvymwcrkmjshamkao.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/profile-photos/**', // O ajusta el path según necesites, pero solo con el hostname debería funcionar.
      },
    ],
    // Alternativamente, puedes usar solo la propiedad domains (funciona para versiones antiguas de Next.js o como fallback):
    // domains: ['ehtxvymwcrkmjshamkao.supabase.co'], 
  },
};

export default nextConfig;
