import { Search, Eye, Download } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Search,
    title: "Rechercher",
    description: "Tapez le nom de la chanson, de l'artiste ou de l'album que vous recherchez."
  },
  {
    number: "2",
    icon: Eye,
    title: "Prévisualiser",
    description: "Parcourez les résultats et sélectionnez la musique que vous souhaitez télécharger."
  },
  {
    number: "3",
    icon: Download,
    title: "Télécharger",
    description: "Cliquez sur le bouton de téléchargement et profitez de votre musique en MP3."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4" data-testid="text-how-title">
            Comment Ça Marche
          </h2>
          <p className="text-muted-foreground" data-testid="text-how-subtitle">
            Trois étapes simples pour télécharger votre musique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative text-center"
              data-testid={`step-${index}`}
            >
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold font-heading" data-testid={`number-step-${index}`}>
                  {step.number}
                </div>
              </div>
              <div className="mb-4">
                <step.icon className="w-8 h-8 mx-auto text-primary" data-testid={`icon-step-${index}`} />
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2" data-testid={`text-step-title-${index}`}>
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`text-step-desc-${index}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
