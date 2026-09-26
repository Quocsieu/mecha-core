function CategoryCard({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn-secondary flex h-20 w-full items-center justify-center rounded-xl border border-border transition hover:-translate-y-1 hover:border-primary hover:shadow-mecha"
    >
      <div className="flex items-center gap-3">
        <i className={`${icon} text-lg text-primary`}></i>

        <h4 className="text-sm font-bold text-foreground">
          {title}
        </h4>
      </div>
    </button>
  );
}

export default CategoryCard;