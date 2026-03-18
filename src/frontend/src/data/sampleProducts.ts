import type { Product } from "../backend.d";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "ProComfort Elite Dental Chair",
    description:
      "Advanced ergonomic dental chair with integrated LED light, multiple positioning modes, heated seat, memory foam padding, and built-in delivery system. Perfect for long treatment sessions with maximum patient comfort.",
    category: "Dental Chairs",
    price: 4299.99,
    imageUrl: "/assets/generated/product-dental-chair.dim_400x400.jpg",
    featured: true,
    inStock: true,
    rating: 4.8,
  },
  {
    id: 2n,
    name: "DigiRay 3D Panoramic X-Ray System",
    description:
      "Full digital panoramic and cephalometric X-ray system with 3D CBCT capability. Ultra-low radiation dose, instant image processing, and seamless practice management software integration.",
    category: "Imaging Systems",
    price: 18500.0,
    imageUrl: "/assets/generated/product-xray-unit.dim_400x400.jpg",
    featured: true,
    inStock: true,
    rating: 4.9,
  },
  {
    id: 4n,
    name: "TurboPro High-Speed Handpiece Set",
    description:
      "Premium titanium high-speed turbine handpiece with ceramic bearings, 360 degree swivel, LED illumination, and push-button chuck. Includes 3 handpieces and maintenance kit.",
    category: "Handpieces",
    price: 689.0,
    imageUrl: "/assets/generated/product-handpiece.dim_400x400.jpg",
    featured: true,
    inStock: true,
    rating: 4.6,
  },
  {
    id: 5n,
    name: "DentaKit Pro Instrument Set",
    description:
      "Comprehensive 32-piece stainless steel dental instrument set including mirrors, explorers, probes, scalers, and extractors. Autoclavable with ergonomic handles.",
    category: "Instruments",
    price: 349.99,
    imageUrl: "/assets/generated/product-instrument-kit.dim_400x400.jpg",
    featured: false,
    inStock: true,
    rating: 4.5,
  },
  {
    id: 6n,
    name: "SilentAir Dental Compressor",
    description:
      "Oil-free, ultra-quiet dental air compressor (42 dB). 50L tank, 100% oil-free output, dry and clean air delivery with integrated filtration system. CE certified.",
    category: "Compressors",
    price: 1299.0,
    imageUrl: "/assets/generated/product-compressor.dim_400x400.jpg",
    featured: false,
    inStock: true,
    rating: 4.7,
  },
  {
    id: 7n,
    name: "PiezoSonic Ultrasonic Scaler",
    description:
      "Piezoelectric ultrasonic scaler with LED handpiece, 5 scaling modes, and autoclavable tips. Effective for supragingival and subgingival scaling with gentle tissue treatment.",
    category: "Handpieces",
    price: 495.0,
    imageUrl: "/assets/generated/product-handpiece.dim_400x400.jpg",
    featured: false,
    inStock: true,
    rating: 4.4,
  },
  {
    id: 8n,
    name: "Digital Intraoral Sensor X-Ray",
    description:
      "High-resolution intraoral digital X-ray sensor with USB connectivity, 20 lp/mm resolution, and instant imaging. Compatible with all major dental software platforms.",
    category: "Imaging Systems",
    price: 3200.0,
    imageUrl: "/assets/generated/product-xray-unit.dim_400x400.jpg",
    featured: false,
    inStock: false,
    rating: 4.6,
  },
  {
    id: 9n,
    name: "Melag Vacuclave 123",
    description:
      "Class B vacuum autoclave for reliable sterilization of wrapped and unwrapped instruments, including hollow instruments and textiles. Features a 17-litre chamber, dual temperature settings (121°C / 134°C), integrated drying system, and is EN 13060 Class B compliant.",
    category: "Sterilization",
    price: 0,
    imageUrl: "/assets/uploads/melag-vacuclave-123.png",
    featured: true,
    inStock: true,
    rating: 4.8,
  },
  {
    id: 10n,
    name: "Runyes Feng 23L Class B Autoclave",
    description:
      "Class B fully automatic front-loading autoclave with triple vacuum cycle and B+ (Prion) cycle for comprehensive sterilization. Features USB storage for 2000+ cycles, double door lock system (airlock & mechanical lock), Steam Spray Barrier, and -92 kPa high vacuum pump. Chamber size 250mm x 450mm. Suitable for wrapped/unwrapped, solid/hollow, and porous/non-porous instruments. 5 sterilization programs, 3 temperature settings (121°C / 134°C / B+). Distilled water tank: 3.5L, Waste-water tank: 5L. ISO & CE Certified.",
    category: "Sterilization",
    price: 0,
    imageUrl: "/assets/uploads/runyesd-1.png",
    featured: true,
    inStock: true,
    rating: 4.8,
  },
];

export const CATEGORIES = [
  { name: "Dental Chairs", icon: "chair", count: 12 },
  { name: "Imaging Systems", icon: "imaging", count: 8 },
  { name: "Sterilization", icon: "sterilization", count: 10 },
  { name: "Handpieces", icon: "handpiece", count: 15 },
  { name: "Instruments", icon: "instruments", count: 20 },
  { name: "Compressors", icon: "compressor", count: 6 },
];
