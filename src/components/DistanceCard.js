function Card(props) {
    return (
        <div>
            Distance      {props.distance} km
            <div>
                The distance between {props.origin} and {props.destination} via the selected route(s) is {props.distance} kms.
            </div>
        </div>
    )
}

export default Card;