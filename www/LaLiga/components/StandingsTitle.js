
const StandingsTitle = () => {

    const render = (league) => {

        return `
            <div class="text-center mt-4">
                <img src="${league.logo}" width="150px" />
                <p>Temporada ${league.season}</p>
            </div>
        `;
    }

    return {
        render
    }
}

export default StandingsTitle;