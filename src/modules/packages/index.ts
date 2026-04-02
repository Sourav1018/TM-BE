import { PackagesController } from "@/modules/packages/packages.controller";
import { PrismaPackagesRepository } from "@/modules/packages/packages.repository";
import { createPackagesRouter } from "@/modules/packages/packages.routes";
import { PackagesUseCase } from "@/modules/packages/packages.usecase";

const packagesRepository = new PrismaPackagesRepository();
const packagesUseCase = new PackagesUseCase(packagesRepository);
const packagesController = new PackagesController(packagesUseCase);

export const packagesRouter = createPackagesRouter(packagesController);
