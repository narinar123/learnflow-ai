import { redirect } from 'next/navigation';

export default function EventsPage() {
  // For marketing purposes, we can redirect Events to Webinars 
  // since they serve a similar purpose in this domain, or build a dedicated one.
  redirect('/webinars');
}
