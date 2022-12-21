-- DropIndex
DROP INDEX `Producto_categoriaId_fkey` ON `producto`;

-- AlterTable
ALTER TABLE `orden` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
