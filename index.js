// backend/index.js
const express = require('express');
// const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
// app.use(cors());
app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'], // Allow data URLs for images
        },
      },
    })
  );

// Your courses data (dummy data for now)
const courses = [
  // Your course data here...
  {
    id: 1,
    name: 'Introduction to React Native',
    instructor: 'John Doe',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open',
    thumbnail: 'your.image.here',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.'
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice@example.com',
      },
      {
        id: 102,
        name: 'Bob Smith',
        email: 'bob@example.com',
      },
      // Additional enrolled students...
    ],
  },
  // Course 2
  {
    id: 2,
    name: 'Web Development Fundamentals',
    instructor: 'Jane Smith',
    description: 'Explore the basics of web development, including HTML, CSS, and JavaScript.',
    enrollmentStatus: 'Closed',
    thumbnail: 'your.image.here',
    duration: '6 weeks',
    schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
    location: 'In-Person',
    prerequisites: ['None'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to HTML',
        content: 'Understanding the structure of web pages with HTML.'
      },
      {
        week: 2,
        topic: 'Styling with CSS',
        content: 'Applying styles to HTML elements using CSS.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 103,
        name: 'Charlie Brown',
        email: 'charlie@example.com',
      },
      // Additional enrolled students...
    ],
  },
  // Course 3
  {
    id: 3,
    name: 'Python Programming for Beginners',
    instructor: 'Emily Davis',
    description: 'Get started with Python programming and learn the fundamentals of coding.',
    enrollmentStatus: 'Open',
    thumbnail: 'your.image.here',
    duration: '10 weeks',
    schedule: 'Fridays, 6:30 PM - 8:30 PM',
    location: 'Online',
    prerequisites: ['None'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Python',
        content: 'Setting up the Python environment and basic syntax.'
      },
      {
        week: 2,
        topic: 'Data Types and Variables',
        content: 'Understanding different data types and working with variables.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 104,
        name: 'Diana Evans',
        email: 'diana@example.com',
      },
      // Additional enrolled students...
    ],
  },
  {
    id: 6,
    name: 'Machine Learning Fundamentals',
    instructor: 'Sophia Rodriguez',
    description: 'Dive into the basics of machine learning and understand its applications.',
    enrollmentStatus: 'Open',
    thumbnail: 'your.image.here',
    duration: '10 weeks',
    schedule: 'Mondays and Thursdays, 5:30 PM - 7:30 PM',
    location: 'Online',
    prerequisites: ['Basic Python knowledge', 'Statistics basics'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Machine Learning',
        content: 'Overview of machine learning concepts and types of machine learning.'
      },
      {
        week: 2,
        topic: 'Supervised Learning',
        content: 'Understanding supervised learning algorithms and their applications.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 107,
        name: 'George White',
        email: 'george@example.com',
      },
      // Additional enrolled students...
    ],
  },
  
  // Course 7
  {
    id: 7,
    name: 'Digital Marketing Strategies',
    instructor: 'Olivia Brown',
    description: 'Learn effective digital marketing strategies and techniques to boost online presence.',
    enrollmentStatus: 'Closed',
    thumbnail: 'your.image.here',
    duration: '8 weeks',
    schedule: 'Tuesdays and Fridays, 3:00 PM - 5:00 PM',
    location: 'In-Person',
    prerequisites: ['Basic understanding of marketing'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Digital Marketing',
        content: 'Overview of digital marketing channels and strategies.'
      },
      {
        week: 2,
        topic: 'Social Media Marketing',
        content: 'Utilizing social media platforms for effective marketing.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 108,
        name: 'Hannah Taylor',
        email: 'hannah@example.com',
      },
      // Additional enrolled students...
    ],
    },
  // ... (Previous courses)

// Course 8
{
    id: 8,
    name: 'Cybersecurity Essentials',
    instructor: 'David Williams',
    description: 'Explore the fundamentals of cybersecurity and learn to secure digital systems.',
    enrollmentStatus: 'Open',
    thumbnail: 'your.image.here',
    duration: '12 weeks',
    schedule: 'Wednesdays, 6:30 PM - 8:30 PM',
    location: 'Online',
    prerequisites: ['Basic understanding of computer networks'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Cybersecurity',
        content: 'Overview of cybersecurity principles and common threats.'
      },
      {
        week: 2,
        topic: 'Network Security',
        content: 'Securing computer networks and preventing unauthorized access.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 109,
        name: 'Isaac Martinez',
        email: 'isaac@example.com',
      },
      // Additional enrolled students...
    ],
  },
  
  // Course 9
  {
    id: 9,
    name: 'Graphic Design Basics',
    instructor: 'Sophie Turner',
    description: 'Learn the basics of graphic design, including tools and design principles.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'your.image.here',
    duration: '8 weeks',
    schedule: 'Thursdays, 4:00 PM - 6:00 PM',
    location: 'In-Person',
    prerequisites: ['Basic computer skills'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Graphic Design',
        content: 'Overview of graphic design principles and software tools.'
      },
      {
        week: 2,
        topic: 'Color Theory and Composition',
        content: 'Understanding color palettes and creating visually appealing compositions.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 110,
        name: 'Liam Davis',
        email: 'liam@example.com',
      },
      // Additional enrolled students...
    ],
  },
  
  // ... (Additional courses)
// ... (Previous courses)

// Course 6
{
    id: 10,
    name: 'Machine Learning Fundamentals',
    instructor: 'Sophia Rodriguez',
    description: 'Dive into the basics of machine learning and understand its applications.',
    enrollmentStatus: 'Open',
    thumbnail: 'your.image.here',
    duration: '10 weeks',
    schedule: 'Mondays and Thursdays, 5:30 PM - 7:30 PM',
    location: 'Online',
    prerequisites: ['Basic Python knowledge', 'Statistics basics'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Machine Learning',
        content: 'Overview of machine learning concepts and types of machine learning.'
      },
      {
        week: 2,
        topic: 'Supervised Learning',
        content: 'Understanding supervised learning algorithms and their applications.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 107,
        name: 'George White',
        email: 'george@example.com',
      },
      // Additional enrolled students...
    ],
  },
  
  // Course 7
  {
    id: 11,
    name: 'Digital Marketing Strategies',
    instructor: 'Olivia Brown',
    description: 'Learn effective digital marketing strategies and techniques to boost online presence.',
    enrollmentStatus: 'Closed',
    thumbnail: 'your.image.here',
    duration: '8 weeks',
    schedule: 'Tuesdays and Fridays, 3:00 PM - 5:00 PM',
    location: 'In-Person',
    prerequisites: ['Basic understanding of marketing'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Digital Marketing',
        content: 'Overview of digital marketing channels and strategies.'
      },
      {
        week: 2,
        topic: 'Social Media Marketing',
        content: 'Utilizing social media platforms for effective marketing.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 108,
        name: 'Hannah Taylor',
        email: 'hannah@example.com',
      },
      // Additional enrolled students...
    ],
  },
  
  // ... (Additional courses)
  
    
  // ... (Previous courses)

// Course 10
{
    id: 12,
    name: 'Business Analytics Fundamentals',
    instructor: 'Ava Robinson',
    description: 'Gain insights into business data and make informed decisions through analytics.',
    enrollmentStatus: 'Open',
    thumbnail: 'your.image.here',
    duration: '10 weeks',
    schedule: 'Mondays and Fridays, 2:00 PM - 4:00 PM',
    location: 'Online',
    prerequisites: ['Basic understanding of business concepts'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Business Analytics',
        content: 'Overview of business analytics and its applications in decision-making.'
      },
      {
        week: 2,
        topic: 'Data Visualization',
        content: 'Creating visual representations of data for effective analysis.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 111,
        name: 'Mia Turner',
        email: 'mia@example.com',
      },
      // Additional enrolled students...
    ],
  },
  
  // Course 11
  {
    id: 13,
    name: 'Photography Basics',
    instructor: 'Daniel Garcia',
    description: 'Learn the fundamentals of photography, from composition to editing.',
    enrollmentStatus: 'Closed',
    thumbnail: 'your.image.here',
    duration: '8 weeks',
    schedule: 'Tuesdays, 7:00 PM - 9:00 PM',
    location: 'In-Person',
    prerequisites: ['None'],
    syllabus: [
      {
        week: 1,
        topic: 'Understanding Your Camera',
        content: 'Introduction to camera settings and basic photography equipment.'
      },
      {
        week: 2,
        topic: 'Composition Techniques',
        content: 'Exploring principles of composition for visually compelling photographs.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 112,
        name: 'Noah Walker',
        email: 'noah@example.com',
      },
      // Additional enrolled students...
    ],
  },
  // Course 10
{
    id: 14,
    name: 'Astrophysics Explained',
    instructor: 'Dr. Olivia Miller',
    description: 'Delve into the wonders of astrophysics and explore the mysteries of the universe.',
    enrollmentStatus: 'Open',
    thumbnail: 'your.image.here',
    duration: '10 weeks',
    schedule: 'Tuesdays and Thursdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['Basic Physics knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'The Solar System',
        content: 'An overview of our solar system and celestial bodies.'
      },
      {
        week: 2,
        topic: 'Stellar Astrophysics',
        content: 'Understanding the life cycles and properties of stars.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 111,
        name: 'Mia Turner',
        email: 'mia@example.com',
      },
      // Additional enrolled students...
    ],
  },
  
  // Course 11
  {
    id: 15,
    name: 'Creative Writing Workshop',
    instructor: 'Prof. Christopher Adams',
    description: 'Immerse yourself in the world of creative writing and unleash your storytelling skills.',
    enrollmentStatus: 'Closed',
    thumbnail: 'your.image.here',
    duration: '8 weeks',
    schedule: 'Mondays, 6:30 PM - 8:30 PM',
    location: 'In-Person',
    prerequisites: ['None'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Creative Writing',
        content: 'Exploring different genres and writing styles.'
      },
      {
        week: 2,
        topic: 'Character Development',
        content: 'Crafting compelling characters and character arcs.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 112,
        name: 'Noah Walker',
        email: 'noah@example.com',
      },
      // Additional enrolled students...
    ],
  },
  
  
  // ... (Additional courses)
  
];

// API endpoint to get courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
