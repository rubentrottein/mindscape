-- Modèle messages
create table messages (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  pseudo text not null,
  text text not null,
  inserted_at timestamp default now()
);

-- Modèle themes
create table themes (
  date date primary key,
  title text not null,
  instructions text not null,
  "charLimit" integer not null
);

-- Index messages et themes
create index messages_date_idx on messages(date);
create index themes_date_idx on themes(date);

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


-- Fixtures de thèmes

INSERT INTO themes (date, title, instructions, "charLimit") VALUES
  ('2025-05-24', 'Premier mot', 'Écrivez un mot pour commencer.', 500),
  ('2025-05-25', 'Souvenir d’enfance', 'Racontez un souvenir d’enfance heureux.', 500),
  ('2025-05-26', 'Un lieu', 'Décrivez un lieu que vous aimez.', 500),
  ('2025-05-27', 'Un rêve', 'Parlez d’un rêve marquant, éveillé ou non.', 500),
  ('2025-05-28', 'Une rencontre', 'Racontez une rencontre qui vous a marqué(e).', 500),
  ('2025-05-29', 'Le silence', 'Décrivez un moment silencieux.', 500),
  ('2025-05-30', 'Objet du quotidien', 'Choisissez un objet et racontez son histoire.', 500),
  ('2025-05-31', 'Un repas', 'Racontez un repas inoubliable.', 500),
  ('2025-06-01', 'Le départ', 'Évoquez un départ, un au revoir.', 500),
  ('2025-06-02', 'La surprise', 'Parlez d’un moment de surprise.', 500),
  ('2025-06-03', 'Le rire', 'Écrivez sur un fou rire ou un moment drôle.', 500),
  ('2025-06-04', 'Le secret', 'Un secret (inventé ou réel) à raconter.', 500),
  ('2025-06-05', 'La pluie', 'Décrivez une scène sous la pluie.', 500),
  ('2025-06-06', 'Un animal', 'Racontez une interaction marquante avec un animal.', 500),
  ('2025-06-07', 'Un mot inventé', 'Invenez un mot et son histoire.', 500),
  ('2025-06-08', 'Le cadeau', 'Décrivez un cadeau que vous avez reçu ou donné.', 500),
  ('2025-06-09', 'Un paysage', 'Écrivez un paysage qui vous touche.', 500),
  ('2025-06-10', 'Un regard', 'Décrivez un regard échangé.', 500),
  ('2025-06-11', 'L’absence', 'Exprimez un manque ou une absence.', 500),
  ('2025-06-12', 'Une chanson', 'Parlez d’une chanson et de son effet.', 500),
  ('2025-06-13', 'Un trajet', 'Racontez un trajet symbolique.', 500),
  ('2025-06-14', 'La peur', 'Décrivez une peur, ancienne ou actuelle.', 500),
  ('2025-06-15', 'Un jeu', 'Évoquez un jeu ou une règle inventée.', 500),
  ('2025-06-16', 'Un rêve d’enfant', 'Un souhait que vous aviez enfant.', 500),
  ('2025-06-17', 'Un geste', 'Un petit geste qui a compté.', 500),
  ('2025-06-18', 'Un parfum', 'Décrivez une odeur mémorable.', 500),
  ('2025-06-19', 'Un mensonge', 'Un petit ou grand mensonge raconté.', 500),
  ('2025-06-20', 'Un instant figé', 'Un moment que vous n’oublierez jamais.', 500),
  ('2025-06-21', 'Un sourire', 'Racontez un sourire et son contexte.', 500),
  ('2025-06-22', 'Une lumière', 'Une scène éclairée de façon marquante.', 500);
