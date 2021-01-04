export class Job {
  id: string;
  title: string; // construct with entrprise ?
  entreprise: string;
  offer_link?: string;
  salary?: string; // optional
  type: string; // CDI, freelance mission, CDD, ...
  user_id?: string;
  column?: string; // which column is the job card
  description?: string;
}
