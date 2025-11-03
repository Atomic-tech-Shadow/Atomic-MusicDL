import SearchBar from '../SearchBar'

export default function SearchBarExample() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
    </div>
  )
}
