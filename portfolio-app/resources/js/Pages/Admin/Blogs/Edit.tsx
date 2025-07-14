import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TiptapEditor from '@/Components/TiptapEditor';
import { FormEventHandler, useState } from 'react';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string;
    featured_image: string | null;
    is_published: boolean;
    updated_at: string;
}

interface Props {
    blog: Blog;
}

export default function Edit({ blog }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || '',
        content: blog.content,
        tags: blog.tags || '',
        featured_image: null as File | null,
        is_published: blog.is_published,
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        blog.featured_image ? `/storage/${blog.featured_image}` : null
    );

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with dashes
            .replace(/-+/g, '-'); // Replace multiple dashes with single dash
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setData('title', title);
        
        // Auto-generate slug from title if current slug matches old title slug
        if (title && data.slug === generateSlug(blog.title)) {
            setData('slug', generateSlug(title));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('featured_image', null);
        setImagePreview(null);
        // Reset the file input
        const fileInput = document.getElementById('featured_image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.featured_image) {
            // If there's a new image, we need to use FormData
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('slug', data.slug);
            formData.append('excerpt', data.excerpt);
            formData.append('content', data.content);
            formData.append('tags', data.tags);
            formData.append('is_published', data.is_published ? '1' : '0');
            formData.append('featured_image', data.featured_image);
            formData.append('_method', 'PUT');

            put(route('admin.blogs.update', blog.id), {
                ...Object.fromEntries(formData),
            });
        } else {
            // No new image, regular form submission
            put(route('admin.blogs.update', blog.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Blog Post: {blog.title}
                </h2>
            }
        >
            <Head title={`Edit Blog Post: ${blog.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                {/* Title */}
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={handleTitleChange}
                                        placeholder="Enter blog post title"
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Slug */}
                                <div>
                                    <InputLabel htmlFor="slug" value="URL Slug" />
                                    <TextInput
                                        id="slug"
                                        type="text"
                                        name="slug"
                                        value={data.slug}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="url-friendly-slug"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        This will be the URL: /blog/{data.slug || 'your-slug'}
                                    </p>
                                    <InputError message={errors.slug} className="mt-2" />
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <InputLabel htmlFor="excerpt" value="Excerpt" />
                                    <textarea
                                        id="excerpt"
                                        name="excerpt"
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows={3}
                                        placeholder="Brief description of the blog post..."
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        A short summary that will appear in blog listings and previews.
                                    </p>
                                    <InputError message={errors.excerpt} className="mt-2" />
                                </div>

                                {/* Featured Image */}
                                <div>
                                    <InputLabel htmlFor="featured_image" value="Featured Image" />
                                    <div className="mt-1">
                                        {imagePreview ? (
                                            <div className="mb-4">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="max-w-xs h-40 object-cover rounded-lg border border-gray-300"
                                                />
                                                <div className="mt-2 space-x-4">
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="text-sm text-red-600 hover:text-red-900"
                                                    >
                                                        Remove image
                                                    </button>
                                                    <label
                                                        htmlFor="featured_image"
                                                        className="text-sm text-blue-600 hover:text-blue-900 cursor-pointer"
                                                    >
                                                        Change image
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center w-full">
                                                <label htmlFor="featured_image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> featured image
                                                        </p>
                                                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                                                    </div>
                                                </label>
                                            </div>
                                        )}
                                        <input
                                            id="featured_image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <InputError message={errors.featured_image} className="mt-2" />
                                </div>

                                {/* Tags */}
                                <div>
                                    <InputLabel htmlFor="tags" value="Tags" />
                                    <TextInput
                                        id="tags"
                                        type="text"
                                        name="tags"
                                        value={data.tags}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('tags', e.target.value)}
                                        placeholder="javascript, react, web development"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Separate multiple tags with commas.
                                    </p>
                                    <InputError message={errors.tags} className="mt-2" />
                                </div>

                                {/* Content */}
                                <div>
                                    <InputLabel htmlFor="content" value="Content" />
                                    <div className="mt-1">
                                        <TiptapEditor
                                            value={data.content}
                                            onChange={(value) => setData('content', value)}
                                            placeholder="Write your blog post content here..."
                                        />
                                    </div>
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                {/* Publish Status */}
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_published}
                                            onChange={(e) => setData('is_published', e.target.checked)}
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Published
                                        </span>
                                    </label>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {data.is_published 
                                            ? 'This post is published and visible to visitors.' 
                                            : 'This post is saved as a draft.'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-gray-500">
                                    Last updated: {new Date(blog.updated_at || '').toLocaleDateString()}
                                </div>
                                
                                <div className="flex space-x-4">
                                    <SecondaryButton type="button" onClick={() => {window.history.back()}}>
                                        Cancel
                                    </SecondaryButton>

                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Blog Post'}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}