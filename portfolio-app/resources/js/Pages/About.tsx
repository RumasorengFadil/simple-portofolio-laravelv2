import PublicLayout from '@/Layouts/PublicLayout';

export default function About() {
    return (
        <PublicLayout title="About - Portfolio">
            <div className="bg-white">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                Learn more about my journey, skills, and passion for web development
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Profile Image */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                                    <span className="text-gray-500 text-lg">Profile Photo</span>
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Full-Stack Developer & Problem Solver
                                </h2>
                                
                                <div className="prose prose-lg text-gray-600 space-y-6">
                                    <p>
                                        Hello! I'm John Doe, a passionate full-stack developer with over 5 years of experience 
                                        building modern web applications. I love creating digital solutions that make a real 
                                        impact and provide exceptional user experiences.
                                    </p>
                                    
                                    <p>
                                        My journey in web development started during my computer science studies, where I 
                                        discovered my love for both the logical problem-solving aspects of backend development 
                                        and the creative challenges of frontend design.
                                    </p>
                                    
                                    <p>
                                        I specialize in building scalable web applications using modern technologies like 
                                        Laravel, React, and TypeScript. I'm particularly passionate about creating clean, 
                                        maintainable code and implementing best practices that ensure long-term project success.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What I Do</h3>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start">
                                            <span className="text-blue-600 font-semibold mr-2">•</span>
                                            Full-stack web application development
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 font-semibold mr-2">•</span>
                                            API design and development
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 font-semibold mr-2">•</span>
                                            Database design and optimization
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 font-semibold mr-2">•</span>
                                            UI/UX implementation
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 font-semibold mr-2">•</span>
                                            Performance optimization
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills & Experience */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Technical Skills */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Backend</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Laravel', 'PHP', 'Node.js', 'Python', 'MySQL', 'PostgreSQL'].map((skill) => (
                                                <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Frontend</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['React', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Inertia.js'].map((skill) => (
                                                <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Tools & Others</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Git', 'Docker', 'AWS', 'Linux', 'Redis', 'Webpack'].map((skill) => (
                                                <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Experience */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">Experience</h3>
                                <div className="space-y-8">
                                    <div className="border-l-4 border-blue-600 pl-6">
                                        <h4 className="font-semibold text-gray-900">Senior Full-Stack Developer</h4>
                                        <p className="text-blue-600 font-medium">TechCorp Inc. • 2022 - Present</p>
                                        <p className="text-gray-600 mt-2">
                                            Leading development of large-scale web applications, mentoring junior developers, 
                                            and implementing best practices across the development team.
                                        </p>
                                    </div>
                                    
                                    <div className="border-l-4 border-gray-300 pl-6">
                                        <h4 className="font-semibold text-gray-900">Full-Stack Developer</h4>
                                        <p className="text-gray-600 font-medium">WebSolutions • 2020 - 2022</p>
                                        <p className="text-gray-600 mt-2">
                                            Developed and maintained multiple client projects using Laravel, React, and various 
                                            modern web technologies.
                                        </p>
                                    </div>
                                    
                                    <div className="border-l-4 border-gray-300 pl-6">
                                        <h4 className="font-semibold text-gray-900">Junior Developer</h4>
                                        <p className="text-gray-600 font-medium">StartupXYZ • 2019 - 2020</p>
                                        <p className="text-gray-600 mt-2">
                                            Started my professional journey building features for a fast-growing SaaS platform.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-blue-600 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing</h2>
                        <p className="text-xl text-blue-100 mb-8">
                            I'm always excited to work on new projects and collaborate with great people.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:john@example.com"
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Email Me
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}