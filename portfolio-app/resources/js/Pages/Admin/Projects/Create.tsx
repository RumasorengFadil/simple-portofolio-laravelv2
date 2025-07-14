import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    errors: Record<string, string>;
}

export default function AdminProjectCreate({ errors }: Props) {
    const [techInput, setTechInput] = useState('');
    
    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
        image: null as File | null,
        github_url: '',
        demo_url: '',
        technologies: [] as string[],
        is_featured: false,
    });

    const handleAddTechnology = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            const newTech = techInput.trim();
            if (!data.technologies.includes(newTech)) {
                setData('technologies', [...data.technologies, newTech]);
            }
            setTechInput('');
        }
    };

    const removeTechnology = (techToRemove: string) => {
        setData('technologies', data.technologies.filter(tech => tech !== techToRemove));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.projects.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create New Project
                </h2>
            }
        >
            <Head title="Create Project" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Project Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Describe what this project does, the problem it solves, and key features..."
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Detailed description of the project and its features
                                </p>
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Technologies */}
                            <div>
                                <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
                                    Technologies Used
                                </label>
                                <input
                                    type="text"
                                    id="technologies"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyDown={handleAddTechnology}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Type a technology and press Enter (e.g., React, Laravel, MySQL)"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Press Enter to add technologies, frameworks, and tools used
                                </p>
                                {data.technologies.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {data.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                            >
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTechnology(tech)}
                                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {errors.technologies && (
                                    <p className="mt-1 text-sm text-red-600">{errors.technologies}</p>
                                )}
                            </div>

                            {/* Project Image */}
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Project Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Upload a screenshot or preview image of your project
                                </p>
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                )}
                            </div>

                            {/* GitHub URL */}
                            <div>
                                <label htmlFor="github_url" className="block text-sm font-medium text-gray-700">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    id="github_url"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="https://github.com/username/repository"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Link to the source code repository
                                </p>
                                {errors.github_url && (
                                    <p className="mt-1 text-sm text-red-600">{errors.github_url}</p>
                                )}
                            </div>

                            {/* Demo URL */}
                            <div>
                                <label htmlFor="demo_url" className="block text-sm font-medium text-gray-700">
                                    Live Demo URL
                                </label>
                                <input
                                    type="url"
                                    id="demo_url"
                                    value={data.demo_url}
                                    onChange={(e) => setData('demo_url', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="https://example.com"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Link to the live/deployed version of the project
                                </p>
                                {errors.demo_url && (
                                    <p className="mt-1 text-sm text-red-600">{errors.demo_url}</p>
                                )}
                            </div>

                            {/* Featured Status */}
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center">
                                    <input
                                        id="is_featured"
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked as any)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                                        Mark as Featured Project
                                    </label>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Featured projects will be highlighted prominently on your portfolio
                                </p>
                                {errors.is_featured && (
                                    <p className="mt-1 text-sm text-red-600">{errors.is_featured}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <a
                                    href={route('admin.projects.index')}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </a>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const regularData = { ...data, is_featured: false };
                                            router.post(route('admin.projects.store'), regularData);
                                        }}
                                        disabled={processing}
                                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
                                    >
                                        Save as Regular
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {data.is_featured ? 'Create Featured Project' : 'Create Project'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}