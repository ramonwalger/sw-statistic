'use client'
import Image from 'next/image';
import { useEffect, useState } from "react";
import getMonstersWithinInterval from '../helpers/getMonstersWithinInterval';
import sortUnits from '../helpers/sortUnits';
import MonsterChart from './MonsterChart';

export default function ListMonsters({
  list: monsters_list
}) {
  const [monsters, setMonsters] = useState([])
  const [intervalOption, setIntervalOption] = useState('1m')
  const [searchName, setSearchName] = useState('')
  const [star, setStar] = useState(5)
  const [chartData, setChartData] = useState({});
  
  useEffect(() => {
    let _monsters = monsters_list.filter(monster => monster.name.toLowerCase().includes(searchName.toLowerCase()))
    _monsters = sortUnits(monsters_list, { stars: star })
    
    const result = getMonstersWithinInterval(_monsters, intervalOption)
    setChartData({
      labels: result.monsters.flatMap(group => group.group.map(monster => monster.summonedIn)),
      values: result.monsters.flatMap(group => group.group.map(() => 1))
    })

    const newList = result.monsters.flatMap(group => group.group)
    if(newList.length > 0){
      setMonsters(newList)
    }else{
      setMonsters(_monsters)
    }
  }, [star, searchName, intervalOption])

  if(monsters?.length == 0) return <></>

  return (
    <>
      <ul>
        {
          monsters?.map((unit, index) => {
            let stars = Array(unit.stars).fill('⭐️').join('')
            let summonedIn = new Date(unit.summonedIn).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
            let id = (unit.id + "-" + unit.name + index).toString()
            return (
              <li key={id} id={id}>
                <p>{unit.name} - {stars}</p>
                { unit.image && <Image src={unit.image} alt={unit.name} width={50} height={50} /> }
                <p>{summonedIn}</p>
              </li>
            )
          })
        }
      </ul>

      <div>
        <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />

        <select id="star" value={star} onChange={(e) => setStar(parseInt(e.target.value))}>
          <option value="5">5 estrelas</option>
          <option value="4">4 estrelas</option>
          <option value="3">3 estrelas</option>
          <option value="2">2 estrelas</option>
          <option value="1">1 estrela</option>
        </select>

        <select id="interval" value={intervalOption} onChange={(e) => setIntervalOption(e.target.value)}>
          <option value="">Selecione um intervalo</option>
          <option value="30s">30 segundos</option>
          <option value="1m">1 minuto</option>
          <option value="5m">5 minutos</option>
          <option value="30m">30 minutos</option>
          <option value="1h">1 hora</option>
          <option value="1d">1 dia</option>
          <option value="all">Sempre</option>
        </select>

        <MonsterChart data={chartData} />
      </div>
    </>
  )
}