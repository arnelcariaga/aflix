import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFilm, faTv } from '@fortawesome/free-solid-svg-icons';

function StatisticsCards({itemsFromSearch}) {

	return (
		<div className="row">

		<div className="col-3">
			<div className="card m-1 text-white bg-primary">
				<div className="card-body d-flex justify-content-center align-items-center">
					<div className="col-6">
						<h1> <FontAwesomeIcon icon={faUsers} /> </h1>
					</div>
					<div className="col-6 text-end">
						<h5>Usuarios</h5>
						<h5>37</h5>
					</div>
				</div>
			</div>
		</div>

		<div className="col-3">
			<div className="card m-1 text-white bg-success">
				<div className="card-body d-flex justify-content-center align-items-center">
					<div className="col-6">
						<h1> <FontAwesomeIcon icon={faFilm} /> </h1>
					</div>
					<div className="col-6 text-end">
						<h5>Mis pel&iacute;culas</h5>
						<h5>53</h5>
					</div>
				</div>
			</div>
		</div>

		<div className="col-3">
			<div className="card m-1 text-dark bg-info">
				<div className="card-body d-flex justify-content-center align-items-center">
					<div className="col-6">
						<h1> <FontAwesomeIcon icon={faTv} /> </h1>
					</div>
					<div className="col-6 text-end">
						<h5>Mis Series</h5>
						<h5>87</h5>
					</div>
				</div>
			</div>
		</div>
	

		</div>
		);
}

export default StatisticsCards;