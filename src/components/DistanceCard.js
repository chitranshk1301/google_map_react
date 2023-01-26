function Card(props) {
    return (
        <div className="card">
            Distance      {props.distance} km
            <div className="card-bottom">
                The distance between {props.origin} and {props.destination} via the selected route(s) is {props.distance} kms.
            </div>
        </div>
    )
}

export default Card;