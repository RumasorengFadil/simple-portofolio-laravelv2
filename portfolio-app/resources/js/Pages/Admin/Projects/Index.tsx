import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
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
    created_at: string;
    updated_at: string;
}

interface PaginatedProjects {
    data: Project[];
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Filters {
    search?: string;
    featured?: string;
}

interface Props {
    projects: PaginatedProjects;
    filters: Filters;
}

export default function AdminProjectsIndex({ projects, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [featured, setFeatured] = useState(filters.featured || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.projects.index'), { search, featured }, { preserveState: true });
    };

    const handleDelete = (project: Project) => {
        if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
            router.delete(route('admin.projects.destroy', project.id));
        }
    };

    const toggleFeatured = (project: Project) => {
        router.patch(route('admin.projects.toggle-featured', project.id), {}, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Project Management
                    </h2>
                    <Link
                        href={route('admin.projects.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Create New Project
                    </Link>
                </div>
            }
        >
            <Head title="Project Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Search and Filter */}
                            <form onSubmit={handleSearch} className="mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Search projects..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <select
                                            value={featured}
                                            onChange={(e) => setFeatured(e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">All Projects</option>
                                            <option value="featured">Featured Only</option>
                                            <option value="regular">Regular Only</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Stats */}
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">{projects.total}</div>
                                    <div className="text-sm text-blue-800">Total Projects</div>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {projects.data.filter(project => project.is_featured).length}
                                    </div>
                                    <div className="text-sm text-yellow-800">Featured</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {projects.data.filter(project => !project.is_featured).length}
                                    </div>
                                    <div className="text-sm text-green-800">Regular</div>
                                </div>
                            </div>

                            {/* Projects Grid */}
                            {projects.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {projects.data.map((project) => (
                                            <div key={project.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                                {/* Project Image */}
                                                <div className="relative">
                                                    {project.image ? (
                                                        <div className="h-40 bg-gray-200">
                                                            <img
                                                                src={`/storage/${project.image}`}
                                                                alt={project.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                            <div className="text-white text-center">
                                                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                                </svg>
                                                                <span className="text-xs">{project.name}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Featured Badge */}
                                                    {project.is_featured && (
                                                        <div className="absolute top-2 left-2">
                                                            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                                                                Featured
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Project Content */}
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        <Link
                                                            href={route('admin.projects.show', project.id)}
                                                            className="hover:text-blue-600"
                                                        >
                                                            {project.name}
                                                        </Link>
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                        {project.description}
                                                    </p>

                                                    {/* Technologies */}
                                                    {project.technologies && project.technologies.length > 0 && (
                                                        <div className="mb-3">
                                                            <div className="flex flex-wrap gap-1">
                                                                {project.technologies.slice(0, 3).map((tech) => (
                                                                    <span
                                                                        key={tech}
                                                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                                {project.technologies.length > 3 && (
                                                                    <span className="text-gray-500 text-xs">
                                                                        +{project.technologies.length - 3}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Project Links */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex space-x-2">
                                                            {project.github_url && (
                                                                <a
                                                                    href={project.github_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-gray-600 hover:text-gray-900 text-xs"
                                                                    title="GitHub"
                                                                >
                                                                    GitHub
                                                                </a>
                                                            )}
                                                            {project.demo_url && (
                                                                <a
                                                                    href={project.demo_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:text-blue-800 text-xs"
                                                                    title="Demo"
                                                                >
                                                                    Demo
                                                                </a>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(project.updated_at).toLocaleDateString()}
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={route('admin.projects.edit', project.id)}
                                                                className="text-indigo-600 hover:text-indigo-900 text-sm"
                                                                title="Edit"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => toggleFeatured(project)}
                                                                className={`text-sm hover:opacity-75 ${
                                                                    project.is_featured 
                                                                        ? 'text-yellow-600' 
                                                                        : 'text-gray-600'
                                                                }`}
                                                                title={project.is_featured ? 'Remove from Featured' : 'Mark as Featured'}
                                                            >
                                                                {project.is_featured ? 'Unfeature' : 'Feature'}
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(project)}
                                                            className="text-red-600 hover:text-red-900 text-sm"
                                                            title="Delete"
                                                        >
                                                            Delete
                                                        </button>
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
                                                                className={`px-3 py-2 rounded-md border text-sm ${
                                                                    link.active
                                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                                }`}
                                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                            />
                                                        ) : (
                                                            <span
                                                                className="px-3 py-2 rounded-md border border-gray-300 text-gray-400 cursor-not-allowed text-sm"
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
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">💻</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                                    <p className="text-gray-500 mb-6">
                                        {filters.search || filters.featured 
                                            ? 'Try adjusting your search criteria' 
                                            : 'Get started by creating your first project'
                                        }
                                    </p>
                                    <Link
                                        href={route('admin.projects.create')}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                                    >
                                        Create New Project
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}