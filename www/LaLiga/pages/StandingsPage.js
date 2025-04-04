import getStandings from "../utils/getStandings.js";
import StandingsTable from "../components/StandingsTable.js";
import StandingsTitle from "../components/StandingsTitle.js";
import CONFIG from "../utils/config.js";

const StandingsPage = () => {
    
    const render = async (parentElement) => {

        try {
            const data = await getStandings();
            const raw = data.response[0].league.standings[0];
            const league = data.response[0].league;

            const titleComponent = StandingsTitle();
            const titleHtml = titleComponent.render(league);

            const teams = raw.map((team) => {
                const efficiency = ((team.all.win * 100) / team.all.played)
                
                let rowClass = "";
                if (CONFIG.CHAMPIONS.includes(team.rank)) {
                    rowClass = "table-success";
                } else if (CONFIG.DESCENSO.includes(team.rank)) {
                    rowClass = "table-danger";
                }

                return {
                    id: team.team.id,
                    rank: team.rank,
                    logo: team.team.logo,
                    name: team.team.name,   
                    points: team.points,
                    played: team.all.played,
                    win: team.all.win,            
                    draw: team.all.draw,
                    lose: team.all.lose,
                    forGoals: team.all.goals.for,
                    againstGoals: team.all.goals.against,
                    goalsDiff: team.goalsDiff,
                    efficiency: Math.round(efficiency),
                    rowClass: rowClass
                }
            });

            // const totalForGoals = teams.reduce((carry, team) => {
            //     return carry += team.forGoals;
            // }, 0);
            // console.log(totalForGoals);

            const totals = teams.reduce((carry, team) => {
                return {
                    forGoals: carry.forGoals += team.forGoals,
                    lost: carry.lost += team.lose
                }
            }, {
                forGoals: 0,
                lost: 0
            });



            const tableComponent = StandingsTable();
            const tableHtml = tableComponent.render(teams, totals);

            parentElement.innerHTML = `
                ${titleHtml}
                ${tableHtml}
            `;
        } catch (error) {
            parentElement.innerHTML = `<p>ERROR: ${error.message}</p>`
        }

        
    }

    return {
        render
    }
}

export default StandingsPage;