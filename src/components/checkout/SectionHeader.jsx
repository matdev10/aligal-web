import { eyebrow } from "../ui/glass";

// Encabezado común de cada bloque del checkout (icono + paso + título)
function SectionHeader({ step, label, title, text, Icon }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <span className={eyebrow}>
          Paso {step} · {label}
        </span>
        <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
        <p className="mt-0.5 text-xs font-light text-ink/55">{text}</p>
      </div>
    </div>
  );
}

export default SectionHeader;
