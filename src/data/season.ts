export const contact = { name: 'Parent sponsorship coordinator', email: '' };
export const guide = 'https://trianglevolleyball.org/wp-content/uploads/2026/09/13s-Girls-Program-Guide-2027.pdf';
export const events = [
  { month: 'JAN', days: '16–18', name: 'City of Oaks Challenge', city: 'Raleigh, NC', type: 'Home', start: '2027-01-16', end: '2027-01-19' },
  { month: 'JAN', days: '30–31', name: 'JVA Charm City Challenge', city: 'Baltimore, MD', type: 'Travel', start: '2027-01-30', end: '2027-02-01' },
  { month: 'FEB', days: '13–15', name: 'Capitol Hill Classic', city: 'Washington, DC', type: 'Travel', start: '2027-02-13', end: '2027-02-16' },
  { month: 'MAR', days: '13–14', name: 'MAPL Raleigh #2', city: 'Triangle · Morrisville, NC', type: 'Home', start: '2027-03-13', end: '2027-03-15' },
  { month: 'MAR', days: '19–21', name: 'Sunshine Classic Qualifier', city: 'Orlando, FL', type: 'Backup', start: '2027-03-19', end: '2027-03-22' },
  { month: 'MAR', days: '26–28', name: 'Big South Qualifier', city: 'Atlanta, GA · Easter weekend', type: 'Qualifier', start: '2027-03-26', end: '2027-03-29' },
  { month: 'APR', days: '02–04', name: 'Northeast Qualifier #3', city: 'Philadelphia, PA', type: 'Qualifier', start: '2027-04-02', end: '2027-04-05' },
  { month: 'APR', days: '16–18', name: 'Show Me Qualifier #2', city: 'Kansas City, MO', type: 'Qualifier', start: '2027-04-16', end: '2027-04-19' },
  { month: 'JUN', days: '05–06', name: 'A5 Southern Exposure', city: 'Atlanta, GA', type: 'Travel', start: '2027-06-05', end: '2027-06-07' },
];
export const levels = [
  { name: 'Rally partner', amount: 250, description: 'A meaningful assist toward the everyday costs of a national season.', benefits: ['Name on our sponsor wall', 'A season-end team thank-you'] },
  { name: 'Team partner', amount: 500, description: 'Help turn a weekend on the road into an opportunity to grow.', benefits: ['Business logo and link on this page', 'A personalized team thank-you', 'Season updates from the parent coordinator'] },
  { name: 'Season champion', amount: 1000, description: 'Make a bigger difference in the season these athletes are building together.', benefits: ['Featured business logo and link', 'A sponsor spotlight on this page', 'Season updates and a team thank-you'] },
];

// Parent planning assumptions; travel is an estimate, not a club fee.
export const budget = {
  players: 10,
  duesPerPlayer: 6400,
  uniformPerPlayer: 380,
  travelPerTrip: 1500,
  travelTrips: events.filter(event => event.type === 'Travel' || event.type === 'Qualifier').length + 1,
};
export const travelPerPlayer = budget.travelTrips * budget.travelPerTrip;
export const totalPerPlayer = budget.duesPerPlayer + budget.uniformPerPlayer + travelPerPlayer;
export const teamTotal = totalPerPlayer * budget.players;
export const money = (amount: number) => '$' + amount.toLocaleString('en-US');
