import '../styles/components/Card.scss'

const Card = ({ title, details, img, price }) => {
  return (
    <div className="card">
      <div className="card__content">
        <img src={img} className="card__image" alt="img" />
        <div className="card__header">
          <h2 className="card__title">{title}</h2>
          <p className="card__price">R${price}</p>
        </div>
        {details.map((detail, index) => (
          <p className="card__details" key={`detail-${index}`}>
            {detail}
          </p>
        ))}
      </div>
    </div>
  )
}

export { Card }
