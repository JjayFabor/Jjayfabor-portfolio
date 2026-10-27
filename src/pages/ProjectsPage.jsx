import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import LightSwitch from "../components/LightSwitch";
import BrandLockup from "../components/BrandLockup";
import { projectsData, categories } from "../data/projects";

const PAGE_SIZE = 10;

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Projects — Jjay Fabor";
  }, []);

  // Read filter + page from the URL. Guard against hand-edited values.
  const rawCategory = searchParams.get("category") || "All";
  const selectedCategory = categories.includes(rawCategory) ? rawCategory : "All";

  const filtered = useMemo(
    () =>
      selectedCategory === "All"
        ? projectsData
        : projectsData.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const parsedPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Math.min(
    Math.max(1, Number.isNaN(parsedPage) ? 1 : parsedPage),
    totalPages
  );

  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  // Write clean query params: omit `category` when "All", omit `page` when 1.
  const setParams = (category, page) => {
    const params = {};
    if (category && category !== "All") params.category = category;
    if (page && page > 1) params.page = String(page);
    setSearchParams(params);
  };

  const handleCategory = (category) => setParams(category, 1); // reset to page 1
  const goToPage = (page) => setParams(selectedCategory, page);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Header — the back arrow + brand together link home; theme toggle on the right. */}
      <header className="bg-brand-bg border-b border-brand-border">
        <div className="page-shell py-5 flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label="Back to home"
            className="group inline-flex items-center gap-3 text-brand-text"
          >
            <ArrowLeft className="h-4 w-4 text-brand-accent transition-transform group-hover:-translate-x-0.5" />
            <BrandLockup />
          </Link>
          <LightSwitch />
        </div>
      </header>

      <main className="page-shell py-8 md:py-10 flex-grow">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-text">
            Projects
          </h1>
          <p className="mt-2 text-sm text-brand-muted">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                ${
                  selectedCategory === category
                    ? "bg-brand-accent text-brand-bg"
                    : "bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent/60 hover:text-brand-accent"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {visible.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {visible.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            {/* Pagination — only when a filter spills past one page */}
            {totalPages > 1 && (
              <nav
                aria-label="Projects pagination"
                className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className="text-sm text-brand-muted">
                  Showing {start + 1}&ndash;{start + visible.length} of{" "}
                  {filtered.length}
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent/60 hover:text-brand-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-brand-border disabled:hover:text-brand-text"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                      className={`inline-flex items-center justify-center h-9 min-w-9 px-3 rounded-md text-sm font-medium transition-colors
                        ${
                          page === currentPage
                            ? "bg-brand-accent text-brand-bg"
                            : "bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent/60 hover:text-brand-accent"
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent/60 hover:text-brand-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-brand-border disabled:hover:text-brand-text"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-brand-text/85 font-medium">
              No projects in this category yet.
            </p>
            <button
              onClick={() => handleCategory("All")}
              className="mt-4 px-4 py-2 rounded-md text-sm font-medium bg-brand-accent text-brand-bg hover:bg-brand-accent-hover transition-colors"
            >
              View all projects
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
