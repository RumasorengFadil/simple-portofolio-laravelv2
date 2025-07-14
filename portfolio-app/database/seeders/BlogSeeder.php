<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'Getting Started with Laravel 10',
                'content' => '<h2>Introduction</h2><p>Laravel 10 brings exciting new features and improvements that make web development even more enjoyable. In this post, we\'ll explore some of the key highlights and how to get started with your first Laravel 10 project.</p><h3>New Features</h3><ul><li>Improved performance</li><li>Better testing tools</li><li>Enhanced security features</li></ul><p>Laravel continues to be one of the most popular PHP frameworks, and version 10 solidifies its position as a leader in modern web development.</p>',
                'excerpt' => 'Explore the exciting new features and improvements in Laravel 10 and learn how to get started with your first project.',
                'tags' => ['Laravel', 'PHP', 'Web Development'],
                'is_published' => true,
                'published_at' => now()->subDays(7),
            ],
            [
                'title' => 'Building Modern UIs with React and Inertia.js',
                'content' => '<h2>The Power of Inertia.js</h2><p>Inertia.js allows you to build modern single-page applications using classic server-side routing and controllers. When paired with React, it creates a powerful development experience.</p><h3>Benefits</h3><ul><li>No API required</li><li>Server-side routing</li><li>Automatic code splitting</li></ul><p>This combination provides the best of both worlds: the simplicity of traditional server-side applications with the interactivity of modern SPAs.</p>',
                'excerpt' => 'Learn how Inertia.js and React work together to create powerful, modern web applications without the complexity of traditional SPAs.',
                'tags' => ['React', 'Inertia.js', 'JavaScript', 'SPA'],
                'is_published' => true,
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Advanced Tailwind CSS Tips and Tricks',
                'content' => '<h2>Master Tailwind CSS</h2><p>Tailwind CSS has revolutionized how we approach styling in modern web development. Here are some advanced tips to help you get the most out of this utility-first framework.</p><h3>Pro Tips</h3><ul><li>Custom utilities</li><li>Component patterns</li><li>Responsive design strategies</li></ul><p>These techniques will help you build maintainable and scalable designs with Tailwind CSS.</p>',
                'excerpt' => 'Discover advanced techniques and patterns to master Tailwind CSS and build better user interfaces.',
                'tags' => ['Tailwind CSS', 'CSS', 'Design', 'Frontend'],
                'is_published' => true,
                'published_at' => now()->subDay(),
            ],
            [
                'title' => 'Draft: Upcoming Features in Web Development',
                'content' => '<h2>What\'s Coming Next</h2><p>This is a draft post about upcoming features in web development. It\'s not published yet but shows how draft posts work in the system.</p>',
                'excerpt' => 'A preview of what\'s coming in the world of web development.',
                'tags' => ['Web Development', 'Future', 'Technology'],
                'is_published' => false,
                'published_at' => null,
            ],
        ];

        foreach ($blogs as $blog) {
            $blog['slug'] = Str::slug($blog['title']);
            Blog::create($blog);
        }

        $this->command->info('Sample blog posts created successfully!');
    }
}
