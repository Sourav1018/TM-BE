import { PackagesController } from "@/modules/packages/packages.controller";
import { PackagesFacade } from "@/modules/packages/packages.facade";
import { PrismaPackagesRepository } from "@/modules/packages/packages.repository";
import { PackagesRoutes } from "@/modules/packages/packages.routes";
import { CreatePackageUseCase } from "@/modules/packages/usecases/create-package.usecase";

const packagesRepository = new PrismaPackagesRepository();
const createPackageUseCase = new CreatePackageUseCase(packagesRepository);
const packagesFacade = new PackagesFacade(createPackageUseCase);
const packagesController = new PackagesController(packagesFacade);
const packagesRoutes = new PackagesRoutes(packagesController);

export const packagesRouter = packagesRoutes.getRouter();
