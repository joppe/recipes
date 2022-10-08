create table if not exists chefs (
	id uuid default gen_random_uuid() primary key,
	media_id uuid,
	"name" text not null,
	"skill" int not null,
    constraint fk_media foreign key(media_id) references media(id)
)

create table if not exists media (
	id uuid default gen_random_uuid() primary key,
	"title" text not null,
	"type" text not null,
	"url" text not null
)

create table if not exists meals (
	id uuid default gen_random_uuid() primary key,
	recipe_id uuid not null,
	chef_id uuid,
	"date" date not null,
	"score" int,
	constraint fk_recipe foreign key(recipe_id) references recipes(id),
	constraint fk_chef foreign key(chef_id) references chefs(id)
)

create table if not exists recipes (
    id uuid default gen_random_uuid() primary key,
	media_id uuid,
    "name" text not null,
    "type" text,
    "preparation_time" int,
    "cooking_time" int,
    "difficulty" int,
    "course" text,
    "servings" int,
    "source" text,
    constraint fk_media foreign key(media_id) references media(id)
)

create table if not exists units (
	id uuid default gen_random_uuid() primary key,
	"name" text not null,
	"abbreviation" text
)

create table if not exists products (
	id uuid default gen_random_uuid() primary key,
    media_id uuid,
	"name" text not null,
	"description" text,
	constraint fk_media foreign key(media_id) references media(id)
)

create table if not exists instructions (
	id uuid default gen_random_uuid() primary key,
	recipe_id uuid,
	media_id uuid,
	"order" int not null,
	"text" text not null,
	constraint fk_recipe foreign key(recipe_id) references recipes(id),
	constraint fk_media foreign key(media_id) references media(id)
)

create table if not exists ingredients (
	id uuid default gen_random_uuid() primary key,
	recipe_id uuid not null,
	product_id uuid not null,
	unit_id uuid not null,
	"amount" text,
	"preperation" text,
	constraint fk_recipe foreign key(recipe_id) references recipes(id),
	constraint fk_product foreign key(product_id) references products(id),
	constraint fk_unit foreign key(unit_id) references units(id)
)
