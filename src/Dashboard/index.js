import Navbar from '../Parts/navbar-top';
import StatisticsCards from '../Parts/statistics_cards';
import Items from '../Parts/items';
import Footer from '../Parts/footer';

function Dashboard() {

	return (
		<div className="container-fluid">
			<Navbar />

			<StatisticsCards />

			<hr></hr>

			<h4 className="mt-2">Agregar contenido</h4>
			
			<Items />

			<Footer />
		</div>
		);
}

export default Dashboard;