import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    published_at: string;
    featured_image?: string;
    tags: string[];
    reading_time: string;
}

interface RelatedBlog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
}

interface Props {
    blog: Blog;
    relatedBlogs: RelatedBlog[];
}

export default function BlogShow({ blog, relatedBlogs }: Props) {
    return (
        <PublicLayout title={`${blog.title} - Portfolio`}>
            <article className="bg-white">
                {/* Hero Section */}
                <header className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-4 text-blue-100 mb-6">
                                <time dateTime={blog.published_at}>
                                    {new Date(blog.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                                <span>•</span>
                                <span>{blog.reading_time}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
                            {blog.excerpt && (
                                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                                    {blog.excerpt}
                                </p>
                            )}
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {blog.featured_image && (
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <img
                                src={`/storage/${blog.featured_image}`}
                                alt={blog.title}
                                className="w-full h-64 md:h-80 object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Blog Content */}
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-lg prose-blue max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share & Back */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <Link
                                    href={route('blog.index')}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 sm:mb-0"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to Blog
                                </Link>
                                
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-600">Share:</span>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-blue-500 transition-colors"
                                    >
                                        <span className="sr-only">Share on Twitter</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        <span className="sr-only">Share on LinkedIn</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                    <section className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedBlogs.map((relatedBlog) => (
                                    <article key={relatedBlog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="p-6">
                                            <div className="text-sm text-gray-500 mb-2">
                                                {new Date(relatedBlog.published_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                                <Link
                                                    href={route('blog.show', relatedBlog.slug)}
                                                    className="hover:text-blue-600 transition-colors"
                                                >
                                                    {relatedBlog.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3">
                                                {relatedBlog.excerpt}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </article>
        </PublicLayout>
    );
}