import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Project {
    id: number;
    name: string;
    description: string;
    image?: string;
    github_url?: string;
    demo_url?: string;
    technologies: string[];
    is_featured: boolean;
}

interface PaginatedProjects {
    data: Project[];
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    projects: PaginatedProjects;
}

export default function ProjectsIndex({ projects }: Props) {
    return (
        <PublicLayout title="Projects - Portfolio">
            <div className="bg-white">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                A showcase of my work, featuring web applications, tools, and experiments 
                                built with modern technologies
                            </p>
                        </div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {projects.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {projects.data.map((project) => (
                                        <div 
                                            key={project.id} 
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                                        >
                                            {/* Project Image */}
                                            <div className="relative">
                                                {project.image ? (
                                                    <div className="h-48 bg-gray-200">
                                                        <img
                                                            src={`/storage/${project.image}`}
                                                            alt={project.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                        <div className="text-white text-center">
                                                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                            </svg>
                                                            <span className="text-sm font-medium">{project.name}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {/* Featured Badge */}
                                                {project.is_featured && (
                                                    <div className="absolute top-3 left-3">
                                                        <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                                                            Featured
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Project Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                    {project.name}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {project.description}
                                                </p>

                                                {/* Technologies */}
                                                {project.technologies && project.technologies.length > 0 && (
                                                    <div className="mb-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.technologies.slice(0, 4).map((tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                            {project.technologies.length > 4 && (
                                                                <span className="text-gray-500 text-xs">
                                                                    +{project.technologies.length - 4} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Project Links */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex space-x-3">
                                                        {project.github_url && (
                                                            <a
                                                                href={project.github_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                                            >
                                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                                </svg>
                                                                GitHub
                                                            </a>
                                                        )}
                                                        {project.demo_url && (
                                                            <a
                                                                href={project.demo_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                                            >
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                                Live Demo
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {projects.last_page > 1 && (
                                    <div className="flex justify-center">
                                        <nav className="flex items-center space-x-2">
                                            {projects.links.map((link, index) => (
                                                <div key={index}>
                                                    {link.url ? (
                                                        <Link
                                                            href={link.url}
                                                            className={`px-4 py-2 rounded-lg border ${
                                                                link.active
                                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ) : (
                                                        <span
                                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-400 cursor-not-allowed"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </nav>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-gray-400 text-6xl mb-4">💻</div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No projects yet</h3>
                                <p className="text-gray-600 mb-8">Check back soon for new projects!</p>
                                <Link
                                    href={route('home')}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-blue-600 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">Like what you see?</h2>
                        <p className="text-xl text-blue-100 mb-8">
                            I'm always excited to work on new projects and collaborate with great people.
                        </p>
                        <Link
                            href={route('contact.create')}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Let's Work Together
                        </Link>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}