'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

type View = 'career' | 'skills' | 'scout' | 'explore' | 'tactics' | 'matches' | 'trophies' | 'quick' | null;

const menu: { id: 'career' | 'skills' | 'scout' | 'explore'; label: string; hint: string }[] = [
  { id: 'career', label: 'EXPERIENCE', hint: 'Roles & impact' },
  { id: 'skills', label: 'CORE SKILLS', hint: 'Stack & evidence' },
  { id: 'scout', label: 'CONTACT', hint: 'Profile & details' },
  { id: 'explore', label: 'EXPLORE THE GAME', hint: 'Tactics · matches · trophies' },
];

const viewLabels: Record<Exclude<View, null>, string> = {
  career: 'EXPERIENCE', skills: 'CORE SKILLS', scout: 'CONTACT & PROFILE', explore: 'EXPLORE THE GAME',
  tactics: 'TACTICS BOARD', matches: 'MATCH CENTRE · ENGINEERING DECISIONS', trophies: 'TROPHY ROOM', quick: '90-SECOND OVERVIEW',
};

const career = [
  { club: 'BOSTON SCIENTIFIC', years: 'AUG 2024 → PRESENT', role: 'Senior Platform Engineer', shirt: '10', theme: '#c7ff3d', headline: 'Captain of a multi-region platform fleet.',
    stats: [['100+', 'applications'], ['10+', 'EKS clusters'], ['99.95%', 'availability'], ['30+', 'DHP Agent users']],
    highlights: [
      'Lead engineering and operations for 10+ multi-region Amazon EKS clusters supporting 100+ applications.',
      'Reduced MTTR from 90 to 45 minutes through deep RCAs, systematic remediation, and cross-functional incident leadership.',
      'Reduced deployment lead time from 45 to 15 minutes with GitLab CI, Argo CD, Helm, and Terraform.',
      'Implemented observability with Prometheus, Grafana, Loki, Datadog, CloudWatch, and synthetic critical-journey monitoring.',
      'Designed DHP Agent using FastAPI, LangChain, Azure OpenAI, RAG, ChromaDB, kubectl-ai, EKS, and Helm for 30+ users across 6 teams.',
      'Architected Azure AD/OAuth2, Kubernetes RBAC, namespace-scoped access, cluster-wide admin visibility, and EFS-backed RAG storage.',
      'Standardized reusable Terraform modules and accelerated automation, testing, IaC, CI/CD, and runbooks with AI-assisted development.',
    ],
    unlocks: ['EKS FLEET', 'INCIDENT COMMAND', 'SLOs', 'GITOPS', 'AI OPS', 'OBSERVABILITY'] },
  { club: 'DELOITTE USI', years: 'JAN 2020 → MAY 2024', role: 'Senior Consultant / Platform Lead / Cloud Infrastructure SME', shirt: '08', theme: '#58d4b0', headline: 'From playmaker to team leader.',
    stats: [['~8', 'engineers led'], ['3', 'workstreams'], ['~25', 'AWS accounts/OUs'], ['99.9%', 'availability']],
    highlights: [
      'Led the Platform & Infrastructure team across three workstreams, owning mentoring, capacity planning, releases, production support, stakeholder collaboration, and service outcomes.',
      'Designed resilient AWS architectures spanning compute, storage, networking, IAM, monitoring, and data services.',
      'Implemented EKS Cluster Autoscaler and HPA to improve performance, reliability, capacity matching, and utilization.',
      'Planned production releases, controlled change windows, rollback procedures, and release readiness for 24×7 operations.',
      'Built complex CloudFormation templates integrated with AWS CodePipeline for repeatable infrastructure delivery.',
      'Provisioned AWS accounts and Organizational Units with Terraform and GitHub Actions across approximately 25 accounts/OUs.',
      'Built a centralized Reference Data Management application for standardized enterprise reference data.',
    ],
    unlocks: ['LEADERSHIP', 'AWS ARCHITECTURE', 'AUTOSCALING', 'RELEASES', 'CLOUDFORMATION', 'GOVERNANCE'] },
  { club: 'INFOSYS LTD', years: 'JUN 2016 → JAN 2020', role: 'Senior Systems Engineer / Automation Engineer', shirt: '06', theme: '#ff9b55', headline: 'The academy where automation became instinct.',
    stats: [['60%', 'manual effort cut'], ['8→2h', 'provisioning'], ['~20', 'environments'], ['65%', 'faster setup']],
    highlights: [
      'Automated application and infrastructure delivery with AWS, Terraform, Python, REST APIs, and Ansible.',
      'Reduced manual effort by approximately 60% and provisioning time from roughly eight hours to two.',
      'Provisioned and operated ELB, EBS, IAM, CloudWatch, and Auto Scaling across approximately 20 environments and applications.',
      'Sustained approximately 99.9% availability through resilient cloud operations.',
      'Created reusable Ansible roles and playbooks that reduced configuration variance by about 50% and accelerated setup by approximately 65%.',
    ],
    unlocks: ['AWS', 'TERRAFORM', 'PYTHON', 'ANSIBLE', 'LINUX', 'REST APIs'] },
];

const formation = [
  { pos: 'GK', name: 'Reliability', x: '50%', y: '88%', skills: ['SLI / SLO / SLA', 'Error budgets', 'Incident management', 'RCA', 'Capacity planning', 'Monitoring', 'Alerting', 'Performance troubleshooting'], proof: 'Sustained 99.95% availability and reduced MTTR by 50%.' },
  { pos: 'LB', name: 'Networking', x: '13%', y: '68%', skills: ['VPC', 'Subnets', 'Routing', 'Route 53', 'DNS', 'NAT', 'Internet Gateway', 'ELB / ALB / NLB', 'TLS / SSL'], proof: 'Designed and operated resilient AWS network paths across enterprise environments.' },
  { pos: 'CB', name: 'Security', x: '38%', y: '72%', skills: ['IAM', 'Security groups', 'RBAC', 'ConfigMaps', 'Secrets', 'Azure AD', 'OAuth2', 'Namespace-scoped access'], proof: 'Architected secure, role-aware access for the DHP Agent platform.' },
  { pos: 'CB', name: 'Data', x: '62%', y: '72%', skills: ['PostgreSQL', 'RDS', 'Aurora', 'DynamoDB', 'S3', 'EFS', 'ChromaDB'], proof: 'Worked across operational data services and secured RAG persistence.' },
  { pos: 'RB', name: 'AWS Cloud', x: '87%', y: '68%', skills: ['AWS', 'EC2', 'ECS', 'ECR', 'S3', 'Lambda', 'API Gateway', 'CloudWatch', 'SSM', 'SNS', 'SQS'], proof: 'Designed platforms across compute, storage, data, IAM, monitoring, and networking.' },
  { pos: 'CM', name: 'Infrastructure', x: '26%', y: '44%', skills: ['Terraform', 'CloudFormation', 'Reusable modules', 'Infrastructure automation', 'Environment provisioning', 'Configuration management'], proof: 'Standardized reusable modules and governed approximately 25 AWS accounts/OUs.' },
  { pos: 'CM', name: 'Automation', x: '50%', y: '51%', skills: ['Python', 'Bash', 'Linux', 'Shell scripting', 'REST APIs', 'YAML', 'JSON', 'Ansible', 'Process management'], proof: 'Cut manual work by 60% and provisioning from eight hours to two.' },
  { pos: 'CM', name: 'GitOps', x: '74%', y: '44%', skills: ['Git', 'GitLab', 'GitHub', 'GitHub Actions', 'GitLab CI', 'Argo CD', 'CI/CD', 'Rolling deployment', 'Rollback strategies'], proof: 'Reduced deployment lead time from 45 minutes to 15.' },
  { pos: 'LW', name: 'Observability', x: '18%', y: '18%', skills: ['Prometheus', 'Grafana', 'Loki', 'Datadog', 'CloudWatch', 'Logging', 'Synthetic monitoring'], proof: 'Built end-to-end observability and critical-journey monitoring for 100+ applications.' },
  { pos: 'ST', name: 'Kubernetes', x: '50%', y: '12%', skills: ['Kubernetes', 'Amazon EKS', 'Docker', 'Helm', 'Ingress', 'HPA', 'Cluster Autoscaler', 'K8s networking', 'EKS upgrades', 'Workload troubleshooting'], proof: 'Leads operations for 10+ multi-region EKS clusters.' },
  { pos: 'RW', name: 'AI Engineering', x: '82%', y: '18%', skills: ['OpenAI Codex', 'Claude Code', 'FastAPI', 'LangChain', 'RAG', 'ChromaDB', 'kubectl-ai', 'Azure OpenAI'], proof: 'Built DHP Agent for 30+ users across six teams.' },
];

const skillSquad = [
  { number: '01', tier: 'CORE EXPERTISE', unit: 'Cloud & AWS', role: 'PLATFORM FOUNDATION', evidence: 'Resilient AWS platforms operated across approximately 20 environments and governed across approximately 25 accounts/OUs.', skills: ['AWS', 'EC2', 'EBS', 'ELB', 'Auto Scaling', 'CloudWatch', 'S3', 'RDS', 'Aurora', 'DynamoDB', 'IAM'] },
  { number: '02', tier: 'CORE EXPERTISE', unit: 'Kubernetes', role: 'ORCHESTRATION', evidence: 'Leads 10+ multi-region Amazon EKS clusters supporting more than 100 applications.', skills: ['Kubernetes', 'Amazon EKS', 'Docker', 'Helm', 'Ingress', 'RBAC', 'ConfigMaps', 'Secrets', 'HPA', 'Cluster Autoscaler', 'Kubernetes networking', 'EKS upgrades', 'Workload troubleshooting'] },
  { number: '03', tier: 'CORE EXPERTISE', unit: 'Infrastructure as Code', role: 'SYSTEM BUILDER', evidence: 'Created reusable delivery patterns and automated repeatable infrastructure across enterprise environments.', skills: ['Terraform', 'Reusable Terraform modules', 'CloudFormation', 'Ansible', 'Ansible roles', 'Ansible playbooks', 'Infrastructure automation', 'Configuration management', 'Environment provisioning'] },
  { number: '04', tier: 'CORE EXPERTISE', unit: 'CI/CD & GitOps', role: 'DELIVERY ENGINE', evidence: 'Reduced deployment lead time from 45 minutes to 15 minutes with standardized GitOps delivery.', skills: ['Git', 'GitLab', 'GitHub', 'GitLab CI', 'GitHub Actions', 'AWS CodePipeline', 'Argo CD', 'CI/CD', 'GitOps', 'Rolling deployments', 'Release readiness', 'Rollback strategies'] },
  { number: '05', tier: 'CORE EXPERTISE', unit: 'SRE & Reliability', role: 'LAST LINE OF DEFENCE', evidence: 'Sustained 99.95% availability and reduced MTTR from 90 minutes to 45 minutes.', skills: ['SLI', 'SLO', 'SLA', 'Error budgets', 'Incident management', 'Root-cause analysis', 'Capacity planning', 'Performance troubleshooting', 'Production support', '24×7 operations', 'Controlled releases'] },
  { number: '06', tier: 'CORE EXPERTISE', unit: 'Observability', role: 'FIELD VISION', evidence: 'Built full-stack and synthetic monitoring for critical journeys across 100+ applications.', skills: ['Prometheus', 'Grafana', 'Loki', 'Datadog', 'CloudWatch', 'Monitoring', 'Alerting', 'Logging', 'Synthetic monitoring', 'Critical-journey monitoring'] },
  { number: '07', tier: 'STRONG EXPERIENCE', unit: 'Automation & Development', role: 'MIDFIELD ENGINE', evidence: 'Cut manual effort by approximately 60% and provisioning time from eight hours to two.', skills: ['Python', 'Bash', 'Shell scripting', 'Linux', 'REST APIs', 'FastAPI', 'YAML', 'JSON', 'Process automation'] },
  { number: '08', tier: 'STRONG EXPERIENCE', unit: 'Networking & Security', role: 'DEFENSIVE SHAPE', evidence: 'Designed resilient network paths and secure role-aware access for platform workloads and internal tooling.', skills: ['VPC', 'Subnets', 'Routing', 'Route 53', 'DNS', 'NAT', 'Internet Gateway', 'Load balancing', 'TLS / SSL', 'IAM', 'Security groups', 'Azure AD', 'OAuth2', 'Kubernetes RBAC', 'Namespace-scoped access'] },
  { number: '09', tier: 'ADDITIONAL DEPTH', unit: 'Data & Storage', role: 'POSSESSION LAYER', evidence: 'Worked across relational, NoSQL, object, file, and vector storage for platform and AI workloads.', skills: ['PostgreSQL', 'Amazon RDS', 'Amazon Aurora', 'DynamoDB', 'Amazon S3', 'Amazon EFS', 'ChromaDB'] },
  { number: '10', tier: 'ADDITIONAL DEPTH', unit: 'AI Engineering', role: 'CREATIVE PLAYMAKER', evidence: 'Built DHP Agent for 30+ users across six teams using secure, contextual AI-assisted Kubernetes operations.', skills: ['OpenAI Codex', 'Claude Code', 'Azure OpenAI', 'LangChain', 'RAG', 'ChromaDB', 'kubectl-ai', 'FastAPI', 'Prompt-assisted development'] },
  { number: '11', tier: 'STRONG EXPERIENCE', unit: 'Technical Leadership', role: 'CAPTAIN', evidence: 'Led approximately eight engineers across three workstreams while staying hands-on with architecture and operations.', skills: ['Technical leadership', 'Team mentoring', 'Capacity planning', 'Stakeholder communication', 'Workstream ownership', 'Architecture', 'Release planning', 'Service outcomes', 'Cross-functional incident leadership'] },
];

const matches = [
  { title: 'The 90-Minute Incident', minute: '88′', score: '0–1', brief: 'A critical journey is failing across multiple applications. The signal is noisy and stakeholders need answers.', choices: ['Restart everything immediately', 'Correlate SLOs, deployments, logs, and dependencies', 'Wait for the next alert cycle'], answer: 1, result: 'Ketan leads a structured investigation, deep RCA, and systematic remediation. MTTR falls from 90 to 45 minutes.', outcome: 'BUSINESS OUTCOME · Faster recovery, lower service disruption, and clearer stakeholder communication.', tools: ['SLIs / SLOs', 'Prometheus', 'Grafana', 'Loki', 'Datadog', 'CloudWatch', 'RCA'] },
  { title: 'The Slow Release', minute: '62′', score: '1–1', brief: 'Deployments take 45 minutes and application teams are losing momentum.', choices: ['Add more manual approvers', 'Standardize GitOps with reusable delivery paths', 'Run larger change windows'], answer: 1, result: 'GitLab CI, Argo CD, Helm, and Terraform reduce deployment lead time from 45 to 15 minutes.', outcome: 'BUSINESS OUTCOME · Faster delivery, safer rollbacks, and less operational toil for application teams.', tools: ['GitLab CI', 'Argo CD', 'Helm', 'Terraform', 'GitOps', 'Rollback'] },
  { title: 'The Knowledge Gap', minute: '74′', score: '2–2', brief: 'Six teams repeatedly search different systems for the same Kubernetes answers.', choices: ['Write another static wiki', 'Build a secure RAG-assisted Kubernetes operations platform', 'Give everyone cluster-admin access'], answer: 1, result: 'DHP Agent serves 30+ users with controlled OAuth2/RBAC access and contextual operational knowledge.', outcome: 'BUSINESS OUTCOME · Better developer experience, faster answers, and controlled access to operational knowledge.', tools: ['FastAPI', 'LangChain', 'RAG', 'ChromaDB', 'Azure OpenAI', 'EKS', 'RBAC'] },
];

const trophies = [
  ['🏆', 'GOLDEN UPTIME', '99.95%', 'Reliable platform operations across 100+ applications.'],
  ['⚡', 'RAPID RECOVERY', '50% FASTER', 'MTTR reduced from 90 minutes to 45.'],
  ['🚀', 'FAST DELIVERY', '3× FASTER', 'Deployment lead time reduced from 45 minutes to 15.'],
  ['🛡️', 'PLATFORM SCALE', '100+ APPS', 'Operated across 10+ multi-region EKS clusters.'],
  ['🧠', 'AI INNOVATOR', '30+ USERS', 'DHP Agent adopted across six teams.'],
  ['©', 'CAPTAIN\'S ARMBAND', '~8 ENGINEERS', 'Leadership across three workstreams.'],
];

const quickTour = [
  ['THE PLAYER', 'Ketan Sharma', 'Senior Platform / DevOps / SRE Engineer and technical lead with 10+ years of experience.'],
  ['THE CURRENT FORM', '100+ apps · 10+ EKS clusters', 'Leading multi-region platform reliability while sustaining 99.95% availability.'],
  ['THE BIG WINS', '50% faster recovery · 3× faster delivery', 'MTTR reduced from 90 to 45 minutes and deployments from 45 to 15.'],
  ['THE CAPTAINCY', '~8 engineers · 3 workstreams', 'Hands-on leadership spanning architecture, mentoring, releases, operations, and stakeholder outcomes.'],
  ['THE NEW PLAY', 'DHP Agent', 'AI-assisted Kubernetes operations for 30+ users across six engineering teams.'],
];

const techNews = [
  { date: '28 AUG', source: 'KUBERNETES', title: 'Pod certificates and cluster trust bundles land in v1.37', href: 'https://kubernetes.io/blog/' },
  { date: '31 AUG', source: 'OPENAI', title: 'The latest product, engineering, and AI platform developments', href: 'https://openai.com/news/' },
];

const footballNews = [
  { date: '28 AUG', source: 'PREMIER LEAGUE', title: 'How new signings become eligible for matchday selection', href: 'https://www.premierleague.com/en/news/4698865/when-does-a-new-signing-need-to-be-registered-to-be-available-at-the-weekend' },
  { date: '24 AUG', source: 'PREMIER LEAGUE', title: 'The biggest summer deals across all 20 clubs', href: 'https://www.premierleague.com/en/news/4681361/every-premier-league-clubs-biggest-deals-in-summer-transfer-window/' },
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<View>(null);
  const [season, setSeason] = useState(0);
  const [player, setPlayer] = useState(9);
  const [match, setMatch] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [tour, setTour] = useState(0);
  const [shot, setShot] = useState<'ready' | 'flying' | 'goal'>('ready');
  const [aim, setAim] = useState<'left' | 'center' | 'right'>('center');
  const [feedOpen, setFeedOpen] = useState(false);
  const resumeDownload = useRef<HTMLAnchorElement>(null);
  const shotTimers = useRef<number[]>([]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setView(null); };
    window.addEventListener('keydown', onKey); return () => { window.removeEventListener('keydown', onKey); shotTimers.current.forEach(window.clearTimeout); };
  }, []);

  const openMenu = (index: number) => { setSelected(index); setView(menu[index].id); };
  const currentMatch = matches[match];
  const takeShot = () => {
    if (shot !== 'ready') return;
    setShot('flying');
    shotTimers.current.push(window.setTimeout(() => { setShot('goal'); resumeDownload.current?.click(); }, 850));
    shotTimers.current.push(window.setTimeout(() => setShot('ready'), 3900));
  };

  const openOverview = () => { setTour(0); setView('quick'); };
  const openSkills = () => { setSelected(1); setView('skills'); };

  return <main id="main-content" className="football-world">
    <a className="skip-link" href="#main-content">Skip to portfolio</a>
    <a ref={resumeDownload} className="hidden-resume-download" href="/Ketan-Sharma-Resume.pdf" download tabIndex={-1} aria-hidden="true">Download Resume</a>
    <header className="match-bar"><div className="club-mark"><span>KS</span><div><strong>KETAN FC</strong><small>KETAN SHARMA · GURGAON</small></div></div><div className="season-status"><span>CURRENT POSITION</span><strong>SENIOR PLATFORM ENGINEER</strong></div><nav aria-label="Primary actions"><button className="overview-action" onClick={openOverview}>▶ 90-SECOND OVERVIEW</button><a className="resume-action" href="/Ketan-Sharma-Resume.pdf" download>RESUME ↓</a><a className="contact-action" href="mailto:ketansharma040293@gmail.com">CONTACT →</a></nav></header>

    <section className="career-screen"><aside className="game-menu" aria-label="Portfolio sections"><p>RECRUITER MENU</p>{menu.map((item, index) => <button key={item.id} aria-pressed={selected === index} className={selected === index ? 'active' : ''} onClick={() => openMenu(index)}><span>0{index + 1}</span><b>{item.label}<small>{item.hint}</small></b><i>›</i></button>)}<div className="availability"><i /> TARGET ROLES<br/>SENIOR / LEAD PLATFORM · DEVOPS · SRE</div></aside>
      <section className="player-hero"><div className="hero-content"><p className="mode-label">SENIOR PLATFORM / DEVOPS / SRE ENGINEER</p><h1>Ketan<br /><em>Sharma</em></h1><div className="position-line"><span>FOOTBALL ALIAS</span><strong>THE PLATFORM PLAYMAKER</strong><i>10+ YEARS</i></div><p className="player-intro">Technical lead building and operating resilient AWS and Kubernetes platforms at enterprise scale. Connects people, automation and reliability to help engineering teams deliver safely and recover quickly.</p><div className="hero-proof" aria-label="Career highlights"><span><strong>100+</strong>Applications</span><span><strong>10+</strong>EKS clusters</span><span><strong>99.95%</strong>Availability</span><span><strong>50%</strong>Lower MTTR</span></div><div className="hero-actions"><button className="kickoff" onClick={openOverview}>90-SECOND OVERVIEW <span>→</span></button><button className="secondary-kickoff" onClick={() => { setSelected(0); setView('career'); }}>VIEW EXPERIENCE</button></div></div>
        <div className={`player-stage penalty-stage ${shot} aim-${aim}`}><div className="stadium-light light-one" /><div className="stadium-light light-two" /><div className="stadium-crowd" /><div className="penalty-pitch"><div className="penalty-arc"/><div className="penalty-spot"/></div><div className="goal-frame"><div className="goal-net"/><div className="goal-line top"/><div className="goal-line left"/><div className="goal-line right"/><div className="goal-depth left-depth"/><div className="goal-depth right-depth"/><div className="aim-panel" aria-label="Choose where to aim"><strong>AIM</strong><div>{(['left','center','right'] as const).map((target) => <button key={target} aria-label={`Aim ${target}`} aria-pressed={aim === target} className={aim === target ? 'active' : ''} onClick={() => setAim(target)} disabled={shot !== 'ready'}><span/></button>)}</div></div><div className="goal-particles" aria-hidden="true">{Array.from({length:8},(_,index)=><i key={index}/>)}</div></div><button className="penalty-ball" onClick={takeShot} disabled={shot !== 'ready'} aria-label="Shoot football"><span aria-hidden="true">⚽</span>{shot === 'ready' && <strong>SHOOT</strong>}</button><div className="goal-flash" aria-live="polite"><strong>GOAL!</strong><span>RESUME DOWNLOADED</span></div></div>
      </section><NewsRail open={feedOpen} onToggle={() => setFeedOpen((value) => !value)} /></section>
    <footer className="score-strip"><div><span>CURRENT CLUB</span><strong>BOSTON SCIENTIFIC</strong><em>SENIOR PLATFORM ENGINEER</em></div><div><span>DELIVERY IMPACT</span><strong>DEPLOYMENT</strong><em>45 → 15 MIN</em></div><div><span>LEADERSHIP</span><strong>TEAM CAPTAIN</strong><em>~8 ENGINEERS · 3 WORKSTREAMS</em></div><div><span>AI PLATFORM</span><strong>DHP AGENT</strong><em>30+ USERS · 6 TEAMS</em></div></footer>

    {view && <div className="game-overlay"><section className="game-panel" role="dialog" aria-modal="true" aria-label={viewLabels[view]}><header><div><span>KETAN FC / {viewLabels[view]}</span><strong>{view === 'quick' ? 'RECRUITER FAST LANE' : 'CAREER DATABASE'}</strong></div><button onClick={() => setView(null)} aria-label="Close">×</button></header><div className="game-content">
      {view === 'career' && <CareerMode season={season} onSeason={setSeason} />}
      {view === 'skills' && <SkillSquad />}
      {view === 'explore' && <ExploreHub onOpen={setView} />}
      {view === 'tactics' && <TacticsBoard selected={player} onSelect={setPlayer} onSkills={openSkills} />}
      {view === 'matches' && <MatchCentre match={match} onMatch={(index) => { setMatch(index); setChoice(null); }} choice={choice} onChoice={setChoice} current={currentMatch} />}
      {view === 'trophies' && <TrophyRoom />}
      {view === 'scout' && <ScoutReport />}
      {view === 'quick' && <QuickMatch index={tour} onIndex={setTour} onClose={() => setView(null)} />}
    </div></section></div>}
  </main>;
}

function CareerMode({ season, onSeason }: { season: number; onSeason: (value: number) => void }) {
  const entry = career[season];
  const [expanded, setExpanded] = useState(false);
  useEffect(() => setExpanded(false), [season]);
  const reports = expanded ? entry.highlights : entry.highlights.slice(0,3);
  return <div className="career-mode"><aside aria-label="Career history">{career.map((item, index) => <button key={item.club} aria-pressed={season === index} className={season === index ? 'active' : ''} onClick={() => onSeason(index)}><span>{item.years}</span><strong>{item.club}</strong><small>{item.role}</small></button>)}</aside><article style={{ '--club': entry.theme } as CSSProperties}><div className="career-title"><div><span>{entry.years}</span><h2>{entry.club}</h2><p>{entry.role}</p></div><div className="mini-shirt">{entry.shirt}</div></div><h3>{entry.headline}</h3><div className="season-stats">{entry.stats.map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="match-reports"><span>TOP IMPACT</span>{reports.map((highlight,index) => <p key={highlight}><i>{String(index + 1).padStart(2,'0')}</i>{highlight}</p>)}{entry.highlights.length > 3 && <button className="report-toggle" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>{expanded ? 'SHOW TOP IMPACT ↑' : `VIEW FULL SEASON REPORT · ${entry.highlights.length} POINTS ↓`}</button>}</div><div className="skill-unlocks"><span>CORE CAPABILITIES</span><div>{entry.unlocks.map((unlock) => <strong key={unlock}>+ {unlock}</strong>)}</div></div></article></div>;
}

function SkillSquad() {
  const [active, setActive] = useState(1);
  return <div className="skill-squad"><div className="squad-heading"><div><p>FULL TEAM SHEET / EVIDENCE-BACKED SKILLS</p><h2>The complete playing squad.</h2><span>Capabilities are grouped by depth and connected to real production outcomes—not arbitrary proficiency percentages.</span><div className="tier-legend"><i>CORE EXPERTISE</i><i>STRONG EXPERIENCE</i><i>ADDITIONAL DEPTH</i></div></div><div className="squad-count"><strong>11</strong><small>SKILL UNITS</small></div></div><div className="squad-grid">{skillSquad.map((group,index) => <button key={group.unit} aria-expanded={active === index} className={active === index ? 'active' : ''} onClick={() => setActive(index)}><div className="squad-card-top"><i>{group.number}</i><div><small>{group.role}</small><h3>{group.unit}</h3></div><b>{active === index ? '—' : '+'}</b></div><span className={`tier-badge tier-${group.tier.toLowerCase().replaceAll(' ','-')}`}>{group.tier}</span><div className="squad-skills">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>{active === index && <p><strong>MATCH EVIDENCE</strong>{group.evidence}</p>}</button>)}</div></div>;
}

function ExploreHub({ onOpen }: { onOpen:(view:View)=>void }) {
  const modes = [
    ['4-3-3', 'TACTICS BOARD', 'Map the platform stack to an interactive formation and inspect the evidence behind every position.', 'tactics'],
    ['03', 'ENGINEERING DECISIONS', 'Play through incident, delivery and AI-platform scenarios to see how Ketan makes trade-offs.', 'matches'],
    ['06', 'TROPHY ROOM', 'Review the six strongest verified outcomes from more than ten years in platform engineering.', 'trophies'],
  ] as const;
  return <div className="explore-hub"><p>OPTIONAL DEEP DIVE</p><h2>Explore the game.</h2><span>The recruiter fast lane covers the essentials. These modes show how the work gets done.</span><div>{modes.map(([number,title,copy,id]) => <button key={id} onClick={() => onOpen(id)}><i>{number}</i><small>GAME MODE</small><h3>{title}</h3><p>{copy}</p><strong>OPEN MODE →</strong></button>)}</div></div>;
}

function NewsRail({ open, onToggle }: { open:boolean; onToggle:()=>void }) {
  return <aside className={`news-rail ${open ? 'open' : ''}`} aria-label="Technology and football news"><button className="news-toggle" onClick={onToggle} aria-expanded={open} aria-label={`${open ? 'Close' : 'Open'} Touchline Feed`}><strong>{open ? '×' : 'NEWS'}</strong><span>TOUCHLINE</span></button><div className="rail-content"><div className="rail-heading"><span>TOUCHLINE FEED</span><strong>What I’m tracking</strong><small>CURATED · 01 SEP 2026</small></div><NewsBlock icon="⌘" title="Tech radar" items={techNews} /><NewsBlock icon="⚽" title="Football wire" items={footballNews} /></div></aside>;
}

function NewsBlock({ icon, title, items }: { icon:string; title:string; items:typeof techNews }) {
  return <section className="news-block"><header><span>{icon}</span><h2>{title}</h2><i>LIVE SOURCES</i></header><div>{items.map((item) => <a key={`${item.source}-${item.title}`} href={item.href} target="_blank" rel="noreferrer"><small>{item.date} · {item.source}</small><strong>{item.title}</strong><span>Read official update ↗</span></a>)}</div></section>;
}

function TacticsBoard({ selected, onSelect, onSkills }: { selected: number; onSelect: (value: number) => void; onSkills:()=>void }) {
  const active = formation[selected];
  return <div className="tactics-view"><div className="tactics-copy"><p>STARTING XI / 4-3-3</p><h2>Every position has evidence.</h2><p>Select a player to reveal one capability domain and the production result behind it. The full toolkit remains in Core Skills.</p><div className="tactics-legend"><span>POSITION</span><span>CAPABILITY</span><span>MATCH EVIDENCE</span></div><div className="selected-player"><span>{active.pos}</span><div><small>{active.name.toUpperCase()}</small><h3>{active.proof}</h3></div></div><div className="skill-bench">{active.skills.slice(0,5).map((skill) => <span key={skill}>{skill}</span>)}</div>{active.skills.length > 5 && <button className="full-squad-link" onClick={onSkills}>VIEW COMPLETE SKILL SQUAD · +{active.skills.length-5} →</button>}<div className="captain-note"><strong>© CAPTAIN / LEADERSHIP</strong><p>Mentoring · capacity planning · stakeholder communication · release readiness · service outcomes · 24×7 operations</p></div></div><div className="formation-pitch" aria-label="Interactive skills formation">{formation.map((item,index) => <button key={`${item.pos}-${item.name}`} aria-pressed={selected === index} aria-label={`${item.pos}: ${item.name}`} onClick={() => onSelect(index)} className={selected === index ? 'active' : ''} style={{ left:item.x, top:item.y }}><span>{item.pos}</span><strong>{item.name}</strong>{index === 6 && <i>©</i>}</button>)}<div className="formation-circle"/><div className="formation-half"/><div className="box top-box"/><div className="box bottom-box"/></div></div>;
}

function MatchCentre({ match, onMatch, choice, onChoice, current }: { match:number; onMatch:(value:number)=>void; choice:number|null; onChoice:(value:number)=>void; current:typeof matches[number] }) {
  return <div className="match-centre"><aside aria-label="Engineering decision scenarios">{matches.map((item,index) => <button key={item.title} aria-pressed={match === index} className={match === index ? 'active' : ''} onClick={() => onMatch(index)}><span>DECISION 0{index+1}</span><strong>{item.title}</strong><small>{item.minute} · {item.score}</small></button>)}</aside><article><div className="live-score"><span>ENGINEERING DECISION / LIVE CASE STUDY</span><strong>{current.minute}</strong><div>KETAN FC <b>{current.score}</b> COMPLEXITY XI</div></div><h2>{current.title}</h2><p className="match-brief">{current.brief}</p><div className="tactic-choices"><span>CHOOSE YOUR TACTIC</span>{current.choices.map((item,index) => <button key={item} className={choice === index ? (index === current.answer ? 'correct':'wrong') : ''} onClick={() => onChoice(index)}><i>{String.fromCharCode(65+index)}</i>{item}</button>)}</div>{choice !== null && <div className={`match-result ${choice === current.answer ? 'won':'retry'}`}><span>{choice === current.answer ? '⚽ GOAL — MATCH WON':'↻ TACTIC BLOCKED — TRY AGAIN'}</span><p>{choice === current.answer ? current.result:'That creates more risk or delays the real diagnosis. Choose another approach.'}</p>{choice === current.answer && <><em>{current.outcome}</em><div>{current.tools.map((tool) => <strong key={tool}>{tool}</strong>)}</div></>}</div>}</article></div>;
}

function TrophyRoom() { return <div className="trophy-room"><div className="room-title"><p>HONOURS / VERIFIED IMPACT</p><h2>The numbers behind the season.</h2></div><div className="trophy-grid">{trophies.map(([icon,title,value,note],index) => <article key={title}><span>{icon}</span><small>TROPHY {String(index+1).padStart(2,'0')}</small><h3>{title}</h3><strong>{value}</strong><p>{note}</p></article>)}</div></div>; }

function ScoutReport() { return <div className="scout-report"><div className="scout-card"><div className="scout-photo"><span>KS</span><i>10</i></div><div><span>CONTACT / PROFESSIONAL PROFILE</span><h2>Ketan Sharma</h2><p>Senior Platform / DevOps / SRE Engineer</p><div className="scout-tags"><strong>TECHNICAL LEAD</strong><strong>INCIDENT COMMANDER</strong><strong>PLATFORM BUILDER</strong></div></div></div><div className="scout-layout"><section><h3>Recruiter summary</h3><p>10+ years designing, automating, migrating, and operating resilient AWS and Kubernetes platforms. Combines hands-on engineering with leadership, operational judgment, and the ability to translate complex platform work into reliable outcomes.</p><dl><div><dt>Target roles</dt><dd>Senior / Lead Platform Engineer, DevOps Engineer or Site Reliability Engineer</dd></div><div><dt>Current company</dt><dd>Boston Scientific</dd></div><div><dt>Location</dt><dd>Gurgaon, India</dd></div><div><dt>Email</dt><dd><a href="mailto:ketansharma040293@gmail.com">ketansharma040293@gmail.com</a></dd></div><div><dt>Education</dt><dd>B.Tech. Computer Science, SRM University, 2016</dd></div></dl></section><section className="scout-attributes"><h3>Evidence at a glance</h3>{[['Platform ownership','100+ applications'],['AWS & Kubernetes','10+ EKS clusters'],['Reliability','99.95% availability'],['Incident leadership','MTTR reduced 50%'],['Delivery engineering','45 → 15 minute deployments'],['Technical leadership','~8 engineers / 3 workstreams']].map(([skill,level]) => <div key={skill}><span>{skill}</span><strong>{level}</strong></div>)}<div className="scout-actions"><a href="mailto:ketansharma040293@gmail.com">CONTACT KETAN →</a><a href="/Ketan-Sharma-Resume.pdf" target="_blank" rel="noreferrer">VIEW RESUME ↗</a><a href="/Ketan-Sharma-Resume.pdf" download>DOWNLOAD PDF ↓</a><a href="https://www.linkedin.com/in/ketan-sharma-17b5aa102" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></section></div></div>; }

function QuickMatch({ index, onIndex, onClose }: { index:number; onIndex:(value:number)=>void; onClose:()=>void }) { const slide=quickTour[index]; return <div className="quick-match"><div className="quick-clock"><span>SCOUTING CLOCK</span><strong>0{index+1}:00</strong></div><p>{slide[0]}</p><h2>{slide[1]}</h2><h3>{slide[2]}</h3><div className="quick-progress">{quickTour.map((_,i)=><span key={i} className={i<=index?'active':''}/>)}</div><footer><button disabled={index===0} onClick={()=>onIndex(index-1)}>← Previous</button><span>{index+1} / {quickTour.length}</span><button onClick={()=> index===quickTour.length-1 ? onClose() : onIndex(index+1)}>{index===quickTour.length-1?'Finish scouting ✓':'Next play →'}</button></footer></div>; }
