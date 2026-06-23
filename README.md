<div align="center">

# 🖥️ Jong Class

[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![Nest.js](https://img.shields.io/badge/Nest.js-9+-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![Prisma](https://img.shields.io/badge/Prisma_ORM-7+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

</div>

`Jong Class` adalah platform _e-learning_ terstruktur (LMS) yang dirancang untuk memberikan pengalaman belajar yang mulus (_distraction-free_) bagi siswa, sekaligus menekan biaya operasional infrastruktur sekecil mungkin (_low-budget_) dengan memanfaatkan ekosistem video _hosting_ pihak ketiga.

Selain melayani segmen retail, platform ini dilengkapi dengan strategi **B2B (Business-to-Business)** yang aman, memungkinkan instansi atau sekolah mitra mendistribusikan akses kelas secara massal menggunakan sistem voucher berspesifikasi khusus.

---

## 🚀 Fitur Unggulan

### 1. Low-Budget Video Infrastructure

- **YouTube Integration**: Menggunakan video _unlisted/public_ dari YouTube sebagai basis penyimpanan materi, menghilangkan biaya mahal untuk _cloud video hosting_.
- **Distraction-Free Player**: Pemutar video kustom yang menyembunyikan rekomendasi video lain, tombol bagikan, dan elemen eksternal YouTube untuk menjaga fokus belajar siswa.

### 2. B2B Voucher Security (Anti-Leak)

- **Domain Restriction**: Voucher kelas kolektif dapat dikunci hanya untuk domain email tertentu (misal: `@sman1jkt.sch.id`). Jika kode voucher bocor ke internet, pengguna dengan email publik (`@gmail.com`) tetap tidak akan bisa mengklaimnya.
- **Strict Claim Limits**: Sistem pelacakan terpusat memastikan satu pengguna hanya dapat menggunakan kode voucher sebanyak satu kali.

### 3. Otomatisasi Kelulusan & Sertifikat Digital

- **Progress Tracking**: Riwayat menonton siswa tercatat secara real-time (_mark as complete_).
- **Quiz Gate**: Siswa wajib menyelesaikan kuis evaluasi dengan _passing grade_ minimal sebelum dinyatakan lulus.
- **Auto-Generated Certificate**: Pembuatan sertifikat digital berformat PDF secara otomatis dengan nomor seri unik untuk kebutuhan verifikasi keaslian oleh instansi.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Nest.js
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: JWT (Access Token & Refresh Token) + Google OAuth 2.0
- **Payment Gateway**: Midtrans / Xendit (Untuk kelas retail berbayar)

---

## 📊 Struktur Database (Prisma Schema)

Aplikasi ini menggunakan relasi database yang ketat untuk memastikan integritas data belajar siswa:

- **User & RefreshToken**: Mengelola autentikasi multi-device yang aman, pemisahan role (`ADMIN`, `MENTOR`, `USER`), serta integrasi Google Login.
- **Course & Lesson**: Struktur materi kelas multi-video dengan penataan urutan (_video order_).
- **Quiz & QuizAttempt**: Menyimpan bank soal kuis per kelas serta merekam riwayat nilai pengerjaan siswa.
- **Enrollment**: Menghubungkan siswa dengan kelas, melacak persentase _progress_, dan status kelulusan.
- **Voucher & VoucherUsage**: Mekanisme pembatasan kuota dan validasi domain email korporat/instansi.
- **Certificate**: Penyimpanan kode unik sertifikat yang terhubung langsung ke siswa dan kelas terkait.

---

## 💻 Panduan Instalasi Lokal

### 1. Prasyarat

Pastikan Anda sudah memasang komponen berikut di perangkat Anda:

- Node.js (Versi 18 atau terbaru)
- PostgreSQL

### 2. Kloning Repositori

```bash
git clone [https://github.com/username/class-heyjong.git](https://github.com/username/class-heyjong.git)
cd class-heyjong
```

### 3. Instalasi Dependensi

```bash
npm install
```

### 4. Konfigurasi Environment Variables

Buat berkas .env di direktori utama proyek, lalu lengkapi variabel berikut:

```bash
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/db_jong_class?schema=public"

# Authentication Secrets
JWT_SECRET="super-secret-access-token-key"
JWT_REFRESH_SECRET="super-secret-refresh-token-key"

# Google OAuth (Opsional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 5. Sinkronisasi Database (Prisma Migration)

Generate Client dan lakukan push skema ke database PostgreSQL lokal Anda:

```bash
npx prisma generate
npx prisma db push
```

### 6. Jalankan Server Pengembangan

```bash
npm run dev
```

Buka http://localhost:3000 pada browser Anda untuk melihat aplikasi berjalan.

---

## 🛡️ Produksi & Deployment

Aplikasi ini siap dideploy pada lingkungan server berbasis Linux (Ubuntu/Fedora) menggunakan process manager seperti PM2 dan dibalik Nginx sebagai Reverse Proxy untuk performa yang optimal dan stabil.

```bash
# Build aplikasi untuk production
npm run build

# Jalankan dengan PM2
pm2 start npm --name "heyjong-lms" -- start
```

---

## 📝 Lisensi

Proyek ini dikembangkan secara eksklusif untuk ekosistem manajemen Heyjong. Hak cipta dilindungi undang-undang.
