import type { CodeFirstTeam } from '@/lib/code-first-teams'
import { codeFirstTeams } from '@/lib/code-first-teams'

function TeamLogo({ team }: { team: CodeFirstTeam }) {
  return (
    <span className="flex items-center gap-2 opacity-60 grayscale transition-opacity hover:opacity-100">
      <img src={team.logoPath} alt="" aria-hidden="true" className="size-6" />
      <span className="font-logo text-lg font-semibold tracking-tight text-neutral-800">
        {team.name}
      </span>
    </span>
  )
}

/** Landing-page proof strip: logos only. */
export function CodeFirstTeamsStrip() {
  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm text-neutral-500">
          Teams already running their content as code
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {codeFirstTeams.map((team) => (
            <li key={team.name}>
              <TeamLogo team={team} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Manifesto version: the same logos, each linking to its public source. */
export function CodeFirstTeamsList() {
  return (
    <div className="not-prose my-10">
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-5">
        {codeFirstTeams.map((team) => (
          <li key={team.name}>
            <a href={team.sourceUrl} target="_blank" rel="noreferrer">
              <TeamLogo team={team} />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-neutral-400">
        Each logo links to its public source.
      </p>
    </div>
  )
}
