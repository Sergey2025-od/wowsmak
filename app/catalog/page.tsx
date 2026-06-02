import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabaseClient'

export const revalidate = 60

export default async function CatalogPage({
	searchParams,
}: {
	searchParams?: { cat?: string }
}) {
	const cat = searchParams?.cat

	let q = supabase
		.from('products')
		.select('id,title_ua,slug,category_ua,is_active,product_media(url,sort)')
		.eq('is_active', true)
		.order('created_at', { ascending: false })

	if (cat) q = q.eq('category_ua', cat)

	const { data, error } = await q

	return (
		<div>
			<h1 className="text-2xl font-black">Каталог</h1>
			{cat && <p className="mt-1 text-white/60">Категорія: {cat}</p>}

			{error && <p className="mt-4 text-red-300">Помилка: {error.message}</p>}

			<div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
				{(data ?? []).map((p: any) => {
					const media = (p.product_media ?? []).sort(
						(a: any, b: any) => (a.sort ?? 0) - (b.sort ?? 0),
					)
					const img = media?.[0]?.url ?? null
					return (
						<ProductCard
							key={p.id}
							slug={p.slug}
							title={p.title_ua}
							price={0}
							imageUrl={img}
							badge={null}
						/>
					)
				})}
			</div>

			<p className="mt-8 text-sm text-white/50">
				* Ціни/варіанти підключимо далі через <b>product_variants</b>.
			</p>
		</div>
	)
}
