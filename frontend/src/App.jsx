import { useEffect, useState } from "react";
import { profile, skills, education, certificates } from "./data.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [dbError, setDbError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not load projects");
        setProjects(data);
      })
      .catch(error => setDbError(error.message));
  }, []);

  async function submitContact(event) {
    event.preventDefault();
    setFormStatus("Sending...");
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Message could not be sent");
      setFormStatus(data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus(error.message);
    }
  }

  const navItems = ["About", "Skills", "Projects", "Education", "Contact"];

  return (
    <>
      <header className="header">
        <a className="logo" href="#home"><span>SA</span> SASI ANANTH</a>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="heroText">
            <p className="eyebrow">COMPUTER SCIENCE & ENGINEERING</p>
            <p className="hello">Hello, I'm</p>
            <h1>{profile.name}<br /><span>{profile.role}</span></h1>
            <p className="intro">{profile.intro}</p>
            <div className="buttons">
              <a className="button primary" href="#projects">Explore Projects ↗</a>
              <a className="button secondary" href="#contact">Contact Me</a>
            </div>
            <div className="social">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={`mailto:${profile.email}`}>Email ↗</a>
            </div>
          </div>
          <div className="heroVisual"><div className="ring ring1"></div><div className="ring ring2"></div><div className="monogram">SA</div><div className="floating">Building • Learning • Growing</div></div>
        </section>

        <section className="section" id="about">
          <p className="label">01 / ABOUT ME</p>
          <div><h2>Curious by nature.<br /><span>Driven to build.</span></h2><p className="bodyText">{profile.about}</p><p className="location">⌖ {profile.location}</p></div>
        </section>

        <section className="section" id="skills">
          <p className="label">02 / SKILLS</p>
          <div><h2>My technical <span>toolkit.</span></h2><p className="muted">Technologies I have learned or am currently exploring. Update this list to reflect your actual skills.</p><div className="skillGrid">{skills.map((skill, index) => <div className="skill" key={skill}><small>{String(index + 1).padStart(2, "0")}</small>{skill}</div>)}</div></div>
        </section>

        <section className="section" id="projects">
          <p className="label">03 / PROJECTS</p>
          <div><h2>Selected <span>work.</span></h2><p className="muted">Project details are retrieved from the backend API and MongoDB database.</p>
            {dbError && <p className="notice">Project API status: {dbError}. Start the backend and configure MongoDB to load database projects.</p>}
            <div className="projectGrid">{projects.map((project, index) => <article className="project" key={project._id || project.title}><div className="projectNo">PROJECT / {String(index + 1).padStart(2, "0")}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{(project.technologies || []).map(tech => <span key={tech}>{tech}</span>)}</div>{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}</article>)}</div>
          </div>
        </section>

        <section className="section" id="education">
          <p className="label">04 / EDUCATION</p>
          <div><h2>Education & <span>learning.</span></h2><div className="timeline">{education.map(item => <article key={item.course}><small>{item.period}</small><h3>{item.course}</h3><p>{item.institution}</p><p className="muted">{item.detail}</p></article>)}</div><h3 className="subheading">Certifications</h3><div className="certs">{certificates.map(item => <span key={item}>✦ {item}</span>)}</div></div>
        </section>

        <section className="section contactSection" id="contact">
          <p className="label">05 / CONTACT</p>
          <div className="contactGrid"><div><h2>Let's connect<span>.</span></h2><p className="bodyText">Have an opportunity, idea or project to discuss? Send me a message.</p><a className="email" href={`mailto:${profile.email}`}>{profile.email} ↗</a></div>
            <form onSubmit={submitContact}>
              <label>Name<input required maxLength="80" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
              <label>Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
              <label>Message<textarea required maxLength="2000" rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Write your message..." /></label>
              <button className="button primary" type="submit">Send Message ↗</button>
              {formStatus && <p className="formStatus" role="status">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>
      <footer><span>© {new Date().getFullYear()} {profile.name}</span><span>Built with React, Express & MongoDB</span><a href="#home">Back to top ↑</a></footer>
    </>
  );
}
