import StandingsPage from './pages/StandingsPage.js';

const root = document.getElementById('root');
root.innerHTML = "";

const page = StandingsPage();
page.render(root);
