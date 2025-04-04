import StandingsRow from './StandingsRow.js';

const StandingsTable = () => {

    const render = (standings, totals) => {
        let tableHtml = `
            <table class="table table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Logo</th>
                        <th>Equipo</th>
                        <th>Puntos</th>
                        <th>Jugados</th>
                        <th>Ganados</th>
                        <th>Empatados</th>
                        <th>Perdidos</th>
                        <th>Goles Favor</th>
                        <th>Goles Contra</th>
                        <th>Diferencia Goles</th>
                        <th>% Eficiencia</th>
                    </tr>
                </thead>
                <tbody>
        `;

        standings.forEach(item => {
            tableHtml += StandingsRow(item);
        });

        
        tableHtml += `
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="7">Totales</th>
                        <th>${totals.lost}</th>
                        <th>${totals.forGoals}</th>
                        <th colspan="3"></th>
                    </tr>
                </tfoot>
            </table>
        `;

        return tableHtml;
    }

    return {
        render
    }
}

export default StandingsTable;