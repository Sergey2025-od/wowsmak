import Link from 'next/link'

export default function AdminHome() {
	return (
		<div>
			<h1 className="text-2xl font-black">Адмінка</h1>
			<div className="mt-4 flex flex-wrap gap-2">
				<Link className="rounded-full border border-white/20 px-4 py-2 text-sm" href="/admin/orders">
					Orders
				</Link>
				<Link className="rounded-full border border-white/20 px-4 py-2 text-sm" href="/admin/products">
					Products
				</Link>
				<Link className="rounded-full border border-white/20 px-4 py-2 text-sm" href="/admin/routes">
					Routes
				</Link>
				<Link className="rounded-full border border-white/20 px-4 py-2 text-sm" href="/admin/brands">
					Brands
				</Link>
			</div>
			<p className="mt-4 text-sm text-white/60">RBAC додамо наступним кроком.</p>
		</div>
	)
}
