<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'name' => 'E-Commerce Platform',
                'description' => 'A full-featured e-commerce platform built with Laravel and React. Features include product management, shopping cart, payment processing, and admin dashboard.',
                'github_url' => 'https://github.com/example/ecommerce-platform',
                'demo_url' => 'https://demo-ecommerce.example.com',
                'technologies' => ['Laravel', 'React', 'MySQL', 'Stripe', 'Tailwind CSS'],
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Task Management App',
                'description' => 'A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
                'github_url' => 'https://github.com/example/task-manager',
                'demo_url' => 'https://demo-tasks.example.com',
                'technologies' => ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io', 'Bootstrap'],
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Weather Dashboard',
                'description' => 'A beautiful weather dashboard that displays current conditions, forecasts, and weather maps with location-based services.',
                'github_url' => 'https://github.com/example/weather-dashboard',
                'demo_url' => 'https://demo-weather.example.com',
                'technologies' => ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'CSS3'],
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Blog CMS',
                'description' => 'A content management system for bloggers with rich text editing, media management, and SEO optimization features.',
                'github_url' => 'https://github.com/example/blog-cms',
                'demo_url' => null,
                'technologies' => ['PHP', 'Laravel', 'Tiptap', 'MySQL', 'Alpine.js'],
                'is_featured' => false,
                'sort_order' => 4,
            ],
            [
                'name' => 'Portfolio Website',
                'description' => 'This very portfolio website built with Laravel, Inertia.js, React, and Tailwind CSS. Features a modern design and admin panel.',
                'github_url' => 'https://github.com/example/portfolio',
                'demo_url' => null,
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'Tailwind CSS', 'Tiptap'],
                'is_featured' => true,
                'sort_order' => 0,
            ],
            [
                'name' => 'API Analytics Dashboard',
                'description' => 'A comprehensive analytics dashboard for API monitoring with real-time metrics, error tracking, and performance insights.',
                'github_url' => 'https://github.com/example/api-analytics',
                'demo_url' => 'https://demo-analytics.example.com',
                'technologies' => ['Python', 'Django', 'PostgreSQL', 'Redis', 'D3.js'],
                'is_featured' => false,
                'sort_order' => 5,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        $this->command->info('Sample projects created successfully!');
    }
}
