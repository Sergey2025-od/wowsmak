import { supabase } from '../../../lib/supabaseClient'

export default async function ProductPage({ params }: { params: { slug: string } }) {
	const { data: product, error } = await supabase
		.from('products')
		.select('id,title_ua,description_ua,product_media(url,sort)')
		.eq('slug', params.slug)
		.single()

	if (error || !product) return <p>Товар не знайдено.</p>

	const media = (product.product_media ?? []).sort(
		(a: any, b: any) => (a.sort ?? 0) - (b.sort ?? 0),
	)
	const img = media?.[0]?.url ?? null

	return (
		<div className="grid gap-8 md:grid-cols-2">
			<div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
				{img ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={img} alt={product.title_ua} className="h-full w-full object-cover" />
				) : (
					<div className="flex aspect-square items-center justify-center text-white/30">
						No image
					</div>
				)}
			</div>
			<div>
				<h1 className="text-3xl font-black">{product.title_ua}</h1>
				{product.description_ua && <p className="mt-3 text-white/70">{product.description_ua}</p>}

				<div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
					Варіанти (фасовки/вкуси) підключимо наступним кроком через таблицю{' '}
					<b>product_variants</b>.
				</div>
			</div>
		</div>
	)
}
