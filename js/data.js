/**
 * ═══════════════════════════════════════════════════════
 * TEAM VAYU — CENTRAL DATA LAYER
 * ═══════════════════════════════════════════════════════
 * Centralized data store for:
 * - Brand identity & institutional affiliations
 * - Fleet UAVs (Drishti, Rakshak, Sagar) with capabilities & components
 * - Multi-cohort team roster (2026, 2025) with 13 domains,
 *   leads, members, area of expertise, and contributions.
 * - Competitions & achievements
 * - Sponsorship tiers & partner benefits
 * ═══════════════════════════════════════════════════════
 */

const VAYU_DATA = {

  // ── BRAND ──────────────────────────────────────────
  brand: {
    name: "TEAM VAYU",
    tagline: "ENGINEERING THE FUTURE OF FLIGHT",
    description: "The premier student aerospace and unmanned aerial systems engineering team from IEM (Institute of Engineering & Management), Kolkata. Designing, fabricating, and flight-testing mission-critical autonomous UAVs.",
    institute: "IEM — Institute of Engineering & Management",
    city: "Kolkata",
    country: "India",
    instagram: "@teamvayu.iemk",
    instagramUrl: "https://www.instagram.com/teamvayu.iemk/",
    linkedinUrl: "#",
    youtubeUrl: "#",
    email: "teamvayu@iem.edu.in",
    phone: "+91 98740 XXXXX",
    location: "Kolkata, West Bengal, India",
  },

  // ── NAVIGATION ─────────────────────────────────────
  navLinks: [
    { id: "home", label: "HOME", num: "01", href: "/" },
    { id: "fleet", label: "FLEET", num: "02", href: "/fleet" },
    { id: "team", label: "TEAM", num: "03", href: "/team" },
  ],

  // ── STATS ──────────────────────────────────────────
  stats: [
    { value: "18+", label: "ENGINEERS & RESEARCHERS", icon: "users" },
    { value: "03",  label: "MISSION UAV PLATFORMS",   icon: "cpu" },
    { value: "100%",label: "INDIGENOUS CARBON BUILD", icon: "shield" },
    { value: "04+", label: "COMPETITION DEPLOYMENTS", icon: "trophy" },
  ],

  // ── LATEST DEVELOPMENTS (HOME PAGE) ─────────────────
  latestDevelopments: [
    {
      id: "dev-01",
      date: "OCTOBER 2026",
      tag: "FLIGHT TESTING // SURVEILLANCE",
      title: "Drishti Autonomous Tracking Flight Validation",
      excerpt: "Completed closed-loop gimbal target acquisition flight tests with sub-second optical lock in high-wind conditions.",
      specs: ["28 min Endurance", "1080p 60fps Stream", "AI Object Lock"]
    },
    {
      id: "dev-02",
      date: "SEPTEMBER 2026",
      tag: "HEAVY LIFT // PAYLOAD DELIVERY",
      title: "Rakshak 2.0kg Precision Release Bench Trials",
      excerpt: "Structural drop-bay mechanism passed 100 consecutive automated release cycles with zero latch binding.",
      specs: ["2.0 kg Payload", "Hexacopter Redundancy", "Dual RTK GPS"]
    },
    {
      id: "dev-03",
      date: "AUGUST 2026",
      tag: "MARITIME // WATER RESCUE",
      title: "Sagar Hydrophobic Airframe Stress Analysis",
      excerpt: "Water-resistant IP66 fuselage composite layup successfully tested with emergency pneumatic life-buoy ejection.",
      specs: ["IP66 Sealed Hull", "Pneumatic Buoy Eject", "Marine Telemetry"]
    }
  ],

  // ── FLEET PLATFORMS (FLEET PAGE) ────────────────────
  fleet: [
    {
      id: "drishti",
      name: "DRISHTI",
      callsign: "VAYU-UAV-01",
      category: "SURVEILLANCE & RECONNAISSANCE",
      configuration: "Quadcopter Platform",
      tagline: "High-Endurance Surveillance Quadcopter fitted with 3-Axis Stabilized Gimbal Camera",
      description: "Drishti is Team VAYU's frontline autonomous reconnaissance quadcopter, purpose-engineered for persistent aerial surveillance, perimeter inspection, and target tracking. Equipped with an onboard neural vision accelerator and a 3-axis stabilized optical sensor.",
      metrics: {
        endurance: "28 Minutes",
        range: "6.5 km Telemetry",
        maxSpeed: "65 km/h",
        mtow: "3.2 kg"
      },
      capabilities: [
        "Autonomous Waypoint Navigation & Geofence Patrol",
        "Real-Time Object Detection & Deep Learning Target Tracking",
        "Encrypted 1080p 60fps Low-Latency Video Transmission",
        "Sub-Second Target Lock with Auto Gimbal Horizon Stabilization",
        "Automated Fail-Safe Return-to-Launch (RTL) on Radio Loss",
        "Precision Optical Flow Hovering in GPS-Degraded Environments"
      ],
      components: [
        { category: "Airframe", detail: "Custom 450mm 3K Twill Carbon Fiber Quad Frame with CNC Billet Clamps" },
        { category: "Flight Controller", detail: "Cube Orange+ with Triple Redundant IMUs & ADS-B Receiver" },
        { category: "Propulsion", detail: "4x 2216 880KV High-Efficiency Brushless Motors with Carbon Propellers" },
        { category: "Electronic Speed Controls", detail: "4x 40A BLHeli_32 DShot600 Micro ESCs with Active Freewheeling" },
        { category: "Camera & Gimbal", detail: "SIYI A8 Mini 4K 8MP 6X Zoom Sensor with 3-Axis Brushless Gimbal" },
        { category: "Telemetry & GCS", detail: "Herelink HD 2.4GHz Integrated Transmission & Dual Antenna System" },
        { category: "Power System", detail: "4S 6200mAh 75C High-Density Lithium Polymer Battery Pack" }
      ],
      image: "assets/images/project-1.jpg"
    },
    {
      id: "rakshak",
      name: "RAKSHAK",
      callsign: "VAYU-UAV-02",
      category: "HEAVY LIFT & AID DELIVERY",
      configuration: "Hexacopter Platform",
      tagline: "Heavy-Lift Autonomous Payload Delivery Hexacopter with 2.0 kg Cargo Capacity",
      description: "Rakshak is designed for emergency relief, disaster aid, and autonomous medical supply delivery. Powered by a heavy-lift six-rotor propulsion configuration, it features an automated servo release latch that delivers payloads precisely to targeted coordinate zones.",
      metrics: {
        payload: "2.0 kg Payload",
        endurance: "22 Minutes (Full Load)",
        range: "8.0 km Telemetry",
        mtow: "8.4 kg"
      },
      capabilities: [
        "2.0 kg Active Cargo Capacity with Centered Gravity Alignment",
        "High-Precision Servo-Actuated Automated Drop Bay",
        "Hexacopter Rotor-Loss Fail-Safe (Controlled Landing on 5 Motors)",
        "LiDAR-Based Real-Time Ground Proximity & Terrain Following",
        "Dual RTK-GPS Centimeter-Accuracy Landing Guidance",
        "Wind-Resistant Operation in Gusts Exceeding 25 Knots"
      ],
      components: [
        { category: "Airframe", detail: "850mm Heavy-Duty Carbon Fiber Hexa Frame with Folding Arm Locks" },
        { category: "Flight Controller", detail: "Pixhawk 6C Autopilot paired with Dual F9P High-Precision RTK GPS" },
        { category: "Propulsion", detail: "6x T-Motor U5 400KV Heavy-Lift Brushless Motors with 16-inch Carbon Props" },
        { category: "Electronic Speed Controls", detail: "6x 60A T-Motor Flame High-Voltage ESCs (IP55 Weatherproof)" },
        { category: "Drop Mechanism", detail: "Custom Aircraft-Grade Aluminum CNC Quick-Release Latch Mechanism" },
        { category: "Altimetry Sensor", detail: "Benewake TFmini-S Micro Solid-State LiDAR Rangefinder (12m)" },
        { category: "Power System", detail: "6S 16000mAh Solid-State High-Capacity LiPo Battery with Smart BMS" }
      ],
      image: "assets/images/project-2.jpg"
    },
    {
      id: "sagar",
      name: "SAGAR",
      callsign: "VAYU-UAV-03",
      category: "MARITIME & WATER RESCUE",
      configuration: "Sealed Marine Quadcopter",
      tagline: "All-Weather Water Rescue Drone with Life-Buoy Deployment & Marine Telemetry",
      description: "Sagar is Team VAYU's dedicated maritime rescue platform. Equipped with water-resistant composite seals, floatation landing skids, and an emergency pneumatic life-buoy deployer, Sagar is built to locate stranded swimmers or flood victims and drop lifesaving equipment.",
      metrics: {
        protection: "IP66 Water Resistant",
        endurance: "25 Minutes",
        dropCapacity: "Inflatable Buoy",
        mtow: "3.8 kg"
      },
      capabilities: [
        "Water-Resistant Sealed Monocoque Fuselage with Floatable Skid Struts",
        "Pneumatic Emergency Self-Inflatable Life-Buoy Drop System",
        "Ultra-High Output 2000-Lumen Marine Searchlight for Night Missions",
        "Starlight Low-Light Night-Vision FPV Sensor for Zero-Light Water Rescue",
        "Automated Marine Distress RF Beacon Deployment",
        "Anti-Corrosion Marine-Grade Hardware and Coated Electronics"
      ],
      components: [
        { category: "Airframe", detail: "Hydrophobic Coated Carbon Fiber Monocoque with Gasket-Sealed Canopy" },
        { category: "Flight Controller", detail: "Conformal-Coated Pixhawk 6C Autopilot with Pressure-Sealed Baro Chamber" },
        { category: "Propulsion", detail: "4x IP67 Waterproof Brushless Motors with Salt-Resistant Ceramic Bearings" },
        { category: "Electronic Speed Controls", detail: "4x 50A Waterproof ESCs with Internal Thermal Cutoff Sensors" },
        { category: "Rescue Payload", detail: "Pneumatically Deployed Water-Activated Self-Inflating Life Buoy Module" },
        { category: "Search Optics", detail: "RunCam Night Eagle Starlight Camera with 2000-Lumen High-CRI Spot LED" },
        { category: "Power System", detail: "4S 8000mAh Marine-Sealed High-Capacity LiPo Battery" }
      ],
      image: "assets/images/project-3.jpg"
    }
  ],

  // ── GALLERY ────────────────────────────────────────
  galleryImages: [
    { src: "assets/images/hero-bg.jpg", alt: "UAV Autonomous Flight Testing", category: "FLIGHT", title: "Autonomous Flight Trials" },
    { src: "assets/images/project-1.jpg", alt: "Drishti Gimbal Surveillance Drone", category: "FLEET", title: "Drishti Surveillance Platform" },
    { src: "assets/images/project-2.jpg", alt: "Rakshak Heavy Lift Hexacopter", category: "FLEET", title: "Rakshak Payload Hexacopter" },
    { src: "assets/images/project-3.jpg", alt: "Sagar Water Rescue Drone", category: "FLEET", title: "Sagar Marine Rescue UAV" },
    { src: "assets/images/gallery-1.jpg", alt: "Precision CAD Airframe Modeling", category: "DESIGN", title: "3D CAD Airframe Engineering" },
    { src: "assets/images/gallery-2.jpg", alt: "Field Propulsion Dyno Testing", category: "TESTING", title: "Propulsion Dynamometer Lab" },
  ],

  // ── MULTI-YEAR TEAM ROSTER (TEAM PAGE) ──────────────
  teamByYear: {
    "2026": {
      leadership: {
        captain: {
          name: "Iman",
          fullName: "Iman Das",
          role: "Team Captain",
          badge: "★ TEAM CAPTAIN",
          initials: "IM",
          callsign: "VAYU-CMD-01",
          area: "System Architecture & Flight Strategy",
          contribution: "Overall team leadership, UAV structural conceptualization, flight operations and mission coordinator.",
          photo: "assets/images/team/iman.jpg"
        },
        softwareLead: {
          name: "Swarnavo",
          fullName: "Swarnavo De",
          role: "Software Lead",
          badge: "SOFTWARE LEAD",
          initials: "SD",
          callsign: "VAYU-SW-01",
          area: "Autonomous Flight Stack & Perception",
          contribution: "Autonomous autopilot architecture, SITL simulation pipelines, and computer vision neural stack.",
          photo: "assets/images/team/swarnavo.jpg"
        },
        hardwareLead: {
          name: "Arkadeep",
          fullName: "Arkadeep Roy",
          role: "Hardware Lead",
          badge: "HARDWARE LEAD",
          initials: "AR",
          callsign: "VAYU-HW-01",
          area: "Composite Structures & Propulsion",
          contribution: "Carbon fiber airframe manufacturing, propulsion characterization, and hardware system integration.",
          photo: "assets/images/team/arkadeep.jpg"
        }
      },
      domains: [
        {
          id: "computer-vision",
          name: "Computer Vision",
          shortName: "COMPUTER VISION",
          tag: "SOFTWARE // CV-01",
          lead: {
            name: "Rishin",
            role: "Computer Vision Lead",
            badge: "DOMAIN LEAD",
            initials: "RM",
            callsign: "VAYU-CV-01",
            area: "Deep Learning Perception & Object Tracking",
            contribution: "YOLO target acquisition pipeline and real-time edge AI inference.",
            photo: null
          },
          members: [
            {
              name: "Swarnavo",
              role: "CV Perception Specialist",
              badge: "CORE MEMBER",
              initials: "SD",
              callsign: "VAYU-CV-MEM",
              area: "Optical Flow & Edge Computing",
              contribution: "Jetson Nano embedded hardware acceleration.",
              photo: "assets/images/team/swarnavo.jpg"
            },
            {
              name: "Sangita",
              role: "Image Processing & Datasets",
              badge: "CORE MEMBER",
              initials: "SG",
              callsign: "VAYU-CV-MEM",
              area: "Aerial Imagery Processing",
              contribution: "Target classification datasets and neural network training.",
              photo: null
            }
          ]
        },
        {
          id: "simulation",
          name: "Simulation",
          shortName: "SIMULATION",
          tag: "SOFTWARE // SIM-02",
          lead: {
            name: "Bijoy",
            role: "Simulation Lead",
            badge: "DOMAIN LEAD",
            initials: "BS",
            callsign: "VAYU-SIM-01",
            area: "Flight Dynamics Modeling & HITL Simulation",
            contribution: "Gazebo/SITL simulator architecture and flight telemetry physics modeling.",
            photo: null
          },
          members: [
            {
              name: "Iman",
              role: "Flight Dynamics Modeling",
              badge: "CORE MEMBER",
              initials: "IM",
              callsign: "VAYU-SIM-MEM",
              area: "Aerodynamic Simulation",
              contribution: "Airfoil polar curves and rigid-body 6-DOF dynamics.",
              photo: "assets/images/team/iman.jpg"
            },
            {
              name: "Rishin",
              role: "Sensor Physics Emulation",
              badge: "CORE MEMBER",
              initials: "RM",
              callsign: "VAYU-SIM-MEM",
              area: "Sensor Simulation",
              contribution: "Virtual camera and IMU synthetic telemetry feeds.",
              photo: null
            }
          ]
        },
        {
          id: "gcs-communication",
          name: "GCS and Communication",
          shortName: "GCS & COMM",
          tag: "AVIONICS // GCS-03",
          lead: {
            name: "Archit",
            role: "GCS & Communication Lead",
            badge: "DOMAIN LEAD",
            initials: "AC",
            callsign: "VAYU-GCS-01",
            area: "Ground Control Station & RF Telemetry",
            contribution: "Long-range bidirectional telemetry protocols and custom ground station HUD.",
            photo: null
          },
          members: [
            {
              name: "Swarnavo",
              role: "MAVLink Network Protocols",
              badge: "CORE MEMBER",
              initials: "SD",
              callsign: "VAYU-GCS-MEM",
              area: "Network Protocols & Encryption",
              contribution: "MAVLink telemetry communication pipeline and fail-safe link monitoring.",
              photo: "assets/images/team/swarnavo.jpg"
            },
            {
              name: "Sutavra",
              role: "RF Antennas & Ground Hardware",
              badge: "CORE MEMBER",
              initials: "ST",
              callsign: "VAYU-GCS-MEM",
              area: "RF Hardware & Antenna Tuning",
              contribution: "High-gain directional tracking antenna arrays and diversity receivers.",
              photo: "assets/images/team/sutavra.jpg"
            }
          ]
        },
        {
          id: "autonomous-navigation",
          name: "Autonomous Navigation",
          shortName: "AUTONOMOUS NAV",
          tag: "SOFTWARE // NAV-04",
          lead: {
            name: "Swarnavo",
            role: "Autonomous Navigation Lead",
            badge: "DOMAIN LEAD",
            initials: "SD",
            callsign: "VAYU-NAV-01",
            area: "GPS-Denied Navigation & Path Planning",
            contribution: "Visual Inertial Odometry (VIO) and minimum-jerk spline path planning.",
            photo: "assets/images/team/swarnavo.jpg"
          },
          members: [
            {
              name: "Rishin",
              role: "Obstacle Point-Cloud Mapping",
              badge: "CORE MEMBER",
              initials: "RM",
              callsign: "VAYU-NAV-MEM",
              area: "3D Obstacle Mapping",
              contribution: "OctoMap 3D voxel representation and collision boundary calculation.",
              photo: null
            },
            {
              name: "Bijoy",
              role: "Waypoint Optimization",
              badge: "CORE MEMBER",
              initials: "BS",
              callsign: "VAYU-NAV-MEM",
              area: "Kinodynamic Planning",
              contribution: "Dynamic waypoint re-routing and energy-optimal trajectories.",
              photo: null
            }
          ]
        },
        {
          id: "airframe-avionics",
          name: "Airframe and Avionics",
          shortName: "AIRFRAME & AVIONICS",
          tag: "HARDWARE // AERO-05",
          lead: {
            name: "Tejas",
            role: "Airframe & Avionics Lead",
            badge: "DOMAIN LEAD",
            initials: "TB",
            callsign: "VAYU-AERO-01",
            area: "Fuselage Aerodynamics & Avionics Harnessing",
            contribution: "Airframe structural loads, vibration damping, and power bus routing.",
            photo: "assets/images/team/tejas.jpg"
          },
          members: [
            {
              name: "Hricha",
              role: "Avionics Power & Sensors",
              badge: "CORE MEMBER",
              initials: "HR",
              callsign: "VAYU-AERO-MEM",
              area: "Power Distribution & EMI Shielding",
              contribution: "Power distribution layout and sensor noise isolation.",
              photo: "assets/images/team/hricha.jpg"
            },
            {
              name: "Shubhranil",
              role: "Structural Analysis & Spars",
              badge: "CORE MEMBER",
              initials: "SG",
              callsign: "VAYU-AERO-MEM",
              area: "Structural Finite Element Analysis",
              contribution: "Carbon spar FEA stress simulations under high-G maneuvers.",
              photo: "assets/images/team/shubhranil.jpg"
            },
            {
              name: "Arkadeep",
              role: "Control Surfaces & Actuation",
              badge: "CORE MEMBER",
              initials: "AR",
              callsign: "VAYU-AERO-MEM",
              area: "Aeroelasticity & Control Mechanics",
              contribution: "Servo linkages, aileron balance, and surface deflections.",
              photo: "assets/images/team/arkadeep.jpg"
            }
          ]
        },
        {
          id: "manufacturing",
          name: "Manufacturing",
          shortName: "MANUFACTURING",
          tag: "HARDWARE // MFG-06",
          lead: {
            name: "Hricha",
            role: "Manufacturing Lead",
            badge: "DOMAIN LEAD",
            initials: "HR",
            callsign: "VAYU-MFG-01",
            area: "Composite Fabrication & Tooling",
            contribution: "Vacuum-assisted resin infusion and carbon fiber prepreg layups.",
            photo: "assets/images/team/hricha.jpg"
          },
          members: [
            {
              name: "Tejas",
              role: "Tooling & CNC Machining",
              badge: "CORE MEMBER",
              initials: "TB",
              callsign: "VAYU-MFG-MEM",
              area: "Precision Mold Making",
              contribution: "High-density tooling foam CNC machining and surface finishing.",
              photo: "assets/images/team/tejas.jpg"
            },
            {
              name: "Iman",
              role: "Structural Assembly & QA",
              badge: "CORE MEMBER",
              initials: "IM",
              callsign: "VAYU-MFG-MEM",
              area: "Airframe Alignment & Assembly",
              contribution: "Fuselage jig assembly, bonding adhesives, and tolerance inspection.",
              photo: "assets/images/team/iman.jpg"
            },
            {
              name: "Vineet",
              role: "Lightweight Prototyping",
              badge: "CORE MEMBER",
              initials: "VS",
              callsign: "VAYU-MFG-MEM",
              area: "FDM/SLA Additive Manufacturing",
              contribution: "Lightweight structural brackets and custom mounting clips.",
              photo: "assets/images/team/vineet.jpg"
            }
          ]
        },
        {
          id: "propulsion-system",
          name: "Propulsion System",
          shortName: "PROPULSION",
          tag: "HARDWARE // PROP-07",
          lead: {
            name: "Arkadeep",
            role: "Propulsion System Lead",
            badge: "DOMAIN LEAD",
            initials: "AR",
            callsign: "VAYU-PROP-01",
            area: "Brushless Motor Aerodynamics & Dyno Testing",
            contribution: "Thrust-to-weight optimization, propeller pitch analysis, and power efficiency curves.",
            photo: "assets/images/team/arkadeep.jpg"
          },
          members: [
            {
              name: "Deborpita",
              role: "ESC & Thermal Management",
              badge: "CORE MEMBER",
              initials: "DP",
              callsign: "VAYU-PROP-MEM",
              area: "Power Electronics Thermals",
              contribution: "ESC thermal dissipation testing and motor timing optimization.",
              photo: "assets/images/team/deborpita.jpg"
            },
            {
              name: "Ashmit",
              role: "Battery & Current Telemetry",
              badge: "CORE MEMBER",
              initials: "AS",
              callsign: "VAYU-PROP-MEM",
              area: "Battery Management & Power Profiling",
              contribution: "In-flight current draw profiling and high-C discharge characterization.",
              photo: "assets/images/team/ashmit.jpg"
            }
          ]
        },
        {
          id: "payload-delivery",
          name: "Payload Delivery System",
          shortName: "PAYLOAD DELIVERY",
          tag: "MECHANICAL // PDS-08",
          lead: {
            name: "Vineet",
            role: "Payload Delivery System Lead",
            badge: "DOMAIN LEAD",
            initials: "VS",
            callsign: "VAYU-PDS-01",
            area: "Servo Actuation & Mechanical Release Bays",
            contribution: "Design and testing of automated payload release latch mechanism for Rakshak.",
            photo: "assets/images/team/vineet.jpg"
          },
          members: [
            {
              name: "Pathikrit",
              role: "Payload Aerodynamics & Packaging",
              badge: "CORE MEMBER",
              initials: "PK",
              callsign: "VAYU-PDS-MEM",
              area: "Aerodynamic Packaging & Release",
              contribution: "Payload container aerodynamic fairing design and drop trajectory stability.",
              photo: "assets/images/team/pathikrit.jpg"
            },
            {
              name: "Satyam",
              role: "Vibration Damping & Stability",
              badge: "CORE MEMBER",
              initials: "SY",
              callsign: "VAYU-PDS-MEM",
              area: "Mechanical Isolation Systems",
              contribution: "Vibration isolation dampeners for fragile relief payload packages.",
              photo: null
            }
          ]
        },
        {
          id: "cad-modelling",
          name: "CAD Modelling",
          shortName: "CAD MODELLING",
          tag: "DESIGN // CAD-09",
          lead: {
            name: "Iman",
            role: "CAD Modelling Lead",
            badge: "DOMAIN LEAD",
            initials: "IM",
            callsign: "VAYU-CAD-01",
            area: "Parametric 3D CAD & Aerodynamic Lofting",
            contribution: "Master assembly modeling, kinematic clearance, and CFD surface geometry.",
            photo: "assets/images/team/iman.jpg"
          },
          members: [
            {
              name: "Pathikrit",
              role: "Generative Design & Weight Reduction",
              badge: "CORE MEMBER",
              initials: "PK",
              callsign: "VAYU-CAD-MEM",
              area: "Generative Structural Design",
              contribution: "Topology-optimized motor mounts and internal fuselage bulkheads.",
              photo: "assets/images/team/pathikrit.jpg"
            },
            {
              name: "Tejas",
              role: "Surfacing & Tolerance Stacks",
              badge: "CORE MEMBER",
              initials: "TB",
              callsign: "VAYU-CAD-MEM",
              area: "Complex Surfacing & Tolerancing",
              contribution: "Aerodynamic transition lofts and composite tooling split lines.",
              photo: "assets/images/team/tejas.jpg"
            }
          ]
        },
        {
          id: "testing",
          name: "Testing",
          shortName: "TESTING",
          tag: "OPERATIONS // TST-10",
          lead: {
            name: "Joy",
            role: "Testing Lead",
            badge: "DOMAIN LEAD",
            initials: "JY",
            callsign: "VAYU-TST-01",
            area: "Flight Test Protocols & Mission Assurance",
            contribution: "Pre-flight checklists, telemetry flight testing, and quality assurance logs.",
            photo: null
          },
          members: [
            {
              name: "Iman",
              role: "Flight Protocol & Safety Systems",
              badge: "CORE MEMBER",
              initials: "IM",
              callsign: "VAYU-TST-MEM",
              area: "Range Safety Protocols",
              contribution: "Emergency parachute deployment tests and autonomous geofence checks.",
              photo: "assets/images/team/iman.jpg"
            },
            {
              name: "Bijoy",
              role: "Telemetry Flight Log Parsing",
              badge: "CORE MEMBER",
              initials: "BS",
              callsign: "VAYU-TST-MEM",
              area: "Black-Box Log Diagnostics",
              contribution: "Post-flight vibration spectral analysis and IMU sensor health audits.",
              photo: null
            }
          ]
        },
        {
          id: "doc-sponsorship",
          name: "Documentation and Sponsorship",
          shortName: "DOCS & SPONSORSHIP",
          tag: "MANAGEMENT // MGT-11",
          leads: [
            {
              name: "Paridhi",
              role: "Documentation & Sponsorship Lead",
              badge: "DOMAIN LEAD",
              initials: "PK",
              callsign: "VAYU-MGT-01",
              area: "Rulebook Compliance & Industrial Outreach",
              contribution: "Comprehensive technical design reports, rule compliance, and sponsor acquisition.",
              photo: null
            },
            {
              name: "Shubhranil",
              role: "Documentation & Sponsorship Co-Lead",
              badge: "CO-LEAD",
              initials: "SG",
              callsign: "VAYU-MGT-02",
              area: "Sponsorship Strategy & Technical Dossiers",
              contribution: "Sponsorship prospectus formulation and technical design report synthesis.",
              photo: "assets/images/team/shubhranil.jpg"
            }
          ],
          members: [
            {
              name: "Tejas",
              role: "Technical Diagrams & BOM",
              badge: "CORE MEMBER",
              initials: "TB",
              callsign: "VAYU-MGT-MEM",
              area: "Technical Diagrams & Schematics",
              contribution: "Airframe mechanical drawings and electrical block schematics.",
              photo: "assets/images/team/tejas.jpg"
            },
            {
              name: "Sarvani",
              role: "Corporate Outreach & Pitching",
              badge: "CORE MEMBER",
              initials: "SV",
              callsign: "VAYU-MGT-MEM",
              area: "Corporate Relations & Sponsorship",
              contribution: "Industry outreach campaigns and sponsor engagement pipelines.",
              photo: null
            }
          ]
        },
        {
          id: "webmaster",
          name: "Webmaster",
          shortName: "WEBMASTER",
          tag: "DIGITAL // WEB-12",
          lead: {
            name: "Sutavra",
            role: "Webmaster",
            badge: "DOMAIN LEAD",
            initials: "ST",
            callsign: "VAYU-WEB-01",
            area: "Full-Stack Web Engineering & Infrastructure",
            contribution: "Architecture, responsive UI performance, backend API integration, and telemetry web displays.",
            photo: "assets/images/team/sutavra.jpg"
          },
          members: []
        },
        {
          id: "social-media",
          name: "Social media",
          shortName: "SOCIAL MEDIA",
          tag: "MEDIA // SOC-13",
          lead: {
            name: "Pathikrit",
            role: "Social Media Lead",
            badge: "DOMAIN LEAD",
            initials: "PK",
            callsign: "VAYU-SOC-01",
            area: "Digital Media Branding & UAV Cinematography",
            contribution: "Flight test cinematography, Instagram broadcasts (@teamvayu.iemk), and visual branding.",
            photo: "assets/images/team/pathikrit.jpg"
          },
          members: [
            {
              name: "Ashmit",
              role: "Visual Content Creation",
              badge: "CORE MEMBER",
              initials: "AS",
              callsign: "VAYU-SOC-MEM",
              area: "Drone Flight Photography & Reels",
              contribution: "High-speed aerial filming and build log storytelling.",
              photo: "assets/images/team/ashmit.jpg"
            },
            {
              name: "Arkadeep",
              role: "Technical Communications",
              badge: "CORE MEMBER",
              initials: "AR",
              callsign: "VAYU-SOC-MEM",
              area: "Engineering Updates & Milestones",
              contribution: "Technical milestone briefings and public outreach.",
              photo: "assets/images/team/arkadeep.jpg"
            }
          ]
        }
      ]
    },
    "2025": {
      leadership: {
        captain: {
          name: "Iman",
          fullName: "Iman Das",
          role: "Founding Lead",
          badge: "★ FOUNDING LEAD",
          initials: "IM",
          callsign: "VAYU-FOUNDER-01",
          area: "Founding Vision & Airframe Research",
          contribution: "Founding team lead establishing Team VAYU's initial flight research laboratory.",
          photo: "assets/images/team/iman.jpg"
        },
        softwareLead: {
          name: "Swarnavo",
          fullName: "Swarnavo De",
          role: "Software Lead",
          badge: "SOFTWARE LEAD",
          initials: "SD",
          callsign: "VAYU-FOUNDER-SW",
          area: "Flight Stack Prototyping",
          contribution: "Initial autopilot and flight stack development for prototype UAVs.",
          photo: "assets/images/team/swarnavo.jpg"
        },
        hardwareLead: {
          name: "Arkadeep",
          fullName: "Arkadeep Roy",
          role: "Hardware Lead",
          badge: "HARDWARE LEAD",
          initials: "AR",
          callsign: "VAYU-FOUNDER-HW",
          area: "Hardware Prototyping",
          contribution: "Initial composite frame and propulsion bench fabrication.",
          photo: "assets/images/team/arkadeep.jpg"
        }
      },
      domains: [] // Will reference 2026 domains baseline
    }
  },

  // ── COMPETITIONS & ACHIEVEMENTS ────────────────────
  competitions: [
    {
      id: "comp-01",
      name: "National Aero Design Challenge",
      year: "2026",
      category: "AUTONOMOUS UAV",
      result: "FIRST PLACE — BEST DESIGN DOSSIER",
      description: "National collegiate competition demanding autonomous waypoint tracking, simulated payload delivery, and comprehensive aerodynamic design defense.",
      highlights: ["Autonomous Waypoint Navigation", "2.0kg Payload Drop Accuracy", "Best Technical Design Presentation"],
      image: "assets/images/project-1.jpg"
    },
    {
      id: "comp-02",
      name: "Inter-Collegiate Drone Derby",
      year: "2025",
      category: "SPEED & RECONNAISSANCE",
      result: "PODIUM FINISH — TOP SURVEILLANCE SCORE",
      description: "Obstacle slalom course combined with live target search and rescue recognition using onboard deep learning computer vision.",
      highlights: ["Optical Object Detection", "Sub-Second Target Lock", "Zero Collision Maneuvering"],
      image: "assets/images/project-2.jpg"
    },
    {
      id: "comp-03",
      name: "Aerospace Innovation Expo",
      year: "2025",
      category: "INNOVATION & SUSTAINABILITY",
      result: "SPECIAL JURY AWARD",
      description: "Showcase of Sagar water rescue drone with emergency pneumatic life-buoy inflation and marine telemetry systems.",
      highlights: ["IP66 Water-Sealed Monocoque", "Emergency Pneumatic Buoy", "Marine Beacon Tracking"],
      image: "assets/images/project-3.jpg"
    }
  ],

  achievements: [
    { num: "01", title: "NATIONAL PODIUM FINISH", desc: "Secured top honours in National Autonomous Drone Challenge." },
    { num: "02", title: "PATENT-PENDING DROP LATCH", desc: "Invented ultra-lightweight zero-binding servo payload delivery mechanism." },
    { num: "03", title: "100+ SUCCESSFUL FLIGHT TESTS", desc: "Logged hundreds of flight hours across fixed-wing, quad, and hexacopter UAVs." },
    { num: "04", title: "INDIGENOUS CARBON COMPOSITES", desc: "100% in-house vacuum infusion and CNC carbon fiber fabrication." },
  ],

  // ── SPONSORS ───────────────────────────────────────
  sponsors: [
    {
      name: "IEM Kolkata",
      tier: "TITLE ACADEMIC PARTNER",
      role: "Institute of Engineering & Management, Kolkata",
      logo: "assets/images/logo.png"
    },
    {
      name: "Aerospace Labs Kolkata",
      tier: "GOLD TECHNICAL SPONSOR",
      role: "Composite Fabrication & Wind Tunnel Partner",
      logo: "assets/images/logo.png"
    },
    {
      name: "Autonomous Dynamics",
      tier: "SILVER AVIONICS SPONSOR",
      role: "Autopilot & Sensor Suite Partner",
      logo: "assets/images/logo.png"
    }
  ],

  sponsorTiers: [
    {
      tier: "PLATINUM / TITLE SPONSOR",
      investment: "₹ 2,00,000+",
      perks: [
        "Prime Title Branding on all 3 Fleet Drones (Drishti, Rakshak, Sagar)",
        "Dominant Logo Placement on Team VAYU Flight Suits & Ground Banners",
        "Exclusive Product Demonstrations at National Aero Competitions",
        "Direct Recruitment Access to Top Aerospace & Robotics Engineering Talent",
        "Dedicated Press Release, Website Banner, & Social Broadcasts (@teamvayu.iemk)"
      ]
    },
    {
      tier: "GOLD TECHNICAL SPONSOR",
      investment: "₹ 1,00,000",
      perks: [
        "Prominent Logo Placement on Competition Drones & Airframe Wingtips",
        "Branding on Official Team Jersey & Ground Station Equipment",
        "Inclusion in Competition Technical Design Reports & Presentations",
        "Quarterly Milestone Video Endorsements & Social Media Highlights"
      ]
    },
    {
      tier: "SILVER ASSOCIATE SPONSOR",
      investment: "₹ 50,000",
      perks: [
        "Logo on Team VAYU Website Sponsor Showcase & Competition Posters",
        "Social Media Sponsorship Announcement & Technical Mentions",
        "Access to Team VAYU Engineering Research Whitepapers & Build Logs"
      ]
    }
  ]
};

// Backward compatibility helper
VAYU_DATA.teamByYear["2025"].domains = VAYU_DATA.teamByYear["2026"].domains;

if (typeof module !== "undefined" && module.exports) {
  module.exports = VAYU_DATA;
}
