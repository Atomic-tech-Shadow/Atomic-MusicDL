import { Music2, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Music2,
    title: "Haute Qualité MP3",
    description: "Téléchargez vos musiques en qualité audio supérieure pour une expérience d'écoute optimale."
  },
  {
    icon: Zap,
    title: "Ultra Rapide",
    description: "Conversion et téléchargement instantanés. Votre musique est prête en quelques secondes."
  },
  {
    icon: Shield,
    title: "Sans Inscription",
    description: "Aucun compte requis. Recherchez et téléchargez directement, en toute simplicité."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4" data-testid="text-features-title">
            Pourquoi Utiliser Notre Plateforme
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-subtitle">
            Une solution simple et efficace pour tous vos besoins musicaux
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
