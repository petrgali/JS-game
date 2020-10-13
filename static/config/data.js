export { message, hotKey, board, _ }
const board = {
  title: '<p>hall of fame<br><br></p>',
  legend: ['rank', 'name', 'score', 'time'],
  stat: ['name', 'score', 'minutes', 'seconds'],
  table: `<table style="width: 70%; margin-left: auto; margin-right: auto;font-size: 80%;">
	<tbody>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>`,
  delimeter: ' '
}
const hotKey = {
  backspace: "Backspace",
  shipUP: "ArrowUp", //
  shipDown: "ArrowDown", //
  shipLeft: "ArrowLeft", //  ship control keys bindings
  shipRight: "ArrowRight", //
  shipFire: 'w', ////
  start: 'Enter', //// Enter
  restart: 'Shift', //// shift     game control keys bindings
  pause: 'Control', //// ctrl
  yes: 'y', //// y
  no: 'n', //// n
}
const message = {
  inputName: `\n\nHero!\ntype your name & hit enter\n`,
  loading: `please wait\nloading resources...`,
  start: `press ${hotKey.start} to start`,
  pause: `**GAME MENU**\n\npress ${hotKey.pause} to resume\npress ${hotKey.restart} to restart`,
  warning: "**GAME MENU**\n\nyour progress will be lost\nare you sure?\ny/n",
  wasted: `REKT!!`,
  levelend: `VICTORY!\nenemy retreat!!\n\nfinal score `,
  gameover: `**DEFEAT!**\n\nworld has fallen\nfinal score `,
  tutorial: `you're the last hope\nprotect our world\n\nbattle is coming...`,
  tutorialUP: `press \u2191 to move UP`,
  tutorialDOWN: `press \u2193 to move DOWN`,
  tutorialSHOOT: `press ${hotKey.shipFire} to use\nPLASMA CANNON`,
  tutorialDONE: `eliminate attackers\nNO MERCY!`,
  moar: `next wave approaching\n\nFOR THE GLORY!!!`,
  alarm: `enemy CRUISERS approaching\n\nfire at will!!!`,
  final: `STAY STRONG!!!`
}
const table = {

}

const _ = {
  serverURL: 'http://localhost:8000/',
  apiURL: 'http://localhost:8000/scoreboard',
  maxNameSize: 12,    // input player name max length 
  shipYposition: 200, // ship init top position
  shipXposition: 50, // ship init left position
  shipSkinHeight: 22, // ship skin size
  shipSkinWidth: 64, // ship skin size
  shipSpeedY: 3.5, // ship vertical speed
  shipSpeedX: 3.5, // ship horizontal speed
  speedX: 2.5, // enemy speed
  firingRate: 10, // burst fire speed
  firingRange: 450, // max fire range
  burstSize: 5, // max-1 bullets count in burst firemode
  bulletXsize: 6, // CSS setting
  bulletYsize: 2, // CSS setting
  bulletXoffset: 60, // bullet horizontal offset
  bulletYoffet: 10, // bullet vertical offset
  fadingRate: 450, // opacity changing speed rate - less is faster
  gameareaBorder: 4, // CSS setting - used for calculations
  borderOffset: 25, // dead zone for ship
  try: 1, // number of lives
  multiplier: 1000, // final score multiplier
  splashSize: 32, // splash size - CSS value
}
