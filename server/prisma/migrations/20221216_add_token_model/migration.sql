CREATE TABLE "Token" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "userId" INTEGER NOT NULL,
     "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "blocked" BOOLEAN NOT NULL DEFAULT false,
     CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
