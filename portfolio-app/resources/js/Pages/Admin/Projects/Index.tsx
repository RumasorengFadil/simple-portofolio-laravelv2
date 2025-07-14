import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

interface Project {
    id: number;
    name: string;
    description: string;
    image?: string;
    github_url?: string;
    demo_url?: string;
    technologies: string[];
    is_featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    projects: Project[];
}

export default function Index({ projects }: Props) {
    const handleDelete = (project: Project) => {
        if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
            router.delete(route('admin.projects.destroy', project.id));
        }
    };

    const toggleFeatured = (project: Project) => {
        router.patch(route('admin.projects.update', project.id), {
            is_featured: !project.is_featured,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Project Management
                    </h2>
                    <Link href={route('admin.projects.create')}>
                        <PrimaryButton>Add New Project</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Project Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {projects.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="mx-auto h-12 w-12 text-gray-400">
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Get started by adding your first project.
                                    </p>
                                    <div className="mt-6">
                                        <Link href={route('admin.projects.create')}>
                                            <PrimaryButton>Add New Project</PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {projects.map((project) => (
                                        <div key={project.id} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                                            {project.image && (
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img
                                                        className="w-full h-48 object-cover rounded-t-lg"
                                                        src={`/storage/${project.image}`}
                                                        alt={project.name}
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {project.name}
                                                    </h3>
                                                    {project.is_featured && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {project.description}
                                                </p>
                                                
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {project.technologies.slice(0, 3).map((tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 3 && (
                                                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                                            +{project.technologies.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex space-x-2">
                                                        {project.demo_url && (
                                                            <a
                                                                href={project.demo_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Demo
                                                            </a>
                                                        )}
                                                        {project.github_url && (
                                                            <a
                                                                href={project.github_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-600 hover:text-gray-900"
                                                            >
                                                                GitHub
                                                            </a>
                                                        )}
                                                    </div>
                                                    <span className="text-gray-500">
                                                        #{project.sort_order}
                                                    </span>
                                                </div>
                                                
                                                <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route('admin.projects.edit', project.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 text-sm"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => toggleFeatured(project)}
                                                            className={`text-sm ${
                                                                project.is_featured
                                                                    ? 'text-yellow-600 hover:text-yellow-900'
                                                                    : 'text-green-600 hover:text-green-900'
                                                            }`}
                                                        >
                                                            {project.is_featured ? 'Unfeature' : 'Feature'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(project)}
                                                            className="text-red-600 hover:text-red-900 text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                    
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(project.updated_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}