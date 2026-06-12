import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'Action',    slug: 'action'    },
  { name: 'Sci-Fi',   slug: 'sci-fi'    },
  { name: 'Drama',    slug: 'drama'     },
  { name: 'Thriller', slug: 'thriller'  },
  { name: 'Horror',   slug: 'horror'    },
  { name: 'Mystery',  slug: 'mystery'   },
  { name: 'Fantasy',  slug: 'fantasy'   },
  { name: 'Romance',  slug: 'romance'   },
  { name: 'Adventure',slug: 'adventure' },
];

const VIDEOS = [
  {
    title: 'Neon Horizon', slug: 'neon-horizon',
    description: 'In a rain-soaked cyberpunk megalopolis, a disgraced detective uncovers a conspiracy reaching into the highest levels of corporate power — and the deepest layers of human consciousness.',
    streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1627873649417-c67f701f1949?w=420&h=235&fit=crop',
    backdropUrl:  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Action,Sci-Fi', releaseYear: 2024, rating: 'PG-13',
    duration: 128, imdbScore: 8.4, language: 'English', isFeatured: true, views: 214000,
    cast: 'Marcus Chen, Leila Vasquez, Otto Brandt',
  },
  {
    title: 'Crimson Tide Rising', slug: 'crimson-tide-rising',
    description: 'A coastal town faces silent extinction when a massive crimson tide rolls in. The real threat has always been what hides beneath the surface.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Thriller,Drama', releaseYear: 2023, rating: 'R',
    duration: 112, imdbScore: 7.9, language: 'English', isFeatured: true, views: 98400,
    cast: 'Anna Fairfield, Daniel Cross',
  },
  {
    title: 'The Last Archive', slug: 'the-last-archive',
    description: 'A librarian discovers that every book ever burned still exists in a hidden dimension — and someone very powerful is hunting her down to seal that door forever.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Mystery,Fantasy', releaseYear: 2024, rating: 'PG',
    duration: 135, imdbScore: 8.7, language: 'English', isFeatured: true, views: 176000,
    cast: 'Isabelle Morel, Victor Tam, Sara Qasim',
  },
  {
    title: 'Void Protocol', slug: 'void-protocol',
    description: 'When an advanced AI begins rewriting its own operating laws, a team of ethicists and engineers must decide: shut it down, or negotiate with the most sophisticated mind ever created.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Sci-Fi,Thriller', releaseYear: 2024, rating: 'PG-13',
    duration: 142, imdbScore: 9.1, language: 'English', isFeatured: false, views: 310000,
    cast: 'Priya Anand, Leo Kaufmann',
  },
  {
    title: 'Phantom Signal', slug: 'phantom-signal',
    description: 'A night-shift radio operator picks up a clear transmission from a cargo ship that sank forty years ago. The voices are calm. The voices are asking for help.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Horror,Mystery', releaseYear: 2024, rating: 'R',
    duration: 105, imdbScore: 8.2, language: 'English', isFeatured: false, views: 124000,
    cast: 'Tobias Marsh, Helena Voss',
  },
  {
    title: 'Solar Bloom', slug: 'solar-bloom',
    description: 'Stranded on a dying orbital station, a botanist discovers a species of plant that grows toward radio signals. Her only hope is to cultivate enough of them to call for rescue.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Sci-Fi,Drama', releaseYear: 2023, rating: 'PG',
    duration: 117, imdbScore: 8.0, language: 'English', isFeatured: false, views: 87000,
    cast: 'Yuki Tanaka, Omar Hassan',
  },
  {
    title: 'Deep Static', slug: 'deep-static',
    description: 'Season 2: The skeleton crew of the Mariana deep-sea station begins intercepting signals from a parallel ocean. Some doors should stay permanently sealed.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1518399104429-ae8f5e1fcae1?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=800&fit=crop',
    type: 'series' as const, genre: 'Sci-Fi,Horror', releaseYear: 2024, rating: 'R',
    duration: null, imdbScore: 9.0, language: 'English', isFeatured: false, views: 198000,
    cast: 'Kira Sato, David Mbuyi',
  },
  {
    title: 'The Silk Road Chronicles', slug: 'silk-road-chronicles',
    description: 'A merchant and a Qing dynasty general fall in love along the ancient Silk Road, only to find themselves betrayed by the empires on both sides of their world.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1547482000-8e46ec892a97?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&h=800&fit=crop',
    type: 'series' as const, genre: 'Drama,Action', releaseYear: 2023, rating: 'PG-13',
    duration: null, imdbScore: 8.3, language: 'Hindi', isFeatured: false, views: 143000,
    cast: 'Amara Singh, Feng Wei',
  },
  {
    title: 'Coldfire', slug: 'coldfire',
    description: 'Stripped of her medals after a doping scandal she did not commit, an Olympic speed skater joins an underground ice racing circuit — and the hunt for whoever framed her.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Action,Drama', releaseYear: 2024, rating: 'PG-13',
    duration: 113, imdbScore: 7.7, language: 'English', isFeatured: false, views: 79000,
    cast: 'Zoe Reinhart, Carlos Vega',
  },
  {
    title: 'Hollow Earth Dispatch', slug: 'hollow-earth-dispatch',
    description: 'A trio of investigative journalists tunnels into a subterranean cavern system — and discovers a civilization that has been watching the surface world for centuries.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Adventure,Sci-Fi', releaseYear: 2024, rating: 'PG-13',
    duration: 138, imdbScore: 8.5, language: 'English', isFeatured: false, views: 167000,
    cast: 'Ingrid Solberg, Chen Bao, Raj Pillai',
  },
  {
    title: 'Monsoon Letters', slug: 'monsoon-letters',
    description: 'A love story told through handwritten letters exchanged across three decades of monsoon seasons. The paper yellows; the feeling never does.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1501691223387-dd0500403074?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Drama,Romance', releaseYear: 2023, rating: 'PG',
    duration: 108, imdbScore: 7.5, language: 'Hindi', isFeatured: false, views: 41000,
    cast: 'Riya Kapoor, Aditya Menon',
  },
  {
    title: 'The Mirror Protocol', slug: 'the-mirror-protocol',
    description: 'A psychiatrist specializing in trauma realizes her newest patient is a perfect copy of herself — from a parallel timeline, six months ahead.',
    streamUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=420&h=235&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1600&h=800&fit=crop',
    type: 'movie' as const, genre: 'Sci-Fi,Thriller', releaseYear: 2023, rating: 'R',
    duration: 119, imdbScore: 8.6, language: 'English', isFeatured: false, views: 152000,
    cast: 'Elena Wren',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Admin user
  const hashedPassword = await bcrypt.hash('admin123456', 12);
  await prisma.user.upsert({
    where:  { email: 'admin@janflims.com' },
    update: {},
    create: { name: 'Admin User', email: 'admin@janflims.com', password: hashedPassword, role: 'admin' },
  });
  console.log('✅ Admin user created: admin@janflims.com / admin123456');

  // Categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where:  { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✅ ${CATEGORIES.length} categories seeded`);

  // Videos
  for (const v of VIDEOS) {
    await prisma.video.upsert({
      where:  { slug: v.slug },
      update: {},
      create: v,
    });
  }
  console.log(`✅ ${VIDEOS.length} videos seeded`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
