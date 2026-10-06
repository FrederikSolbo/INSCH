import type { ReactNode } from 'react'

/**
 * All copy for the site lives here so pages stay presentational.
 *
 * Images are imported, not referenced by string. A string like 'src/assets/x.png'
 * only resolves by accident in dev and breaks in production builds, because Vite
 * never sees it. Imports get resolved, fingerprinted, and fail the build if missing.
 */
import logo from '../assets/logo.png'
import heroHome from '../assets/hero-home.jpg'
import heroCoaching from '../assets/hero-coaching.jpg'
import heroConsultancy from '../assets/hero-consultancy.jpg'
import portrait from '../assets/ingvill.jpeg'
import coachingBanner from '../assets/coaching.png'
import consultancyBanner from '../assets/consultancy.png'
import norwayHouseBanner from '../assets/norwayhouse.png'

export const site = {
  name: 'INSCH Aps',
  tagline: 'Team & Business Coaching',
  email: 'ingvill@insch.co',
  linkedin: 'https://www.linkedin.com/in/ingvillsolbochristiansen/',
  formspree: 'https://formspree.io/f/mppwokdw',
  legal: 'INSCH Aps  CVR 38803778 © COPYRIGHT 2024. ALL RIGHTS RESERVED.',
} as const

export const images = {
  logo,
  portrait,
  hero: { home: heroHome, coaching: heroCoaching, consultancy: heroConsultancy },
} as const

export const nav = [
  { to: '/', label: 'Welcome' },
  { to: '/team-business-coaching', label: 'Team & Business Coaching' },
  { to: '/business-consultancy', label: 'Business Consultancy' },
] as const

type Offering = {
  title: string
  body: string
  href: string
  image: string
  external: boolean
}

export const home: {
  title: string
  subtitle: string
  intro: string[]
  offerings: Offering[]
} = {
  title: 'Team & Business Coaching',
  subtitle:
    'I coach individuals, teams and businesses to succeed in diverse and cross cultural environments',
  intro: [
    'My name is Ingvill Solbø Christiansen, founder of INSCH Aps.',
    'With years of international business experience and a solid academic background, I specialize in coaching individuals and teams to succeed in diverse and cross-cultural environments.',
    "A Master's in International Marketing from CBS, advanced studies in NLP, Team Coaching, and Leadership, combined with hands-on international experience, enable me to guide you and your teams to develop clear, purpose-driven strategies that align with your business goals.",
    'One of the most meaningful experiences in my career was leading the Norway House Aid Project in Cambodia, which improved education and living conditions for underprivileged children. This project underscored the importance of teamwork, particularly in environments where cultural understanding and collaboration are key.',
    'Read more about my offerings on the pages below:',
  ],
  offerings: [
    {
      title: 'Team & Business Coaching',
      body: 'I am passionate about empowering individuals and teams to achieve desired results, especially in multicultural settings. My coaching programs focus on developing purpose-driven strategies that align with your vision, enhancing collaboration, and achieving collective success.',
      href: '/team-business-coaching',
      image: coachingBanner,
      external: false,
    },
    {
      title: 'Business Consultancy',
      body: 'With extensive experience in international marketing and communication, I assist companies in developing strategies tailored to meet their business goals.',
      href: '/business-consultancy',
      image: consultancyBanner,
      external: false,
    },
    {
      title: 'Norway House',
      body: 'Norway House Cambodia is a private aid initiative that works to help the children of Cambodia achieve a better future through education.',
      href: 'http://norwayhouse.weebly.com/in-english.html',
      image: norwayHouseBanner,
      external: true,
    },
  ],
}

type CoachingTestimonial = {
  kind: string
  author: string
  role: string
  lang?: string
  quotes: string[]
}

export const coaching: {
  quote: { text: string; source: string }
  pillars: { title: string; body: string }[]
  sustainable: { title: string; body: string[]; aside: string }
  about: {
    title: string
    lead: string[]
    sections: { title: string; body: string }[]
    closing: ReactNode
  }
  testimonials: CoachingTestimonial[]
} = {
  quote: {
    text: 'If you could get all the people in an organization rowing in the same direction, you could dominate any industry, in any market, against any competition, at any time.',
    source: 'Patrick Lencioni, author of The Five Dysfunctions of a Team',
  },
  pillars: [
    {
      title: 'Communication and Trust',
      body: 'Teams with a clear goal and strong unity tend to communicate better, which helps them work through challenges more effectively. Trust within a team fosters collaboration, where individuals feel comfortable sharing ideas and concerns.',
    },
    {
      title: 'Cohesion under Pressure',
      body: "In high-stakes situations, team chemistry enables members to anticipate each other's moves and work seamlessly together. This can make the team adaptable and resilient, often outperforming more talented but disjointed groups.",
    },
    {
      title: 'Motivation and Support',
      body: 'When a team is united, they are more likely to push each other towards a common goal. A strong sense of camaraderie can inspire individuals to perform beyond their usual capabilities, compensating for any gaps in raw talent.',
    },
  ],
  sustainable: {
    title: 'Sustainable Success',
    body: [
      'In the current dynamic business environment, where innovations and changes happen constantly, the significance of teamwork cannot be overstated. Talent may win short-term battles, but a clear direction and unity build the foundation for long-term success. Teams with solid chemistry can weather difficult times and continue evolving together, while talent without chemistry can lead to conflict or burnout.',
    ],
    aside: 'How do you find these perspectives align with your experiences?',
  },
  about: {
    title: 'Team & Business Coaching with expertise in Cross-Cultural Communication',
    lead: [
      'With years of international business experience and a solid academic background in International Marketing Communication and Business Strategy from Copenhagen Business School, I focus on coaching teams and individuals to succeed in diverse and cross-cultural environments.',
      'Advanced studies in NLP, Team Coaching, and Leadership, alongside practical international experience, have given me the tools to help teams create strategies that foster both business alignment and genuine collaboration.',
    ],
    sections: [
      {
        title: 'A Global Perspective',
        body: 'Having lived and worked in countries such as Denmark, Singapore, Cambodia, the UAE, and my home country, Norway, I’ve come to understand that team chemistry often plays a more pivotal role in success than individual talent. These diverse experiences have shaped my approach to coaching, emphasizing the importance of communication, trust, and shared purpose in navigating the complexities of global teams.',
      },
      {
        title: 'Coaching for Growth: Empowering Teams to Thrive',
        body: 'I’m passionate about helping teams work together more effectively, particularly in multicultural settings. Talent may achieve quick wins, but true, sustained success comes from teams that are aligned, trust each other, and work toward a common goal. My approach to coaching focuses on helping teams strengthen these bonds, enhancing collaboration, and fostering a sense of unity.',
      },
      {
        title: 'Building a Strong Foundation Together',
        body: "Whether you're seeking personal development or looking to strengthen your team’s cohesion, I offer coaching processes that focus on building a solid foundation for long-term success. Together, we can explore strategies that foster team chemistry and support collective growth in today’s fast-changing business environment.",
      },
    ],
    closing: (
      <>
        Ready to take the next step? Connect with me on{' '}
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>{' '}
        or reach out via the form below to learn how I can help you and your team create sustainable
        strategies for long-term success.
      </>
    ),
  },
  testimonials: [
    {
      kind: 'Team coaching',
      author: 'Satbinder S. Ram',
      role: 'Verification UVM expert',
      quotes: [
        'I worked with Ingvill Solbø Christiansen during a series of team coaching sessions, and her ability to guide a diverse, international team was truly valuable. Our team included members from different cultural backgrounds, bringing unique perspectives and approaches. Ingvill helped us navigate these differences and find common ground.',
        'Her professional and inclusive approach created a space where we could openly share ideas and better understand each other. This was especially important for building trust and aligning our team goals. Ingvill provided tools and frameworks that were easy to apply and tailored to our specific needs, helping us improve communication and collaboration. She encouraged us to see our differences as strengths and use them to work more effectively together.',
        'Ingvill brings a balanced, thoughtful approach to coaching that would benefit any team, especially those working internationally. I’m happy to recommend her to anyone looking for a coach to support diverse teams.',
      ],
    },
    {
      kind: 'Coaching',
      author: 'Ulrik J. Gade',
      role: 'Denmark',
      lang: 'da',
      quotes: [
        'Ingvill formår at spørge så åbent og samtidig målrettet, at mine egne svar giver mig nye indsigter. Jeg er gået fra alle vores samtaler med følelsen af afklaring og fornyet handlekraft, som jeg har kunnet omsætte til konkret forandring i min hverdag. Hun skabte et fortroligt rum, hvor det føltes trygt at vende også de vanskelige spørgsmål.',
      ],
    },
    {
      kind: 'Coaching',
      author: 'Signe H. Hansen',
      role: 'Denmark',
      quotes: [
        'The most valuable thing I took away was the realization of my own role and power in handling the challenges I face. So, I feel more empowered in relation to various issues than I did before the conversations. Immediately after each of the three sessions, I felt calmer and clearer because some things had been talked through and broken down into something manageable. But perhaps even more now, where it has settled in more, I feel my approach has become more powerful, with the recognition that I carry the ability to change things, and perhaps, overall, a more positive view of myself and my role in my own life.',
      ],
    },
    {
      kind: 'Mentoring',
      author: 'Margherita Ravaioli',
      role: 'Student, CBS',
      quotes: [
        'I had the pleasure of being mentored by Ingvill as part of the CBS Mentorship Program during my master’s studies. From the start, she made me and the rest of her mentees feel heard while encouraging us to reflect on our values and aspirations. She was great at facilitating discussions among people from different career and cultural backgrounds, creating an environment where we all felt comfortable sharing our thoughts, fears, and ideas.',
        'Ingvill has an incredible ability to listen with empathy, ask the right questions, and challenge us to think critically about our goals and decisions. Her feedback was always thoughtful and constructive, helping us move forward with confidence. She also kept us accountable, ensuring we stayed focused and motivated throughout the process.',
        'On a personal level, Ingvill brings passion, kindness, and a genuine interest in others’ success in every interaction you have with her. The advice she shared with me still resonates, and I carry many of her insights with me today. Her supportive approach makes her a natural leader and coach.',
      ],
    },
  ],
}

type ConsultancyTestimonial = {
  author: string
  role: string
  company: { name: string; href: string }
  quote: string
}

export const consultancy: {
  lead: string
  services: { title: string; body: string }[]
  strategy: { title: string; intro: string; points: { term: string; body: string }[] }
  testimonials: ConsultancyTestimonial[]
} = {
  lead: 'With a broad background in marketing and communication in international businesses, I help companies develop effective marketing strategies to achieve their business objectives. You may not have the budget for a full-time marketing or communication professional, but you understand that effective communication and marketing is essential for business growth. I offer flexible solutions to help your business succeed.',
  services: [
    {
      title: 'Focus on your customers',
      body: 'I help you identify your target audiences and understand their preferences. For example, value proposition frameworks can uncover untapped potential and enhance marketing efforts.',
    },
    {
      title: 'Identify your market',
      body: 'Gain a deeper understanding of your market’s fast-changing conditions, key competitors, and influential players, ensuring your strategy remains relevant and competitive.',
    },
    {
      title: 'Know yourself',
      body: 'I help you assess your business’s strengths and weaknesses and set clear, measurable objectives for success.',
    },
  ],
  strategy: {
    title: 'Strategy development',
    intro:
      'Content marketing strategies and actionable plans to drive results can be developed from this. We address:',
    points: [
      {
        term: 'Objectives',
        body: 'What outcomes do you want from your activities? What customer behaviors are you aiming to inspire?',
      },
      { term: 'Messaging', body: 'What key messages do you want to communicate to your customers?' },
      {
        term: 'Vehicles',
        body: 'Which channels and platforms will best deliver your messages to your audience?',
      },
      {
        term: 'Budget and Schedule',
        body: 'What are the costs of implementing these strategies, and what timeline ensures optimal execution?',
      },
    ],
  },
  testimonials: [
    {
      author: 'Marlene Lyhne Sorensen',
      role: 'Communications Manager EMEA',
      company: { name: 'Milestone Systems', href: 'https://www.milestonesys.com' },
      quote:
        'INSCH Aps has played an important role in growing Milestone’s brand in the ME region over the last five years. I’ve gotten to know Ingvill as a very kind, accountable, and structured person with a strong professionalism and dedication to deliver high-quality work. Her knowledge about the business and cultural aspects in the UAE, as well as her personality, have been valuable to the entire team and I have really appreciated our collaboration.',
    },
    {
      author: 'Hans Ottosen',
      role: 'CEO / Owner',
      company: { name: 'Danelec', href: 'https://www.danelec.com' },
      quote:
        'We hired Ingvill to help us re-define our branding values and transform these into a tangible communication platform. Ingvill did a great job in structuring our fluffy values into something really meaningful. We now have a strategic communication platform from which we can easily create our marketing messages, both content wise and visually.',
    },
    {
      author: 'Sine Sofie Nyholm Friis',
      role: 'Former Chairman',
      company: {
        name: 'Scandinavian Business Women Dubai',
        href: 'https://www.linkedin.com/company/danish-business-women-dubai/',
      },
      quote:
        'Ingvill has a strong professional background, and she has improved the Council’s profile and image significantly through her years of service. I’ve always been impressed with her drive, tenacity, and professionalism at making us succeed in creating more awareness, powerful branding strategies, and established a strong professional network with key partners in UAE and Denmark.',
    },
    {
      author: 'Peter Mawson',
      role: 'Founder',
      company: { name: 'Security on Screen', href: 'https://securityonscreen.com' },
      quote:
        "As a Publisher, I've had the opportunity to work with media agencies and PR professionals across the globe for some 25 years, but I have to say some people stand out from the crowd, and Ingvill does just that. With a commercial prowess that ensures all parties in a transaction win and a mind that takes communication and media relationship management to another level, Ingvill is a super-safe set of hands with gravitas and a deep understanding of her art. I've had the pleasure of working on numerous successful projects over the years with Ingvill and her team and I have no hesitation in highly recommending Ingvill as your global media and PR agency partner.",
    },
    {
      author: 'David Kahn',
      role: 'Owner, Microsoft Dynamics Partner',
      company: { name: 'LinkedIn', href: 'https://www.linkedin.com/in/davidkahn/' },
      quote:
        'Customer testimonials play an important part in our sales process. Through Ingvill’s efforts, we now have a base of more than 100 international customer evidence stories and videos to choose from. She has helped transform the quality and reach of the customer evidence, by creating effective new communication vehicles. As a partner this is enabling us to compliment our company credibility with Microsoft product credibility, therefore furthering the likelihood of winning customers to the Microsoft platform. I respect Ingvill both as a valuable member of the Dynamics community and as a person of integrity with genuine interest in the success of those with whom she works.',
    },
  ],
}
