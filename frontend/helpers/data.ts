interface Course {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatarUrl: string; // URL placeholder untuk foto profil instruktur
  };
  rating: number;
  reviewCount: number;
  price: number | 0; // Menggunakan 0 atau angka nominal rupiah
  actionType: 'claim' | 'learn'; // Membedakan tombol 'Claim Class' (merah) dan 'Learn Now' (hitam)
  //   imageUrl: string; // URL placeholder untuk thumbnail course
}

export const dummyCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Mastering Next.js 14',
    instructor: {
      name: 'Alex Lee',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    rating: 4.9,
    reviewCount: 2400,
    price: 0,
    actionType: 'claim',
    // imageUrl: "https://placehold.co/600x400/0f172a/06b6d4?text=Next.js+14",
  },
  {
    id: 'course-2',
    title: 'Advanced System Design',
    instructor: {
      name: 'Sarah Chen',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    rating: 5.0,
    reviewCount: 850,
    price: 299000,
    actionType: 'learn',
    // imageUrl: "https://placehold.co/600x400/0f172a/3b82f6?text=System+Design",
  },
  {
    id: 'course-3',
    title: 'UI/UX for Engineers',
    instructor: {
      name: 'Marcus Knight',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    rating: 4.8,
    reviewCount: 1200,
    price: 249000,
    actionType: 'learn',
    // imageUrl: "https://placehold.co/600x400/0f172a/10b981?text=UI/UX",
  },
  {
    id: 'course-4',
    title: 'DevOps Foundations',
    instructor: {
      name: 'Tanya Moore',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanya',
    },
    rating: 4.7,
    reviewCount: 3000,
    price: 0,
    actionType: 'claim',
    // imageUrl: "https://placehold.co/600x400/0f172a/84cc16?text=DevOps",
  },
];
