ALTER TABLE "tools" ALTER COLUMN "tool_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "tool_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "tools" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tools" ADD COLUMN "url" text NOT NULL;