# Modern Personal Portfolio Web Application

A beautiful, modern personal portfolio website built with Laravel 10, Inertia.js, React, and Tailwind CSS. Features a complete admin panel for managing blog posts, projects, and contact messages.

## 🚀 Features

### Public Features
- **Homepage** - Hero section, skills showcase, featured projects, and latest blog posts
- **About Page** - Personal information, skills, experience timeline
- **Projects Gallery** - Showcase of your work with images, descriptions, and links
- **Blog** - List of published blog posts with individual post pages
- **Contact Form** - Visitors can send messages directly through the website

### Admin Panel Features
- **Dashboard** - Analytics overview with key metrics
- **Blog Management** - Create, edit, delete blog posts with rich text editor (Tiptap)
- **Project Management** - Full CRUD for projects with image uploads
- **Contact Messages** - View and manage messages from visitors
- **Role-based Access** - Admin authentication with role protection

### Technical Features
- **Modern Stack** - Laravel 10, Inertia.js, React, TypeScript, Tailwind CSS
- **Rich Text Editor** - Tiptap React editor for blog content
- **Image Uploads** - File storage for project and blog images
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **SEO Friendly** - Proper meta tags and semantic HTML
- **Form Validation** - Server-side validation with Laravel Form Requests
- **Clean Architecture** - Separate layouts for public and admin areas

## 🛠️ Tech Stack

- **Backend:** Laravel 10, PHP 8.1+
- **Frontend:** React 18, TypeScript, Inertia.js
- **Styling:** Tailwind CSS
- **Database:** SQLite (default), MySQL, PostgreSQL
- **Rich Text Editor:** Tiptap React
- **Authentication:** Laravel Breeze
- **Build Tool:** Vite

## 📋 Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 16+ and npm
- SQLite, MySQL, or PostgreSQL

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   # For SQLite (default)
   touch database/database.sqlite
   
   # Or configure MySQL/PostgreSQL in .env file
   ```

6. **Run migrations and seeders**
   ```bash
   php artisan migrate --seed
   ```

7. **Create storage link**
   ```bash
   php artisan storage:link
   ```

8. **Build frontend assets**
   ```bash
   npm run build
   ```

9. **Start the development server**
   ```bash
   php artisan serve
   ```

The application will be available at `http://localhost:8000`

## 👤 Default Admin Account

After running the seeders, you can log in to the admin panel with:

- **Email:** admin@example.com
- **Password:** password
- **Admin URL:** http://localhost:8000/admin

## 📁 Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/           # Admin controllers
│   │   ├── BlogController.php
│   │   ├── ProjectController.php
│   │   ├── ContactController.php
│   │   └── HomeController.php
│   ├── Requests/            # Form validation
│   └── Middleware/
│       └── AdminMiddleware.php
├── Models/
│   ├── Blog.php
│   ├── Project.php
│   ├── Contact.php
│   └── User.php
└── Policies/

resources/
├── js/
│   ├── Components/          # Reusable React components
│   ├── Layouts/
│   │   ├── PublicLayout.tsx
│   │   └── AuthenticatedLayout.tsx
│   └── Pages/
│       ├── Home.tsx
│       ├── About.tsx
│       ├── Contact/
│       ├── Blog/
│       ├── Projects/
│       └── Admin/
└── views/

database/
├── migrations/
└── seeders/
```

## 🎨 Customization

### Personalizing Content

1. **Update personal information** in the React components:
   - Edit `resources/js/Pages/Home.tsx` for hero section
   - Edit `resources/js/Pages/About.tsx` for about content
   - Update contact information in layout files

2. **Customize styling:**
   - Modify Tailwind classes in components
   - Update color scheme in `tailwind.config.js`
   - Add custom CSS in `resources/css/app.css`

3. **Add your logo/branding:**
   - Replace placeholder text in navigation
   - Add your logo to `public/` directory
   - Update meta tags and favicon

### Adding New Features

1. **Create new pages:**
   ```bash
   # Create controller
   php artisan make:controller YourController
   
   # Add routes in routes/web.php
   # Create React component in resources/js/Pages/
   ```

2. **Add new content types:**
   ```bash
   # Create model with migration
   php artisan make:model YourModel -mrc
   
   # Create form requests
   php artisan make:request StoreYourModelRequest
   ```

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

```env
APP_NAME="Your Portfolio"
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite

MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
```

### File Storage

By default, images are stored in `storage/app/public/`. In production:

1. Configure cloud storage (AWS S3, etc.)
2. Update `config/filesystems.php`
3. Set appropriate environment variables

## 🚀 Deployment

### Production Checklist

1. **Environment setup:**
   ```bash
   composer install --optimize-autoloader --no-dev
   npm run build
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

2. **Security:**
   - Set `APP_ENV=production`
   - Generate new `APP_KEY`
   - Configure proper file permissions
   - Set up HTTPS

3. **Database:**
   - Run migrations: `php artisan migrate --force`
   - Create admin user in production

4. **Web server:**
   - Point document root to `public/` directory
   - Configure URL rewriting for Laravel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **Permissions Error:**
   ```bash
   sudo chown -R www-data:www-data storage bootstrap/cache
   sudo chmod -R 775 storage bootstrap/cache
   ```

2. **Node Modules Issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Database Issues:**
   ```bash
   php artisan migrate:fresh --seed
   ```

4. **Cache Issues:**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan route:clear
   php artisan view:clear
   ```

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review Laravel and Inertia.js documentation
3. Open an issue on the repository

---

**Built with ❤️ using Laravel, React, and modern web technologies.**
