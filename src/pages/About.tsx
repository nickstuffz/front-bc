export function About() {
  return (
    <div className="content mb-4 flex max-w-[1400px] flex-1 flex-col gap-4 border-r p-2">
      <h1 className="w-4/5 rounded-br-lg border-r border-b pb-3 pl-1">About</h1>
      <div className="flex flex-col items-start gap-4">
        <p>
          <b className="font-bold text-nowrap">Hi there!</b> I hope you find use
          in this component compatibility website. I'm a bicycle mechanic and I
          know that confirming compatibility or determining options is an ever
          present task. Pulling up and digging through the Shimano PDF every
          time is a pain, so I created BikePartZ.
        </p>
        <p>
          Currently, only compatibility of Rear Drivetrain, Front Drivetrain,
          and Brake System groups from one of Shimano's recent products
          compatibility information PDF are supported. <em>Sorry!</em> Continue
          to rely on your local bike nerds for your niche combinations.
        </p>
        <p>BikePartZ may expand component coverage in the future.</p>
      </div>
      <h2>Tech</h2>
      <div className="flex flex-col items-start gap-4">
        <div className="bg-secondary text-secondary-foreground relative right-2 flex flex-wrap items-start gap-2 rounded-r-lg p-4 md:right-4 md:pl-6">
          <div className="flex gap-2">
            <img src="src/assets/TypeScript.svg" className="size-4" />
            <small>TypeScript</small>
            <small>|</small>
          </div>

          <div className="flex gap-2">
            <img src="src/assets/React.svg" className="size-4" />
            <small>React</small>
          </div>
          <small>|</small>
          <div className="flex gap-2">
            <img src="src/assets/Express.svg" className="size-4" />
            <small>Express</small>
            <small>|</small>
          </div>
          <div className="flex gap-2">
            <img src="src/assets/PostgreSQL.svg" className="size-4" />
            <small>PostgreSQL</small>
          </div>
        </div>
      </div>
      <h2>Contact</h2>
      <div className="flex flex-col items-start gap-4">
        <p>@stuffz </p>
      </div>
    </div>
  );
}
