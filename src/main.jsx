import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import DotGrid from './DotGrid'

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

function App() {
  const [showWechat, setShowWechat] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [copyMessage, setCopyMessage] = useState('')
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const projectScrollPosition = useRef(0)
  const projectIcons = [assetPath('portfolio-assets/icons/03-project-02.png'), assetPath('portfolio-assets/icons/03-project-03.png')]
  const projectData = [
    { title: 'Mobile APP Design', folder: 'mobile', count: 9 },
    { title: 'B-end SaaS Design', folder: 'saas', count: 7 },
    { title: 'Web Official Site Design', folder: 'web', count: 6 },
    { title: 'Operation Visual Design', folder: 'visual', count: 6 },
  ]
  const copy = async (text, label) => {
    await navigator.clipboard?.writeText(text)
    setCopyMessage(`${label} 已复制`)
    window.setTimeout(() => setCopyMessage(''), 1800)
  }
  const openProject = (project) => {
    projectScrollPosition.current = window.scrollY
    setActiveProject(project)
  }
  const closeProject = () => {
    setActiveProject(null)
    window.requestAnimationFrame(() => window.scrollTo({ top: projectScrollPosition.current, behavior: 'auto' }))
  }
  useEffect(() => {
    const syncNavigation = () => {
      setIsNavScrolled(window.scrollY > 24)
      const marker = window.scrollY + window.innerHeight * 0.36
      let current = 'home'
      for (const id of ['home', 'about', 'project', 'contact']) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= marker) current = id
      }
      setActiveSection(current)
    }
    syncNavigation()
    window.addEventListener('scroll', syncNavigation, { passive: true })
    window.addEventListener('resize', syncNavigation)
    return () => {
      window.removeEventListener('scroll', syncNavigation)
      window.removeEventListener('resize', syncNavigation)
    }
  }, [])
  return (
    <>
      <header className={`site-header${isNavScrolled ? ' is-scrolled' : ''}`}>
        <nav className="navbar" aria-label="主导航">
          <a className="identity" href="#home" aria-label="返回首页">
            <img className="logo-mark" src={assetPath('portfolio-assets/icons/01-navbar-bg-logo.png')} alt="" />
            <span>UI DESIGNER</span>
          </a>
          <div className="nav-links">
            <a className={activeSection === 'home' ? 'active' : ''} aria-current={activeSection === 'home' ? 'page' : undefined} href="#home">HOME</a>
            <a className={activeSection === 'about' ? 'active' : ''} aria-current={activeSection === 'about' ? 'page' : undefined} href="#about">ABOUT ME</a>
            <a className={activeSection === 'project' ? 'active' : ''} aria-current={activeSection === 'project' ? 'page' : undefined} href="#project">PROJECT</a>
          </div>
          <a className="contact-link" href="#contact">CONTACT</a>
        </nav>
      </header>
      <main className="portfolio">
        <section className="hero" id="home" aria-label="首页">
          <img className="hero-poster" src={assetPath('web-assets/hero-poster.jpg')} alt="" fetchPriority="high" decoding="async" />
          <div className="hero-veil" />
        <div className="hero-content">
          <h1><span>Designing</span><span>Meaningful Experiences.</span></h1>
          <p>UI Designer Focused On Product Experience,<br />Design Systems And AI Workflow.</p>
          <a className="explore" href="#project"><img src={assetPath('portfolio-assets/icons/02-hero.png')} alt="Explore Projects" /></a>
        </div>
      </section>

      <section className="about section-shell" id="about" style={{ backgroundImage: `linear-gradient(rgba(6,5,16,.05),rgba(6,5,16,.1)),url("${assetPath('web-assets/about-bg.jpg')}")` }}>
        <DotGrid className="about-dot-grid" dotSize={1.35} gap={30} baseColor="#28203f" activeColor="#9b7cff" proximity={145} />
        <div className="about-head"><div><h2>WORK EXPERIENCE</h2><span>个人经历</span></div><span>About me</span></div>
        <div className="about-main">
          <div className="portrait-frame">
            <img className="portrait" src={assetPath('web-assets/avatar-crop.jpg')} alt="张家祥头像" loading="lazy" decoding="async" />
          </div>
          <div className="about-copy">
            <h3>Hi, I am <em>JIAXIANG</em> !</h3>
            <p className="intro">具备扎实的视觉设计基础与良好的审美能力，设计相关专业背景，熟练掌握Figma、Sketch、Photoshop、AfterEffects等设计工具，具备B端、C端及Web、移动端、AI程序等产品界面设计经验，熟悉常用协议与智能创作流程，能够使用Codex、Image2等AI工具，懂B端业务、素材生成、设计迭代及工作效率提升，具备良好的产品理解与信息架构能力，能够独立完成从需求分析、视觉设计到交付落地的完整设计流程，善于沟通协作与快速学习，能够持续关注AI与设计领域的新技术并将其应用于实际工作。</p>
            <h4>UI Design</h4>
            <div className="skills-row"><span>移动应用</span><span>网页设计</span><span>交互设计</span><span>视觉设计</span></div>
            <div className="stats"><div><b>2+</b><span>Years in Experience</span></div><div><b>6+</b><span>Selected Projects</span></div><div><b>10+</b><span>Design Tools</span></div></div>
          </div>
        </div>
        <div className="career"><div className="career-title"><span>CAREER PATH</span><span>工作经历</span></div><div className="timeline">
          <article><i /><time>2025.6 —— 2025.7</time><h3>杭州声趣科技有限公司</h3><b>ui设计师/视觉设计负责人</b><p>专注于移动应用界面设计、交互优化和设计</p></article>
          <article><i /><time>2024.9 —— 2025.5</time><h3>上海卓越睿新数码科技股份有限公司</h3><b>ui设计实习生</b><p>协助教育产品界面设计、视觉优化和组件维护</p></article>
          <article><i /><time>2024.6 —— now</time><h3>产品设计探索</h3><b>ai工作流</b><p>从概念到界面，设计移动应用和数字体验。</p></article>
        </div></div>
      </section>

      <section className="project section-shell" id="project" style={{ backgroundImage: `url("${assetPath('web-assets/project-bg.jpg')}")` }}><DotGrid className="section-dot-grid" dotSize={1.2} gap={34} baseColor="#241a3b" activeColor="#9676ff" proximity={140} /><h2>PROJECT</h2><div className="project-card">
        {projectData.map((project,index)=><button type="button" className="project-row" key={project.title} onClick={() => openProject(project)}><div className="project-line"><span>0{index + 1}</span><b>{project.title}</b>{index < 2 && <img src={projectIcons[index]} alt="" />}<em>→</em></div><div className="project-preview"><div className="project-cover"><img src={assetPath(`web-assets/project-cover-${index + 1}.jpg`)} alt={`${project.title} 预览`} loading="lazy" decoding="async" /></div></div></button>)}
      </div></section>

      <section className="contact section-shell" id="contact"><DotGrid className="section-dot-grid" dotSize={1.2} gap={34} baseColor="#251d38" activeColor="#9676ff" proximity={140} /><span>CONTACT</span><div className="contact-content"><h2>Ready to Build<br />the Future Together?</h2><p>If my work resonates with you,<br />let's explore new creative possibilities<br />- through visual design, AI, and ideas that push beyond boundaries.</p></div><div className="contact-footer"><div><button type="button" onClick={() => copy('15565043305', '手机号')}><img src={assetPath('portfolio-assets/icons/05-contactTelephone-02.png')} alt="" /><span>15565043305</span></button><button type="button" onClick={() => copy('768340092@qq.com', '邮箱')}><img src={assetPath('portfolio-assets/icons/05-contact-Email-03.png')} alt="" /><span>768340092@qq.com</span></button><button type="button" onClick={() => copy('Zz-wine', '微信号')}><img src={assetPath('portfolio-assets/icons/05-contact-WeChat-04.png')} alt="" /><span>Zz-wine</span></button></div><button className="say-hello" type="button" onClick={() => setShowWechat(true)}>Say Hello　→</button></div></section>
      {showWechat && <div className="wechat-modal" role="dialog" aria-modal="true" aria-label="联系方式"><button className="modal-backdrop" aria-label="关闭联系方式" onClick={() => setShowWechat(false)} /><section className="contact-card"><button className="contact-modal-close" type="button" onClick={() => setShowWechat(false)} aria-label="关闭">×</button><h2>CONTACT</h2><div className="contact-card-list"><button type="button" onClick={() => copy('15565043305', '手机号')}><img src={assetPath('portfolio-assets/icons/05-contactTelephone-02.png')} alt="" /><span>15565043305</span></button><button type="button" onClick={() => copy('768340092@qq.com', '邮箱')}><img src={assetPath('portfolio-assets/icons/05-contact-Email-03.png')} alt="" /><span>768340092@qq.com</span></button><button type="button" onClick={() => copy('Zz-wine', '微信号')}><img src={assetPath('portfolio-assets/icons/05-contact-WeChat-04.png')} alt="" /><span>Zz-wine</span></button></div><img className="contact-qr" src={assetPath('portfolio-assets/icons/05contact-05.png')} alt="微信二维码" /></section></div>}
      {activeProject && <div className="gallery-modal" id="project-detail" role="dialog" aria-modal="true" aria-label={activeProject.title}><button className="modal-backdrop" aria-label="关闭作品集" onClick={closeProject} /><div className="gallery"><header><div><span>SELECTED PROJECT</span><h2>{activeProject.title}</h2></div></header><div className="gallery-grid">{Array.from({length: activeProject.count}, (_, index) => <picture key={index}><source media="(max-width: 900px)" srcSet={assetPath(`projects-phone/${activeProject.folder}/${index + 1}.jpg`)} /><img src={assetPath(`projects-web/${activeProject.folder}/${index + 1}.jpg`)} alt={`${activeProject.title} 作品 ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></picture>)}</div></div></div>}
      {copyMessage && <div className="copy-toast" role="status">{copyMessage}</div>}
      </main>
      {activeProject && <button className="project-close" type="button" aria-label="关闭项目详情" aria-controls="project-detail" onClick={closeProject}>×</button>}
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
