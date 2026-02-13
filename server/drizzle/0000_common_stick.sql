CREATE TYPE "public"."run_type" AS ENUM('outdoor', 'treadmill');--> statement-breakpoint
CREATE TABLE "shoes" (
	"shoe_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"brand" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"purchase_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "runs" (
	"run_id" uuid PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"distance" numeric(10, 2) NOT NULL,
	"notes" text,
	"shoe_id" uuid NOT NULL,
	"run_type" "run_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "runs" ADD CONSTRAINT "runs_shoe_id_shoes_shoe_id_fk" FOREIGN KEY ("shoe_id") REFERENCES "public"."shoes"("shoe_id") ON DELETE no action ON UPDATE no action;