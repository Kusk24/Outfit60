export function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <>
      <h1 className="text-[30px] font-extrabold tracking-[-0.5px]">{title}</h1>
      <p className="mt-1.5 text-[14px] text-muted">{sub}</p>
    </>
  );
}
