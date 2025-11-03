import MusicCard from '../MusicCard'

export default function MusicCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <MusicCard
        id="1"
        title="Clair de Lune"
        artist="Claude Debussy"
        duration="4:32"
        thumbnail="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=225&fit=crop"
        onDownload={(id) => console.log('Downloading:', id)}
      />
    </div>
  )
}
