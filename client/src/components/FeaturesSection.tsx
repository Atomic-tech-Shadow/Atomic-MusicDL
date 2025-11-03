import { Music2, Zap, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Pouvoir Atomique",
    description: "Téléchargez vos OST d'anime et musiques préférées avec la puissance atomique. Ultra rapide, ultra efficace."
  },
  {
    icon: Music2,
    title: "Haute Qualité MP3",
    description: "Qualité audio supérieure pour vos anime opening, ending et OST. Parfait pour les otaku exigeants."
  },
  {
    icon: Sparkles,
    title: "Pour les Otaku",
    description: "Parfait pour télécharger vos anime OST, J-pop, Vocaloid et plus. Sans inscription, simple et direct."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4" data-testid="text-features-title">
            Le Pouvoir d'Atomic MusicDL
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-subtitle">
            La plateforme ultime pour télécharger vos musiques d'anime préférées
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center"
              data-testid={`feature-${index}`}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" data-testid={`icon-feature-${index}`} />
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2" data-testid={`text-feature-title-${index}`}>
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-feature-desc-${index}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
