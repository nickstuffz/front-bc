export function About() {
  return (
    <div className="content mb-4 flex max-w-[1400px] flex-1 flex-col gap-4 border-r p-2">
      <h2 className="pb-3 pl-1">Story</h2>
      <div className="flex flex-col items-start gap-4">
        <p>
          <b className="font-bold text-nowrap">Hi there!</b> I hope you find use
          in this component compatibility website. I've been a bicycle mechanic
          for many years and confirming compatibility or determining options has
          an ever present task. Pulling up and digging through the Shimano PDF
          every time is a pain, so I created BikePartZ.
        </p>
        <p>
          Currently only compatibility of Rear Drivetrain, Front Drivetrain, and
          Brake System groups from a particular Shimano products compatibility
          information PDF is supported. <em>Sorry!</em> Continue to rely on your
          local bike nerds for your niche combinations.
        </p>
        <p>BikePartZ may expand coverage in the future!</p>
      </div>
      <h2>Tech</h2>
      Much thanks to the technologies used to make this tool a reality.
      <small>React | Express | PostgreSQL</small>
      <small>
        shadcn/ui | TailwindCSS | TanStack Query | Vite | TypeScript
      </small>
      <h2>Feedback</h2>
      <p>
        Please direct feedback or report bugs to ___ Your time is appreciated.
      </p>
      <h2>Contact</h2>
    </div>
  );
}
