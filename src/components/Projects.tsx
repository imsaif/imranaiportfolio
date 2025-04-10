'use client';

import Image from 'next/image';
import Link from 'next/link';

type Project = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  slug: string;
};

const featuredProjects: Project[] = [
  {
    id: 1,
    title: 'Lesson Loom',
    tagline: 'Automated Lesson Generation Platform',
    description:
      'AI-powered platform that revolutionized how educational materials are created using templating systems and artificial intelligence.',
    image: '/projects/project1.jpg',
    slug: 'casestudy',
  },
  {
    id: 2,
    title: 'Task Management App',
    tagline: 'Designing a user-friendly platform to boost productivity',
    description: 'A collaborative task management tool that helps teams organize and track their work efficiently.',
    image: '/projects/project2.jpg',
    slug: 'task-management',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    tagline: 'Building an intuitive interface for weather data visualization',
    description: 'A responsive weather application providing real-time forecasts with an emphasis on visual clarity.',
    image: '/projects/project3.jpg',
    slug: 'weather-dashboard',
  },
];

const FeaturedWork = () => {
  return (
    <section id="work" className="section-padding">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="section-title text-3xl font-bold mb-8">Featured work</h2>

        <div className="space-y-32 mt-24">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-16`}
            >
              <div className="md:w-1/2 relative aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                {/* <div className="absolute inset-0 flex items-center justify-center text-muted">
                  Project Image
                </div> */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />

                {/* Add a decorative element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-accent/10 z-0"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-secondary/10 z-0"></div>
              </div>

              <div className="md:w-1/2 flex flex-col justify-center relative">
                {/* Decorative number */}
                <span className="absolute -left-8 top-0 text-8xl font-bold text-gray-100 select-none hidden md:block">
                  0{index + 1}
                </span>

                <div className="relative">
                  <span className="inline-block text-accent mb-2 text-sm font-medium">{project.tagline}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-muted mb-8 leading-relaxed">{project.description}</p>

                  <Link
                    href={index === 0 ? `/casestudy` : `/projects/${project.slug}`}
                    className="inline-flex items-center font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    View case study
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
