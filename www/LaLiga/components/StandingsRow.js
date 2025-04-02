
const StandingsRow = (item) => {

    return `
        <tr>
            <td>${item.rank}</td>
            <td>
                <img src="${item.team.logo}" width="50px" />
            </td>
            <td>${item.team.name}</td>
            <td>${item.points}</td>
            <td>${item.all.played}</td>
            <td>${item.all.win}</td>
            <td>${item.all.draw}</td>
            <td>${item.all.lose}</td>
            <td>${item.all.goals.for}</td>
            <td>${item.all.goals.against}</td>
            <td>${item.goalsDiff}</td>
        </tr>
    `;

}

export default StandingsRow;