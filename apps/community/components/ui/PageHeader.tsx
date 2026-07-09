type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-[clamp(1.8rem,3vw,2.5rem)] font-black text-[#2f2418]">
        {title}
      </h1>
      <p className="mt-1 font-bold text-[#7a5635]">{description}</p>
    </div>
  );
}