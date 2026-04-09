import { 
  Building2, PenTool, Landmark, Calculator, Box, Compass, FileCheck, ShieldCheck, 
  Leaf, Factory, Droplets, GitBranch, Layers, FileEdit, Tractor, Flag, 
  Activity, Maximize, Map, Frame, Handshake, HardHat, Flame
} from "lucide-react";

export type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>;

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  gradient: string;
  about: string;
  important: string;
  advantage: string[];
  disadvantage: string[];
  mainProjects: string[];
  whyDMV: string;
  dmvNote: string;
}

export const servicesData: ServiceItem[] = [
  { 
    icon: HardHat, 
    title: "Building Constructions", 
    desc: "Complete turnkey construction solutions from foundation laying to premium finishing.", 
    gradient: "from-emerald-500 to-green-600",
    about: "Our Building Constructions service provides end-to-end execution for residential, commercial, and industrial construction using top-tier materials and skilled professionals to ensure structural integrity and architectural beauty.",
    important: "Choosing the right contractor means the difference between a structurally sound legacy building and a perpetual maintenance nightmare.",
    advantage: ["Single point of contact for the entire project lifecycle", "Strict adherence to safety codes and project timelines", "High-quality material procurement and professional labor management"],
    disadvantage: ["Requires comprehensive initial capital and budget planning", "Unforeseen weather delays can sometimes impact overall project duration"],
    mainProjects: ["Residential villas and apartments", "Commercial showrooms and offices", "Industrial sheds and warehouses"],
    whyDMV: "DMV Construction delivers projects on-time with full transparency using certified engineers and foremen who have decades of on-site experience across Tamil Nadu.",
    dmvNote: "With 500+ completed projects, we are trusted partners in turning your architectural blueprints into reality with zero-compromise on quality."
  },
  { 
    icon: FileCheck, 
    title: "Approval Plans", 
    desc: "Drafting and securing swift building plan approvals aligned with regional zoning regulations.", 
    gradient: "from-teal-400 to-cyan-500",
    about: "An Approval Plan is an authorized blueprint required before commencing any building construction. It ensures the proposed architecture complies with all government-mandated safety, environmental, and spatial planning norms.",
    important: "Constructing without formal plan approval leads to severe penalties, demolition notices, and inability to secure power or water connections.",
    advantage: ["Ensures structural safety and proper ventilation", "Completely avoids legal penalties and demolition risks", "Significantly increases the resale value of the property"],
    disadvantage: ["Process requires precise architectural drafting before starting", "Any physical deviations during construction can cause the approval to be cancelled"],
    mainProjects: ["Residential building approvals", "Commercial complex plans", "Mixed-use development permits"],
    whyDMV: "Our in-house drafting team prepares flawless submission-ready drawings, drastically reducing rejection rates and approval turnaround times.",
    dmvNote: "We have a proven track record of securing approvals across DTCP, municipalities, and local panchayat offices throughout Tamil Nadu."
  },
  { 
    icon: PenTool, 
    title: "DTCP Drawings", 
    desc: "Specialized architectural drawings strictly compliant with Directorate of Town and Country Planning guidelines.", 
    gradient: "from-emerald-400 to-green-500",
    about: "DTCP drawings are highly detailed schematics specifically required for properties falling outside major corporation limits. These drawings delineate exact spatial dimensions and infrastructural provisions like roads and parks.",
    important: "Unauthorized plots lacking DTCP-approved drawings are legally restricted from property registration processes.",
    advantage: ["Secures legal title and property legitimacy", "Makes the property instantly eligible for bank loans", "Ensures well-planned road widths and public spaces"],
    disadvantage: ["Strict guidelines limit maximum plot coverage", "Involves official processing fees that scale with land size"],
    mainProjects: ["Residential layout DTCP submissions", "Commercial plot approvals", "Farm conversion drawings"],
    whyDMV: "Our DTCP specialists are deeply familiar with the specific requirements of each sub-registrar and district planning office in Tamil Nadu.",
    dmvNote: "We handle all government coordination, saving you the time and stress of navigating complex official procedures."
  },
  { 
    icon: Landmark, 
    title: "Municipality Drawings", 
    desc: "Precision drafted layouts optimized for quick municipality and village panchayat building clearances.", 
    gradient: "from-green-400 to-emerald-500",
    about: "These drawings are catered specifically to the localized building rules of municipalities and panchayats, incorporating Floor Space Index (FSI), setbacks, and localized sanitary regulations.",
    important: "Every local tier of governance has distinct regulations. Generic plans are often rejected without localized adjustments.",
    advantage: ["Drastically speeds up localized approval timeframes", "Prevents boundary conflicts with neighbors", "Ensures easy connection to municipal drainage and water mains"],
    disadvantage: ["Requires updating whenever local municipal bylaws change", "Might require frequent resubmissions if interpretations differ"],
    mainProjects: ["Panchayat-level housing approvals", "Small commercial shop plans", "Multi-storey residential permits"],
    whyDMV: "We have established strong working relationships with local body officials across Dharmapuri and surrounding regions, enabling faster approvals.",
    dmvNote: "Our team fluently navigates even the most complex multi-authority approvals."
  },
  { 
    icon: Calculator, 
    title: "Estimations", 
    desc: "Accurate, detailed, and transparent project cost estimations and Bill of Quantities (BoQ) generation.", 
    gradient: "from-yellow-400 to-orange-500",
    about: "Our Estimation service breaks down the entire proposed construction into line-item costs, including raw materials (cement, steel, sand), labor, machinery, and finishing items.",
    important: "A precise estimation is critical for securing accurate bank construction loans and avoiding mid-project financial stalls.",
    advantage: ["Prevents unexpected financial overruns during construction", "Provides a powerful negotiation tool for purchasing materials", "Required document for institutional funding"],
    disadvantage: ["Estimations are subject to market fluctuations in material pricing", "Highly complex custom designs can take longer to estimate accurately"],
    mainProjects: ["Pre-construction cost budgets", "Bank loan estimation reports", "Material quantity take-offs"],
    whyDMV: "Our estimators are experienced civil engineers who provide fair, data-driven, and tamper-proof quotations that protect client budgets.",
    dmvNote: "We use current market-rate databases to ensure our estimates are always accurate and competitive."
  },
  { 
    icon: Box, 
    title: "3D Elevations", 
    desc: "Photorealistic 3D exterior and interior elevation designs to visualize your project before construction.", 
    gradient: "from-purple-400 to-indigo-500",
    about: "3D Elevation provides a hyper-realistic visual preview of the building's facade, textures, and lighting before a single brick is physically laid, bridging the gap between flat blueprints and reality.",
    important: "Helps in finalizing aesthetic elements and materials before construction, completely avoiding costly rework.",
    advantage: ["Crystal clear visualization of the final product", "Easy to experiment with design styles digitally", "Helps in attracting initial investors or buyers"],
    disadvantage: ["Adds an initial design cost to the project budget", "Highly complex digital aesthetics may be challenging to execute physically"],
    mainProjects: ["Villa elevation renders", "Apartment building facades", "Commercial showroom 3D walkthroughs"],
    whyDMV: "Our design team uses industry-leading software to deliver photorealistic renders that accurately represent real-world construction outcomes.",
    dmvNote: "Hundreds of our clients have used our 3D renders for successful pre-sale property marketing campaigns."
  },
  { 
    icon: Compass, 
    title: "Vasthu Plans", 
    desc: "Professional Vasthu-compliant planning ensuring your property aligns with traditional energy principles.", 
    gradient: "from-cyan-400 to-teal-500",
    about: "Vasthu Shastra planning intricately aligns room placements, entrances, and spatial ratios with natural elements and cardinal directions to maximize positive energy flow throughout the building.",
    important: "Careful expertise is required to balance Vasthu principles with modern practical architecture without sacrificing usable space.",
    advantage: ["Believed to promote positive energy, health, and well-being", "Massively increases demand and value in the Indian real estate market", "Improves cross-ventilation naturally"],
    disadvantage: ["Can restrict creative contemporary architectural designs", "May lead to inefficient use of highly irregular plot shapes"],
    mainProjects: ["Vasthu-compliant residential floor plans", "Temple and prayer room orientations", "Vasthu corrections for existing buildings"],
    whyDMV: "Our Vasthu consultants combine ancient principles with modern AutoCAD drafting to create spaces that are both spiritually aligned and architecturally excellent.",
    dmvNote: "We can also perform Vasthu compliant rectifications for existing structures without major demolition."
  },
  { 
    icon: FileCheck, 
    title: "Valuation Certificates", 
    desc: "Certified, independent property valuation reports for loans, sales, and legal documentation.", 
    gradient: "from-amber-400 to-orange-500",
    about: "A Valuation Certificate provides the legally recognized fair market value of a property, calculated based on its location, structural health, depreciation, and current market trends by a certified engineer.",
    important: "Essential for securing mortgages, asset declarations, tax planning, and resolving legal property disputes.",
    advantage: ["Provides a strong basis for fair real estate transactions", "Mandatory for securing high-value collateral bank loans", "Transparently assesses the property's depreciation"],
    disadvantage: ["Valuations are sensitive to sudden market downturns", "Processing involves physical inspections which take time"],
    mainProjects: ["Residential plot valuation for bank loans", "Old building depreciation assessment", "Legal dispute property appraisals"],
    whyDMV: "Our government-registered valuation engineers provide bank-accepted, court-admissible value certificates with detailed technical justifications.",
    dmvNote: "We are empanelled with multiple national banks for property valuation services in and around the Dharmapuri district."
  },
  { 
    icon: ShieldCheck, 
    title: "Stability Certificates", 
    desc: "Engineering assessments issuing structural stability certificates for commercial and residential structures.", 
    gradient: "from-lime-400 to-green-500",
    about: "A Stability Certificate is an official document signed by a licensed structural engineer verifying that a building is structurally sound, safe for occupation, and capable of handling its designed load.",
    important: "Legally mandatory for schools, hospitals, factories, and public spaces to renew this certificate periodically.",
    advantage: ["Guarantees the safety of occupants and machinery", "Mandatory for securing building insurance and industrial licences", "Identifies hidden structural weaknesses before they fail catastrophically"],
    disadvantage: ["May force owners into expensive retrofitting if the building fails the check", "Requires rigorous non-destructive structural testing"],
    mainProjects: ["Periodic safety checks for schools and colleges", "Factory structural safety assessments", "Old residential building fitness certificates"],
    whyDMV: "Our certified structural team uses modern inspection tools including crack mapping, rebound hammer testing, and GPR scanning to issue airtight certificates.",
    dmvNote: "We provide the fastest turnaround for stability certifications without compromising technical accuracy."
  },
  { 
    icon: Leaf, 
    title: "Pollution Board Drawings", 
    desc: "Clean and compliant infrastructure drawings ensuring State Pollution Control Board (SPCB) approvals.", 
    gradient: "from-green-500 to-teal-600",
    about: "These drawings detail Effluent Treatment Plants (ETP), Sewage Treatment Plants (STP), exhaust stacks, and acoustic enclosures to prove a facility will not harm the local environment.",
    important: "Without these cleared drawings, the Pollution Control Board will deny the 'Consent to Operate', halting factory operations.",
    advantage: ["Ensures strict legal environmental compliance", "Prevents sudden operational shutdowns", "Promotes eco-friendly operational practices"],
    disadvantage: ["Requires specialized environmental engineering knowledge", "Approval processes are notoriously stringent and lengthy"],
    mainProjects: ["ETP/STP layout drawings for industries", "Acoustic enclosure plans", "Stack emission dispersion diagrams"],
    whyDMV: "We have extensive experience preparing detailed environmental compliance drawings for SPCB submissions across multiple industry types.",
    dmvNote: "Our Pollution Board drawings have a near-100% first-submission approval rate across Tamil Nadu."
  },
  { 
    icon: Factory, 
    title: "Inspector of Factory Drawings", 
    desc: "Industrial layouts optimized for worker safety and machinery placement to clear factory inspections.", 
    gradient: "from-slate-400 to-gray-500",
    about: "Drafted for the Directorate of Industrial Safety and Health (DISH), these drawings focus on safe gangways, emergency exits, machinery spacing, adequate ventilation, and sanitary facilities for workers.",
    important: "Operating a manufacturing unit without approved drawings invites sudden legal sealing of the premises and fines.",
    advantage: ["Ensures commercial operations begin legally and safely", "Massively reduces the risk of workplace accidents", "Crucial for passing compliance audits"],
    disadvantage: ["Stringent space requirements might reduce usable manufacturing floor area", "Changes in machinery layout require drawing resubmission"],
    mainProjects: ["Factory floor plan submissions to DISH", "Machinery layout compliance drawings", "Worker safety passage plans"],
    whyDMV: "Our industrial layout specialists have helped dozens of manufacturing units pass factory inspections on the first attempt.",
    dmvNote: "We guide clients through every step of the DISH approval process, from drawing preparation to final inspection."
  },
  { 
    icon: Droplets, 
    title: "PWD Drawings", 
    desc: "Drawings designed to secure NOCs from PWD for constructions near roads and water bodies.", 
    gradient: "from-blue-400 to-cyan-500",
    about: "Required when a site bounds a state highway, canal, or lake. The drawings highlight buffer zones, access points, and exact distances from public utilities to prove non-encroachment.",
    important: "Failure to adhere to PWD regulations can result in immediate demolition if the structure falls within a road widening zone.",
    advantage: ["Protects property from future road-widening demolitions", "Prevents flooding and waterlogging issues", "Secures legally unquestionable property titles"],
    disadvantage: ["Strict buffer rules usually reduce the usable plot area", "Documentation and land surveying processes take considerable time"],
    mainProjects: ["Highway-adjacent property NOC plans", "Canal-side construction setback drawings", "Road access point permissions"],
    whyDMV: "We have experience coordinating with PWD offices across multiple districts and know exactly what technical details they need to see in submissions.",
    dmvNote: "Our PWD drawings successfully protect our clients' constructions from future government road expansion projects."
  },
  { 
    icon: GitBranch, 
    title: "Structural Designs", 
    desc: "Engineering blueprints calculating load-bearing capacities, steel reinforcement, and foundation depths.", 
    gradient: "from-yellow-400 to-amber-500",
    about: "Structural designs are the mathematical backbone of a building. They determine column thickness, concrete grade, and the exact layout of steel rebars needed to withstand gravity, wind, and seismic forces.",
    important: "A building's safety and longevity rely entirely on the precise mathematical calculations within these designs.",
    advantage: ["Prevents catastrophic building collapses and foundational cracks", "Optimizes steel and concrete usage, saving material costs", "Required for all high-rise official building plan approvals"],
    disadvantage: ["Requires specialized software and extreme engineering expertise", "Even small architectural changes require a complete recalculation"],
    mainProjects: ["RCC frame design for multi-storey buildings", "Foundation design for soft soil zones", "Retaining wall structural calculations"],
    whyDMV: "Our structural engineering team holds professional memberships in recognized institutions and designs within the latest IS code standards.",
    dmvNote: "We use advanced structural analysis software (STAAD.Pro/ETABS) to ensure every design is safe, optimized, and professional."
  },
  { 
    icon: Layers, 
    title: "Layout Approval", 
    desc: "End-to-end liaison for securing layout approvals for real estate development from planning authorities.", 
    gradient: "from-emerald-400 to-green-500",
    about: "We handle the entire bureaucratic process of converting raw acreage into a legally recognized residential or commercial layout, navigating through various state departments to secure the final approval.",
    important: "A formally approved layout guarantees buyers that the land is free of encumbrances and officially zoned for its intended use.",
    advantage: ["Dramatically increases the commercial value of raw land", "Paves the way for legal property registration of plots", "Ensures government support for civic amenities"],
    disadvantage: ["The bureaucratic process can take several months", "Requires yielding a percentage of land to the government for public roads and parks"],
    mainProjects: ["Residential housing layout approvals", "Commercial complex master approvals", "Farmland-to-residential conversions"],
    whyDMV: "Our dedicated approval team has navigated hundreds of complex multi-authority layout approvals across the Dharmapuri, Salem, and Krishnagiri regions.",
    dmvNote: "We specialize in the least-delay routes through government departments, turning months of waiting into weeks."
  },
  { 
    icon: FileEdit, 
    title: "Layout Approval Drawings", 
    desc: "Master-planning drafts showing roads, plots, parks, and utilities specifically for layout approval submissions.", 
    gradient: "from-indigo-400 to-blue-500",
    about: "These drawings precisely partition large land parcels into saleable residential plots while reserving legally required percentages for public spaces, roads, parks, and civic facilities.",
    important: "The drawings must balance the developer's profitability with government regulations on mandatory public spaces — expertise is critical.",
    advantage: ["Creates a highly organized, premium residential neighborhood layout", "Serves as the primary official marketing material for plot sales", "Ensures smooth traffic flow and proper drainage within the layout"],
    disadvantage: ["Requires massive revisions if the planning authority demands larger road widths", "Complex to design efficiently on irregularly shaped large parcels"],
    mainProjects: ["50+ plot residential layout master plans", "Commercial industrial park layouts", "Township planning with civic amenities"],
    whyDMV: "Our master planners have designed hundreds of successful layouts that balance developer profitability with government compliance requirements.",
    dmvNote: "Every layout drawing we produce is pre-checked against local regulations before formal submission, reducing rejection risk to near-zero."
  },
  { 
    icon: Tractor, 
    title: "Layout Developing", 
    desc: "Physical transformation of raw land into a developed layout including leveling, clearing, and boundary creation.", 
    gradient: "from-orange-500 to-amber-600",
    about: "Layout development is the heavy-lifting phase where surveyed land is physically cleared, leveled by earthmovers, and prepared for infrastructure overlay, transforming it from wild acreage to a prime building site.",
    important: "Improper soil compaction and leveling at this stage leads to roads sinking and plots flooding during monsoons.",
    advantage: ["Instantly makes the land visually appealing and ready to sell", "Provides a clean slate for precise road laying and marking", "Eliminates wild vegetation that hides boundary disputes"],
    disadvantage: ["Requires heavy machinery coordination and significant capital outlay", "Earthmoving operations are heavily dependent on dry weather"],
    mainProjects: ["Agricultural-to-residential land clearing", "Industrial estate preparation", "Large gated community site development"],
    whyDMV: "Our heavy equipment fleet and experienced site engineers ensure layout development is completed swiftly and to the exact specifications of the approved master plan.",
    dmvNote: "We have the in-house capacity to develop layouts from 1 acre to 100+ acres without subcontracting."
  },
  { 
    icon: Flag, 
    title: "Plot Marking & Road Laying", 
    desc: "On-site demarcation of plots with boundary stones and laying of high-quality internal roads.", 
    gradient: "from-slate-500 to-gray-600",
    about: "Using Total Station electronic surveying equipment, we precisely transfer the paper master plan onto the physical ground, embedding corner stones for every plot, followed by grading and laying the internal road network.",
    important: "Even slightly inaccurate physical marking leads to intense legal boundary disputes between future plot owners.",
    advantage: ["Provides buyers absolute clarity on their plot boundaries", "Well-laid roads instantly boost the premium feel of the layout", "Prevents encroachment from neighboring lands"],
    disadvantage: ["Road laying is an expensive capital investment", "Freshly laid roads require curing time before heavy traffic is allowed"],
    mainProjects: ["Plot corner stone embedding for residential layouts", "Internal road formation and tarring", "Road curb construction and painting"],
    whyDMV: "Our survey team uses precision Total Station instruments to mark every plot boundary to within centimeter-level accuracy.",
    dmvNote: "All our internal roads are designed with proper gradients for efficient water drainage, preventing monsoon damage."
  },
  { 
    icon: Activity, 
    title: "Drainage Marking & Construction", 
    desc: "Implementation of robust storm water and sewage drainage networks across layouts and buildings.", 
    gradient: "from-cyan-500 to-blue-600",
    about: "We design and physically construct the critical underground or covered surface drainage systems ensuring rapid water run-off, preventing stagnation, and maintaining the hygiene of the developed property.",
    important: "Without a calculated slope and solid construction, stagnant drains will quickly turn a premium layout into a health hazard.",
    advantage: ["Permanently prevents plot flooding and road damage during monsoons", "Ensures high sanitary standards necessary for occupation", "Meets strict municipal wastewater disposal requirements"],
    disadvantage: ["Deep excavation poses safety risks and requires careful shoring", "Requires highly precise slope leveling to work on gravity alone"],
    mainProjects: ["Layout storm water drain networks", "Building internal sewer line construction", "Municipal drain connectivity works"],
    whyDMV: "Our civil team designs drainage systems using hydraulic calculation software ensuring correct pipe sizing and slope, preventing blockages.",
    dmvNote: "Proper drainage is our non-negotiable commitment in every project because it determines the long-term livability of the development."
  },
  { 
    icon: Maximize, 
    title: "Land Around Fencing", 
    desc: "Secure boundary establishment through barbed wire, chain-link, or solid compound wall fencing.", 
    gradient: "from-stone-400 to-neutral-500",
    about: "Fencing physically establishes property rights. We execute large-scale perimeter securing using materials ranging from standard barbed wire to high-security precast concrete walls to deter trespassers.",
    important: "Leaving valuable land unfenced in developing areas is a severe risk that invites illegal encroachment and dumping.",
    advantage: ["Provides a strong psychological and physical barrier against encroachment", "Allows owners to establish clear possession of rural land", "Safeguards internal development materials from theft"],
    disadvantage: ["Fencing large perimeters requires significant capital", "Cheaper wire fences require periodic maintenance against rust and breakage"],
    mainProjects: ["Perimeter compound wall construction", "Chain-link security fencing for industrial sites", "Barbed wire temporary fencing for raw land"],
    whyDMV: "We source durable fencing materials at competitive prices and have specialist teams for rapid large-perimeter deployment.",
    dmvNote: "We help landowners establish visible, legally defensible possession of their properties quickly and cost-effectively."
  },
  { 
    icon: Map, 
    title: "Land Surveying", 
    desc: "High-precision topographical surveys using advanced DGPS and Total Station equipment.", 
    gradient: "from-amber-500 to-yellow-600",
    about: "Before any planning begins, our certified surveyors map the exact coordinates, contours, area size, and elevation differences of the land. This digital mapping forms the bedrock of all subsequent architectural and civil work.",
    important: "Relying on old manual survey documents for costly development almost always leads to area shortfalls and boundary overlaps.",
    advantage: ["Identifies the absolute true legal extent of the property", "Helps calculate accurate earthwork cutting and filling costs", "Provides digital AutoCAD files for architects to begin work immediately"],
    disadvantage: ["Surveying heavily wooded or swampy terrain is extremely difficult", "GPS shadowing from high-rises or mountains can affect precision"],
    mainProjects: ["Pre-development topographic surveys", "Property boundary dispute resolution surveys", "Contour mapping for hilly terrain projects"],
    whyDMV: "Our DGPS-equipped survey team provides centimeter-accurate measurements with legal certification, accepted across all government departments.",
    dmvNote: "We combine modern electronic surveying with detailed FMB (Field Measurement Book) analysis for complete accuracy."
  },
  { 
    icon: Frame, 
    title: "Layout 3D Drawings", 
    desc: "Bird's-eye view 3D renders showcasing the fully developed layout with roads, parks, and proposed villas.", 
    gradient: "from-fuchsia-400 to-pink-500",
    about: "These are large-scale 3D master plans where we digitally construct the entire gated community or layout, showing tree-lined avenues, streetlights, and infrastructural amenities in breathtaking detail.",
    important: "This is the most powerful marketing tool for a developer to sell plots before physical infrastructure is complete.",
    advantage: ["Creates emotional appeal and builds massive buyer confidence instantly", "Highlights premium amenities visually (clubhouses, parks)", "Allows developers to charge a premium based on future potential"],
    disadvantage: ["Highly complex modeling that takes significant time to render", "Changes to the master plan require expensive digital rework"],
    mainProjects: ["Residential community aerial 3D renders", "Township marketing visualization", "Commercial park layout renders"],
    whyDMV: "Our 3D artists specialize in large-scale layout renders that have consistently helped developers pre-sell 70%+ of plots before construction completion.",
    dmvNote: "We deliver high-resolution renders suitable for hoardings, websites, and investor presentations."
  },
  { 
    icon: Handshake, 
    title: "Land Consulting & Purchasing", 
    desc: "Expert legal vetting, negotiation, and advisory for safely purchasing high-yield real estate and raw land.", 
    gradient: "from-blue-500 to-indigo-600",
    about: "We leverage deep industry knowledge to guide clients in selecting the best parcels of land for investment or development. We scrutinize parent documents, Encumbrance Certificates (ECs), and zoning laws to ensure a foolproof transaction.",
    important: "Purchasing land without expert vetting often results in buying litigation-entangled properties or non-convertible agricultural zones.",
    advantage: ["Guarantees a clean, unencumbered property title", "Maximizes ROI by identifying undervalued high-growth corridors", "Smoothly handles complex negotiations and registration processes"],
    disadvantage: ["Consulting requires payment of advisory or brokerage fees", "Finding the perfect, unencumbered land parcel requires patience"],
    mainProjects: ["Investment land identification and purchase support", "Agricultural to residential conversion consulting", "Commercial land acquisition advisory"],
    whyDMV: "Our real estate advisors have deep connections with landowners and registrar offices throughout the Dharmapuri, Salem, and Krishnagiri districts.",
    dmvNote: "We help first-time buyers navigate the complex world of land purchasing with complete legal protection at every step."
  }
];
