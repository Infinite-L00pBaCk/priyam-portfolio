import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "Priyam Prakash",
  titleRole: "Electronics & Communication Engineering Student",
  specialization: "Embedded Systems • Full-Stack Web • Edge AI & IoT",
  statusText: "B.Tech Undergraduate (2024 – 2028)",
  tagline: "Bridging the gap between low-level hardware firmware and scalable modern web architectures.",
  bio: "B.Tech undergraduate (2024 – 2028) in Electronics and Communication Engineering at Vellore Institute of Technology (VIT) Bhopal with a 8.38 CGPA. I specialize in building end-to-end engineering solutions—from designing embedded C/C++ firmware on ESP32 and Raspberry Pi to architecting reactive full-stack web applications with React, TypeScript, and Web Crypto APIs. Across multiple technical internships including open-source contribution at IIT Ropar VLED Lab, embedded hardware at Maven Silicon, and space technology at India Space Lab, I bring rigorous systems thinking to every build.",
  
  education: {
    institution: "Vellore Institute of Technology (VIT)",
    degree: "Bachelor of Technology",
    specialization: "Electronics and Communication Engineering",
    period: "2024 – 2028",
    gpa: "CGPA: 8.38 / 10.0",
    location: "Bhopal, MP, India",
    highlights: [
      "Core coursework in Microcontrollers, Digital System Design, VLSI, Signal Processing, and Data Structures",
      "General Secretary, Cisco Community VIT Bhopal (Promoted June 2026)",
      "Core Member, IEEE Student Branch Ideation Department",
      "3rd Place Winner at Shaastra 2026 HackSecure Hackathon (IIT Madras)"
    ]
  },

  interests: [
    "Embedded Systems & Firmware Development",
    "Full-Stack Web Development & Modern SPAs",
    "Computer Vision & Edge Machine Learning",
    "Space Technology & CanSat/CubeSat Payloads",
    "Microcontroller Interfacing (ESP32, Raspberry Pi, Arduino)",
    "High-Performance C++ & Object-Oriented Architecture"
  ],

  quickStats: [
    { label: "ACADEMIC CGPA", value: "8.38", detail: "VIT Bhopal ECE" },
    { label: "INTERNSHIPS", value: "5+", detail: "IIT Ropar, Maven Silicon, Space Lab" },
    { label: "CORE PROJECTS", value: "7", detail: "Hardware, Web, AI & Simulators" },
    { label: "HONORS & CERTS", value: "9+", detail: "IIT Madras Winner, Google Certified" }
  ],

  journey: [
    {
      year: "2024",
      quarter: "Q3",
      title: "Commenced B.Tech in Electronics & Communication",
      category: "Education",
      description: "Started undergraduate engineering journey at VIT Bhopal (2024–2028), focusing on circuit analysis, digital electronics, and foundational C/C++ programming.",
      details: ["Achieved consistent high academic standing (8.38 CGPA)", "Began experimenting with Arduino microcontrollers and breadboard logic"],
      systemLogCode: "LOG_2024_INIT"
    },
    {
      year: "2024",
      quarter: "Q4",
      title: "Joined Cisco Community VIT Bhopal & Hardware Prototyping",
      category: "Community",
      description: "Became Research Intern & Co-Lead at Cisco Community VIT Bhopal; spearheaded technical initiatives and hardware workshops.",
      details: ["Coordinated technical infrastructure for Advitya annual fest (100+ attendees)", "Deepened knowledge of ESP32, sensors, and networking protocols"],
      systemLogCode: "LOG_2024_CISCO"
    },
    {
      year: "2025",
      quarter: "Q2",
      title: "Robotics & Modern Web Architecture Expansion",
      category: "Project",
      description: "Developed voice-controlled autonomous obstacle-avoidance vehicles and progressed into modern reactive frontend architectures with React and TypeScript.",
      details: ["Implemented ultrasonic servo 180° spatial scanning algorithms", "Built secure client-side cryptographic web utilities"],
      systemLogCode: "LOG_2025_EXPAND"
    },
    {
      year: "2026",
      quarter: "Q1",
      title: "Shaastra 2026 3rd Place & IEEE Ideation Department",
      category: "Award",
      description: "Won 3rd Place at HackSecure Hackathon during Shaastra 2026 (IIT Madras) as an IEEE Student Member (#102161442). Joined IEEE Student Branch Ideation Department.",
      details: ["Engineered security solutions under tight hackathon constraints", "Trained ML CRNN model for automated CAPTCHA decoding"],
      systemLogCode: "LOG_2026_HACK"
    },
    {
      year: "2026",
      quarter: "Q2",
      title: "Concurrent Multi-Disciplinary Industry Internships",
      category: "Internship",
      description: "Executed high-impact internships across embedded systems (Maven Silicon), space technology (India Space Lab), ServiceNow administration, and C++ OOP (Pinnacle Labs).",
      details: ["Programmed low-level C/C++ firmware for home automation relays", "Formulated CanSat/CubeSat satellite payload telemetry frameworks"],
      systemLogCode: "LOG_2026_INTERN"
    },
    {
      year: "2026",
      quarter: "Q3 - Present",
      title: "IIT Ropar VLED Lab & Cisco Community Leadership",
      category: "Leadership",
      description: "Contributing open-source code to IIT Ropar VLED Lab resolving national challenges. Promoted to General Secretary of Cisco Community VIT Bhopal.",
      details: ["Architected modular components for academic researchers", "Overseeing overall club operations and cross-departmental strategy"],
      systemLogCode: "LOG_2026_LEAD"
    }
  ],

  projects: [
    {
      id: "PROJ_001",
      codeName: "PASSVAULT_PRO.EXE",
      title: "PassVault Pro - Zero-Knowledge Password Manager",
      year: "2026",
      category: "Web & Systems",
      shortDescription: "Offline-first, zero-knowledge password vault Progressive Web App (PWA) with client-side SHA-256 and Web Crypto API encryption.",
      techStack: ["React 18", "TypeScript", "Web Crypto API", "Tailwind CSS", "Vite", "PWA"],
      status: "Active Deployment",
      overview: "A lightweight, secure, client-side cryptographic password manager designed with zero-knowledge architecture. All credentials are encrypted and decrypted locally in the browser runtime without transmitting raw secrets or master passwords across the wire.",
      problem: "Cloud-hosted password vaults represent high-value centralized targets vulnerable to credential stuffing, server breaches, and metadata harvesting.",
      solution: "Leveraged native browser Web Crypto API (SubtleCrypto) with PBKDF2 key derivation and AES-GCM 256-bit encryption. Encrypted blobs remain in local persistence, giving the user 100% sovereign control over their vault.",
      features: [
        "Client-side military-grade AES-GCM 256-bit symmetric encryption",
        "PBKDF2 key stretching with high iteration counts and random salts",
        "Progressive Web App (PWA) manifest for full offline standalone installation",
        "Built-in cryptographically secure password generator with customizable entropy rules",
        "Zero tracking, zero analytics, zero external network dependency for vault operations"
      ],
      technologies: [
        { name: "Web Crypto API", role: "Native browser cryptographic primitives (AES-GCM, PBKDF2, SHA-256)" },
        { name: "React 18 & TypeScript", role: "Type-safe modular state management and responsive UI" },
        { name: "Tailwind CSS", role: "High-density clean interface design with dark/light themes" },
        { name: "Service Workers", role: "Offline caching and standalone desktop/mobile installation" }
      ],
      challenges: "Balancing PBKDF2 derivation iteration count for security against UI responsiveness on low-powered mobile devices.",
      learnings: "Benchmarked Web Crypto API performance across different devices and offloaded intensive crypto operations to preserve 60fps UI smoothness.",
      githubUrl: "https://github.com/Infinite-L00pBaCk/passvault-pro",
      liveDemoUrl: "https://github.com/Infinite-L00pBaCk/passvault-pro",
      iconType: "shield",
      metrics: ["Zero-knowledge proof", "AES-256-GCM encryption", "100% offline capable"]
    },
    {
      id: "PROJ_002",
      codeName: "ARDUINO_SIMULATOR.BIN",
      title: "Arduino Uno Simulator & Beginner Master Hub",
      year: "2026",
      category: "Embedded & IoT",
      shortDescription: "Interactive web-based browser simulator and learning environment for ATmega328P Arduino beginners with virtual components and C++ pin logic.",
      techStack: ["React", "TypeScript", "Web Audio API", "Canvas 2D", "Embedded C++", "AVR Logic"],
      status: "Active Deployment",
      overview: "A comprehensive web-based hardware simulator and educational master hub that enables engineering students and makers to simulate Arduino Uno R3 microcontrollers, breadboard circuits, and digital GPIO pin operations directly inside the browser.",
      problem: "Beginners often face friction with physical hardware costs, wiring errors that damage components, or complex toolchain setups when starting embedded electronics.",
      solution: "Built a zero-install interactive simulator with circuit visualization, real-time GPIO state transitions, UART serial monitoring, and guided tutorials for ATmega328P programming.",
      features: [
        "Real-time ATmega328P digital I/O and PWM pin simulation",
        "Interactive virtual breadboard with interactive LEDs, buzzers, and sensors",
        "In-browser C++ sketch editor with syntax checking and AVR opcode emulation",
        "Virtual oscilloscope and UART serial monitor console for debugging",
        "Pre-built starter modules covering obstacle sensors, motor drivers, and I2C displays"
      ],
      technologies: [
        { name: "TypeScript & React", role: "Circuit state engine and component tree orchestration" },
        { name: "Canvas 2D & SVG", role: "High-frame-rate board rendering with trace visualizations" },
        { name: "AVR Logic Engine", role: "Emulated register manipulation (DDRB, PORTB, PINB)" },
        { name: "Web Audio API", role: "Piezo buzzer frequency synthesis and tactile relay feedback" }
      ],
      challenges: "Accurately modeling millisecond-level delay timers and interrupt handlers without blocking the browser main render loop.",
      learnings: "Implemented a time-sliced event scheduler running in a dedicated Web Worker to emulate microsecond clock ticks smoothly.",
      githubUrl: "https://github.com/Infinite-L00pBaCk/Arduino-Beginner-Master-Hub-",
      liveDemoUrl: "https://github.com/Infinite-L00pBaCk/Arduino-Beginner-Master-Hub-",
      iconType: "circuit",
      metrics: ["Zero-install browser IDE", "16MHz clock emulation", "Interactive Pin 13 LED"]
    },
    {
      id: "PROJ_003",
      codeName: "ROVER_VOICE_SCAN.ELF",
      title: "Voice-Controlled Obstacle-Avoiding Car",
      year: "2026",
      category: "Robotics & Hardware",
      shortDescription: "Autonomous embedded robotics rover executing 180° spatial ultrasonic radar mapping via SG90 servos with concurrent voice telemetry parser.",
      techStack: ["Raspberry Pi", "Arduino C++", "Python", "HC-SR04 Sensors", "SG90 Servos", "L298N Motor Driver", "HC-05 Bluetooth"],
      status: "Completed",
      overview: "An intelligent autonomous robotic ground vehicle utilizing a dual-stage obstacle detection algorithm. Features real-time spatial mapping with an ultrasonic turret and dual control via automated avoidance or voice telemetry commands.",
      problem: "Basic obstacle avoidance rovers suffer from blind spots when turning into narrow corridors or oscillating rapidly when faced with complex corner obstacles.",
      solution: "Engineered a 'Move-Stop-Scan' control algorithm where an HC-SR04 sensor sweeps 180° on an SG90 servo before deciding navigation vectors, combined with a threaded voice command parser.",
      features: [
        "180° Continuous sweep ultrasonic spatial depth profiling",
        "Non-blocking concurrent threading for real-time voice speech parsing",
        "Differential dual-motor drive via L298N H-bridge driver",
        "Fail-safe emergency stop threshold detection (<15cm cutoff)",
        "Hardware PWM speed ramp-up to prevent wheel slippage on smooth floors"
      ],
      technologies: [
        { name: "Raspberry Pi & Arduino", role: "Central controller and multithreaded task scheduler" },
        { name: "HC-SR04 & SG90", role: "Pan-tilt distance scanning and obstacle profiling" },
        { name: "L298N Motor Driver", role: "High-current DC motor speed and direction regulation" },
        { name: "Python GPIO & C++", role: "Low-level digital I/O pin manipulation and interrupts" }
      ],
      challenges: "Ultrasonic signal reflections causing erroneous readings on soft or angled surface obstacles.",
      learnings: "Implemented moving-average window filtering and multi-sample outlier rejection on time-of-flight pulses.",
      githubUrl: "https://github.com/Infinite-L00pBaCk/Robotics-Obstacle-Avoidance-Car",
      iconType: "cpu",
      metrics: ["180° spatial field", "Multithreaded listener", "<15cm emergency stop"]
    },
    {
      id: "PROJ_004",
      codeName: "STOCK_SENTIMENT_BOT.PY",
      title: "Stock Sentiment Analysis Bot & Financial Intelligence",
      year: "2026",
      category: "AI & ML",
      shortDescription: "Automated quantitative financial intelligence engine scraping market news, social feeds, and earnings transcripts for real-time sentiment scoring and trend signals.",
      techStack: ["Python", "NLTK / VADER", "Transformers / BERT", "Pandas", "BeautifulSoup4", "FastAPI"],
      status: "Active Deployment",
      overview: "An automated NLP pipeline designed to quantify investor market sentiment across global equities. The engine continuously monitors financial news feeds, SEC filings, and forum discussions to calculate weighted polarity scores correlated with trading volume and price momentum.",
      problem: "Retail investors struggle to ingest high-volume financial feeds in real time, often reacting late to macro sentiment shifts and breaking news.",
      solution: "Engineered an end-to-end sentiment aggregator leveraging fine-tuned transformer models (FinBERT) and VADER heuristics to produce real-time bullish/bearish conviction indices.",
      features: [
        "Multi-source financial news ingestion pipeline with rate-limited scrapers",
        "FinBERT and VADER dual-scoring engine for domain-specific financial sentiment",
        "Dynamic ticker tagging and entity resolution across global stock markets",
        "Time-series correlation between sentiment index spikes and price action volatility",
        "Automated daily summary report generator and Discord/Telegram alert webhooks"
      ],
      technologies: [
        { name: "Hugging Face / FinBERT", role: "Contextual sentiment embeddings for financial lexicons" },
        { name: "Python & Pandas", role: "Time-series data manipulation and rolling sentiment averages" },
        { name: "BeautifulSoup & Requests", role: "Asynchronous scraper pipelines for news APIs and RSS feeds" },
        { name: "FastAPI", role: "High-throughput REST API serving real-time score endpoints" }
      ],
      challenges: "Detecting sarcasm, ambiguous financial colloquialisms (e.g., 'to the moon'), and hedging statements in analyst disclosures.",
      learnings: "Fine-tuned a domain-adapted transformer model on financial social media datasets, boosting directional sentiment accuracy to 91.8%.",
      githubUrl: "https://github.com/Infinite-L00pBaCk/stock-sentiment-analysis-bot",
      iconType: "terminal",
      metrics: ["91.8% domain accuracy", "Multi-source news feeds", "Real-time polarity index"]
    },
    {
      id: "PROJ_005",
      codeName: "GESTURE_SMART_HOME.EXE",
      title: "AI-Powered Gesture Controlled Smart Home",
      year: "2026",
      category: "Embedded & IoT",
      shortDescription: "Real-time computer vision system mapping 21-point hand gestures to low-latency UART commands driving ESP32 PWM ambient hardware.",
      techStack: ["Python", "OpenCV", "Google MediaPipe", "ESP32", "C++ Firmware", "UART", "PWM"],
      status: "Production",
      overview: "An integrated computer vision and embedded hardware control system allowing contactless smart home automation. The application tracks 21-point hand landmarks in real time and translates recognized gestures into UART serial packets received by an ESP32 microcontroller controlling ambient lighting and hardware relays.",
      problem: "Traditional physical switches and voice assistants can be cumbersome in noisy environments or when physical contact is inconvenient or unhygienic.",
      solution: "Engineered a low-latency pipeline using OpenCV and Google MediaPipe to compute normalized vector angles between finger joints, paired with custom ESP32 C++ firmware featuring a state-lock toggle to prevent accidental inputs.",
      features: [
        "21-Point hand landmark tracking with sub-30ms recognition latency",
        "ESP32 C++ firmware with hardware PWM dimming control",
        "State-lock toggle mechanism preventing inadvertent gesture execution",
        "Bi-directional UART communication with robust packet checksums",
        "Configurable gesture presets for multi-room relay switching"
      ],
      technologies: [
        { name: "Google MediaPipe", role: "Real-time hand skeleton keypoint inference" },
        { name: "OpenCV", role: "Camera stream capture and frame matrix pre-processing" },
        { name: "ESP32 & C++", role: "PWM duty-cycle modulation and relay driver firmware" },
        { name: "UART Protocol", role: "Reliable low-latency serial packet transmission" }
      ],
      challenges: "Mitigating false positives when the user naturally moves their hand while speaking or gesturing casually.",
      learnings: "Developed a dual-stage confirmation algorithm requiring sustained gesture holding for 300ms before packet transmission, dramatically stabilizing command triggering.",
      githubUrl: "https://github.com/Infinite-L00pBaCk/gesture-controlled-smart-home",
      iconType: "circuit",
      metrics: ["<30ms pipeline latency", "98.4% gesture accuracy", "21 hand landmarks"]
    },
    {
      id: "PROJ_006",
      codeName: "VTOP_AUTO_LOGIN.CRX",
      title: "VTOP Auto Login - ML CAPTCHA Solver Extension",
      year: "2026",
      category: "AI & ML",
      shortDescription: "Zero-click authentication Chrome Extension integrating a custom-trained CRNN machine learning model achieving near-100% CAPTCHA decoding accuracy.",
      techStack: ["Manifest V3", "Machine Learning", "CRNN Model", "JavaScript", "Cloudflare Workers"],
      status: "Production",
      overview: "A browser extension streamlining daily student portal logins by automatically recognizing and solving alphanumeric distorted CAPTCHA challenges with a dedicated neural network model.",
      problem: "Students encounter repetitive, tedious CAPTCHA verification challenges multiple times a day when accessing portal schedules, grades, and attendance.",
      solution: "Trained a custom Convolutional Recurrent Neural Network (CRNN) with CTC loss on a dataset of 800+ annotated CAPTCHA samples, optimizing model weights for lightweight client-side inference.",
      features: [
        "Chrome Manifest V3 compliance with background service workers",
        "Near-100% accuracy on standard portal distortion variations",
        "Instant zero-click automated form filling upon page load",
        "Graceful fallback if portal DOM structure or challenge mechanism changes",
        "Secure credential storage using encrypted browser extension storage"
      ],
      technologies: [
        { name: "CRNN & PyTorch", role: "Model training on 800+ annotated CAPTCHA images" },
        { name: "Chrome Extension API", role: "DOM mutation observers and content script injection" },
        { name: "JavaScript / Cloudflare", role: "Lightweight inference proxy and edge caching" }
      ],
      challenges: "Variable noise lines, overlapping letters, and background grain applied to the portal CAPTCHAs.",
      learnings: "Applied image binarization, Otsu thresholding, and morphological opening before model inference to eliminate background noise artifacts.",
      githubUrl: "https://github.com/Infinite-L00pBaCk/vtop-auto-login-captcha-solver",
      iconType: "terminal",
      metrics: ["99.2% OCR accuracy", "800+ trained samples", "Zero-click auto login"]
    },
    {
      id: "PROJ_007",
      codeName: "BANKING_SYSTEM.BIN",
      title: "Banking Management System",
      year: "2026",
      category: "C++ Systems",
      shortDescription: "High-performance Object-Oriented C++ banking management engine leveraging Polymorphism, File Handling, and explicit memory optimization.",
      techStack: ["C++", "OOP", "File Handling", "STL Containers", "Smart Pointers", "Authentication"],
      status: "Completed",
      overview: "A robust console banking system engineered to demonstrate core systems programming principles in modern C++. Handles customer accounts, savings/current account polymorphism, persistent transactional logs, and secure PIN authentication.",
      problem: "Designing reliable transactional accounting systems that maintain data consistency across unexpected system interruptions while optimizing runtime memory.",
      solution: "Architected modular class hierarchies utilizing C++ inheritance and pure virtual functions, paired with binary stream file serialization and RAII memory safety.",
      features: [
        "Polymorphic account types (Savings, Current, Fixed Deposit) with custom interest calculations",
        "Binary file handling for persistent records with transactional integrity",
        "Masked PIN authentication and role-based administrative audits",
        "Memory footprint optimization using STL vectors, unordered maps, and smart pointers",
        "Complete transaction history generator with formatted ledger output"
      ],
      technologies: [
        { name: "Modern C++ (C++17)", role: "Core OOP logic, templates, and RAII management" },
        { name: "STL Containers", role: "High-performance account indexing and lookups" },
        { name: "File I/O Streams", role: "Binary record serialization and data persistence" },
        { name: "Memory Management", role: "Zero memory leaks verified via valgrind inspection" }
      ],
      challenges: "Preventing file corruption during concurrent withdrawal/deposit operations or abrupt application termination.",
      learnings: "Employed atomic write staging files and flush operations before updating permanent master account records.",
      githubUrl: "https://github.com/Infinite-L00pBaCk/cpp-banking-management-system",
      iconType: "terminal",
      metrics: ["100% RAII safe", "Binary persistence", "O(1) account lookup"]
    }
  ],

  experience: [
    {
      id: "EXP_001",
      code: "EXP_IIT_ROPAR",
      year: "May 2026 – Present",
      role: "Open-Source Software Contributor Intern",
      organization: "IIT Ropar – VLED Lab",
      location: "Rupnagar, Punjab",
      type: "Internship",
      description: "Contributing production-ready open-source code resolving national-level technical challenges alongside senior academic researchers and research engineers.",
      responsibilities: [
        "Deployed production-ready open-source code directly to public repositories resolving national-level technical challenges.",
        "Architected modular components alongside academic researchers following standard Git workflows and rigorous peer code reviews.",
        "Created technical documentation and unit test suites to verify reliability of distributed system components."
      ],
      technologies: ["Git", "GitHub", "Python", "C++", "Linux", "Open-Source Workflows"],
      badgeColor: "bg-blue-100 text-blue-900 border-blue-400"
    },
    {
      id: "EXP_002",
      code: "EXP_MAVEN_SILICON",
      year: "May 2026 – July 2026",
      role: "Embedded System Design Intern",
      organization: "Maven Silicon",
      location: "Bengaluru, India",
      type: "Internship",
      description: "Focused on low-level firmware engineering and hardware-software co-design for next-generation automated embedded modules.",
      responsibilities: [
        "Designed and implemented a real-time Home Automation System by interfacing microcontrollers, environmental sensors, and power relays.",
        "Programmed low-level embedded C/C++ firmware to accelerate sensor data processing and optimize hardware responsiveness.",
        "Conducted signal integrity and bus timing analysis across I2C and SPI peripheral lines."
      ],
      technologies: ["Embedded C/C++", "Microcontrollers", "Sensors", "Power Relays", "I2C", "SPI"],
      badgeColor: "bg-amber-100 text-amber-900 border-amber-400"
    },
    {
      id: "EXP_003",
      code: "EXP_SPACE_LAB",
      year: "June 2026 – July 2026",
      role: "Space Technology Intern",
      organization: "India Space Lab",
      location: "New Delhi, India (Remote)",
      type: "Internship",
      description: "Researched and drafted engineering architectures for nanosatellite missions, telemetry acquisition, and payload sensor suites.",
      responsibilities: [
        "Formulated technical frameworks for CanSat/CubeSat architecture, satellite payloads, telemetry protocols, and GIS remote sensing.",
        "Evaluated power budget models and environmental sensor telemetry packets for high-altitude test flights.",
        "Collaborated with aerospace engineers on radio frequency (RF) link budget calculations."
      ],
      technologies: ["CanSat", "CubeSat Architecture", "Telemetry Protocols", "GIS Remote Sensing", "RF Analysis"],
      badgeColor: "bg-purple-100 text-purple-900 border-purple-400"
    },
    {
      id: "EXP_004",
      code: "EXP_SERVICENOW",
      year: "May 2026 – June 2026",
      role: "ServiceNow System Administrator Intern",
      organization: "ServiceNow (via SmartBridge & AICTE)",
      location: "Remote",
      type: "Internship",
      description: "Administered enterprise cloud instances, created automated workflows, and evaluated emerging AI automation integrations.",
      responsibilities: [
        "Administered core platform configurations, user roles, and access controls following ServiceNow Administration Fundamentals.",
        "Automated complex business workflows via Flow Designer and validated system functionality using Automated Test Framework (ATF).",
        "Engineered custom analytics dashboards and evaluated Agentic AI framework integrations for platform scalability."
      ],
      technologies: ["ServiceNow", "Flow Designer", "Automated Test Framework (ATF)", "Agentic AI", "Analytics"],
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-400"
    },
    {
      id: "EXP_005",
      code: "EXP_PINNACLE",
      year: "May 2026 – June 2026",
      role: "Software Engineer Intern (C++)",
      organization: "Pinnacle Labs",
      location: "Remote",
      type: "Internship",
      description: "Engineered high-throughput object-oriented C++ software modules with strict memory efficiency and execution constraints.",
      responsibilities: [
        "Developed high-performance Object-Oriented C++ modules leveraging Polymorphism, Inheritance, Encapsulation, and Abstraction.",
        "Optimized low-level execution speed and memory footprint utilizing STL containers, smart pointers, and explicit memory management.",
        "Wrote benchmark suites to stress-test data structure lookups and algorithmic cache locality."
      ],
      technologies: ["C++", "OOP", "STL Containers", "Smart Pointers", "Memory Management", "Algorithms"],
      badgeColor: "bg-cyan-100 text-cyan-900 border-cyan-400"
    },
    {
      id: "EXP_006",
      code: "EXP_CISCO_COMM",
      year: "Nov 2024 – Present",
      role: "General Secretary (Promoted June 2026, Prev. Research Intern & Co-Lead)",
      organization: "Cisco Community – VIT Bhopal",
      location: "Bhopal, India",
      type: "Leadership",
      description: "Executive leader overseeing all club operations, technical direction, cross-departmental coordination, and flagship college technical festivals.",
      responsibilities: [
        "Promoted to General Secretary to oversee overall club operations, executive leadership, strategic technical initiatives, and cross-departmental operations.",
        "Coordinated technical infrastructure and event logistics for the annual Advitya fest, managing operations for 100+ attendees.",
        "Organized hands-on networking and embedded systems hack sessions for junior university cohorts."
      ],
      technologies: ["Leadership", "Operations", "Event Logistics", "Technical Infrastructure", "Community"],
      badgeColor: "bg-rose-100 text-rose-900 border-rose-400"
    },
    {
      id: "EXP_007",
      code: "EXP_ANDROID_FIN",
      year: "2024 – 2025",
      role: "Core Member – Finance & Resource Allocation",
      organization: "Android Club – VIT Bhopal",
      location: "Bhopal, India",
      type: "Leadership",
      description: "Administered financial budgeting, event sponsorship tracking, and fiscal resource allocations for campus-wide mobile and software workshops.",
      responsibilities: [
        "Managed fiscal allocations and procurement accounting for annual technical workshops and hackathons.",
        "Collaborated with executive leadership on sponsorship outreach and resource distribution.",
        "Maintained transparent budget ledger books and audited expenditure reports."
      ],
      technologies: ["Budgeting", "Resource Allocation", "Sponsorship Outreach", "Fiscal Planning", "Operations"],
      badgeColor: "bg-green-100 text-green-900 border-green-400"
    }
  ],

  skills: {
    programming: [
      { name: "C++", tag: "Expert / OOP / STL", highlight: true },
      { name: "Embedded C/C++", tag: "Firmware / Microcontrollers", highlight: true },
      { name: "C", tag: "Low-level / Systems" },
      { name: "Python", tag: "OpenCV / ML / Scripting", highlight: true },
      { name: "JavaScript", tag: "ESNext / Asynchronous" },
      { name: "TypeScript", tag: "Type-Safe / Architecture", highlight: true },
      { name: "Java", tag: "OOP / Applications" },
      { name: "SQL", tag: "Relational Queries" }
    ],
    web: [
      { name: "React 18 / 19", tag: "Hooks / State / Components", highlight: true },
      { name: "Vite", tag: "Build Tooling / Bundling" },
      { name: "Tailwind CSS", tag: "Utility-First UI / Design", highlight: true },
      { name: "Framer Motion", tag: "Declarative Animation" },
      { name: "Web Crypto API", tag: "SubtleCrypto / Encryption", highlight: true },
      { name: "HTML5 & CSS3", tag: "Semantic / Responsive" },
      { name: "PWA Standards", tag: "Service Workers / Offline" }
    ],
    electronics: [
      { name: "Raspberry Pi", tag: "Linux / GPIO / Multithreading", highlight: true },
      { name: "ESP32 & ESP8266", tag: "WiFi / BLE / PWM / Low-Power", highlight: true },
      { name: "Arduino", tag: "Rapid Prototyping / Shields" },
      { name: "L298N & Motor Drivers", tag: "H-Bridge / High Current" },
      { name: "I2C / SPI / UART", tag: "Hardware Protocols", highlight: true },
      { name: "Servos & Telemetry", tag: "SG90 / Ultrasonic / Sensors" },
      { name: "Cadence VLSI", tag: "Digital Design Flow" }
    ],
    tools: [
      { name: "Git & GitHub", tag: "Version Control / PR Workflows", highlight: true },
      { name: "VS Code", tag: "Primary Development IDE" },
      { name: "Arduino IDE", tag: "Firmware Flashing" },
      { name: "Cloudflare Workers", tag: "Serverless Edge Functions" },
      { name: "ServiceNow", tag: "Administration / Flow Designer", highlight: true },
      { name: "ATF (Auto Test Framework)", tag: "Automated Validation" }
    ],
    foundations: [
      { name: "Object-Oriented Design", tag: "Polymorphism & Abstraction", highlight: true },
      { name: "Computer Vision", tag: "MediaPipe / OpenCV", highlight: true },
      { name: "Data Structures & Algorithms", tag: "Problem Solving" },
      { name: "UI/UX & Graphic Design", tag: "Visual Hierarchy & Typography" },
      { name: "CanSat / CubeSat Payloads", tag: "Telemetry Frameworks" }
    ]
  },

  skillCards: [
    {
      id: "SKILL_001",
      codeName: "CPP_SYSTEMS_ENGINE.SYS",
      title: "C++ Systems Programming & Memory Optimization",
      year: "2024–2026",
      category: "Programming & C++",
      status: "Core Discipline",
      proficiencyLevel: "Expert (95%)",
      shortDescription: "Object-Oriented C++ architectures leveraging Polymorphism, Encapsulation, RAII patterns, smart pointers, and STL containers for deterministic execution.",
      techStack: ["C++17 / C++20", "OOP & RAII", "Smart Pointers", "STL Algorithms", "Memory Profiling", "Cache Locality"],
      iconType: "terminal",
      metrics: ["Strict RAII Memory Safety", "Zero Memory Leaks", "STL Benchmark Tested"],
      overview: "Developed during high-throughput internship work at Pinnacle Labs and system projects, emphasizing strict memory layouts, cache efficiency, and object-oriented paradigms.",
      practicalApplications: [
        "Deterministic RAII resource management in C++ modules",
        "High-throughput binary file transaction persistence",
        "Algorithmic data structure optimization with STL containers"
      ],
      relatedRepoUrl: "https://github.com/Infinite-L00pBaCk/cpp-banking-management-system",
      relatedProjectName: "Banking Management System"
    },
    {
      id: "SKILL_002",
      codeName: "EMBEDDED_C_AVR.DRV",
      title: "Embedded C/C++ Firmware & ATmega328P Logic",
      year: "2024–2026",
      category: "Embedded & Hardware",
      status: "Production Tested",
      proficiencyLevel: "Expert (95%)",
      shortDescription: "Bare-metal microcontroller programming for ATmega328P and ESP32 with direct bitwise register manipulation, interrupt service routines (ISRs), and timer prescalers.",
      techStack: ["Embedded C", "ATmega328P", "ESP32", "Interrupts (ISR)", "Timers / Prescalers", "Bitwise Registers"],
      iconType: "circuit",
      metrics: ["16 MHz Clock Cycle Sync", "Sub-millisecond ISR Response", "Low-Power Modes"],
      overview: "Extensive hands-on firmware development across Maven Silicon internship, Cisco Community research, and browser simulator engine architectures.",
      practicalApplications: [
        "Direct AVR hardware register manipulation and pin mapping",
        "Timer-driven pulse-width modulation (PWM) frequency synthesis",
        "Hardware interrupt event loops for sensor triggering"
      ],
      relatedRepoUrl: "https://github.com/Infinite-L00pBaCk/Arduino-Beginner-Master-Hub-",
      relatedProjectName: "Arduino Uno Simulator"
    },
    {
      id: "SKILL_003",
      codeName: "AUTONOMOUS_ROBOTICS.RAD",
      title: "Autonomous Robotics, Motor Control & Ultrasonic Radar",
      year: "2025–2026",
      category: "Embedded & Hardware",
      status: "Hardware Verified",
      proficiencyLevel: "Advanced (90%)",
      shortDescription: "Integration of L298N dual H-bridge motor drivers, HC-05 Bluetooth transceivers, and SG90 servo-mounted ultrasonic sensors for real-time 180° spatial obstacle mapping.",
      techStack: ["L298N H-Bridge", "HC-05 Bluetooth", "SG90 Servo", "Ultrasonic HC-SR04", "Spatial Mapping", "PWM Speed Control"],
      iconType: "cpu",
      metrics: ["180° Spatial Range Scanning", "Concurrent Voice Parsing", "Dynamic PWM Braking"],
      overview: "Designed autonomous vehicle navigation systems responding concurrently to Bluetooth Android vocal commands and live radar ping arrays.",
      practicalApplications: [
        "Differential drive motor speed balancing with dual PWM channels",
        "Real-time obstacle avoidance non-blocking state machines",
        "Bluetooth SPP serial command decoding and fail-safe stops"
      ],
      relatedRepoUrl: "https://github.com/Infinite-L00pBaCk/Robotics-Obstacle-Avoidance-Car",
      relatedProjectName: "Obstacle-Avoiding Car"
    },
    {
      id: "SKILL_004",
      codeName: "EDGE_COMPUTER_VISION.AI",
      title: "Edge Computer Vision, MediaPipe & PyTorch CRNN",
      year: "2025–2026",
      category: "AI & Computer Vision",
      status: "Award Winner",
      proficiencyLevel: "Advanced (90%)",
      shortDescription: "Trained CRNN models (98.4% optical text recognition accuracy) and deployed real-time MediaPipe 21-point hand landmark gesture tracking with OpenCV filters.",
      techStack: ["Python", "OpenCV", "MediaPipe 21-pt", "PyTorch / CRNN", "Image Processing", "Haar Cascades"],
      iconType: "layers",
      metrics: ["98.4% CRNN Model Accuracy", "30 FPS Edge Landmark Tracking", "IIT Madras 3rd Place"],
      overview: "Hackathon-proven computer vision pipelines developed during Shaastra 2026 (3rd place) and IoT smart home gesture controller research.",
      practicalApplications: [
        "Automated CAPTCHA segmentation and recurrent neural decoding",
        "Spatial hand-gesture appliance control via UART serial relays",
        "Real-time facial landmark and edge biometric verification"
      ],
      relatedRepoUrl: "https://github.com/Infinite-L00pBaCk/gesture-controlled-smart-home",
      relatedProjectName: "Gesture Smart Home"
    },
    {
      id: "SKILL_005",
      codeName: "FINANCIAL_NLP_ENGINE.BOT",
      title: "Automated NLP Sentiment Analysis & Financial Bots",
      year: "2026",
      category: "AI & Computer Vision",
      status: "Active Deployment",
      proficiencyLevel: "Proficient (85%)",
      shortDescription: "End-to-end Python NLP sentiment aggregation pipelines scoring real-time financial market news and correlating sentiment shifts with price indicators.",
      techStack: ["Python NLP", "NLTK / VADER", "Time-Series Data", "Market APIs", "Sentiment Scoring", "Data Visualizations"],
      iconType: "terminal",
      metrics: ["Real-Time News Ingestion", "Polarity & Subjectivity Vectoring", "Automated Visual Reports"],
      overview: "Engineered quantitative sentiment tracking systems converting unstructured market headlines into structured analytical polarity scores.",
      practicalApplications: [
        "Market news sentiment parsing, tokenization, and scoring",
        "Correlation analysis against trading volume and moving averages",
        "Automated algorithmic summary reporting with Matplotlib visual graphs"
      ],
      relatedRepoUrl: "https://github.com/Infinite-L00pBaCk/stock-sentiment-analysis-bot",
      relatedProjectName: "Stock Sentiment Bot"
    },
    {
      id: "SKILL_006",
      codeName: "REACT_WEB_CRYPTO.PWA",
      title: "Full-Stack React 19, TypeScript & Web Crypto PWA",
      year: "2025–2026",
      category: "Web & Systems",
      status: "Driver Active",
      proficiencyLevel: "Expert (95%)",
      shortDescription: "High-performance client-side reactive architectures utilizing TypeScript, Tailwind CSS, Web Audio synthesizers, and zero-knowledge AES-GCM-256 Web Crypto API encryption.",
      techStack: ["React 19", "TypeScript", "Tailwind CSS", "Web Crypto API", "PBKDF2 / AES-GCM", "PWA Offline"],
      iconType: "shield",
      metrics: ["Zero-Knowledge Encryption", "100/100 PWA Lighthouse", "Zero Server Latency"],
      overview: "Architected privacy-preserving client-side applications with offline Service Worker persistence and responsive retro-futuristic interfaces.",
      practicalApplications: [
        "Client-side AES-GCM-256 and PBKDF2 cryptographic vaults",
        "Responsive retro CRT & modular UI design systems",
        "Offline IndexedDB caching and PWA service workers"
      ],
      relatedRepoUrl: "https://github.com/Infinite-L00pBaCk/passvault-pro",
      relatedProjectName: "PassVault Pro"
    },
    {
      id: "SKILL_007",
      codeName: "HARDWARE_BUS_PROTOCOLS.IO",
      title: "Hardware Protocols: UART, SPI, I2C & LoRa Telemetry",
      year: "2024–2026",
      category: "Embedded & Hardware",
      status: "Core Discipline",
      proficiencyLevel: "Expert (95%)",
      shortDescription: "Low-level synchronous and asynchronous serial communication bus architectures for multi-sensor fusion (BMP280, MPU6050) and long-range LoRa telemetry framing.",
      techStack: ["I2C Bus", "SPI Protocol", "UART / Serial", "LoRa Telemetry", "BMP280 / MPU6050", "Framing Logic"],
      iconType: "circuit",
      metrics: ["400 kHz Fast-mode I2C", "Byte-Level Packet CRC Validation", "Multi-Drop Bus Arbitrage"],
      overview: "Hardware communication foundations applied during India Space Lab satellite payload engineering and multi-sensor industrial prototypes.",
      practicalApplications: [
        "Sensor registry reading via I2C / SPI master loops",
        "LoRa long-range telemetry packet serialization",
        "UART command packet parsing with checksum validation"
      ],
      relatedRepoUrl: "https://github.com/Infinite-L00pBaCk/Robotics-Obstacle-Avoidance-Car",
      relatedProjectName: "Obstacle-Avoiding Car"
    },
    {
      id: "SKILL_008",
      codeName: "SERVICENOW_ATF_FLOW.CLD",
      title: "ServiceNow Platform Administration & Automated Test Framework (ATF)",
      year: "2026",
      category: "Developer Tools & EDA",
      status: "Production Tested",
      proficiencyLevel: "Advanced (90%)",
      shortDescription: "Enterprise ServiceNow platform administration, automated workflow design using Flow Designer, access governance, and regression testing via Automated Test Framework (ATF).",
      techStack: ["ServiceNow", "Flow Designer", "ATF Testing", "Role-Based Access", "Platform Analytics", "Cloud Workflows"],
      iconType: "wrench",
      metrics: ["100% Automated ATF Test Suites", "Enterprise RBAC Compliance", "Streamlined Incident Flows"],
      overview: "Hands-on enterprise system administration internship, creating validated business workflows and evaluating Agentic AI integrations.",
      practicalApplications: [
        "Automated end-to-end regression testing with ATF",
        "Low-code enterprise business logic in Flow Designer",
        "Role-based access control and security ACL governance"
      ],
      relatedRepoUrl: "https://www.linkedin.com/in/priyam-prakash-b044972a8",
      relatedProjectName: "ServiceNow Administration"
    },
    {
      id: "SKILL_009",
      codeName: "VLSI_CADENCE_EDA.PCB",
      title: "VLSI Digital Design Flow & Cadence EDA Prototyping",
      year: "2024–2026",
      category: "Developer Tools & EDA",
      status: "Hardware Verified",
      proficiencyLevel: "Proficient (85%)",
      shortDescription: "Semiconductor digital design flow, schematic capture, timing closure, digital logic simulation, and circuit analysis with IEEE and Cadence toolchains.",
      techStack: ["Cadence Virtuoso", "Digital Logic Flow", "Schematic Capture", "Timing Analysis", "Circuit Simulation", "IEEE Standards"],
      iconType: "circuit",
      metrics: ["IEEE Cadence Certified", "Digital Logic Gate Simulation", "Timing Constraint Synthesis"],
      overview: "Formal electronics and communication engineering training covering physical silicon design aspects, logic synthesis, and timing closure.",
      practicalApplications: [
        "Digital CMOS schematic capture and simulation",
        "Setup/hold time calculation and slack optimization",
        "Combinational & sequential circuit verification"
      ],
      relatedRepoUrl: "https://www.linkedin.com/in/priyam-prakash-b044972a8",
      relatedProjectName: "Cadence VLSI Design Flow"
    },
    {
      id: "SKILL_010",
      codeName: "DEV_DEVOPS_TOOLKIT.OPS",
      title: "Modern Developer Toolkit, Git Workflows & Linux CLI",
      year: "2023–2026",
      category: "Developer Tools & EDA",
      status: "Core Discipline",
      proficiencyLevel: "Expert (95%)",
      shortDescription: "Professional Git & GitHub PR workflows, Linux shell scripting, Vite/Node build pipelines, Cloudflare Workers serverless deployment, and agile coordination.",
      techStack: ["Git & GitHub", "Linux / Bash", "VS Code", "Vite / Node.js", "Cloudflare Workers", "CI/CD Concepts"],
      iconType: "terminal",
      metrics: ["100+ Production Commits", "Linux CLI Fluency", "Serverless Edge Routing"],
      overview: "Core developer efficiency tooling utilized across open-source leadership at IIT Ropar VLED Lab, Cisco Community, and multi-repo architectures.",
      practicalApplications: [
        "Git branch management, merge conflict resolution, and PR reviews",
        "Linux bash automation and development containerization",
        "Vite fast bundling and modern TypeScript compilation"
      ],
      relatedRepoUrl: "https://github.com/Infinite-L00pBaCk",
      relatedProjectName: "GitHub Repositories"
    }
  ],

  achievements: [
    {
      id: "ACH_001",
      code: "HACK_001",
      title: "3rd Place Winner – HackSecure Hackathon",
      organization: "Shaastra 2026 | IIT Madras",
      year: "2026",
      type: "Hackathon",
      description: "Awarded 3rd place in cybersecurity hackathon at Shaastra, the premier annual technical festival of Indian Institute of Technology Madras.",
      badge: "IIT MADRAS WINNER"
    },
    {
      id: "ACH_002",
      code: "MEMB_001",
      title: "IEEE Student Member (#102161442)",
      organization: "IEEE Computer Society & Student Branch",
      year: "2026",
      type: "Membership",
      description: "Active member contributing to IEEE Student Branch Ideation Department across MP Section, organizing tech outreach forums.",
      verificationId: "102161442",
      badge: "IEEE ACTIVE"
    },
    {
      id: "ACH_003",
      code: "CERT_001",
      title: "Gemini Certified University Student",
      organization: "Google for Developers",
      year: "2026",
      type: "Certification",
      description: "Certified proficiency in multimodal AI prompt engineering, API utilization, and generative design patterns.",
      verificationId: "167888925",
      badge: "GOOGLE DEV"
    },
    {
      id: "ACH_004",
      code: "CERT_002",
      title: "AI Foundations: Prompt Engineering with ChatGPT",
      organization: "Arizona State University",
      year: "2026",
      type: "Certification",
      description: "Rigorous credential covering system instruction engineering, reasoning trees, and LLM orchestration strategies.",
      verificationId: "1RAYIXSYKPFL",
      badge: "ASU VERIFIED"
    },
    {
      id: "ACH_005",
      code: "CERT_003",
      title: "Intro to Generative AI & Image Generation",
      organization: "Google Cloud",
      year: "2026",
      type: "Certification",
      description: "Hands-on certification exploring diffusion architectures, multimodal latent spaces, and Cloud AI deployments.",
      verificationId: "BHWLUJ8TWW2O",
      badge: "GOOGLE CLOUD"
    },
    {
      id: "ACH_006",
      code: "CERT_004",
      title: "Future-Proof Your AI Skills with GenAI",
      organization: "HCL GUVI",
      year: "2026",
      type: "Certification",
      description: "Comprehensive industry program on practical GenAI pipeline integration, vector embeddings, and enterprise productivity.",
      verificationId: "7S03c61o1n1178pXhJ",
      badge: "HCL GUVI"
    },
    {
      id: "ACH_007",
      code: "CERT_005",
      title: "Introduction to Networking",
      organization: "NVIDIA",
      year: "2026",
      type: "Certification",
      description: "Foundational networking certificate covering OSI layers, packet routing, latency optimization, and enterprise topologies.",
      verificationId: "2IVFFKX2AVB7",
      badge: "NVIDIA DEEP"
    },
    {
      id: "ACH_008",
      code: "CERT_006",
      title: "Firebase Studio for Beginners: Build & Deploy Apps",
      organization: "Great Learning",
      year: "2026",
      type: "Certification",
      description: "Practical credential in cloud datastores, serverless authentication rules, and web application hosting.",
      verificationId: "QLPIATEI",
      badge: "GREAT LEARNING"
    },
    {
      id: "ACH_009",
      code: "CERT_007",
      title: "VLSI Digital Design Flow: Industry Aspect using Cadence",
      organization: "IEEE",
      year: "2026",
      type: "Certification",
      description: "Specialized training on industry standard semiconductor design flow, synthesis, and timing closure via Cadence tools.",
      badge: "IEEE CADENCE"
    }
  ],

  currentWork: [
    {
      id: "LAB_01",
      processId: "ACTIVE_PROCESS_01",
      title: "IIT Ropar VLED Lab Open-Source Architecture",
      status: "RUNNING",
      category: "Open-Source Research",
      progressPercent: 88,
      description: "Engineering modular components for open-source technical repositories solving national-level challenges alongside academic researchers.",
      stack: ["Python", "Git", "System Design", "Linux"],
      lastUpdate: "Actively deploying commits & peer reviews"
    },
    {
      id: "LAB_02",
      processId: "ACTIVE_PROCESS_02",
      title: "Interactive Retro OS Portfolio Web Architecture",
      status: "BUILDING",
      category: "Frontend Creative",
      progressPercent: 95,
      description: "Handcrafted 1990s desktop CRT experience combined with modern engineering showcase, sound synthesis, and responsive layouts.",
      stack: ["React 19", "Tailwind CSS", "Web Audio", "Vite"],
      lastUpdate: "Boot sequence and CRT scanlines stabilized"
    }
  ],

  social: {
    github: "https://github.com/Infinite-L00pBaCk",
    linkedin: "https://www.linkedin.com/in/priyam-prakash-b044972a8",
    email: "priyamwork111@gmail.com",
    phone: "+91 60019 99078",
    location: "VIT Bhopal, MP, India"
  }
};
