'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* TODO: вставте ваш повний логотип (Cloudinary URL) */}
          <img
            src="https://res.cloudinary.com/CLOUD_NAME/image/upload/v1/wowsmak/logo.png"
            alt="WowSmak"
            className="h-10 w-10 rounded-xl object-cover"
          />
          <span className="text-xl font-extrabold tracking-tight">WowSmak</span>
        </Link>

        <nav className="hidden gap-4 text-sm text-white/80 md:flex">
          <Link href="/catalog" className="hover:text-white">Каталог</Link>
          <Link href="/catalog?cat=Снеки" className="hover:text-white">Снеки</Link>
          <a href="#promo" className="hover:text-white">Акції</a>
          <a href="#delivery" className="hover:text-white">Доставка</a>
          <a href="#contacts" className="hover:text-white">Контакти</a>
        </nav>

        <Link href="/cart" className="rounded-full bg-candy px-4 py-2 text-sm font-semibold">
          Кошик
        </Link>
      </div>
    </header>
  )
}
