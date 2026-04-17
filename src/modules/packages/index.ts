import { PackagesController } from "@/modules/packages/controllers/packages.controller";
import { PackagesFacade } from "@/modules/packages/application/packages.facade";
import { PrismaPackagesRepository } from "@/modules/packages/repositories/packages.repository";
import { PackagesRoutes } from "@/modules/packages/routes/packages.routes";
import { CreatePackageUseCase } from "@/modules/packages/usecases/create-package.usecase";
import { UpdatePackageUseCase } from "@/modules/packages/usecases/update-package.usecase";

const packagesRepository = new PrismaPackagesRepository();
const createPackageUseCase = new CreatePackageUseCase(packagesRepository);
const updatePackageUseCase = new UpdatePackageUseCase(packagesRepository);
const packagesFacade = new PackagesFacade(createPackageUseCase, updatePackageUseCase);
const packagesController = new PackagesController(packagesFacade);
const packagesRoutes = new PackagesRoutes(packagesController);

export const packagesRouter = packagesRoutes.getRouter();
