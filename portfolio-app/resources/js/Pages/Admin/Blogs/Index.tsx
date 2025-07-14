import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    is_published: boolean;
    published_at: string | null;
    featured_image: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    blogs: {
        data: Blog[];
        links: any;
        meta: any;
    };
}

export default function Index({ blogs }: Props) {
    const handleDelete = (blog: Blog) => {
        if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
            router.delete(route('admin.blogs.destroy', blog.id));
        }
    };

    const togglePublishStatus = (blog: Blog) => {
        router.patch(route('admin.blogs.update', blog.id), {
            is_published: !blog.is_published,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Blog Management
                    </h2>
                    <Link href={route('admin.blogs.create')}>
                        <PrimaryButton>Create New Blog Post</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Blog Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {blogs.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="mx-auto h-12 w-12 text-gray-400">
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Get started by creating a new blog post.
                                    </p>
                                    <div className="mt-6">
                                        <Link href={route('admin.blogs.create')}>
                                            <PrimaryButton>Create New Blog Post</PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Title
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Published Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Updated
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {blogs.data.map((blog) => (
                                                    <tr key={blog.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                {blog.featured_image && (
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img
                                                                            className="h-10 w-10 rounded-lg object-cover"
                                                                            src={`/storage/${blog.featured_image}`}
                                                                            alt={blog.title}
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div className={blog.featured_image ? "ml-4" : ""}>
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {blog.title}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {blog.excerpt ? blog.excerpt.substring(0, 80) + '...' : 'No excerpt'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                    blog.is_published
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-yellow-100 text-yellow-800'
                                                                }`}
                                                            >
                                                                {blog.is_published ? 'Published' : 'Draft'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Not published'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(blog.updated_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                            {blog.is_published && (
                                                                <Link
                                                                    href={route('blog.show', blog.slug)}
                                                                    className="text-blue-600 hover:text-blue-900"
                                                                    target="_blank"
                                                                >
                                                                    View
                                                                </Link>
                                                            )}
                                                            <Link
                                                                href={route('admin.blogs.edit', blog.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => togglePublishStatus(blog)}
                                                                className={`${
                                                                    blog.is_published
                                                                        ? 'text-yellow-600 hover:text-yellow-900'
                                                                        : 'text-green-600 hover:text-green-900'
                                                                }`}
                                                            >
                                                                {blog.is_published ? 'Unpublish' : 'Publish'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(blog)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {blogs.links && (
                                        <div className="mt-6 flex justify-between items-center">
                                            <div className="text-sm text-gray-700">
                                                Showing {blogs.meta.from} to {blogs.meta.to} of {blogs.meta.total} results
                                            </div>
                                            <div className="flex space-x-2">
                                                {blogs.links.map((link: any, index: number) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => link.url && router.get(link.url)}
                                                        disabled={!link.url}
                                                        className={`px-3 py-2 text-sm rounded-md ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : link.url
                                                                ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}