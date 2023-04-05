DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('looking for teams', 'full', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "tournaments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"address_line_one" varchar(256) NOT NULL,
	"address_line_two" varchar(256) NOT NULL,
	"address_post_code" varchar(256) NOT NULL,
	"address_city" varchar(256) NOT NULL,
	"status" status DEFAULT 'looking for teams' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
