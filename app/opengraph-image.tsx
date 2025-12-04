import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'BNL Banque - La banque d\'un monde qui change';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        {/* Logo BNL */}
        <div 
          style={{ 
            fontSize: 220, 
            fontWeight: 'bold', 
            marginBottom: 40,
            letterSpacing: '-5px',
          }}
        >
          BNL
        </div>
        
        {/* Slogan */}
        <div 
          style={{ 
            fontSize: 52, 
            opacity: 0.95,
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          La banque d'un monde qui change
        </div>
        
        {/* Petit texte en bas */}
        <div 
          style={{ 
            position: 'absolute',
            bottom: 40,
            fontSize: 32,
            opacity: 0.8,
          }}
        >
          Votre banque en ligne
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}