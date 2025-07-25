-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "github_id" TEXT,
    "avatar" TEXT DEFAULT 'https://i.namu.wiki/i/aO_f1AJViMwOdKsyf1G2IYHIL4lrRfYABPUB0svanQXLqk7qGsyS7gpgCQrQIkz67IrUMwYqVWtbTG4spTM452cyMYbZVkJmcoMyRwLHFCNklLuIVj-rObzYUxnWkx97Br7VMTc8zFKVPtqNCnw4mw.webp',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
