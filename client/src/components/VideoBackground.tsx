import videoFile from "@assets/PinDown.io_@Azizology_1762201393_1762202048928.mp4";

export default function VideoBackground() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="video-background"
      >
        <source src={videoFile} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4" data-testid="text-video-section-title">
          L'Énergie Atomique de la Musique
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-video-section-subtitle">
          Découvrez une nouvelle dimension de téléchargement musical
        </p>
      </div>
    </section>
  );
}
