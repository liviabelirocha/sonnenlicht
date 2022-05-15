import "../styles/components/Card.scss"

const Card = ({ title, details, img, price }) => {
    return (
      <div className="card">
        <div>
          <img src={img} className="card__image" alt="img" />
          <div className="card__details">
            <h2 className="card__title">{title}</h2>
            {details.map((detail) => (
              <p>{detail}</p>
            ))}
            <p className="card__price">
              <b>R${price}</b>
            </p>
          </div>
        </div>
        <div className="card__btn-container">
          <button className="card__btn more-info">Mais informações</button>
          <button className="card__btn contact">Contato do vendedor</button>
        </div>
      </div>
    );
}

export { Card }