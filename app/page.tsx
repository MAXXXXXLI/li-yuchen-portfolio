import { projects } from "./project-data";
import { sitePath } from "./site-path";

export default function Home() {
  return (
    <main className="portfolio-shell" id="home">
      <div className="ambient-glow" aria-hidden="true" />

      <header className="topbar">
        <a className="home-link" href="#home">
          HOME
        </a>
        <nav className="topbar-nav" aria-label="主页导航">
          <a href="#work">Research</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="masthead" id="about" aria-labelledby="profile-name">
        <div className="profile-mark" aria-label="李昱辰头像占位符">
          <span>LYC</span>
        </div>
        <div className="masthead-text">
          <h1 id="profile-name">李昱辰</h1>
          <p className="english-name">Yuchen Li</p>
          <p className="profile-intro">
            你好，我是李昱辰，西安交通大学人工智能学院硕士研究生，预计于 2028 年毕业。
            我的研究聚焦生成模型，主要关注 Diffusion、Flow Matching、可控生成与 AIGC，
            并探索这些方法在真实视觉任务中的应用。
          </p>
          <p className="research-line">
            <span>Research Interests</span>
            Diffusion Models · Flow Matching · Controllable Generation · AIGC
          </p>
        </div>
      </section>

      <section className="home-block" id="work" aria-labelledby="work-heading">
        <div className="block-heading">
          <h2 id="work-heading">Research Projects</h2>
          <span>Selected work</span>
        </div>
        <ul className="publication-list">
          {projects.map((project) => (
            <li className="publication-card" key={project.slug}>
              <a className="publication-thumb" href={sitePath(`/work/${project.slug}`)}>
                <img src={sitePath(project.heroImage)} alt={project.heroAlt} />
              </a>
              <div className="publication-body">
                <p className="publication-method">{project.method}</p>
                <h3>
                  <a href={sitePath(`/work/${project.slug}`)}>
                    {project.title}: {project.subtitle}
                  </a>
                </h3>
                <p className="publication-summary">{project.summary}</p>
                <ul className="keyword-list" aria-label={`${project.title} 关键词`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <p className="publication-links">
                  <a href={sitePath(`/work/${project.slug}`)}>Project page</a>
                  <span aria-hidden="true"> · </span>
                  <a href={sitePath(`/work/${project.slug}#方法`)}>Method</a>
                  <span aria-hidden="true"> · </span>
                  <a href={sitePath(`/work/${project.slug}#实验`)}>Experiments</a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-block contact-block" id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">About</h2>
        <div className="about-row">
          <p>
            目前就读于西安交通大学人工智能学院。研究兴趣集中在生成模型的结构保持、区域控制、
            真实数据稀缺与下游感知价值。
          </p>
          <dl>
            <div>
              <dt>Degree</dt>
              <dd>硕士研究生</dd>
            </div>
            <div>
              <dt>Graduation</dt>
              <dd>2028</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>西安，中国</dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="site-foot">
        <span>© 2026 李昱辰</span>
        <span>Xi&apos;an Jiaotong University · School of AI</span>
      </footer>
    </main>
  );
}
