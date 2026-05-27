type SectionCardProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function SectionCard({ title, eyebrow, children, action }: SectionCardProps) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-teal-700">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
