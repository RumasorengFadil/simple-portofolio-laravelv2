import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    published_at: string;
    featured_image?: string;
    tags?: string;
}

interface Props {
    blog: Blog;
    relatedPosts: Blog[];
}

export default function Show({ blog, relatedPosts }: Props) {
    const publishedDate = new Date(blog.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <PublicLayout title={blog.title}>
            <Head title={blog.title} />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Article Header */}
                <header className="mb-8">
                    <div className="mb-6">
                        <Link
                            href={route('blog.index')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                            ← Back to Blog
                        </Link>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {blog.title}
                    </h1>

                    <div className="flex items-center text-gray-500 mb-6">
                        <time dateTime={blog.published_at} className="text-sm">
                            Published on {publishedDate}
                        </time>
                    </div>

                    {blog.tags && (
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.split(',').map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                    >
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {blog.featured_image && (
                        <div className="mb-8">
                            <img
                                src={`/storage/${blog.featured_image}`}
                                alt={blog.title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                </header>

                {/* Article Content */}
                <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-blue-500 prose-blockquote:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Last updated: {new Date(blog.published_at).toLocaleDateString()}
                        </div>
                        
                        <Link
                            href={route('contact.create')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                            Have questions? Get in touch →
                        </Link>
                    </div>
                </footer>
            </article>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Related Posts
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <article key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {relatedPost.featured_image && (
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={`/storage/${relatedPost.featured_image}`}
                                                alt={relatedPost.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <time dateTime={relatedPost.published_at}>
                                                {new Date(relatedPost.published_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                            <Link href={route('blog.show', relatedPost.slug)} className="block">
                                                {relatedPost.title}
                                            </Link>
                                        </h3>
                                        
                                        {relatedPost.excerpt && (
                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        )}
                                        
                                        <Link
                                            href={route('blog.show', relatedPost.slug)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}