import { useEffect, useState } from "react";
import { Card } from "../components/Card"

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
                details: ["1 cama de casal","30 de out. - 6 de nov."],
                img: "https://image.shutterstock.com/mosaic_250/565474/1937913955/stock-photo-a-perfect-neighbourhood-houses-in-suburb-at-summer-in-the-north-america-luxury-houses-with-nice-1937913955.jpg",
                price: "6.000",
            });
            newHouses.push({
                title: "Apartamento em São Paulo",
                city: "São Paulo",
                details: ["1 cama de casal","30 de out. - 6 de nov."],
                img: "https://image.shutterstock.com/mosaic_250/565474/1937913955/stock-photo-a-perfect-neighbourhood-houses-in-suburb-at-summer-in-the-north-america-luxury-houses-with-nice-1937913955.jpg",
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
        <div className="filter">
          <select className="city" name="city" onChange={(e) => handleChangeCity(e)}>
            <option value="all">Todas</option>
            {options.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
        </div>
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