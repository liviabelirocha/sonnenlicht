import { useEffect, useState } from "react";
import { Card } from "../components/Card"
import Filter from "../components/Filter";

import "../styles/pages/Home.scss"

const Home = ( { houses = [] } ) => {

    const [filteredHouses, setFilteredHouses] = useState(houses)
    const [originalHouses, setOriginalHouses] = useState(houses)

    const options = ["Fortaleza", "São Paulo"]

    useEffect(() => {
        const newHouses = []
        for (let i = 0; i < 3; i++) {
            newHouses.push({
                title: "Apartamento em Fortaleza",
                city: "Fortaleza",
                details: ["Beautiful family home give us the ability to stay by the sea with amazing blue background full of light of the sky, Florina give us its gentle side."],
                img: "https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096",
                price: "6.000",
            });
            newHouses.push({
                title: "Apartamento em São Paulo",
                city: "São Paulo",
                details: ["Beautiful family home give us the ability to stay by the sea with amazing blue background full of light of the sky, Florina give us its gentle side."],
                img: "https://pbs.twimg.com/media/FS_UvxeWYAEmFmV?format=jpg&name=4096x4096",
                price: "6.000",
            });
        }
        setOriginalHouses(newHouses)
        setFilteredHouses(newHouses)
    }, [])

    const handleChangeCity = (e) => {
        const newCity = e.target.value
        if (newCity === "all") return setFilteredHouses(originalHouses)
        setFilteredHouses(originalHouses.filter((house) => {return house.city === newCity}))
    }
    
    return (
      <div className="home-layout">
        <div className="filter_section">
        <Filter></Filter>
          {/* <select className="city" name="city" onChange={(e) => handleChangeCity(e)}>
            <option value="all">Todas</option>
            {options.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select> */}
        </div>
        <h2 className="content__title-section">Properties</h2>
        <div className="content">
          {filteredHouses.length === 0
            ? ""
            : filteredHouses.map((house) => {
                return (
                  <Card
                    title={house.title}
                    details={house.details}
                    img={house.img}
                    price=  {house.price}
                  ></Card>
                );
              })}
        </div>
      </div>
    );
}

export { Home }