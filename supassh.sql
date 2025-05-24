create table messages (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  pseudo text not null,
  text text not null,
  inserted_at timestamp default now()
);

create index messages_date_idx on messages(date);


-- Lecture ouverte à tous
create policy "Allow select for all"
on messages
for select
using (true);

-- Insertion ouverte à tous
create policy "Allow insert for all"
on messages
for insert
with check (true);
