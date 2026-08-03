-- CreateTable
CREATE TABLE "NewsletterBroadcast" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "recipientCount" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterBroadcast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterBroadcast_slug_key" ON "NewsletterBroadcast"("slug");
