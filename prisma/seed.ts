import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash("Admin123!", 10);
  await prisma.user.upsert({
    where: { email: "admin@factu.local" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@factu.local",
      password: adminPass,
      role: "ADMIN",
    },
  });

  const tipos = [
    "Destapación de Cocina",
    "Destapación de Baño",
    "Destapación de Inodoro",
    "Lavadero",
    "Pluvial",
    "Cloaca (tramo largo)",
    "Columna de edificio (desde X hasta Y)",
    "Cloaca planta baja",
  ];
  for (const t of tipos) {
    await prisma.jobType.upsert({
      where: { nombre: t },
      update: {},
      create: { nombre: t },
    });
  }
}

main().finally(() => prisma.$disconnect());
