import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TiptapEditor from '@/Components/TiptapEditor';
import { useState } from 'react';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    featured_image?: string;
    is_published: boolean;
    published_at?: string;
}

interface Props {
    blog: Blog;
    errors: Record<string, string>;
}

export default function AdminBlogEdit({ blog, errors }: Props) {
    const [tagInput, setTagInput] = useState('');
    
    const { data, setData, post, processing } = useForm({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || '',
        content: blog.content,
        tags: blog.tags || [],
        featured_image: null as File | null,
        is_published: blog.is_published,
        published_at: blog.published_at ? blog.published_at.slice(0, 16) : '',
        _method: 'PUT',
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (title: string) => {
        setData('title', title);
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (!data.tags.includes(newTag)) {
                setData('tags', [...data.tags, newTag]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setData('tags', data.tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('featured_image', e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // If publishing now, set published_at to now
        if (data.is_published && !data.published_at) {
            setData('published_at', new Date().toISOString().slice(0, 16));
        }
        
        post(route('admin.blogs.update', blog.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Blog Post: {blog.title}
                </h2>
            }
        >
            <Head title={`Edit: ${blog.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Slug */}
                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    URL-friendly version of the title
                                </p>
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                                    Excerpt
                                </label>
                                <textarea
                                    id="excerpt"
                                    rows={3}
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Brief description of the blog post..."
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    A short summary that appears in blog listings
                                </p>
                                {errors.excerpt && (
                                    <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                                )}
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content *
                                </label>
                                <TiptapEditor
                                    content={data.content}
                                    onChange={(content) => setData('content', content)}
                                    placeholder="Start writing your blog post..."
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                )}
                            </div>

                            {/* Tags */}
                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    id="tags"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Type a tag and press Enter"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Press Enter to add tags
                                </p>
                                {data.tags.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {data.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {errors.tags && (
                                    <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                                )}
                            </div>

                            {/* Current Featured Image */}
                            {blog.featured_image && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Current Featured Image
                                    </label>
                                    <div className="mt-2">
                                        <img
                                            src={`/storage/${blog.featured_image}`}
                                            alt="Current featured image"
                                            className="h-32 w-auto rounded-lg shadow-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Featured Image */}
                            <div>
                                <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700">
                                    {blog.featured_image ? 'Replace Featured Image' : 'Featured Image'}
                                </label>
                                <input
                                    type="file"
                                    id="featured_image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {blog.featured_image 
                                        ? 'Upload a new image to replace the current one' 
                                        : 'Upload an image to be displayed with the blog post'
                                    }
                                </p>
                                {errors.featured_image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>
                                )}
                            </div>

                            {/* Publishing Options */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Publishing Options</h3>
                                
                                {/* Published Status */}
                                <div className="flex items-center mb-4">
                                    <input
                                        id="is_published"
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked as any)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                                        Published
                                    </label>
                                </div>

                                {/* Scheduled Publishing */}
                                {data.is_published && (
                                    <div>
                                        <label htmlFor="published_at" className="block text-sm font-medium text-gray-700">
                                            Publish Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="published_at"
                                            value={data.published_at}
                                            onChange={(e) => setData('published_at', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Leave empty to publish now
                                        </p>
                                        {errors.published_at && (
                                            <p className="mt-1 text-sm text-red-600">{errors.published_at}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <a
                                    href={route('admin.blogs.index')}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </a>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            router.post(route('admin.blogs.update', blog.id), {
                                                ...data,
                                                is_published: false
                                            });
                                        }}
                                        disabled={processing}
                                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {data.is_published ? 'Update & Publish' : 'Update Draft'}
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