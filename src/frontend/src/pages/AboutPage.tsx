import { CheckCircle, Eye, HandshakeIcon, Target, Wrench } from "lucide-react";
import { motion } from "motion/react";

export function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="navy-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display font-extrabold text-4xl uppercase mb-4">
              About Nubiodent
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-base leading-relaxed">
              A dental equipment and technology solutions provider dedicated to
              supporting modern dental practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-14 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl uppercase text-foreground tracking-wide mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Nubiodent is a trusted provider of modern dental equipment and
                imaging technology designed to support the needs of today's
                dental professionals. We supply reliable solutions that help
                clinics improve diagnostic accuracy, workflow efficiency, and
                patient care.
              </p>
              <p>
                With experience in dental equipment, imaging systems, and
                clinical technology, we understand the challenges dentists face
                when selecting and maintaining the right equipment. Our goal is
                to provide reliable dental technology and dependable service
                that supports efficient clinic operations.
              </p>
              <p>
                At Nubiodent, we believe that advanced technology should make
                dentistry more efficient, accurate, and accessible. By combining
                high-quality equipment with expert service support, we help
                dental clinics deliver better care while maintaining reliable
                operations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-background rounded-2xl p-8 border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-12 h-12 nav-gradient rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To become a trusted provider of advanced dental technology and
                equipment solutions that support the growth and success of
                modern dental practices.
              </p>
            </motion.div>

            <motion.div
              className="bg-background rounded-2xl p-8 border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="w-12 h-12 nav-gradient rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To supply high-quality dental equipment, reliable service
                support, and technology solutions that help dental professionals
                deliver better patient care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Nubiodent */}
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
              Why Choose Nubiodent
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: CheckCircle,
                title: "Reliable Dental Technology",
                desc: "We provide modern dental equipment designed to deliver accurate diagnostics and consistent clinical performance.",
              },
              {
                icon: Wrench,
                title: "Professional Technical Support",
                desc: "Our team provides installation, technical assistance, and ongoing service support to ensure smooth equipment operation.",
              },
              {
                icon: Target,
                title: "Solutions for Modern Clinics",
                desc: "We help dental professionals choose the right equipment for their clinic's workflow and long-term needs.",
              },
              {
                icon: HandshakeIcon,
                title: "Trusted Partnership",
                desc: "Nubiodent is committed to building long-term relationships with dental clinics by providing dependable technology and service.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 nav-gradient rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service & Support */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl uppercase text-foreground tracking-wide mb-4">
              Service &amp; Support
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              At Nubiodent, we believe that reliable service is as important as
              reliable equipment. Our service team provides professional support
              to ensure your dental technology operates efficiently.
            </p>
            <ul className="space-y-3">
              {[
                "Equipment installation and setup",
                "Technical support and troubleshooting",
                "Preventive maintenance",
                "Equipment consultation for clinics",
              ].map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 text-foreground"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl uppercase text-foreground tracking-wide mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-8">
              For inquiries about dental equipment, technology solutions, or
              service support, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:sales@nubiodent.com"
                className="flex items-center gap-2 text-primary font-medium hover:underline"
              >
                ✉️ sales@nubiodent.com
              </a>
              <a
                href="tel:+918595777273"
                className="flex items-center gap-2 text-primary font-medium hover:underline"
              >
                📞 +91 8595777273
              </a>
              <span className="text-muted-foreground">
                📍 B94, Ramprastha Colony, Ghaziabad — 201011
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
