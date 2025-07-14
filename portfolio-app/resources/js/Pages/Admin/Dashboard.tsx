import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Analytics {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalProjects: number;
    featuredProjects: number;
    totalContacts: number;
    unreadContacts: number;
}

interface RecentBlog {
    id: number;
    title: string;
    is_published: boolean;
    published_at?: string;
    created_at: string;
}

interface RecentProject {
    id: number;
    name: string;
    is_featured: boolean;
    created_at: string;
}

interface RecentContact {
    id: number;
    name: string;
    email: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    analytics: Analytics;
    recentBlogs: RecentBlog[];
    recentProjects: RecentProject[];
    recentContacts: RecentContact[];
}

export default function AdminDashboard({ analytics, recentBlogs, recentProjects, recentContacts }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Total Blogs */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="bg-blue-500 p-3 rounded-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Blog Posts</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{analytics.totalBlogs}</dd>
                                        <div className="text-sm text-gray-600">
                                            {analytics.publishedBlogs} published, {analytics.draftBlogs} drafts
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Projects */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="bg-green-500 p-3 rounded-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{analytics.totalProjects}</dd>
                                        <div className="text-sm text-gray-600">
                                            {analytics.featuredProjects} featured
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Contacts */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="bg-purple-500 p-3 rounded-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <dt className="text-sm font-medium text-gray-500 truncate">Contact Messages</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{analytics.totalContacts}</dd>
                                        <div className="text-sm text-gray-600">
                                            {analytics.unreadContacts} unread
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <Link
                                        href={route('admin.blogs.create')}
                                        className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        New Blog Post
                                    </Link>
                                    <Link
                                        href={route('admin.projects.create')}
                                        className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm"
                                    >
                                        New Project
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Items Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Blog Posts */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Recent Blog Posts</h3>
                                    <Link
                                        href={route('admin.blogs.index')}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        View all
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {recentBlogs.length > 0 ? (
                                        recentBlogs.map((blog) => (
                                            <div key={blog.id} className="flex items-center justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <Link
                                                        href={route('admin.blogs.show', blog.id)}
                                                        className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate block"
                                                    >
                                                        {blog.title}
                                                    </Link>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                            blog.is_published 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {blog.is_published ? 'Published' : 'Draft'}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(blog.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No blog posts yet</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Projects */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
                                    <Link
                                        href={route('admin.projects.index')}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        View all
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {recentProjects.length > 0 ? (
                                        recentProjects.map((project) => (
                                            <div key={project.id} className="flex items-center justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <Link
                                                        href={route('admin.projects.show', project.id)}
                                                        className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate block"
                                                    >
                                                        {project.name}
                                                    </Link>
                                                    <div className="flex items-center space-x-2">
                                                        {project.is_featured && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                Featured
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(project.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No projects yet</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Contact Messages */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
                                    <Link
                                        href={route('admin.contacts.index')}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        View all
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {recentContacts.length > 0 ? (
                                        recentContacts.map((contact) => (
                                            <div key={contact.id} className="flex items-center justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <Link
                                                        href={route('admin.contacts.show', contact.id)}
                                                        className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate block"
                                                    >
                                                        {contact.name}
                                                    </Link>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs text-gray-500 truncate">
                                                            {contact.email}
                                                        </span>
                                                        {!contact.is_read && (
                                                            <span className="inline-flex w-2 h-2 bg-blue-600 rounded-full"></span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(contact.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No messages yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}