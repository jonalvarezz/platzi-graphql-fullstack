-- CreateTable
CREATE TABLE "Avocado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "shape" TEXT,
    "hardiness" TEXT,
    "taste" TEXT,
    "avocadoId" INTEGER NOT NULL,
    CONSTRAINT "Attributes_avocadoId_fkey" FOREIGN KEY ("avocadoId") REFERENCES "Avocado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Avocado_sku_key" ON "Avocado"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Attributes_avocadoId_unique" ON "Attributes"("avocadoId");
