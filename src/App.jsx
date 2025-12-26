cat > src/App.jsx <<'EOF'
import "./App.css"

export default function App() {
  return (
    <div className="wrap">
      <header className="hero">
        <img className="photo" src="/profile.jpg" alt="Ramana Prabhu Sana" />
        <div>
          <h1>Ramana Prabhu Sana</h1>
          <p className="subtitle">
            MSBAIM at Purdue. Pharma forecasting and analytics. Excel, VBA, Python, SQL, Power BI, Tableau.
          </p>
          <div className="buttons">
            <a className="primary" href="/Ramana_PrabhuSana_Resume.pdf" target="_blank" rel="noreferrer">
              Download Resume
            </a>
            <a className="secondary" href="https://www.linkedin.com/in/ramanaprabhusana/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="secondary" href="https://github.com/ramanaprabhusana" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}
EOF
