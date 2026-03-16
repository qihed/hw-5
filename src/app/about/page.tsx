"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "components/Header";
import Text from "components/Text";
import AwardIcon from "icons/AwardIcon";
import PackageIcon from "icons/PackageIcon";
import HeadphonesIcon from "icons/HeadphonesIcon";
import ShieldIcon from "icons/ShieldIcon";
import styles from "./about-page.module.scss";

const features = [
  {
    icon: <AwardIcon width={24} height={24} />,
    title: "Premium Quality",
    description: "We offer only quality furniture from trusted manufacturers",
  },
  {
    icon: <PackageIcon width={24} height={24} />,
    title: "Fast Delivery",
    description: "Nationwide delivery within 3-7 days",
  },
  {
    icon: <HeadphonesIcon width={24} height={24} />,
    title: "24/7 Support",
    description: "Our team is always ready to help you with any questions",
  },
  {
    icon: <ShieldIcon width={24} height={24} />,
    title: "Quality Guarantee",
    description: "We provide warranty on all our products",
  },
];

const stats = [
  { number: "10,000+", label: "Happy customers" },
  { number: "5,000+", label: "Products in catalog" },
  { number: "50+", label: "Delivery cities" },
  { number: "15", label: "Years in business" },
];

const team = [
  { name: "Anna Smirnova", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Dmitry Petrov", role: "Interior Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Elena Ivanova", role: "Customer Relations Manager", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80" },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroGrid}>
              <div>
                <Text view="title" tag="h1" className={styles.heroTitle}>
                  About us
                </Text>
                <Text view="p-18" color="secondary" className={styles.heroText}>
                  Lalasia is a modern online furniture store that offers a wide range of quality
                  furniture for your home and office. We believe that everyone deserves a beautiful
                  and comfortable space.
                </Text>
                <Text view="p-18" color="secondary" className={styles.heroText}>
                  Since 2011, we have been helping thousands of customers create their dream homes.
                  Our mission is to make quality designer furniture affordable for everyone.
                </Text>
              </div>
              <div className={styles.heroImage}>
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                  alt="Sofa in interior"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statsContent}>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <Text tag="div" view="title" className={styles.statNumber}>
                    {stat.number}
                  </Text>
                  <Text tag="div" view="p-14" className={styles.statLabel}>
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featuresContent}>
            <div className={styles.featuresHeader}>
              <Text view="title" tag="h2" className={styles.featuresTitle}>
                Why choose us
              </Text>
              <Text view="p-18" color="secondary" className={styles.featuresSubtitle}>
                We offer more than just furniture — we create comfort and style for your home
              </Text>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <Text view="p-18" weight="medium" tag="h3" className={styles.featureTitle}>
                    {feature.title}
                  </Text>
                  <Text view="p-14" color="secondary" className={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.team}>
          <div className={styles.teamContent}>
            <div className={styles.teamHeader}>
              <Text view="title" tag="h2" className={styles.teamTitle}>
                Our team
              </Text>
              <Text view="p-18" color="secondary" className={styles.teamSubtitle}>
                Meet the professionals who make Lalasia special
              </Text>
            </div>
            <div className={styles.teamGrid}>
              {team.map((member, index) => (
                <div key={index} className={styles.teamMember}>
                  <div className={styles.teamAvatar}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="192px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <Text view="p-18" weight="medium" tag="h3" className={styles.teamName}>
                    {member.name}
                  </Text>
                  <Text view="p-14" color="secondary" className={styles.teamRole}>
                    {member.role}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <Text view="title" tag="h2" className={styles.ctaTitle}>
              Ready to get started?
            </Text>
            <Text view="p-18" color="secondary" className={styles.ctaText}>
              Join thousands of happy customers and find the perfect furniture for your home
            </Text>
            <div className={styles.ctaButtons}>
              <Link href="/products" className={styles.ctaLink}>
                View catalog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
