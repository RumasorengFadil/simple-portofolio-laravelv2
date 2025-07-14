import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Props {
    stats: {
        total_blogs: number;
        published_blogs: number;
        draft_blogs: number;
        total_projects: number;
        featured_projects: number;
        total_contacts: number;
        unread_contacts: number;
    };
}

export default function Dashboard({ stats }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {/* Blog Stats */}
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-blue-100 text-sm font-medium">
                                                Total Blogs
                                            </p>
                                            <p className="text-3xl font-bold">
                                                {stats.total_blogs}
                                            </p>
                                        </div>
                                        <svg className="h-8 w-8 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="mt-4 flex text-sm">
                                        <span className="text-blue-100">
                                            {stats.published_blogs} published, {stats.draft_blogs} drafts
                                        </span>
                                    </div>
                                </div>

                                {/* Project Stats */}
                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-100 text-sm font-medium">
                                                Total Projects
                                            </p>
                                            <p className="text-3xl font-bold">
                                                {stats.total_projects}
                                            </p>
                                        </div>
                                        <svg className="h-8 w-8 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="mt-4 flex text-sm">
                                        <span className="text-green-100">
                                            {stats.featured_projects} featured
                                        </span>
                                    </div>
                                </div>

                                {/* Contact Stats */}
                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-purple-100 text-sm font-medium">
                                                Contact Messages
                                            </p>
                                            <p className="text-3xl font-bold">
                                                {stats.total_contacts}
                                            </p>
                                        </div>
                                        <svg className="h-8 w-8 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div className="mt-4 flex text-sm">
                                        <span className="text-purple-100">
                                            {stats.unread_contacts} unread
                                        </span>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-orange-100 text-sm font-medium">
                                                Quick Actions
                                            </p>
                                            <p className="text-lg font-semibold mt-2">
                                                Manage Content
                                            </p>
                                        </div>
                                        <svg className="h-8 w-8 text-orange-200" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Quick Links
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <a
                                        href={route('admin.blogs.create')}
                                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                                    >
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                            Create New Blog Post
                                        </h5>
                                        <p className="font-normal text-gray-700">
                                            Write and publish a new blog post with the rich text editor.
                                        </p>
                                    </a>

                                    <a
                                        href={route('admin.projects.create')}
                                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                                    >
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                            Add New Project
                                        </h5>
                                        <p className="font-normal text-gray-700">
                                            Showcase your latest work by adding a new project.
                                        </p>
                                    </a>

                                    <a
                                        href={route('admin.contacts.index')}
                                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                                    >
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                            View Messages
                                        </h5>
                                        <p className="font-normal text-gray-700">
                                            Check and respond to contact form submissions.
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}