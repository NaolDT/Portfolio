import './EngineeringApproach.css';

const steps = [
  { num: '01', title: 'Understand', desc: 'Clarify the problem, users, and requirements before writing any code. Define what success looks like.' },
  { num: '02', title: 'Design',     desc: 'Plan the user interface, data flows, and system boundaries. Identify edge cases early.' },
  { num: '03', title: 'Architect',  desc: 'Design the API contract, database schema, and service layers. Make structural decisions before implementation.' },
  { num: '04', title: 'Build',      desc: 'Implement frontend and backend components with maintainability in mind — clean code, consistent patterns, proper error handling.' },
  { num: '05', title: 'Test',       desc: 'Validate functionality through manual API testing, edge case coverage, and UI interaction testing.' },
  { num: '06', title: 'Deploy',     desc: 'Configure environment variables, build pipelines, and production environments. Ship to real infrastructure.' },
];

function EngineeringApproach() {
  return (
    <section id="engineering">
      <div className="section-label">// 05 — engineering</div>
      <h2 className="section-title">How I build software</h2>
      <p className="section-sub">
        Every project follows a structured development approach — not just writing code,
        but thinking through the full system before and during implementation.
      </p>

      <div className="eng-steps">
        {steps.map((step, i) => (
          <div className="eng-step" key={step.num}>
            <div className="eng-step-left">
              <div className="eng-step-num">{step.num}</div>
              {i < steps.length - 1 && <div className="eng-step-line" />}
            </div>
            <div className="eng-step-content">
              <h3 className="eng-step-title">{step.title}</h3>
              <p className="eng-step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EngineeringApproach;