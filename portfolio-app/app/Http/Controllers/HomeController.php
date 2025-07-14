<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use App\Models\Project;

class HomeController extends Controller
{
    public function index()
    {
        $latestBlogs = Blog::published()
            ->latest()
            ->take(3)
            ->get(['id', 'title', 'slug', 'excerpt', 'published_at', 'featured_image']);

        $featuredProjects = Project::featured()
            ->ordered()
            ->take(6)
            ->get(['id', 'name', 'description', 'image', 'github_url', 'demo_url', 'technologies']);

        return Inertia::render('Home', [
            'latestBlogs' => $latestBlogs,
            'featuredProjects' => $featuredProjects,
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }
}
