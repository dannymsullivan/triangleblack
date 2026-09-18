import { events, guide } from '../data/season';
export const prerender = true;
export function GET() {
  const escape = (s: string) => s.replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll(',', '\\,').replaceAll(';', '\\;');
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Triangle 13 Black Parent Support//2027 Season//EN','CALSCALE:GREGORIAN','X-WR-CALNAME:13 Black · published 2027 tournament plan', ...events.filter(e => e.type !== 'Backup').flatMap(e => ['BEGIN:VEVENT',`UID:13black-${e.start}@parent-season.local`,'DTSTAMP:20260918T120000Z',`DTSTART;VALUE=DATE:${e.start.replaceAll('-','')}`,`DTEND;VALUE=DATE:${e.end.replaceAll('-','')}`,`SUMMARY:${escape(e.name)}`,`LOCATION:${escape(e.city)}`,`DESCRIPTION:${escape('Published plan; subject to change. Competition dates only. Confirm with the team before booking travel. Source: '+guide)}`,'STATUS:TENTATIVE','END:VEVENT']), 'END:VCALENDAR'];
  const folded = lines.map(line => { let result = ''; let chunk = ''; for (const char of line) { if (new TextEncoder().encode(chunk + char).length > 73) { result += chunk + '\r\n '; chunk = ''; } chunk += char; } return result + chunk; }).join('\r\n')+'\r\n';
  return new Response(folded, { headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': 'attachment; filename="13-black-2027.ics"' } });
}
