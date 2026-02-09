import { useState } from 'react';
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Camera,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Star,
} from 'lucide-react';

interface CelebrationStory {
  id: string;
  coupleName: string;
  date: string;
  ceremonyType: 'Catholic' | 'Civil' | 'Muslim' | 'Civil Union' | 'Other';
  location: string;
  coverImage: string;
  summary: string;
  vendorCredits: string[];
  tips: string[];
  photoCount: number;
  guestCount: number;
  budget: string;
}

const stories: CelebrationStory[] = [
  {
    id: 'marco-pia',
    coupleName: 'Marco & Pia',
    date: 'January 2025',
    ceremonyType: 'Catholic',
    location: 'San Agustin Church, Intramuros, Manila',
    coverImage: '',
    summary:
      'A grand Filipino-Chinese Catholic celebration at the historic San Agustin Church. Marco and Pia honored both their heritage with a traditional tea ceremony reception and a full Catholic mass officiated by three priests.',
    vendorCredits: [
      'Venue: San Agustin Church, Intramuros',
      'Catering: Josiah\'s Catering',
      'Photo & Video: Nice Print Photography',
      'Coordination: Banna Cakes Events',
      'Flowers: Teddy Manuel Floral',
    ],
    tips: [
      'Book San Agustin at least 18 months in advance — it fills up fast.',
      'Coordinate the Catholic mass and Chinese tea ceremony timeline carefully with your planner.',
      'Ask your ninongs and ninangs early — principal sponsors matter a lot in Filipino-Chinese celebrations.',
    ],
    photoCount: 1842,
    guestCount: 450,
    budget: '₱2,500,000 – ₱3,000,000',
  },
  {
    id: 'javi-denise',
    coupleName: 'Javi & Denise',
    date: 'March 2025',
    ceremonyType: 'Civil',
    location: 'Hillcreek Gardens, Tagaytay',
    coverImage: '',
    summary:
      'A breezy garden civil ceremony with the Taal Lake view as their backdrop. Javi and Denise kept things intimate and personal — they wrote their own vows and served lechon from Denise\'s home province of Batangas.',
    vendorCredits: [
      'Venue: Hillcreek Gardens Tagaytay',
      'Catering: Hizon\'s Catering',
      'Photo & Video: Storytellers PH',
      'Hair & Makeup: Anthea Bueno',
      'Flowers: Dangwa Florist (DIY arrangements)',
    ],
    tips: [
      'Tagaytay weather can be unpredictable — always have a tent backup plan.',
      'Civil ceremonies are short, so invest in the reception program to keep guests entertained.',
      'DIY flowers from Dangwa saved us over ₱50,000.',
    ],
    photoCount: 967,
    guestCount: 120,
    budget: '₱600,000 – ₱800,000',
  },
  {
    id: 'omar-amina',
    coupleName: 'Omar & Amina',
    date: 'June 2025',
    ceremonyType: 'Muslim',
    location: 'Grand Mosque, Marawi City',
    coverImage: '',
    summary:
      'A traditional Maranao nikah followed by a vibrant kanduli feast. Omar and Amina celebrated with intricate malong textiles, a formal mahr exchange, and three days of festivities honoring their families and the Marawi community.',
    vendorCredits: [
      'Venue: Grand Mosque & Amina\'s family compound, Marawi',
      'Catering: Traditional Maranao home cooking (family-prepared)',
      'Photo & Video: Ranaw Visual Stories',
      'Attire: Custom malong and traditional Maranao formal wear',
      'Styling: Heirloom okir carvings and family textiles',
    ],
    tips: [
      'Respect the nikah process — meet with the imam early to discuss mahr and requirements.',
      'Coordinate with both families on the kanduli guest list; Maranao celebrations are communal.',
      'Hire a local photographer who understands the cultural significance of each ritual.',
    ],
    photoCount: 623,
    guestCount: 800,
    budget: '₱400,000 – ₱600,000',
  },
  {
    id: 'kyle-bea',
    coupleName: 'Kyle & Bea',
    date: 'November 2024',
    ceremonyType: 'Civil',
    location: 'Shangri-La Boracay Resort, Aklan',
    coverImage: '',
    summary:
      'A barefoot beach celebration at sunset with the powdery white sand of Station 1 as their aisle. Kyle and Bea flew in 80 of their closest friends and family for a three-day destination weekend complete with island-hopping and a bonfire after-party.',
    vendorCredits: [
      'Venue: Shangri-La Boracay',
      'Catering: Shangri-La in-house',
      'Photo & Video: Pat Dy Photography',
      'Coordination: Toni Galvez Events',
      'Lights & Sound: Sound Hub Boracay',
    ],
    tips: [
      'Send save-the-dates 6 months ahead for destination celebrations — guests need time to budget flights.',
      'November has the best weather in Boracay: less rain, beautiful sunsets.',
      'Negotiate group room rates with the resort early.',
    ],
    photoCount: 1204,
    guestCount: 80,
    budget: '₱1,800,000 – ₱2,200,000',
  },
  {
    id: 'sam-alex',
    coupleName: 'Sam & Alex',
    date: 'February 2025',
    ceremonyType: 'Civil Union',
    location: 'The Lind Hotel, Bonifacio Global City',
    coverImage: '',
    summary:
      'An intimate civil union celebration filled with joy, pride, and chosen family. Sam and Alex transformed The Lind\'s rooftop into a garden oasis with fairy lights and curated playlists. Every detail reflected who they are as a couple.',
    vendorCredits: [
      'Venue: The Lind Hotel BGC',
      'Catering: Cibo di M (Italian-Filipino fusion)',
      'Photo & Video: We Do It Your Way Studios',
      'Coordination: Liz Uy Events',
      'Hair & Makeup: Jelly Eugenio',
    ],
    tips: [
      'Choose vendors who genuinely celebrate all couples — the "All Celebrations Welcome" badge matters.',
      'A rooftop venue in BGC means great city views but check the noise ordinance hours.',
      'We wrote letters to each other and read them during the ceremony — it was the most emotional part.',
    ],
    photoCount: 548,
    guestCount: 60,
    budget: '₱500,000 – ₱700,000',
  },
  {
    id: 'paolo-christine',
    coupleName: 'Paolo & Christine',
    date: 'December 2024',
    ceremonyType: 'Catholic',
    location: 'Jaro Cathedral, Iloilo City',
    coverImage: '',
    summary:
      'A provincial Catholic celebration at the stunning Jaro Cathedral followed by a reception at a heritage ancestral house. Paolo and Christine honored Ilonggo traditions with a hablon-draped entourage and a feast featuring La Paz batchoy and fresh seafood.',
    vendorCredits: [
      'Venue: Jaro Cathedral & Casa Mariquit',
      'Catering: Breakthrough Restaurant Iloilo',
      'Photo & Video: Dino Luces Photography',
      'Flowers: Iloilo Garden Society',
      'Attire: Custom Filipiniana & Barong Tagalog by Monique Lhuillier Manila',
    ],
    tips: [
      'Provincial celebrations are more affordable — stretch your budget further outside Metro Manila.',
      'Jaro Cathedral requires a Pre-Cana seminar completion certificate.',
      'Ask your entourage to wear hablon sashes — it\'s a beautiful way to honor Ilonggo weaving.',
    ],
    photoCount: 1356,
    guestCount: 350,
    budget: '₱800,000 – ₱1,200,000',
  },
  {
    id: 'miguel-trina',
    coupleName: 'Miguel & Trina',
    date: 'October 2024',
    ceremonyType: 'Catholic',
    location: 'Pinto Art Museum, Antipolo, Rizal',
    coverImage: '',
    summary:
      'A rustic garden celebration set among the white Mediterranean-style galleries of Pinto Art Museum. Miguel and Trina curated an art-meets-nature theme with hand-painted invitations, local Antipolo coffee as favors, and a live acoustic set under the mango trees.',
    vendorCredits: [
      'Venue: Pinto Art Museum, Antipolo',
      'Catering: Corner Tree Café (plant-forward menu)',
      'Photo & Video: Jason Magbanua',
      'Coordination: Happy Happenings',
      'Lights & Sound: Party Studio Manila',
    ],
    tips: [
      'Pinto has strict noise curfews — plan your program to wrap by 10 PM.',
      'Antipolo traffic on weekends is heavy; provide a shuttle service for guests.',
      'The museum galleries make stunning portrait backdrops — schedule an extra hour for photos.',
    ],
    photoCount: 1105,
    guestCount: 200,
    budget: '₱1,000,000 – ₱1,500,000',
  },
  {
    id: 'rafael-sofia',
    coupleName: 'Rafael & Sofia',
    date: 'April 2025',
    ceremonyType: 'Catholic',
    location: 'Shangri-La at the Fort, Makati',
    coverImage: '',
    summary:
      'A grand ballroom celebration for 500 guests at one of Manila\'s most prestigious hotels. Rafael and Sofia went all-out with a full Filipino-Spanish menu, a 12-piece live band, and a dramatic first dance choreographed by a Broadway-trained dancer.',
    vendorCredits: [
      'Venue: Shangri-La at the Fort Grand Ballroom',
      'Catering: Shangri-La in-house',
      'Photo & Video: Mayad Studios',
      'Coordination: Events by Joy Cancio',
      'Flowers: Gideon Hermosa',
      'Lights & Sound: PDE Sounds',
      'Attire: Mark Bumgarner (custom gowns)',
    ],
    tips: [
      'Hotel celebrations simplify logistics — everything is under one roof.',
      'Negotiate the arrhae display setup with your coordinator; hotels have specific altar guidelines.',
      'A live band transforms the reception energy. Budget at least ₱80,000 for a good 12-piece.',
    ],
    photoCount: 2100,
    guestCount: 500,
    budget: '₱3,500,000 – ₱5,000,000',
  },
];

const ceremonyGradients: Record<CelebrationStory['ceremonyType'], string> = {
  Catholic: 'from-sunset-blush/80 to-midnight/90',
  Civil: 'from-morning-mist/80 to-twilight-blue/90',
  Muslim: 'from-twilight-blue/80 to-midnight/90',
  'Civil Union': 'from-dream-lavender/80 to-sunset-blush/90',
  Other: 'from-golden-hour/80 to-whisper/90',
};

const ceremonyColors: Record<CelebrationStory['ceremonyType'], string> = {
  Catholic: 'bg-sunset-blush text-white',
  Civil: 'bg-morning-mist text-white',
  Muslim: 'bg-twilight-blue text-white',
  'Civil Union': 'bg-dream-lavender text-white',
  Other: 'bg-golden-hour text-white',
};

type FilterType = 'All' | CelebrationStory['ceremonyType'];

const filterOptions: FilterType[] = ['All', 'Catholic', 'Civil', 'Muslim', 'Civil Union', 'Other'];

export default function Celebrations() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const filteredStories =
    activeFilter === 'All'
      ? stories
      : stories.filter((s) => s.ceremonyType === activeFilter);

  const featuredStory = filteredStories[0];
  const remainingStories = filteredStories.slice(1);

  const toggleStory = (id: string) => {
    setExpandedStory(expandedStory === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative bg-midnight py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(157,139,216,0.15) 12px, rgba(157,139,216,0.15) 13px), repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(91,124,153,0.15) 12px, rgba(91,124,153,0.15) 13px)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <p className="mb-3 font-sans text-sm font-medium uppercase tracking-[0.2em] text-dream-lavender">
            Inspired by dreams that take shape
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight text-cloud-white">
            Real Celebrations
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-lg font-light leading-relaxed text-cloud-white/80">
            Every love story is unique. These couples share the moments, vendors, and tips that made their celebrations unforgettable.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-dream-lavender/60" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-30 border-b border-border bg-bg-primary/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide md:justify-center md:gap-3">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-4 py-2 font-sans text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-dream-lavender text-white shadow-sm'
                    : 'bg-pearl/60 text-text-secondary hover:bg-pearl'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        {filteredStories.length === 0 && (
          <div className="py-20 text-center">
            <Heart className="mx-auto mb-4 h-12 w-12 text-whisper/50" />
            <p className="font-serif text-2xl text-text-secondary">
              No stories yet for this ceremony type.
            </p>
            <p className="mt-2 font-sans text-sm text-text-secondary/70">
              Check back soon — more celebrations are being shared every week.
            </p>
          </div>
        )}

        {/* Featured Story */}
        {featuredStory && (
          <div className="mb-12 md:mb-16">
            <div
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-shadow hover:shadow-md"
              onClick={() => toggleStory(featuredStory.id)}
            >
              {/* Featured Cover */}
              <div
                className={`relative flex min-h-[280px] items-end bg-gradient-to-br md:min-h-[400px] ${ceremonyGradients[featuredStory.ceremonyType]}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="relative w-full p-6 md:p-10">
                  <span
                    className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${ceremonyColors[featuredStory.ceremonyType]}`}
                  >
                    {featuredStory.ceremonyType}
                  </span>
                  <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight text-white">
                    {featuredStory.coupleName}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {featuredStory.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {featuredStory.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Body */}
              <div className="p-6 md:p-10">
                <p className="font-sans text-base leading-relaxed text-text-primary md:text-lg">
                  {featuredStory.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {featuredStory.guestCount.toLocaleString('en-PH')} guests
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Camera className="h-4 w-4" />
                    {featuredStory.photoCount.toLocaleString('en-PH')} photos
                  </span>
                  <span className="font-medium text-sunset-blush">
                    {featuredStory.budget}
                  </span>
                </div>

                <button className="mt-4 flex items-center gap-1.5 font-sans text-sm font-medium text-dream-lavender transition-colors hover:text-twilight-blue">
                  {expandedStory === featuredStory.id ? (
                    <>
                      Close story <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Read their story <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>

                {/* Expanded Detail */}
                {expandedStory === featuredStory.id && (
                  <StoryDetail story={featuredStory} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Story Cards Grid */}
        {remainingStories.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remainingStories.map((story) => (
              <div
                key={story.id}
                className="group cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm transition-shadow hover:shadow-md"
                onClick={() => toggleStory(story.id)}
              >
                {/* Card Cover */}
                <div
                  className={`relative flex min-h-[180px] items-end bg-gradient-to-br ${ceremonyGradients[story.ceremonyType]}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="relative w-full p-4">
                    <span
                      className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${ceremonyColors[story.ceremonyType]}`}
                    >
                      {story.ceremonyType}
                    </span>
                    <h3 className="font-serif text-2xl font-light text-white md:text-3xl">
                      {story.coupleName}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {story.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {story.location.split(',')[0]}
                    </span>
                  </div>

                  <p className="line-clamp-3 font-sans text-sm leading-relaxed text-text-primary">
                    {story.summary}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {story.guestCount.toLocaleString('en-PH')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Camera className="h-3.5 w-3.5" />
                      {story.photoCount.toLocaleString('en-PH')}
                    </span>
                    <span className="ml-auto font-medium text-sunset-blush">
                      {story.budget}
                    </span>
                  </div>

                  <button className="mt-3 flex items-center gap-1 font-sans text-sm font-medium text-dream-lavender transition-colors hover:text-twilight-blue">
                    {expandedStory === story.id ? (
                      <>
                        Close <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        Read their story <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                  {expandedStory === story.id && (
                    <StoryDetail story={story} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-midnight p-8 text-center md:mt-24 md:p-12">
          <Heart className="mx-auto mb-4 h-8 w-8 text-dream-lavender" />
          <h2 className="font-serif text-2xl font-light text-cloud-white md:text-3xl">
            Share your celebration
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-relaxed text-cloud-white/70">
            Just celebrated? We'd love to feature your love story on haraya. Help inspire the next couple planning their dream celebration.
          </p>
          <button className="mt-6 rounded-full bg-dream-lavender px-8 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-dream-lavender/90">
            Submit your story
          </button>
        </div>
      </div>
    </div>
  );
}

function StoryDetail({ story }: { story: CelebrationStory }) {
  return (
    <div className="mt-5 border-t border-border/50 pt-5 fade-in" onClick={(e) => e.stopPropagation()}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Vendor Credits */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-serif text-lg font-medium text-text-primary">
            <Star className="h-4 w-4 text-golden-hour" />
            Vendor credits
          </h4>
          <ul className="space-y-1.5">
            {story.vendorCredits.map((credit, i) => (
              <li
                key={i}
                className="font-sans text-sm leading-relaxed text-text-secondary"
              >
                {credit}
              </li>
            ))}
          </ul>
        </div>

        {/* Tips */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-serif text-lg font-medium text-text-primary">
            <Lightbulb className="h-4 w-4 text-golden-hour" />
            Tips from {story.coupleName}
          </h4>
          <ul className="space-y-2">
            {story.tips.map((tip, i) => (
              <li
                key={i}
                className="font-sans text-sm leading-relaxed text-text-secondary"
              >
                "{tip}"
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Photo Count Badge */}
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-pearl/50 p-3">
        <Camera className="h-4 w-4 text-dusk-gray" />
        <span className="font-sans text-sm text-text-secondary">
          {story.photoCount.toLocaleString('en-PH')} photos captured
        </span>
        <span className="mx-2 text-border">|</span>
        <Users className="h-4 w-4 text-dusk-gray" />
        <span className="font-sans text-sm text-text-secondary">
          {story.guestCount.toLocaleString('en-PH')} guests celebrated
        </span>
      </div>
    </div>
  );
}
