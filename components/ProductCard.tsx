'use client'

import Link from 'next/link'

type Props = {
	slug: string
	title: string
	price: number
	imageUrl?: string | null
	badge?: string | null
}

export default function ProductCard({
	slug,
	title,
	price,
	imageUrl,
	badge,
}: Props) {
	return (
		<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
			{badge && (
				<div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs text-white/80">
					{badge}
				</div>
			)}
			<Link href={`/product/${slug}`} className="block">
				<div className="aspect-square w-full overflow-hidden rounded-2xl bg-black/30">
					{imageUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={imageUrl} alt={title} className="h-full w-full object-cover" />
					) : (
						<div className="flex h-full w-full items-center justify-center text-white/30">
							No image
						</div>
					)}
				</div>
				<div className="mt-3 space-y-1">
					<div className="line-clamp-2 text-sm font-semibold">{title}</div>
					<div className="text-lg font-black text-candy">{price} ₴</div>
				</div>
			</Link>
			<button className="mt-3 w-full rounded-full bg-candy px-4 py-2 text-sm font-semibold">
				У кошик
			</button>
		</div>
	)
}
