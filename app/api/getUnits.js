
import data from "../../public/TresReal.json";

const getUnits = async () => {
  const monsters = []
  
  const { unit_list } = data
  const assets = "https://swarfarm.com/static/herders/images/monsters/"
  const endpoint = 'https://swarfarm.com/api/v2/monsters/?id__in=&com2us_id='
  
  await Promise.all(unit_list.map(async (item) => {
    const response = await fetch(endpoint + item.unit_master_id)
    const json = await response.json()
    const res = json.results
    
    if(res.length > 0) {
      const info = res[0]
      monsters.push({
        id: info.com2us_id,
        name: info.name,
        stars: info.natural_stars,
        image: assets + info.image_filename,
        summonedIn: item.create_time
      })
    }   
  }));
  
  return monsters
}

export default getUnits