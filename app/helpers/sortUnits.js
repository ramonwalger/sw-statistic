export default function sortUnits(
  units,
  filter = {
    stars: 5
  }
) {
    units = units?.filter(unit => unit.stars === filter.stars)
    units?.sort((a, b) => b.stars - a.stars)
    units?.sort((a, b) => new Date(a.summonedIn) - new Date(b.summonedIn))

    return units
}