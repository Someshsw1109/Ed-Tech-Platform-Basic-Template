'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Plus, DollarSign, BarChart, User } from 'lucide-react'

export default function Dashboard({ userRole = 'student' }: { userRole?: 'instructor' | 'student' }) {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Introduction to React', instructor: 'Jane Doe', price: 49.99, enrolled: false, image: '/placeholder.svg?height=100&width=100' },
    { id: 2, title: 'Advanced JavaScript Concepts', instructor: 'John Smith', price: 79.99, enrolled: true, image: '/placeholder.svg?height=100&width=100' },
    { id: 3, title: 'Web Design Fundamentals', instructor: 'Alice Johnson', price: 39.99, enrolled: false, image: '/placeholder.svg?height=100&width=100' },
  ])

  const enrollInCourse = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, enrolled: true } : course
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-400">EdTech Dashboard</h1>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=50&width=50" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </header>
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg">
            <TabsTrigger value="courses" className="rounded-full">
              <BookOpen className="mr-2 h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-full">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            {userRole === 'instructor' && (
              <TabsTrigger value="analytics" className="rounded-full">
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="courses" className="space-y-4">
            {userRole === 'instructor' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Create New Course
                </Button>
              </motion.div>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                      <CardDescription>Instructor: {course.instructor}</CardDescription>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">${course.price}</p>
                    </CardContent>
                    <CardFooter>
                      {userRole === 'student' && (
                        course.enrolled ? (
                          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                            <BookOpen className="mr-2 h-4 w-4" /> Watch Course
                          </Button>
                        ) : (
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => enrollInCourse(course.id)}>
                            <DollarSign className="mr-2 h-4 w-4" /> Enroll Now
                          </Button>
                        )
                      )}
                      {userRole === 'instructor' && (
                        <Button variant="outline" className="w-full">Edit Course</Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">Profile</CardTitle>
                  <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" className="border-purple-300 focus:border-purple-500" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" className="border-purple-300 focus:border-purple-500" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          {userRole === 'instructor' && (
            <TabsContent value="analytics">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">Analytics</CardTitle>
                    <CardDescription>View your course performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">Analytics dashboard coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          )}
        </Tabs>
      </motion.div>
    </div>
  )
}