import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useState } from 'react';

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

interface Props {
    projects: Project[];
}

export default function Index({ projects }: Props) {
    const [filter, setFilter] = useState<string>('all');
    
    // Get all unique technologies
    const allTechnologies = Array.from(
        new Set(projects.flatMap(project => project.technologies))
    ).sort();

    // Filter projects based on selected technology
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.technologies.includes(filter));

    const featuredProjects = projects.filter(project => project.is_featured);

    return (
        <PublicLayout title="Projects">
            <Head title="Projects" />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            My Projects
                        </h1>
                        <p className="text-xl text-green-100 max-w-2xl mx-auto">
                            A showcase of my work, featuring web applications, tools, and experiments built with modern technologies.
                        </p>
                    </div>
                </div>
            </div>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Featured Projects
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredProjects.slice(0, 2).map((project) => (
                                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    {project.image && (
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={`/storage/${project.image}`}
                                                alt={project.name}
                                                className="w-full h-64 object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {project.name}
                                            </h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Featured
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex space-x-4">
                                            {project.demo_url && (
                                                <a
                                                    href={project.demo_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                                                >
                                                    View Demo
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                                                >
                                                    View Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Projects */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            All Projects
                        </h2>
                        
                        {/* Technology Filter */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                    filter === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                All ({projects.length})
                            </button>
                            {allTechnologies.map((tech) => {
                                const count = projects.filter(project => project.technologies.includes(tech)).length;
                                return (
                                    <button
                                        key={tech}
                                        onClick={() => setFilter(tech)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                            filter === tech
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {tech} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                            <p className="text-gray-500">
                                {filter === 'all' 
                                    ? 'No projects available yet.' 
                                    : `No projects found using ${filter}.`}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {project.image && (
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={`/storage/${project.image}`}
                                                alt={project.name}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {project.name}
                                            </h3>
                                            {project.is_featured && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex space-x-4">
                                            {project.demo_url && (
                                                <a
                                                    href={project.demo_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                                >
                                                    Live Demo →
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
                                                >
                                                    GitHub →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}