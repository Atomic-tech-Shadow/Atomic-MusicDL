import { Zap } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="py-12 border-t bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-bold font-heading" data-testid="text-footer-logo">Atomic MusicDL</span>
            </div>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-tagline">
              Le pouvoir atomique du téléchargement de musique pour otaku
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3" data-testid="text-footer-links-title">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
                  Conditions d'Utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3" data-testid="text-footer-social-title">Suivez-nous</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-9 h-9 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center"
                data-testid="link-github"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center"
                data-testid="link-twitter"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            © 2025 Atomic MusicDL. I AM ATOMIC ⚡
          </p>
        </div>
      </div>
    </footer>
  );
}
