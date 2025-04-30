export function Guide() {
  return (
    <div className="content flex flex-1 flex-col gap-4 p-2">
      <div className="flex flex-col">
        <h2>Data</h2>

        <h6>Shimano</h6>
        <p>
          Information is sourced from Shimano's products compatibility
          information PDFs. Shimano release{" "}
        </p>

        <small>
          Only Shimano . Rear Drivetrain, Front Drivetrain, and Brake System
          compatibility are represented
        </small>
      </div>
      <div className="flex flex-col">
        <h2>Codes</h2>
        <h6>Component codes</h6>
      </div>
      <div className="flex flex-col">
        <h2>Disclaimer</h2>
      </div>
    </div>
  );
}
