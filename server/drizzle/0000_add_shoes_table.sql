CREATE TABLE "shoes" (
	"shoe_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"brand" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"purchase_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
