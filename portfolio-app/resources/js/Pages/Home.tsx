import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    featured_image?: string;
}

interface Project {
    id: number;
    name: string;
    description: string;
    image?: string;
    github_url?: string;
    demo_url?: string;
    technologies: string[];
}

interface Props {
    latestBlogs: Blog[];
    featuredProjects: Project[];
}

export default function Home({ latestBlogs, featuredProjects }: Props) {
    return (
        <PublicLayout title="Home - Portfolio">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Hi, I'm <span className="text-yellow-300">John Doe</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                            A passionate full-stack developer who loves building modern web applications 
                            with cutting-edge technologies and beautiful user experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('projects.index')}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                View My Work
                            </Link>
                            <Link
                                href={route('contact.create')}
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Get In Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Technologies I Love
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            I specialize in modern web development technologies and frameworks
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                        {[
                            'Laravel', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MySQL',
                            'PostgreSQL', 'Docker', 'AWS', 'Git', 'Vue.js', 'Python'
                        ].map((tech) => (
                            <div key={tech} className="text-center">
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-2xl font-semibold text-gray-900">{tech}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            {featuredProjects.length > 0 && (
                <section className="py-20 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Featured Projects
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Some of my recent work that I'm proud to showcase
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {featuredProjects.map((project) => (
                                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    {project.image && (
                                        <div className="h-48 bg-gray-200">
                                            <img
                                                src={`/storage/${project.image}`}
                                                alt={project.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="text-gray-500 text-sm">
                                                    +{project.technologies.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-3">
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                                >
                                                    GitHub
                                                </a>
                                            )}
                                            {project.demo_url && (
                                                <a
                                                    href={project.demo_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                                >
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="text-center">
                            <Link
                                href={route('projects.index')}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                View All Projects
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Blog Posts Section */}
            {latestBlogs.length > 0 && (
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Latest Blog Posts
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Thoughts, tutorials, and insights about web development
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {latestBlogs.map((blog) => (
                                <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                                        <div className="text-sm text-gray-500 mb-2">
                                            {new Date(blog.published_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            <Link
                                                href={route('blog.show', blog.slug)}
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                        
                        <div className="text-center">
                            <Link
                                href={route('blog.index')}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Read All Posts
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                        Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
                    </p>
                    <Link
                        href={route('contact.create')}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Start a Conversation
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}