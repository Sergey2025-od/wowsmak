import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-4xl font-black leading-tight md:text-5xl">
          Смакуй • Дивуй • Ділись
        </h1>
        <p className="mt-3 max-w-2xl text-white/70">
          WowSmak — солодощі та снеки з доставкою. Обирай напрямок — і сайт підкаже найближчий день доставки.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/catalog" className="rounded-full bg-candy px-5 py-2 font-semibold">
            До каталогу
          </Link>
          <Link href="/checkout" className="rounded-full border border-white/20 px-5 py-2 font-semibold">
            Оформити
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Категорії</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Цукерки','Жуйка','Спреї','Маршмелоу','Напої','Снеки'].map((c) => (
            <Link
              key={c}
              href={`/catalog?cat=${encodeURIComponent(c)}`}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
