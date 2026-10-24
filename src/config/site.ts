export interface Treatment {
  id: string
  title: string
  category: 'dental' | 'aesthetic' | 'restorative'
  shortDesc: string
  fullDesc: string
  benefits: string[]
  duration: string
  icon: string
  image: string
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  treatment: string
  text: string
  source: string
  verified: boolean
}

export interface FaqItem {
  question: string
  answer: string
  category: string
}

export interface SiteConfig {
  name: string
  subtitle: string
  tagline: string
  subTagline: string
  contact: {
    phone: string
    phoneDisplay: string
    phoneClean: string
    whatsappNumber: string
    whatsappLink: string
    email: string
    address: {
      suite: string
      street: string
      locality: string
      city: string
      state: string
      pincode: string
      full: string
    }
    mapsUrl: string
    mapsEmbedUrl: string
    hours: { days: string; time: string }[]
    announcement: string
  }
  trust: {
    googleRating: string
    maxRating: string
    reviewCount: string
    experienceYears: string
    locationHighlight: string
    googleSearchReviewUrl: string
  }
  leadDoctor: {
    name: string
    title: string
    experience: string
    bio: string
    specialties: string[]
    note: string
  }
  treatments: Treatment[]
  clinicFeatures: { title: string; description: string; icon: string }[]
  patientJourney: { step: string; title: string; desc: string }[]
  gallery: { title: string; category: string; image: string; wideImage: string; description: string }[]
  reviews: Review[]
  faqs: FaqItem[]
}

export const siteConfig: SiteConfig = {
  name: "OneCare Aesthetix Clinic",
  subtitle: "Dental & Facial Aesthetics",
  tagline: "Your Smile. Your Confidence. Our Care.",
  subTagline: "Thoughtful dental and facial aesthetic care, personalized around you in Kothrud, Pune.",
  
  contact: {
    phone: "+91 98348 91463",
    phoneDisplay: "+91 98348 91463",
    phoneClean: "9834891463",
    whatsappNumber: "919834891463",
    whatsappLink: "https://wa.me/919834891463",
    email: "contact@onecareaesthetix.com",
    address: {
      suite: "Shop No. 204, 2nd Floor, Geetai Sankul",
      street: "Paud Road, near Ideal Colony",
      locality: "Kothrud",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411038",
      full: "204, Geetai Sankul, Paud Road, near Ideal Colony, Kothrud, Pune, Maharashtra 411038"
    },
    mapsUrl: "https://maps.app.goo.gl/XmA19Qh6FYZgjJAo9",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.568472895697!2d73.8055112!3d18.5074127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf308401610f%3A0x50c19bf8637527f7!2sOneCare%20Aesthetix%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    hours: [
      { days: "Monday – Saturday", time: "10:30 AM – 2:00 PM & 4:30 PM – 8:00 PM" },
      { days: "Sunday", time: "11:00 AM – 2:30 PM" }
    ],
    announcement: "Personalized Dental & Facial Aesthetic Care in Kothrud, Pune • Split Morning & Evening Consultations"
  },

  trust: {
    googleRating: "4.9",
    maxRating: "5.0",
    reviewCount: "75+",
    experienceYears: "20+",
    locationHighlight: "Ideal Colony, Kothrud",
    googleSearchReviewUrl: "https://www.google.com/search?q=one-care-aesthetix-clinic"
  },

  leadDoctor: {
    name: "Dr. Achal Agarwal",
    title: "Senior Dental Surgeon & Aesthetic Consultant",
    experience: "20+ Years of Clinical Practice",
    bio: "With over two decades of dedicated practice, Dr. Achal Agarwal leads OneCare Aesthetix Clinic with an unwavering commitment to patient comfort, gentle dentistry, and harmonious aesthetic facial harmony. Every patient receives attentive, honest evaluation without rush.",
    specialties: [
      "Aesthetic Smile Design",
      "Restorative Dentistry & Crowns",
      "Dental Implant Planning",
      "Preventive & Family Oral Health"
    ],
    note: "Consultations by appointment to ensure dedicated one-on-one clinical attention."
  },

  treatments: [
    {
      id: "smile-design",
      title: "Digital Smile Design",
      category: "dental",
      shortDesc: "Custom facial-aesthetic smile evaluation aligning tooth contours, proportions, and gum symmetry.",
      fullDesc: "Digital Smile Design at OneCare Aesthetix analyzes facial features, lip curvature, and tooth display to create a natural, harmonious smile bespoke to your personality.",
      benefits: ["Facial balance analysis", "Minimal tooth reduction", "Predictable mockups before treatment"],
      duration: "2-3 Sessions",
      icon: "Sparkles",
      image: "/assets/clinic/wide-clinic-panoramic-suite.jpg"
    },
    {
      id: "teeth-whitening",
      title: "Laser Teeth Whitening",
      category: "dental",
      shortDesc: "Safe, chairside enamel-safe laser whitening that removes deep stains and coffee discoloration.",
      fullDesc: "Utilizing professional clinical whitening lamps with protective gum barriers, our gentle in-office whitening brightens tooth shades safely in under 60 minutes.",
      benefits: ["Immediate visible shade improvement", "Enamel-safe desensitizing formulation", "Long-lasting radiant results"],
      duration: "45-60 Mins",
      icon: "Sun",
      image: "/assets/clinic/wide-dental-chair.jpg"
    },
    {
      id: "dental-implants",
      title: "Dental Implants",
      category: "restorative",
      shortDesc: "Permanent, bio-compatible titanium root replacements for missing teeth with lifelike ceramic crowns.",
      fullDesc: "Restore chewing efficiency and prevent jawbone loss. Our dental implants feel, function, and look like natural healthy teeth.",
      benefits: ["Lifelong durability", "Preserves natural jaw structure", "Seamless chewing comfort"],
      duration: "Multi-stage planned care",
      icon: "ShieldCheck",
      image: "/assets/clinic/wide-advanced-equipment.jpg"
    },
    {
      id: "crowns-veneers",
      title: "Ceramic Crowns & Veneers",
      category: "restorative",
      shortDesc: "Ultra-thin porcelain veneers and durable zirconia crowns to correct chips, gaps, or damaged enamel.",
      fullDesc: "Individually handcrafted ceramic restorations bonded seamlessly to protect damaged teeth and enhance aesthetics with optical translucency.",
      benefits: ["Stain resistant porcelain", "Ultra-thin precision fitting", "Reinforces fragile teeth"],
      duration: "2 Visits",
      icon: "Gem",
      image: "/assets/clinic/wide-consultation-office.jpg"
    },
    {
      id: "braces-aligners",
      title: "Clear Aligners & Braces",
      category: "dental",
      shortDesc: "Discreet clear aligners and orthodontic solutions for crowding, spacing, and bite alignment.",
      fullDesc: "Straighten your smile comfortably without bulky metal wires using customized transparent aligner trays tailored for adults and teens.",
      benefits: ["Virtually invisible wear", "Removable for meals and brushing", "Computerized progress tracking"],
      duration: "6-18 Months",
      icon: "Smile",
      image: "/assets/clinic/wide-operatory-daylight.jpg"
    },
    {
      id: "root-canal",
      title: "Gentle Root Canal Treatment",
      category: "restorative",
      shortDesc: "Pain-relieving, rotary endodontic therapy to preserve infected natural teeth with crown protection.",
      fullDesc: "Modern computerized rotary apex locators and gentle local anesthesia make root canal therapy smooth, comfortable, and highly reliable.",
      benefits: ["Immediate pain relief", "Saves natural tooth structure", "Single or two-sitting completion"],
      duration: "1-2 Visits",
      icon: "Activity",
      image: "/assets/clinic/wide-dental-chair.jpg"
    },
    {
      id: "facial-aesthetics",
      title: "Facial Aesthetics & Skin Rejuvenation",
      category: "aesthetic",
      shortDesc: "Clinical skin revitalization, PRP/PRF, laser hair reduction, and anti-aging treatments.",
      fullDesc: "Integrated facial aesthetic treatments delivered in a clinical, sterile setting with modern medical technology and personalized skin assessments.",
      benefits: ["Clinical sterile protocols", "Medical-grade aesthetic lasers", "Restores natural skin glow"],
      duration: "Custom plan",
      icon: "HeartPulse",
      image: "/assets/clinic/wide-facial-aesthetics-suite.jpg"
    },
    {
      id: "pediatric-dentistry",
      title: "Pediatric Care for Children",
      category: "dental",
      shortDesc: "Warm, anxiety-free dental visits for infants, toddlers, and young teens with preventive sealants.",
      fullDesc: "We foster positive dental habits early. A compassionate, friendly environment that turns fear into fun while protecting developing smiles.",
      benefits: ["Gentle child-friendly pacing", "Fluoride & pit fissure sealants", "Habit breaking counseling"],
      duration: "30-45 Mins",
      icon: "Baby",
      image: "/assets/clinic/wide-reception-lounge.jpg"
    },
    {
      id: "preventive-cleaning",
      title: "Ultrasonic Cleaning & Gum Care",
      category: "dental",
      shortDesc: "Gentle plaque and tartar removal with ultrasonic scaling, polishing, and periodontal care.",
      fullDesc: "Prevent bleeding gums and freshen breath. Regular preventative scaling protects the foundation of your teeth and overall systemic wellness.",
      benefits: ["Prevents gum recession", "Removes stubborn calculus", "Immediate fresh mouth feeling"],
      duration: "30-45 Mins",
      icon: "Droplets",
      image: "/assets/clinic/wide-entrance-corridor.jpg"
    }
  ],

  clinicFeatures: [
    {
      title: "Dual Dental & Facial Aesthetic Care",
      description: "Conveniently combine cosmetic smile enhancements with clinical facial aesthetic care under one trusted roof in Kothrud.",
      icon: "Layers"
    },
    {
      title: "Soothing Panoramic Operatory",
      description: "Our main treatment room features floor-to-ceiling garden greenery views and natural daylight, ensuring a calming experience.",
      icon: "Eye"
    },
    {
      title: "Warm Scandinavian Clinic Interior",
      description: "Designed with natural oak paneling, warm ambient lighting, and minimalist aesthetics to reduce clinical anxiety.",
      icon: "Home"
    },
    {
      title: "Strict Hospital-Grade Sterilization",
      description: "Multi-tier autoclave sterilization protocols, individually sealed pouch instruments, and disposable infection barriers.",
      icon: "ShieldAlert"
    },
    {
      title: "Transparent & Honest Guidance",
      description: "No hidden charges or pressured upselling. We explain all treatment pathways with digital imaging and let you decide.",
      icon: "FileCheck"
    },
    {
      title: "Convenient Split Timings",
      description: "Open mornings (10:30am–2pm) and evenings (4:30pm–8pm) plus Sunday morning slots to comfortably suit working professionals.",
      icon: "Clock"
    }
  ],

  patientJourney: [
    {
      step: "01",
      title: "Connect & Share Your Goals",
      desc: "Reach out via our online booking form or message directly on WhatsApp. Let us know if you require routine cleaning, aesthetic care, or pain relief."
    },
    {
      step: "02",
      title: "Personalized Consultation",
      desc: "Visit our clinic in Geetai Sankul, Kothrud. We conduct thorough digital examinations, discuss visual options, and create a custom treatment blueprint."
    },
    {
      step: "03",
      title: "Comfortable Gentle Treatment",
      desc: "Experience pain-managed, meticulous care in our relaxing, daylight-filled suites with ongoing post-treatment care and checkup support."
    }
  ],

  gallery: [
    {
      title: "Panoramic Operatory Suite",
      category: "Operatory",
      image: "/assets/clinic/clinic-panoramic-suite.jpg",
      wideImage: "/assets/clinic/wide-clinic-panoramic-suite.jpg",
      description: "Large picture window facing lush green tree canopy creating a serene, peaceful dental experience."
    },
    {
      title: "Warm Wood Reception Lounge",
      category: "Reception",
      image: "/assets/clinic/reception-lounge.jpg",
      wideImage: "/assets/clinic/wide-reception-lounge.jpg",
      description: "Scandinavian minimalist waiting lounge with warm oak wall cladding and comfortable seating."
    },
    {
      title: "Facial Aesthetic & Laser Suite",
      category: "Aesthetics",
      image: "/assets/clinic/facial-aesthetics-suite.jpg",
      wideImage: "/assets/clinic/wide-facial-aesthetics-suite.jpg",
      description: "Dedicated aesthetic suite with adjustable treatment bed, PRP centrifuge, and skin laser equipment."
    },
    {
      title: "Consultation & Diagnostics Desk",
      category: "Consultation",
      image: "/assets/clinic/consultation-office.jpg",
      wideImage: "/assets/clinic/wide-consultation-office.jpg",
      description: "Private consultation room for digital smile assessment, patient review, and transparent discussion."
    },
    {
      title: "Advanced Ergonomic Dental Chair",
      category: "Technology",
      image: "/assets/clinic/dental-chair.jpg",
      wideImage: "/assets/clinic/wide-dental-chair.jpg",
      description: "State-of-the-art dental unit with shadowless LED illumination and portable handheld diagnostic tools."
    },
    {
      title: "Sterile Clinical Corridor",
      category: "Interior",
      image: "/assets/clinic/entrance-corridor.jpg",
      wideImage: "/assets/clinic/wide-entrance-corridor.jpg",
      description: "Spotless hygienic layout connecting treatment suites with modern ambient cove lighting."
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Pooja Deshmukh",
      rating: 5,
      date: "Google Review",
      treatment: "Smile Design & Veneers",
      text: "Dr. Achal Agarwal and the entire OneCare team are truly exceptional! The clinic ambiance is so serene and completely unlike intimidating clinics. My smile makeover looks incredibly natural.",
      source: "Google Business",
      verified: true
    },
    {
      id: "rev-2",
      author: "Rahul Joshi",
      rating: 5,
      date: "Google Review",
      treatment: "Root Canal & Crown",
      text: "I was extremely anxious about getting a root canal, but the doctor made the entire procedure completely pain-free! The scenic garden view from the dental chair was so calming. Highly recommended in Kothrud.",
      source: "Google Business",
      verified: true
    },
    {
      id: "rev-3",
      author: "Ananya Kulkarni",
      rating: 5,
      date: "Google Review",
      treatment: "Teeth Whitening & Cleaning",
      text: "Visited for scaling and teeth whitening. The results are visible immediately and the hygiene standards are top notch. Very transparent consultation without any unnecessary recommendations.",
      source: "Google Business",
      verified: true
    },
    {
      id: "rev-4",
      author: "Vikram Patil",
      rating: 5,
      date: "Google Review",
      treatment: "Dental Implants",
      text: "Got two implants done here. Excellent pre-treatment explanation and meticulous surgical care. The split evening timings are very convenient for office goers.",
      source: "Google Business",
      verified: true
    },
    {
      id: "rev-5",
      author: "Sneha Gokhale",
      rating: 5,
      date: "Google Review",
      treatment: "Facial Aesthetic Treatment",
      text: "The combination of dental care and facial aesthetics under one roof is wonderful. Doctor took time to understand my skin goals. The clinic is pristine, modern, and very welcoming.",
      source: "Google Business",
      verified: true
    }
  ],

  faqs: [
    {
      question: "How do I book an appointment at OneCare Aesthetix?",
      answer: "You can easily request an appointment through our online booking form on this website, or click the WhatsApp button to chat directly with our team. Our clinic will contact you to confirm your preferred slot.",
      category: "Booking"
    },
    {
      question: "Is an online appointment request immediately confirmed?",
      answer: "When you submit a request online or via WhatsApp, our reception checks the clinical schedule and sends an official confirmation. This prevents double bookings and ensures sufficient doctor time for your consultation.",
      category: "Booking"
    },
    {
      question: "Where is the clinic located in Kothrud?",
      answer: "We are located at Shop No. 204, 2nd Floor, Geetai Sankul, Paud Road, right near Ideal Colony in Kothrud, Pune (Pincode: 411038). Lift access and parking are available.",
      category: "Location"
    },
    {
      question: "What treatments are offered at OneCare Aesthetix?",
      answer: "We provide comprehensive dental care including Digital Smile Design, Teeth Whitening, Dental Implants, Porcelain Veneers, Clear Aligners, Root Canals, and Pediatric Dentistry, as well as clinical Facial Aesthetic treatments such as Laser Hair Reduction and PRP.",
      category: "Services"
    },
    {
      question: "What are your business hours?",
      answer: "We operate Monday through Saturday with split hours: Morning 10:30 AM to 2:00 PM, and Evening 4:30 PM to 8:00 PM. On Sundays, we are open 11:00 AM to 2:30 PM by appointment.",
      category: "Hours"
    },
    {
      question: "What should I bring to my first consultation?",
      answer: "Please bring any previous dental X-rays, medical history records, or a list of current medications if applicable. We will take fresh digital photographs or X-rays as needed during your consultation.",
      category: "First Visit"
    },
    {
      question: "How can I inquire about treatment costs?",
      answer: "Because every mouth and aesthetic goal is unique, we provide honest, transparent cost breakdowns after examining your specific dental structure during the initial consultation. You can also message us on WhatsApp for general estimates.",
      category: "Pricing"
    }
  ]
}
