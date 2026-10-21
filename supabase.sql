-- Run once in Supabase: SQL Editor > New query.
create table if not exists public.content (key text primary key, value text not null);
alter table public.content enable row level security;
create policy "anyone reads content" on public.content for select using (true);
create policy "admins write content" on public.content for all to authenticated using (true) with check (true);
alter publication supabase_realtime add table public.content;

-- Private bucket for issue PDFs (served to subscribers via signed links).
insert into storage.buckets (id, name, public) values ('issues', 'issues', false) on conflict do nothing;
create policy "admins manage issue pdfs" on storage.objects for all to authenticated
  using (bucket_id = 'issues') with check (bucket_id = 'issues');
