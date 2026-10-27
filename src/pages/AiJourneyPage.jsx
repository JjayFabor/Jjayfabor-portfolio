import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import BrandLockup from "../components/BrandLockup";
import Footer from "../components/Footer";
import JourneyRoadmap from "../components/JourneyRoadmap";
import JourneyWeekCard from "../components/JourneyWeekCard";
import LightSwitch from "../components/LightSwitch";
import {
  aiRoadmap,
  activeWeek,
  completedWeekCount,
  journeyWeeks,
  latestCompletedWeek,
  roadmapStages,
} from "../data/aiJourney";

const AiJourneyPage = () => {
  useEffect(() => {
    document.title = "AI Engineering Journey — Jjay Fabor";
  }, []);

  const progressPercent = Math.round(
    (completedWeekCount / aiRoadmap.totalWeeks) * 100,
  );

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg">
      <header className="border-b border-brand-border bg-brand-bg">
        <div className="page-shell py-5 flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label="Back to home"
            className="group inline-flex items-center gap-3 rounded-md text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-brand-bg"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 text-brand-accent transition-transform group-hover:-translate-x-0.5"
            />
            <BrandLockup />
          </Link>
          <LightSwitch />
        </div>
      </header>

      <main className="page-shell flex-grow py-8 md:py-14">
        <header className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-accent">
            {aiRoadmap.title}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-text md:text-4xl">
            Building toward AI Engineering
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
            {aiRoadmap.introduction}
          </p>
        </header>

        <section
          aria-labelledby="journey-progress-heading"
          className="mt-7 overflow-hidden rounded-lg border border-brand-border bg-brand-surface md:mt-8"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
            <div className="border-b border-brand-border px-5 py-4 sm:px-6 sm:py-6 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-brand-muted">
                Roadmap structure
              </p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-x-5 gap-y-2">
                <div>
                  <h2
                    id="journey-progress-heading"
                    className="text-xl font-semibold tracking-tight text-brand-text"
                  >
                    {aiRoadmap.totalWeeks}-week project-based roadmap
                  </h2>
                  <p className="mt-1 text-sm text-brand-muted">
                    Week {completedWeekCount} of {aiRoadmap.totalWeeks} completed
                  </p>
                </div>
                <span className="font-mono text-sm text-brand-accent" aria-hidden="true">
                  {progressPercent}%
                </span>
              </div>
              <div
                className="mt-5 h-2 overflow-hidden rounded-sm bg-brand-border"
                role="progressbar"
                aria-label="AI Engineering roadmap progress"
                aria-valuemin="0"
                aria-valuemax={aiRoadmap.totalWeeks}
                aria-valuenow={completedWeekCount}
                aria-valuetext={`${completedWeekCount} of ${aiRoadmap.totalWeeks} weeks completed`}
              >
                <div
                  className="h-full bg-brand-accent"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {latestCompletedWeek?.project && (
              <div className="px-5 py-4 sm:px-6 sm:py-6">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-brand-accent">
                  Latest completed capstone
                </p>
                <h3 className="mt-2 text-lg font-semibold text-brand-text">
                  {latestCompletedWeek.project.name}
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Week {latestCompletedWeek.week} · Completed project
                </p>
                {latestCompletedWeek.project.projectUrl && (
                  <Link
                    to={latestCompletedWeek.project.projectUrl}
                    aria-label={`View the ${latestCompletedWeek.project.name} project details`}
                    className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand-accent px-4 text-sm font-medium text-brand-bg transition-colors hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface sm:mt-4"
                  >
                    View project
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
                {latestCompletedWeek.project.github && (
                  <a
                    href={latestCompletedWeek.project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${latestCompletedWeek.project.name} source code on GitHub`}
                    className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand-accent px-4 text-sm font-medium text-brand-bg transition-colors hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface sm:mt-4"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View GitHub repository
                  </a>
                )}
              </div>
            )}
          </div>

          {latestCompletedWeek && activeWeek && (
            <div className="border-t border-brand-border bg-brand-bg/40 px-5 py-3.5 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:px-6">
              <p className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-brand-muted">
                Active progression
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-text sm:mt-0 sm:justify-end">
                <span>Week {latestCompletedWeek.week} shipped</span>
                <ArrowRight className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
                <span>
                  Week {activeWeek.week} · {activeWeek.title} · In progress
                </span>
              </p>
            </div>
          )}
        </section>

        <section aria-labelledby="weekly-progress-heading" className="mt-10 md:mt-12">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-accent">
              Field log
            </p>
            <h2 id="weekly-progress-heading" className="mt-2 text-2xl font-bold tracking-tight text-brand-text">
              Weekly progress
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              Shipped capstones and current work provide a verifiable record of progress through the roadmap.
            </p>
          </div>

          <ol
            className="relative mt-6 space-y-5 border-l border-brand-border pl-5 sm:pl-7"
            aria-label="Weekly AI Engineering progress"
          >
            {journeyWeeks.map((week) => (
              <li key={week.week} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[1.4375rem] top-6 h-2.5 w-2.5 rounded-full border-2 sm:-left-[1.9375rem] ${
                    week.status === "completed"
                      ? "border-brand-accent bg-brand-accent"
                      : "border-brand-accent bg-brand-surface"
                  }`}
                />
                <JourneyWeekCard week={week} />
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="roadmap-heading" className="mt-12 md:mt-14">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-accent">
              Overall roadmap
            </p>
            <h2 id="roadmap-heading" className="mt-2 text-2xl font-bold tracking-tight text-brand-text">
              From foundations to production
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              Ten focused stages connect the core engineering skills behind dependable AI products.
            </p>
          </div>
          <div className="mt-6 rounded-lg border border-brand-border bg-brand-surface px-5 py-6 sm:px-6">
            <JourneyRoadmap stages={roadmapStages} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AiJourneyPage;
