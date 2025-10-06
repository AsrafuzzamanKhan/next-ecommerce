'use client';
import React from 'react';
import { motion } from 'motion/react';
// import { Card, CardContent } from '../ui/card';
// import { Badge } from '../ui/badge';
import { Users, Award, Target, TrendingUp, Badge } from 'lucide-react';
import Image from 'next/image';

const stats = [
    { number: '5000+', label: 'Students Trained' },
    { number: '50+', label: 'Course Offerings' },
    { number: '500+', label: 'Organizations Served' },
    { number: '95%', label: 'Success Rate' }
];

const values = [
    {
        title: 'Excellence',
        description: 'We maintain the highest standards in everything we deliver, from course content to student support.',
        icon: Award
    },
    {
        title: 'Innovation',
        description: 'We continuously evolve our methods and incorporate cutting-edge technology to enhance learning.',
        icon: TrendingUp
    },
    {
        title: 'Accessibility',
        description: 'Quality education should be accessible to all. We offer flexible learning options and fair pricing.',
        icon: Users
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div>
                                <Badge className="mb-4 bg-accent text-white">About Us</Badge>
                                <h1 className="text-5xl font-bold leading-tight mb-6">
                                    Empowering <span className="gradient-text">Professional</span> Growth
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    At iLearning Solutions, we believe in empowering professionals and organisations
                                    with future-ready skills through high-quality training and globally recognised certifications.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1522202195465-df8a5f26fa15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjBsZWFybmluZ3xlbnwxfHx8fDE3NTc5Mzk5ODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Professional team learning"
                                    className="w-full h-96 object-cover"
                                    width={1080}
                                    height={384}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <Target className="w-16 h-16 mx-auto text-accent" />
                        <h2 className="text-4xl font-bold">Our Mission</h2>
                        <blockquote className="text-2xl text-muted-foreground italic leading-relaxed">
                            "To bridge the gap between traditional education and industry needs by providing
                            practical, outcome-focused training that drives real career advancement and
                            organizational success."
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 gradient-bg text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
                        <p className="text-xl opacity-90">
                            Numbers that speak to our commitment to excellence
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="text-center"
                            >
                                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-lg opacity-90">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Our Values</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="p-6 h-full text-center shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="p-0 space-y-4">
                                        <div className="w-16 h-16 mx-auto gradient-bg rounded-full flex items-center justify-center">
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold">{value.title}</h3>
                                        <p className="text-muted-foreground">{value.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}