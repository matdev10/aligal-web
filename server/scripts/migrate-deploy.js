import { spawnSync } from "node:child_process";
import { exit } from "node:process";

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
  console.log(`\n[Prisma] Intento ${attempt}/${MAX_RETRIES}`);

  const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status === 0) {
    console.log("[Prisma] Migraciones aplicadas correctamente.");
    exit(0);
  }

  if (attempt < MAX_RETRIES) {
    console.log(
      `[Prisma] Falló el intento ${attempt}. PostgreSQL podría estar iniciando. Reintentando en ${RETRY_DELAY_MS / 1000}s...`,
    );

    await sleep(RETRY_DELAY_MS);
  }
}

console.error(
  `[Prisma] No fue posible ejecutar las migraciones después de ${MAX_RETRIES} intentos.`,
);

exit(1);
