import './globals.css';

export const metadata = {
  title: 'Stefan Burghelea | Full-Stack Developer & AI Engineer',
  description: 'Software Engineer with 4+ years experience in Python, Django, TypeScript, React, and AI/LLM integrations. Specializing in full-stack web applications, backend systems, and cloud infrastructure.',
  
  keywords: [
    'Software Engineer',
    'Full-Stack Developer',
    'Python Developer',
    'Django Developer',
    'React Developer',
    'TypeScript Developer',
    'AI Engineer',
    'LLM Integration',
    'AWS Cloud',
    'Kubernetes',
    'Remote Developer',
    'Freelance Developer',
    'Portugal',
    'Lisbon',
    'Backend Developer',
    'Frontend Developer',
    'Web Development',
    'API Development',
    'Amazon Bedrock',
    'OpenAI',
    'ChatGPT',
    'AI Chatbot'
  ].join(', '),
  
  authors: [{ name: 'Stefan Burghelea' }],
  creator: 'Stefan Burghelea',
  publisher: 'Stefan Burghelea',
  
  openGraph: {
    type: 'website',
    url: 'https://stefanburghelea.com',
    title: 'Stefan Burghelea | Full-Stack Developer & AI Engineer',
    description: '4+ years experience building scalable web apps, AI integrations, and cloud solutions. Available for freelance and remote opportunities.',
    siteName: 'Stefan Burghelea Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/profile_photo.png',
        width: 1200,
        height: 630,
        alt: 'Stefan Burghelea - Full-Stack Developer',
      },
    ],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: '3cqOJh3dXr-k81RYVeb1p_SLPivh3EWmuQ5PQKpYuL0',
  },
  
  alternates: {
    canonical: 'https://stefanburghelea.com',
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Stefan Burghelea',
    url: 'https://stefanburghelea.com',
    jobTitle: 'Software Engineer',
    description: 'Full-Stack Developer specializing in Python, Django, React, TypeScript, and AI/LLM integrations.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Portugal',
      addressRegion: 'Lisbon',
    },
    knowsAbout: [
      'Python',
      'Django',
      'TypeScript',
      'React',
      'AWS',
      'Kubernetes',
      'AI Integration',
      'LLM',
      'OpenAI',
      'Amazon Bedrock',
      'Docker',
      'Terraform',
      'Full-Stack Development',
      'Backend Development',
      'Frontend Development',
      'Cloud Infrastructure',
      'REST APIs',
      'DevOps',
      'CI/CD',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      description: 'Full-stack web development and AI integration',
      occupationLocation: {
        '@type': 'City',
        name: 'Lisbon',
      },
    },
    availableForHire: true,
    workLocation: 'Remote',
    sameAs: [
      'https://linkedin.com/in/stefan-burghelea',
      'https://github.com/stefanburghelea',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <link rel="icon" href="/img/SB.svg" sizes="any" />
        <link rel="icon" href="/img/SB.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/img/profile_photo.png" />
        
        <meta name="google-site-verification" content="3cqOJh3dXr-k81RYVeb1p_SLPivh3EWmuQ5PQKpYuL0" />
        
        <meta name="linkedin:profile" content="https://linkedin.com/in/stefan-burghelea" />
        <meta name="github:profile" content="https://github.com/stefanburghelea" />
        
        <meta name="geo.region" content="PT-11" />
        <meta name="geo.placename" content="Lisbon" />
        <meta name="geo.position" content="38.722252;-9.139337" />
        <meta name="ICBM" content="38.722252, -9.139337" />
        
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}