import getStandings from "../utils/getStandings.js";
import StandingsTable from "../components/StandingsTable.js";

const StandingsPage = () => {
    
    const render = async (parentElement) => {

        try {
            const data = await getStandings();
            const raw = data.response[0].league.standings[0];

            const tableComponent = StandingsTable();
            const tableHtml = tableComponent.render(raw);

            parentElement.innerHTML = `
                <h1>La Liga</h1>
                <p>No es futbol, es La Liga</p>
                ${tableHtml}
            `;
        } catch (error) {
            parent.innerHTML = `<p>ERROR: ${error.message}</p>`
        }

        
    }

    return {
        render
    }
}

export default StandingsPage;