const pad = (n: number) => String(n).padStart(2, "0");
const asDate = (v: unknown): Date | undefined => {
  if (!v) return undefined;
  if (v instanceof Date) return isNaN(v.getTime()) ? undefined : v;
  const d = new Date(v as any);
  return isNaN(d.getTime()) ? undefined : d;
};

const toDateStr = (v?: unknown) => {
  const d = asDate(v);
  return d
    ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    : "";
};

export default { toDateStr };
