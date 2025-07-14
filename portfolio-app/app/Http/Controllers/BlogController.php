<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of published blogs (public).
     */
    public function index()
    {
        $blogs = Blog::published()
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Blog/Index', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Display a listing of all blogs (admin).
     */
    public function adminIndex()
    {
        $blogs = Blog::latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Blog/Index', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Blog/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        $validated = $request->validated();

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Set published_at if not provided but is_published is true
        if ($validated['is_published'] && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        Blog::create($validated);

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog post created successfully!');
    }

    /**
     * Display the specified resource (public).
     */
    public function show(Blog $blog)
    {
        // Only show published blogs to public
        if (!$blog->is_published || $blog->published_at > now()) {
            abort(404);
        }

        $relatedBlogs = Blog::published()
            ->where('id', '!=', $blog->id)
            ->take(3)
            ->get(['id', 'title', 'slug', 'excerpt', 'published_at']);

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
        ]);
    }

    /**
     * Display the specified resource (admin).
     */
    public function adminShow(Blog $blog)
    {
        return Inertia::render('Admin/Blog/Show', [
            'blog' => $blog,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blog/Edit', [
            'blog' => $blog,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        $validated = $request->validated();

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($blog->featured_image) {
                Storage::disk('public')->delete($blog->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Set published_at if not provided but is_published is true
        if ($validated['is_published'] && empty($validated['published_at']) && !$blog->published_at) {
            $validated['published_at'] = now();
        }

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog post updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        // Delete featured image
        if ($blog->featured_image) {
            Storage::disk('public')->delete($blog->featured_image);
        }

        $blog->delete();

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog post deleted successfully!');
    }
}
