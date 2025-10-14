-- CreateEnum
CREATE TYPE "CommitmentType" AS ENUM ('STAKE', 'POOL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalCommitments" INTEGER NOT NULL DEFAULT 0,
    "completedCommitments" INTEGER NOT NULL DEFAULT 0,
    "failedCommitments" INTEGER NOT NULL DEFAULT 0,
    "successRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commitments" (
    "id" TEXT NOT NULL,
    "pdaAddress" TEXT NOT NULL,
    "txSignature" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stakeAmount" DOUBLE PRECISION NOT NULL,
    "type" "CommitmentType" NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "isFulfilled" BOOLEAN NOT NULL DEFAULT false,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "friends" JSONB,
    "category" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fulfilledAt" TIMESTAMP(3),
    "claimedAt" TIMESTAMP(3),

    CONSTRAINT "commitments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "users"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "commitments_pdaAddress_key" ON "commitments"("pdaAddress");

-- CreateIndex
CREATE UNIQUE INDEX "commitments_txSignature_key" ON "commitments"("txSignature");

-- CreateIndex
CREATE INDEX "commitments_userId_idx" ON "commitments"("userId");

-- CreateIndex
CREATE INDEX "commitments_deadline_idx" ON "commitments"("deadline");

-- CreateIndex
CREATE INDEX "commitments_isFulfilled_idx" ON "commitments"("isFulfilled");

-- CreateIndex
CREATE INDEX "commitments_type_idx" ON "commitments"("type");

-- AddForeignKey
ALTER TABLE "commitments" ADD CONSTRAINT "commitments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
