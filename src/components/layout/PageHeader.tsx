interface PageHeaderProps {
  kicker: string;
  title: string;
  description?: string;
}

export default function PageHeader({ kicker, title, description }: PageHeaderProps) {
  return (
    <section className="bg-navy py-14 text-white md:py-20">
      <div className="container-site">
        <span className="section-kicker text-gold-300">{kicker}</span>
        <h1 className="font-display text-3xl font-extrabold md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-navy-100">{description}</p>
        )}
      </div>
    </section>
  );
}
