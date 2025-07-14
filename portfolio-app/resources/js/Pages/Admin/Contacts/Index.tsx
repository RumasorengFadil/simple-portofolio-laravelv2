import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    contacts: {
        data: Contact[];
        links: any;
        meta: any;
    };
}

export default function Index({ contacts }: Props) {
    const handleDelete = (contact: Contact) => {
        if (confirm(`Are you sure you want to delete the message from "${contact.name}"?`)) {
            router.delete(route('admin.contacts.destroy', contact.id));
        }
    };

    const markAsRead = (contact: Contact) => {
        router.patch(route('admin.contacts.mark-read', contact.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contact Messages
                </h2>
            }
        >
            <Head title="Contact Messages" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {contacts.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="mx-auto h-12 w-12 text-gray-400">
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        No contact messages have been received yet.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        {contacts.data.map((contact) => (
                                            <div
                                                key={contact.id}
                                                className={`border rounded-lg p-6 transition-colors ${
                                                    contact.is_read
                                                        ? 'bg-white border-gray-200'
                                                        : 'bg-blue-50 border-blue-200'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3">
                                                            <h3 className="text-lg font-semibold text-gray-900">
                                                                {contact.name}
                                                            </h3>
                                                            {!contact.is_read && (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    New
                                                                </span>
                                                            )}
                                                        </div>
                                                        
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {contact.email}
                                                        </p>
                                                        
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {new Date(contact.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex space-x-2">
                                                        {!contact.is_read && (
                                                            <button
                                                                onClick={() => markAsRead(contact)}
                                                                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                            >
                                                                Mark as Read
                                                            </button>
                                                        )}
                                                        <a
                                                            href={`mailto:${contact.email}`}
                                                            className="text-green-600 hover:text-green-900 text-sm font-medium"
                                                        >
                                                            Reply
                                                        </a>
                                                        <button
                                                            onClick={() => handleDelete(contact)}
                                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-4">
                                                    <div className="bg-gray-50 rounded-md p-4">
                                                        <p className="text-gray-700 whitespace-pre-wrap">
                                                            {contact.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {contacts.links && (
                                        <div className="mt-6 flex justify-between items-center">
                                            <div className="text-sm text-gray-700">
                                                Showing {contacts.meta.from} to {contacts.meta.to} of {contacts.meta.total} messages
                                            </div>
                                            <div className="flex space-x-2">
                                                {contacts.links.map((link: any, index: number) => (
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