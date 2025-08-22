import Button from '@/components/ui/Button';
import { FocusTrap } from 'focus-trap-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

// Step Enum
const STEP = {
  SCHOOL_SELECTION: 0,
  GRADE_SELECTION: 1,
  PLAN_GENERATION: 2,
  TIMETABLE_VIEW: 3,
};

const SCHOOLS = [
  {
    name: 'Amagor Primary School',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Baki Primary School',
    grades: 'Primary • P1-P8',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Ivbore Primary School',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Unity Primary School',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Sunrise Academy', grades: 'Primary • P1-P8', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  { name: 'Greenfield School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Lakeside International',
    grades: 'Primary • P1-P7',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Royal Scholars School',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    name: "St. Mary's Academy",
    grades: 'Primary • P1-P8',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Oakwood Preparatory', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Riverside Elementary',
    grades: 'Primary • P1-P7',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Mountain View School',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Valley Heights Academy',
    grades: 'Primary • P1-P8',
    status: 'Draft',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  { name: 'Pine Grove School', grades: 'Primary • P1-P6', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Cedar Ridge Primary',
    grades: 'Primary • P1-P7',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Maple Leaf Academy', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Willow Creek School',
    grades: 'Primary • P1-P8',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Birchwood Preparatory',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Aspen Heights School',
    grades: 'Primary • P1-P7',
    status: 'Draft',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Elm Street Academy',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Cypress Primary School',
    grades: 'Primary • P1-P8',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Magnolia Preparatory',
    grades: 'Primary • P1-P6',
    status: 'Draft',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Juniper Elementary',
    grades: 'Primary • P1-P7',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Sycamore Academy',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Redwood School', grades: 'Primary • P1-P8', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Sequoia Preparatory',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Palm Grove Academy',
    grades: 'Primary • P1-P7',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Bamboo Heights School',
    grades: 'Primary • P1-P6',
    status: 'Draft',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  { name: 'Coconut Primary', grades: 'Primary • P1-P8', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Mango Tree Academy',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Banana Leaf School', grades: 'Primary • P1-P7', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Papaya Preparatory',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Guava Heights Academy',
    grades: 'Primary • P1-P8',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Dragon Fruit School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Star Fruit Academy',
    grades: 'Primary • P1-P7',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Passion Fruit Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Kiwi Preparatory', grades: 'Primary • P1-P8', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  { name: 'Blueberry School', grades: 'Primary • P1-P6', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Strawberry Academy',
    grades: 'Primary • P1-P7',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Raspberry Heights', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Blackberry Primary',
    grades: 'Primary • P1-P8',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Cranberry School',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Gooseberry Academy', grades: 'Primary • P1-P7', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Elderberry Preparatory',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Mulberry Heights',
    grades: 'Primary • P1-P8',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Huckleberry School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Boysenberry Academy',
    grades: 'Primary • P1-P7',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Loganberry Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Marionberry School', grades: 'Primary • P1-P8', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Cloudberry Academy',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Salmonberry Heights',
    grades: 'Primary • P1-P7',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Thimbleberry School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  { name: 'Wineberry Academy', grades: 'Primary • P1-P8', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Bearberry Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Bilberry School', grades: 'Primary • P1-P7', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Lingonberry Academy',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Barberry Heights',
    grades: 'Primary • P1-P8',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Bayberry School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  { name: 'Bogberry Academy', grades: 'Primary • P1-P7', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Bunchberry Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Checkerberry School', grades: 'Primary • P1-P8', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  { name: 'Crowberry Academy', grades: 'Primary • P1-P6', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Dewberry Heights',
    grades: 'Primary • P1-P7',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Foxberry School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Grouseberry Academy',
    grades: 'Primary • P1-P8',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Hackberry Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Huckleberry School', grades: 'Primary • P1-P7', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Juniperberry Academy',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Kinnikinnick Heights',
    grades: 'Primary • P1-P8',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Lingonberry School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Mountainberry Academy',
    grades: 'Primary • P1-P7',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Nannyberry Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Oregonberry School', grades: 'Primary • P1-P8', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Partridgeberry Academy',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Pigeonberry Heights',
    grades: 'Primary • P1-P7',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Pokeberry School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  { name: 'Raspberry Academy', grades: 'Primary • P1-P8', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Salmonberry Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Serviceberry School', grades: 'Primary • P1-P7', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  { name: 'Snowberry Academy', grades: 'Primary • P1-P6', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Sparkleberry Heights',
    grades: 'Primary • P1-P8',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Squashberry School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Strawberry Academy',
    grades: 'Primary • P1-P7',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Sugarberry Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Tayberry School', grades: 'Primary • P1-P8', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Thimbleberry Academy',
    grades: 'Primary • P1-P6',
    status: 'No Plan',
    statusColor: 'bg-gray-100 text-gray-800',
  },
  {
    name: 'Waxberry Heights',
    grades: 'Primary • P1-P7',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Winterberry School', grades: 'Primary • P1-P6', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
  { name: 'Wolfberry Academy', grades: 'Primary • P1-P8', status: 'No Plan', statusColor: 'bg-gray-100 text-gray-800' },
  {
    name: 'Youngberry Primary',
    grades: 'Primary • P1-P6',
    status: 'Published',
    statusColor: 'bg-green-100 text-green-800',
  },
  { name: 'Zucchini School', grades: 'Primary • P1-P7', status: 'Draft', statusColor: 'bg-gray-100 text-gray-800' },
];

const InteractivePrototype: React.FC = () => {
  const [step, setStep] = useState(STEP.SCHOOL_SELECTION);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 8;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Interactive conflict state
  const [selectedConflict, setSelectedConflict] = useState<{
    row: number;
    col: number;
    subject: string;
    teacher: string;
    conflictType?: string | undefined;
  } | null>(null);

  // Add new state variables - commented out unused variables
  // const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [grades] = useState([
    {
      id: '1',
      name: 'Primary 1',
      subjects: ['Math', 'English', 'Science'],
      requiredHours: { Math: 5, English: 5, Science: 4 },
    },
    {
      id: '2',
      name: 'Primary 2',
      subjects: ['Math', 'English', 'Science'],
      requiredHours: { Math: 5, English: 5, Science: 4 },
    },
    {
      id: '3',
      name: 'Primary 3',
      subjects: ['Math', 'English', 'Science', 'Arts'],
      requiredHours: { Math: 5, English: 5, Science: 4, Arts: 2 },
    },
  ]);

  // Commented out unused timeSlots variable
  // const [timeSlots] = useState([
  //   { id: '1', time: '8 AM', duration: 1, isBreak: false },
  //   { id: '2', time: '9 AM', duration: 1, isBreak: false },
  //   { id: '3', time: '10 AM', duration: 1, isBreak: false },
  //   { id: '4', time: '11 AM', duration: 1, isBreak: false },
  //   { id: '5', time: '12 PM', duration: 1, isBreak: true },
  //   { id: '6', time: '1 PM', duration: 1, isBreak: false },
  //   { id: '7', time: '2 PM', duration: 1, isBreak: false },
  // ]);

  // Add state for status filter
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft' | 'No Plan'>('All');

  // Update filteredSchools to include status filter
  const filteredSchools = SCHOOLS.filter(school => {
    const matchesQuery =
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.grades.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : school.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);
  const startIndex = (currentPage - 1) * schoolsPerPage;
  const endIndex = startIndex + schoolsPerPage;
  const currentSchools = filteredSchools.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const schoolList = document.querySelector('.schools-list');
    if (schoolList) {
      schoolList.scrollTop = 0;
    }
  };

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // When user clicks Generate Timetable, go to PLAN_GENERATION step
  const handleGenerate = () => {
    setStep(STEP.PLAN_GENERATION);
  };

  // When in PLAN_GENERATION, auto-advance to TIMETABLE_VIEW after delay
  useEffect(() => {
    if (step === STEP.PLAN_GENERATION) {
      timerRef.current = setTimeout(() => {
        setStep(STEP.TIMETABLE_VIEW);
      }, 2500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step]);

  // Animation variants
  const fadeSlide = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -30, transition: { duration: 0.3 } },
  };

  // --- Timetable Data (Step 1) ---
  const [timetableData, setTimetableData] = useState([
    {
      time: '8:00 AM',
      slots: [
        { subject: 'Assembly', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Assembly', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Assembly', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Assembly', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Assembly', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
      ],
    },
    {
      time: '8:30 AM',
      slots: [
        { subject: 'Mathematics', teacher: 'Mr. Okoro', color: 'bg-blue-100 text-blue-800', conflict: false },
        { subject: 'English', teacher: 'Ms. Adesina', color: 'bg-green-100 text-green-800', conflict: false },
        {
          subject: 'Science',
          teacher: 'Mr. Bello',
          color: 'bg-yellow-100 text-yellow-800',
          conflict: true,
          conflictType: 'double-booking',
        },
        { subject: 'Arts', teacher: 'Ms. Chika', color: 'bg-purple-100 text-purple-800', conflict: false },
        { subject: 'History', teacher: 'Mr. Musa', color: 'bg-pink-100 text-pink-800', conflict: false },
      ],
    },
    {
      time: '9:15 AM',
      slots: [
        { subject: 'English', teacher: 'Ms. Adesina', color: 'bg-green-100 text-green-800', conflict: false },
        {
          subject: 'Mathematics',
          teacher: 'Mr. Okoro',
          color: 'bg-blue-100 text-blue-800',
          conflict: true,
          conflictType: 'double-booking',
        },
        { subject: 'Science', teacher: 'Mr. Bello', color: 'bg-yellow-100 text-yellow-800', conflict: false },
        { subject: 'Arts', teacher: 'Ms. Chika', color: 'bg-purple-100 text-purple-800', conflict: false },
        { subject: 'History', teacher: 'Mr. Musa', color: 'bg-pink-100 text-pink-800', conflict: false },
      ],
    },
    {
      time: '10:00 AM',
      slots: [
        { subject: 'Short Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Short Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Short Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Short Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Short Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
      ],
    },
    {
      time: '10:15 AM',
      slots: [
        { subject: 'Science', teacher: 'Mr. Bello', color: 'bg-yellow-100 text-yellow-800', conflict: false },
        { subject: 'English', teacher: 'Ms. Adesina', color: 'bg-green-100 text-green-800', conflict: false },
        { subject: 'Mathematics', teacher: 'Mr. Okoro', color: 'bg-blue-100 text-blue-800', conflict: false },
        {
          subject: 'History',
          teacher: 'Mr. Musa',
          color: 'bg-pink-100 text-pink-800',
          conflict: true,
          conflictType: 'soft-constraint',
        },
        { subject: 'Arts', teacher: 'Ms. Chika', color: 'bg-purple-100 text-purple-800', conflict: false },
      ],
    },
    {
      time: '11:00 AM',
      slots: [
        { subject: 'Social Studies', teacher: 'Mr. Johnson', color: 'bg-orange-100 text-orange-800', conflict: false },
        { subject: 'Social Studies', teacher: 'Mr. Johnson', color: 'bg-orange-100 text-orange-800', conflict: false },
        { subject: 'Social Studies', teacher: 'Mr. Johnson', color: 'bg-orange-100 text-orange-800', conflict: false },
        { subject: 'Social Studies', teacher: 'Mr. Johnson', color: 'bg-orange-100 text-orange-800', conflict: false },
        { subject: 'Social Studies', teacher: 'Mr. Johnson', color: 'bg-orange-100 text-orange-800', conflict: false },
      ],
    },
    {
      time: '11:45 AM',
      slots: [
        { subject: 'Lunch Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Lunch Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Lunch Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Lunch Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Lunch Break', teacher: '', color: 'bg-gray-100 text-gray-800', conflict: false },
      ],
    },
    {
      time: '12:30 PM',
      slots: [
        { subject: 'Reading Time', teacher: 'Ms. Adesina', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Reading Time', teacher: 'Ms. Adesina', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Reading Time', teacher: 'Ms. Adesina', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Reading Time', teacher: 'Ms. Adesina', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Reading Time', teacher: 'Ms. Adesina', color: 'bg-gray-100 text-gray-800', conflict: false },
      ],
    },
    {
      time: '1:00 PM',
      slots: [
        { subject: 'Dismissal', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Dismissal', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Dismissal', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Dismissal', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
        { subject: 'Dismissal', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', conflict: false },
      ],
    },
  ]);
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  // Add new handlers
  const handleGradeSelect = (gradeId: string) => {
    // setSelectedGrade(gradeId); // Commented out since selectedGrade state is unused
    setStep(STEP.PLAN_GENERATION);
  };

  // Commented out unused function
  // const handleConflictResolve = (conflictType: string, resolution: string) => {
  //   // Update timetable data based on resolution
  //   if (conflictType === 'double-booking') {
  //     // Logic to handle double booking resolution
  //     setSelectedConflict(null);
  //   } else if (conflictType === 'gap') {
  //     // Logic to handle gap resolution
  //     setSelectedConflict(null);
  //   }
  // };

  // Add state for sidepanel action and input
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [sidePanelData, setSidePanelData] = useState<{
    row: number;
    col: number;
    subject: string;
    teacher: string;
    conflictType?: string | undefined;
    time?: string | undefined;
    day?: string | undefined;
  } | null>(null);

  const [sidePanelAction, setSidePanelAction] = useState<string | null>(null);
  const [newTeacher, setNewTeacher] = useState('');
  const [moveTarget, setMoveTarget] = useState<{ row: number; col: number } | null>(null);

  // Helper to get day and time from indices
  const getDayTime = (rowIdx: number, colIdx: number) => ({
    time: timetableData[rowIdx]?.time,
    day: days[colIdx],
  });

  // Handler to reassign teacher for a conflict slot
  const handleReassignTeacher = (rowIdx: number, colIdx: number, newTeacher: string) => {
    setTimetableData(prev =>
      prev.map((row, rIdx) => {
        if (rIdx !== rowIdx) return row;
        return {
          ...row,
          slots: row.slots.map((slot, cIdx) => {
            if (cIdx !== colIdx) return slot;
            return {
              ...slot,
              teacher: newTeacher,
              conflict: false,
              // Remove conflictType when conflict is false
            };
          }),
        };
      })
    );
    setSidePanelOpen(false);
  };

  // Handler to move subject to another slot
  const handleMoveSubject = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    setTimetableData(prev => {
      const subjectToMove = prev[fromRow]?.slots[fromCol];
      const targetSlot = prev[toRow]?.slots[toCol];
      return prev.map((row, rIdx) => {
        if (rIdx === fromRow) {
          return {
            ...row,
            slots: row.slots.map((slot, cIdx) => {
              if (cIdx === fromCol) {
                return fromRow === toRow && fromCol === toCol
                  ? slot
                  : { ...targetSlot, conflict: false };
              }
              return slot;
            }),
          };
        }
        if (rIdx === toRow) {
          return {
            ...row,
            slots: row.slots.map((slot, cIdx) => {
              if (cIdx === toCol) {
                return { ...subjectToMove, conflict: false };
              }
              return slot;
            }),
          };
        }
        return row;
      });
    });
    setSidePanelOpen(false);
  };

  // Handler to ignore conflict
  const handleIgnoreConflict = (rowIdx: number, colIdx: number) => {
    setTimetableData(prev =>
      prev.map((row, rIdx) => {
        if (rIdx !== rowIdx) return row;
        return {
          ...row,
          slots: row.slots.map((slot, cIdx) => {
            if (cIdx !== colIdx) return slot;
            return {
              ...slot,
              conflict: false,
            };
          }),
        };
      })
    );
    setSidePanelOpen(false);
  };

  // Add state for publish modal and published status
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  return (
    <div className="w-[85vw] relative left-[50%] right-[50%] -mx-[42.5vw] border border-gray-200 shadow-lg bg-white overflow-hidden rounded-2xl">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-accent to-tertiary flex items-center justify-between rounded-t-2xl">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white" id="interactive-prototype-title">
            Try the Interactive Prototype
          </h3>
          <p className="text-white text-sm mt-1" id="interactive-prototype-desc">
            Click through the core scheduling flow as a user would experience it.
          </p>
        </div>
        <a
          href="https://www.figma.com/proto/4HVHnoV0n8uEVLf7XkKU1f/AIP---Multiple-schools?page-id=225%3A12437&node-id=54617-3517&viewport=482%2C201%2C0.05&t=dYiIBvYppZoyDru5-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=54617%3A3517"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2 border border-blue-200 text-blue-700 bg-white text-sm font-semibold rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="View the interactive prototype in Figma (opens in new tab)"
          aria-labelledby="interactive-prototype-title interactive-prototype-desc"
        >
          View in Figma
        </a>
      </div>

      <div className="w-full px-8 py-8">
        <div className="w-full relative bg-white h-[800px]">
          <AnimatePresence mode="wait">
            {step === STEP.SCHOOL_SELECTION && (
              <motion.div key="school-selection" {...fadeSlide} className="w-full h-full">
                {/* School Selection Interface */}
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-6 w-full h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="text-sm font-medium">Schools</span>
                    </div>
                  </div>

                  {/* Search Bar and Status Filter */}
                  <div className="px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search schools..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <label htmlFor="status-filter" className="sr-only">
                        Filter by status
                      </label>
                      <select
                        id="status-filter"
                        className="block w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value as 'All' | 'Published' | 'Draft' | 'No Plan')}
                        aria-label="Filter schools by status"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="No Plan">No Plan</option>
                      </select>
                    </div>
                  </div>

                  {/* Generate Timetable Button */}
                  <div className="flex items-center px-4 py-3 border-b border-gray-200">
                    <button
                      className={`mr-4 px-5 py-2 rounded-lg text-base font-semibold shadow transition-colors ${selectedSchools.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                      disabled={selectedSchools.length === 0}
                      onClick={handleGenerate}
                    >
                      Generate Timetable
                    </button>
                    <span className="text-gray-500 text-sm">Select a school to enable</span>
                  </div>

                  {/* Schools List */}
                  <div className="divide-y divide-gray-200 flex-1 schools-list overflow-y-auto">
                    {currentSchools.length > 0 ? (
                      currentSchools.map((school, _index) => (
                        <label
                          key={school.name}
                          className={`p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer`}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="school"
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                              checked={selectedSchools.includes(school.name)}
                              onChange={() => {
                                setSelectedSchools(prev =>
                                  prev.includes(school.name)
                                    ? prev.filter(n => n !== school.name)
                                    : [...prev, school.name]
                                );
                              }}
                              aria-label={`Select ${school.name}`}
                            />
                            <div>
                              <div
                                className={`text-sm font-medium ${selectedSchools.includes(school.name) ? 'text-blue-600' : 'text-gray-900'}`}
                              >
                                {school.name}
                              </div>
                              <div className="text-xs text-gray-500">{school.grades}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {school.status !== 'In Progress' && (
                              <span className={`px-2 py-0.5 text-xs rounded-full ${school.statusColor}`}>
                                {school.status}
                              </span>
                            )}
                            {school.status === 'Published' && (
                              <button className="text-xs text-blue-600" tabIndex={-1}>
                                View
                              </button>
                            )}
                          </div>
                        </label>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No schools found matching "{searchQuery}"</div>
                    )}
                  </div>

                  {/* Enhanced Pagination */}
                  <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-t border-gray-200 mt-0">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(endIndex, filteredSchools.length)}</span> of{' '}
                          <span className="font-medium">{filteredSchools.length}</span> schools
                        </p>
                      </div>
                      <div>
                        <nav
                          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                          aria-label="Pagination"
                        >
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Previous</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {/* Page Numbers */}
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Show first page, last page, current page, and pages around current page
                            if (
                              pageNumber === 1 ||
                              pageNumber === totalPages ||
                              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                              return (
                                <button
                                  key={pageNumber}
                                  onClick={() => handlePageChange(pageNumber)}
                                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    currentPage === pageNumber
                                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNumber}
                                </button>
                              );
                            } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                              return (
                                <span
                                  key={pageNumber}
                                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                >
                                  ...
                                </span>
                              );
                            }
                            return null;
                          })}

                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === totalPages
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Next</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {step === STEP.GRADE_SELECTION && (
              <motion.div key="grade-selection" {...fadeSlide} className="w-full h-full">
                <div className="border border-gray-200 rounded overflow-hidden mb-6 w-full h-full flex flex-col">
                  <div className="bg-blue-600 text-white px-4 py-2">
                    <h3 className="text-lg font-medium">Select Grade Level</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-4">Choose a grade level to generate the timetable for:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {grades.map(grade => (
                        <button
                          key={grade.id}
                          onClick={() => handleGradeSelect(grade.id)}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                        >
                          <h4 className="font-medium text-gray-900">{grade.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">Subjects: {grade.subjects.join(', ')}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {step === STEP.PLAN_GENERATION && (
              <motion.div
                key="plan-generation"
                {...fadeSlide}
                className="w-full h-full flex items-center justify-center"
                aria-live="polite"
                aria-busy="true"
              >
                {/* Generating Plan Modal UI */}
                <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-blue-200 p-8 flex flex-col items-center">
                  <div className="inline-block p-3 rounded-full bg-blue-50 mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Generating plan...</h4>
                  <p className="text-sm text-gray-600 mb-4">This might take a few seconds</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '70%' }}
                      transition={{ duration: shouldReduceMotion ? 0 : 2.2, ease: 'easeInOut' }}
                      className="bg-blue-600 h-2 rounded-full"
                      aria-hidden="true"
                    ></motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Processing constraints</p>
                  <div className="space-y-2 w-full">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-red-500 text-red-800">
                        Hard Violations (2)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-yellow-500 text-yellow-800">
                        Soft Violations (3)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {step === STEP.TIMETABLE_VIEW && (
              <motion.div key="timetable-view" {...fadeSlide} className="relative w-full h-full overflow-y-auto">
                {/* School Timetable View */}
                <div className="bg-white border border-gray-200 rounded-md overflow-hidden w-full h-full flex flex-col">
                  {/* Header Section */}
                  <div className="bg-white border border-gray-200 rounded-xl px-8 py-4 mb-4">
                    {/* Top Row: Back, School Name */}
                    <div className="flex items-center min-w-0">
                      <button
                        onClick={() => setStep(STEP.SCHOOL_SELECTION)}
                        className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                        aria-label="Back to School List"
                      >
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="text-gray-500"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="text-lg font-bold text-gray-900 truncate">Amagor School</span>
                    </div>
                    {/* Second Row: Tabs + View By Controls + Status/Actions */}
                    <div className="flex items-center justify-between mt-3 ml-8">
                      {/* Left: Tabs and View By Controls (visually separated) */}
                      <div className="flex items-center">
                        {/* Tabs */}
                        <div className="flex items-center bg-gray-100 rounded-full p-1">
                          <button className="px-3 py-1.5 rounded-full text-sm font-semibold text-blue-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors hover:bg-blue-50">
                            Summary
                          </button>
                          <button className="px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-700 text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">
                            Plan
                          </button>
                        </div>
                        {/* Divider */}
                        <div className="border-l border-gray-200 h-7 mx-6"></div>
                        {/* View By Controls */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">View by</span>
                          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Grade and Stream</option>
                            <option>Teacher</option>
                            <option>Subject</option>
                          </select>
                          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Primary 1</option>
                            <option>Primary 2</option>
                            <option>Primary 3</option>
                          </select>
                          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                          </select>
                        </div>
                      </div>
                      {/* Right: DRAFT Status, Icon Buttons, Publish */}
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-5 py-1 rounded-full ${isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-blue-700'} text-sm font-semibold`}
                        >
                          {isPublished ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                        {/* Icon Button Group */}
                        <div className="flex rounded-lg overflow-hidden border border-blue-200 bg-white">
                          <button className="px-4 py-2 text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                          <button className="px-4 py-2 text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 border-l border-blue-200">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 7h18M3 12h18M3 17h18"
                              />
                            </svg>
                          </button>
                        </div>
                        {/* Publish Button with Dropdown */}
                        <div className="relative">
                          <button
                            className="flex items-center px-7 py-2 rounded-lg bg-blue-700 text-white text-base font-semibold shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => setPublishModalOpen(true)}
                            disabled={isPublished}
                            aria-disabled={isPublished}
                          >
                            {isPublished ? 'Published' : 'Publish'}
                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timetable Grid */}
                  <div className={`flex-1 relative flex ${sidePanelOpen ? 'flex-row' : ''}`}>
                    <div className={`${sidePanelOpen ? 'flex-1' : 'w-full'}`} style={{ minWidth: 0 }}>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="w-16 p-1.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                              Time
                            </th>
                            {days.map((day, _dayIdx) => (
                              <th
                                key={day}
                                className="p-1.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 min-w-[120px] max-w-[120px] w-[120px]"
                              >
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {timetableData.map((row, rowIdx) => (
                            <tr key={row.time} className="hover:bg-gray-50">
                              <td className="p-1.5 text-xs font-medium text-gray-900 whitespace-nowrap sticky left-0 bg-white border-r border-gray-200">
                                {row.time}
                              </td>
                              {row.slots.map((slot, colIdx) => {
                                return (
                                  <td key={colIdx} className="p-1 align-top min-w-[120px] max-w-[120px] w-[120px]">
                                    <div
                                      className={
                                        `relative rounded-lg border ` +
                                        (slot.conflict
                                          ? slot.conflictType === 'soft-constraint'
                                            ? 'border-yellow-200 bg-yellow-50'
                                            : 'border-red-200 bg-red-50'
                                          : `border-gray-200 ${slot.color}`) +
                                        ` p-1.5 min-h-[48px] flex flex-col justify-between ` +
                                        (slot.conflict
                                          ? 'cursor-pointer hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow'
                                          : '')
                                      }
                                      tabIndex={slot.conflict ? 0 : -1}
                                      role={slot.conflict ? 'button' : undefined}
                                      aria-label={slot.conflict ? `View conflict: ${slot.subject}` : undefined}
                                      onClick={() => {
                                        if (slot.conflict) {
                                          setSelectedConflict({
                                            row: rowIdx,
                                            col: colIdx,
                                            subject: slot.subject,
                                            teacher: slot.teacher,
                                            conflictType: slot.conflictType,
                                          });
                                          const { time, day } = getDayTime(rowIdx, colIdx);
                                          setSidePanelData({
                                            row: rowIdx,
                                            col: colIdx,
                                            subject: slot.subject,
                                            teacher: slot.teacher,
                                            conflictType: slot.conflictType,
                                            time,
                                            day,
                                          });
                                          setSidePanelOpen(true);
                                        }
                                      }}
                                      onKeyDown={e => {
                                        if (slot.conflict && (e.key === 'Enter' || e.key === ' ')) {
                                          setSelectedConflict({
                                            row: rowIdx,
                                            col: colIdx,
                                            subject: slot.subject,
                                            teacher: slot.teacher,
                                            conflictType: slot.conflictType,
                                          });
                                          const { time, day } = getDayTime(rowIdx, colIdx);
                                          setSidePanelData({
                                            row: rowIdx,
                                            col: colIdx,
                                            subject: slot.subject,
                                            teacher: slot.teacher,
                                            conflictType: slot.conflictType,
                                            time,
                                            day,
                                          });
                                          setSidePanelOpen(true);
                                        }
                                      }}
                                    >
                                      <div className="flex items-center justify-between mb-0.5">
                                        <span
                                          className={`text-xs font-medium ${
                                            slot.conflict
                                              ? slot.conflictType === 'soft-constraint'
                                                ? 'text-yellow-700'
                                                : 'text-red-700'
                                              : 'text-gray-900'
                                          }`}
                                        >
                                          {slot.subject}
                                        </span>
                                        {slot.conflict && (
                                          <span
                                            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                                              slot.conflictType === 'soft-constraint'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                          >
                                            {slot.conflictType === 'soft-constraint' ? 'Soft Constraint' : 'Conflict'}
                                          </span>
                                        )}
                                      </div>
                                      {slot.teacher && (
                                        <span className="text-[10px] text-gray-500">{slot.teacher}</span>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Sidepanel for conflict details - now inside timetable grid */}
                    <AnimatePresence>
                      {sidePanelOpen && sidePanelData && (
                        <FocusTrap active={sidePanelOpen} focusTrapOptions={{ clickOutsideDeactivates: true }}>
                          <aside
                            className="h-full w-64 bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Conflict Details"
                            style={{ minWidth: 256 }}
                          >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                              <h2 className="text-base font-bold text-gray-900">Conflict Details</h2>
                              <button
                                onClick={() => {
                                  setSidePanelOpen(false);
                                  setSidePanelAction(null);
                                  setNewTeacher('');
                                  setMoveTarget(null);
                                }}
                                className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label="Close conflict details"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="text-gray-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="flex-1 overflow-y-auto px-4 py-3">
                              <div className="mb-3">
                                <div className="text-xs text-gray-500 mb-1">Subject</div>
                                <div className="text-sm font-semibold text-gray-900">{sidePanelData.subject}</div>
                              </div>
                              <div className="mb-3">
                                <div className="text-xs text-gray-500 mb-1">Teacher</div>
                                <div className="text-sm font-semibold text-gray-900">{sidePanelData.teacher}</div>
                              </div>
                              <div className="mb-3 flex gap-2">
                                <div>
                                  <div className="text-xs text-gray-500 mb-1">Day</div>
                                  <div className="text-sm font-semibold text-gray-900">{sidePanelData.day}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 mb-1">Time</div>
                                  <div className="text-sm font-semibold text-gray-900">{sidePanelData.time}</div>
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="text-xs text-gray-500 mb-1">Conflict Type</div>
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  {sidePanelData.conflictType === 'soft-constraint'
                                    ? 'Soft Constraint'
                                    : 'Hard Conflict'}
                                </div>
                              </div>
                              <div className="mb-4">
                                <div className="text-xs text-gray-500 mb-2">Actions to Resolve</div>
                                {/* Action Buttons or Forms */}
                                {!sidePanelAction && (
                                  <div className="flex flex-col gap-2">
                                    <button
                                      className="px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs text-left"
                                      onClick={() => setSidePanelAction('reassign')}
                                    >
                                      Reassign Teacher
                                    </button>
                                    <button
                                      className="px-3 py-2 rounded bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs text-left"
                                      onClick={() => setSidePanelAction('move')}
                                    >
                                      Move Subject to Another Slot
                                    </button>
                                    {sidePanelData.conflictType === 'soft-constraint' && (
                                      <button
                                        className="px-3 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs text-left"
                                        onClick={() => {
                                          handleIgnoreConflict(sidePanelData.row, sidePanelData.col);
                                          setSidePanelAction(null);
                                        }}
                                      >
                                        Ignore for Now
                                      </button>
                                    )}
                                  </div>
                                )}
                                {/* Reassign Teacher Form */}
                                {sidePanelAction === 'reassign' && (
                                  <form
                                    className="flex flex-col gap-2"
                                    onSubmit={e => {
                                      e.preventDefault();
                                      if (newTeacher.trim()) {
                                        handleReassignTeacher(sidePanelData.row, sidePanelData.col, newTeacher.trim());
                                        setSidePanelAction(null);
                                        setNewTeacher('');
                                      }
                                    }}
                                  >
                                    <label htmlFor="new-teacher" className="text-xs text-gray-700 font-medium">
                                      New Teacher Name
                                    </label>
                                    <input
                                      id="new-teacher"
                                      type="text"
                                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                      value={newTeacher}
                                      onChange={e => setNewTeacher(e.target.value)}
                                      placeholder="Enter teacher name"
                                      required
                                    />
                                    <div className="flex gap-2 mt-2">
                                      <button
                                        type="submit"
                                        className="px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        className="px-3 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                                        onClick={() => {
                                          setSidePanelAction(null);
                                          setNewTeacher('');
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                )}
                                {/* Move Subject Form */}
                                {sidePanelAction === 'move' && (
                                  <div className="flex flex-col gap-2">
                                    <div className="text-xs text-gray-700 font-medium mb-1">Select a new slot:</div>
                                    <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                                      {timetableData.map((row, rIdx) =>
                                        row.slots.map((slot, cIdx) => {
                                          const isNonTeaching =
                                            slot.subject === 'Short Break' ||
                                            slot.subject === 'Lunch Break' ||
                                            slot.subject === 'Reading Time' ||
                                            slot.subject === 'Dismissal' ||
                                            slot.subject === 'Assembly';
                                          const isCurrent = rIdx === sidePanelData.row && cIdx === sidePanelData.col;
                                          if (!isNonTeaching && !isCurrent) {
                                            return (
                                              <button
                                                key={`move-${rIdx}-${cIdx}`}
                                                className={`px-2 py-1 rounded border border-gray-200 text-xs text-left hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 ${moveTarget && moveTarget.row === rIdx && moveTarget.col === cIdx ? 'bg-blue-100' : ''}`}
                                                onClick={() => setMoveTarget({ row: rIdx, col: cIdx })}
                                              >
                                                {row.time} - {days[cIdx]}{' '}
                                                {slot.subject ? `(Current: ${slot.subject})` : ''}
                                              </button>
                                            );
                                          }
                                          return null;
                                        })
                                      )}
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <button
                                        className="px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                                        disabled={!moveTarget}
                                        onClick={() => {
                                          if (moveTarget) {
                                            handleMoveSubject(
                                              sidePanelData.row,
                                              sidePanelData.col,
                                              moveTarget.row,
                                              moveTarget.col
                                            );
                                            setSidePanelAction(null);
                                            setMoveTarget(null);
                                          }
                                        }}
                                      >
                                        Move
                                      </button>
                                      <button
                                        className="px-3 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                                        onClick={() => {
                                          setSidePanelAction(null);
                                          setMoveTarget(null);
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </aside>
                        </FocusTrap>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Restart Button - now below the prototype */}
        {step === STEP.TIMETABLE_VIEW && (
          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="primary" onClick={() => setStep(STEP.SCHOOL_SELECTION)} aria-label="Restart Prototype">
              Restart Prototype
            </Button>
            <a
              href="https://www.figma.com/proto/4HVHnoV0n8uEVLf7XkKU1f/AIP---Multiple-schools?page-id=225%3A12437&node-id=54617-3517&viewport=482%2C201%2C0.05&t=dYiIBvYppZoyDru5-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=54617%3A3517"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 border border-blue-200 text-blue-700 bg-white text-sm font-semibold rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="View in Figma (opens in new tab)"
            >
              View in Figma
            </a>
          </div>
        )}
      </div>
      {/* Publish Modal - now overlays only the timetable area */}
      {publishModalOpen && step === STEP.TIMETABLE_VIEW && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-blue-200">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Publish Plan?</h2>
            <p className="text-gray-700 mb-6">
              Once published, this plan will be operational starting the next school day. Are you sure you want to
              proceed?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                onClick={() => setPublishModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                onClick={() => {
                  setIsPublished(true);
                  setPublishModalOpen(false);
                }}
              >
                Confirm & Publish
              </button>
            </div>
            {isPublished && (
              <div className="mt-4 text-green-700 bg-green-50 border border-green-200 rounded p-2 text-sm">
                Plan published! It will be operational next school day.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractivePrototype;
