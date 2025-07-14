<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use App\Models\Project;
use App\Models\Contact;

class DashboardController extends Controller
{
    public function index()
    {
        $analytics = [
            'totalBlogs' => Blog::count(),
            'publishedBlogs' => Blog::published()->count(),
            'draftBlogs' => Blog::where('is_published', false)->count(),
            'totalProjects' => Project::count(),
            'featuredProjects' => Project::featured()->count(),
            'totalContacts' => Contact::count(),
            'unreadContacts' => Contact::unread()->count(),
        ];

        $recentBlogs = Blog::latest()
            ->take(5)
            ->get(['id', 'title', 'is_published', 'published_at', 'created_at']);

        $recentProjects = Project::latest()
            ->take(5)
            ->get(['id', 'name', 'is_featured', 'created_at']);

        $recentContacts = Contact::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'is_read', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'analytics' => $analytics,
            'recentBlogs' => $recentBlogs,
            'recentProjects' => $recentProjects,
            'recentContacts' => $recentContacts,
        ]);
    }
}
