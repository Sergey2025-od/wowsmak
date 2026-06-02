-- WowSmak schema (MVP)
-- Run in Supabase SQL editor (or via CLI psql).

-- Extensions
create extension if not exists pgcrypto;

-- 1) Brands
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name_ua text not null,
  name_en text,
  created_at timestamptz default now()
);

-- 2) Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete set null,
  title_ua text not null,
  title_en text,
  slug text unique not null,
  description_ua text,
  description_en text,
  category_ua text,
  subcategory_ua text,
  tags jsonb default '[]'::jsonb,
  is_active boolean default true,
  created_at timestamptz default now()
);
create index if not exists idx_products_brand on products(brand_id);
create index if not exists idx_products_category on products(category_ua, subcategory_ua);

-- 3) Product media (gallery: images/videos)
create table if not exists product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  kind text not null check (kind in ('image','video')),
  url text not null,
  sort int default 0,
  created_at timestamptz default now()
);
create index if not exists idx_product_media_product on product_media(product_id, sort);

-- 4) Variants (portion/packaging)
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sku text,
  flavor_ua text,
  flavor_en text,
  sell_type text not null check (sell_type in ('pack','weight')),
  portion_label_ua text not null, -- e.g. '1 уп.' / '500 г' / '1 кг'
  portion_grams int,             -- for weight variants
  qty_in_pack int,               -- for pack variants
  price_uah numeric(10,2) not null,
  old_price_uah numeric(10,2),
  cost_uah numeric(10,2),
  in_stock boolean default true,
  stock_qty numeric(12,3),       -- optional quantity mode
  created_at timestamptz default now()
);
create index if not exists idx_variants_product on product_variants(product_id);

-- 5) Routes (direction + available days)
create table if not exists routes (
  id uuid primary key default gen_random_uuid(),
  direction_ua text not null,
  days_of_week int[] not null, -- 1=Mon ... 7=Sun
  min_order_uah numeric(10,2),
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 6) Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity,
  customer_phone text,
  customer_name text,
  telegram_chat_id bigint,

  status text not null default 'accepted' check (status in ('accepted','packing','shipped','delivered','canceled')),
  cancel_reason text,

  payment_method text not null check (payment_method in ('prepay','cod')),
  is_paid boolean default false,
  payment_proof_url text,

  delivery_type text not null check (delivery_type in ('nova_poshta','ukrposhta','route')),
  delivery_city text,
  delivery_address text,
  delivery_branch text,
  delivery_post_index text,

  route_direction_ua text,
  route_delivery_day date,

  tracking_number text,

  manager_comment text,
  created_at timestamptz default now()
);
create index if not exists idx_orders_number on orders(order_number);
create index if not exists idx_orders_status on orders(status);

-- 7) Order items
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  variant_id uuid references product_variants(id) on delete set null,
  title_snapshot text,
  portion_snapshot text,
  unit_price_uah numeric(10,2) not null,
  qty numeric(12,3) not null default 1,
  line_total_uah numeric(10,2) generated always as (unit_price_uah * qty) stored
);
create index if not exists idx_order_items_order on order_items(order_id);

-- 8) Reviews (only after purchase, enforced in app logic)
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  order_id uuid references orders(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  text text,
  media jsonb default '[]'::jsonb, -- array of {kind,url}
  created_at timestamptz default now()
);
create index if not exists idx_reviews_product on reviews(product_id);

-- NOTE: RLS policies are not fully defined here yet.
-- For MVP, you can keep RLS off, or we add strict RLS next step.
