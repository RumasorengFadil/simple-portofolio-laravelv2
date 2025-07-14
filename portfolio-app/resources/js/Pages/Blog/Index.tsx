import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    featured_image?: string;
    tags?: string;
}

interface Props {
    blogs: {
        data: Blog[];
        links: any;
        meta: any;
    };
}

export default function Index({ blogs }: Props) {
    return (
        <PublicLayout title="Blog">
            <Head title="Blog" />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Blog
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Thoughts, tutorials, and insights about web development, technology, and programming.
                        </p>
                    </div>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {blogs.data.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                        <p className="text-gray-500">
                            Check back soon for new content!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.data.map((blog) => (
                                <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {blog.featured_image && (
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={`/storage/${blog.featured_image}`}
                                                alt={blog.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <time dateTime={blog.published_at}>
                                                {new Date(blog.published_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                        
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                            <Link href={route('blog.show', blog.slug)} className="block">
                                                {blog.title}
                                            </Link>
                                        </h2>
                                        
                                        {blog.excerpt && (
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {blog.excerpt}
                                            </p>
                                        )}
                                        
                                        {blog.tags && (
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {blog.tags.split(',').map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                        >
                                                            {tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={route('blog.show', blog.slug)}
                                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                            >
                                                Read more →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {blogs.links && blogs.meta && blogs.meta.total > blogs.meta.per_page && (
                            <div className="mt-12 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    {blogs.links.map((link: any, index: number) => {
                                        if (link.url === null) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        }

                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </nav>
                            </div>
                        )}

                        {/* Results info */}
                        {blogs.meta && (
                            <div className="mt-8 text-center text-sm text-gray-500">
                                Showing {blogs.meta.from} to {blogs.meta.to} of {blogs.meta.total} posts
                            </div>
                        )}
                    </>
                )}
            </div>
        </PublicLayout>
    );
}