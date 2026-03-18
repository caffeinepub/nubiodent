import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, HandshakeIcon, Wrench } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import { ProductCard } from "../components/products/ProductCard";
import { CATEGORIES, SAMPLE_PRODUCTS } from "../data/sampleProducts";

interface HomePageProps {
  featuredProducts: Product[];
  wishlistIds: bigint[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigate: (page: string) => void;
}

const BENEFITS = [
  {
    icon: CheckCircle,
    title: "Reliable Dental Technology",
    description:
      "We provide modern dental equipment designed to deliver accurate diagnostics and consistent clinical performance.",
  },
  {
    icon: Wrench,
    title: "Professional Technical Support",
    description:
      "Our team provides installation, technical assistance, and ongoing service support to ensure smooth equipment operation.",
  },
  {
    icon: HandshakeIcon,
    title: "Trusted Partnership",
    description:
      "Nubiodent is committed to building long-term relationships with dental clinics by providing dependable technology and service.",
  },
];

export function HomePage({
  featuredProducts,
  wishlistIds,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  onNavigate,
}: HomePageProps) {
  const displayProducts =
    featuredProducts.length > 0
      ? featuredProducts
      : SAMPLE_PRODUCTS.filter((p) => p.featured);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: 440 }}>
        <img
          src="/assets/generated/hero-dental-clinic.dim_1400x500.jpg"
          alt="Modern dental clinic"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />
        <div
          className="relative max-w-7xl mx-auto px-4 py-20 flex items-center"
          style={{ minHeight: 440 }}
        >
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-3">
              Advanced Dental Equipment &amp; Imaging Solutions
            </p>
            <h1 className="font-display font-extrabold text-white text-4xl md:text-5xl leading-tight uppercase mb-4">
              Equip Your Clinic
              <br />
              For Excellence
            </h1>
            <p className="text-white/80 text-base mb-7 leading-relaxed">
              Nubiodent is a trusted provider of modern dental equipment and
              imaging technology. We help clinics improve diagnostic accuracy,
              workflow efficiency, and patient care.
            </p>
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 font-semibold shadow-md"
                onClick={() => onNavigate("products")}
                data-ocid="hero.primary_button"
              >
                Shop Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10 bg-transparent"
                onClick={() => onNavigate("about")}
                data-ocid="hero.secondary_button"
              >
                About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl uppercase text-foreground tracking-wide">
              Shop By Category
            </h2>
            <p className="text-muted-foreground mt-2">
              Browse our complete range of dental equipment categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.name}
                onClick={() => onNavigate("products")}
                className="bg-category rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all hover:-translate-y-0.5 text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                data-ocid="categories.link"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {cat.name}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {cat.count} items
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solutions */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl uppercase text-foreground tracking-wide">
              Dental Technology for Modern Clinics
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              The success of a dental clinic depends on the reliability of its
              equipment. Nubiodent works closely with dental professionals to
              supply advanced technology and clinic solutions.
            </p>
          </motion.div>
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              "Dental imaging systems",
              "Dental diagnostic equipment",
              "Dental clinic equipment",
              "Dental accessories and technology solutions",
              "Equipment installation and service support",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-foreground"
              >
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl uppercase text-foreground tracking-wide">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Our most popular dental equipment picks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayProducts.slice(0, 4).map((product, i) => (
              <motion.div
                key={String(product.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProductCard
                  product={product}
                  index={i + 1}
                  isInWishlist={wishlistIds.includes(product.id)}
                  onViewDetails={onViewDetails}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => onNavigate("products")}
              data-ocid="featured.secondary_button"
            >
              View All Products <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl uppercase text-foreground tracking-wide">
              Why Choose Nubiodent
            </h2>
            <p className="text-muted-foreground mt-2">
              Trusted by dental professionals for quality equipment and reliable
              service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 nav-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
