import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    featured_image?: string;
    tags: string[];
    reading_time: string;
}

interface PaginatedBlogs {
    data: Blog[];
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    blogs: PaginatedBlogs;
}

export default function BlogIndex({ blogs }: Props) {
    return (
        <PublicLayout title="Blog - Portfolio">
            <div className="bg-white">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                Thoughts, tutorials, and insights about web development and technology
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Posts */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {blogs.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {blogs.data.map((blog) => (
                                        <article 
                                            key={blog.id} 
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                        >
                                            {blog.featured_image && (
                                                <div className="h-48 bg-gray-200">
                                                    <img
                                                        src={`/storage/${blog.featured_image}`}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                                    <time dateTime={blog.published_at}>
                                                        {new Date(blog.published_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </time>
                                                    <span>{blog.reading_time}</span>
                                                </div>
                                                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                                    <Link
                                                        href={route('blog.show', blog.slug)}
                                                        className="hover:text-blue-600 transition-colors"
                                                    >
                                                        {blog.title}
                                                    </Link>
                                                </h2>
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {blog.excerpt}
                                                </p>
                                                {blog.tags && blog.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {blog.tags.slice(0, 3).map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {blog.tags.length > 3 && (
                                                            <span className="text-gray-500 text-sm">
                                                                +{blog.tags.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                                <Link
                                                    href={route('blog.show', blog.slug)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Read More →
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {blogs.last_page > 1 && (
                                    <div className="flex justify-center">
                                        <nav className="flex items-center space-x-2">
                                            {blogs.links.map((link, index) => (
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
                                <div className="text-gray-400 text-6xl mb-4">📝</div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
                                <p className="text-gray-600 mb-8">Check back soon for new content!</p>
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
            </div>
        </PublicLayout>
    );
}