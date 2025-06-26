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


-- Thèmes de 1er Niveau (15)

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


-- Insertion des thèmes d'écriture pour juillet 2025
INSERT INTO themes (date, title, instructions, "charLimit") VALUES
('2025-06-26', 'Métamorphose', 'Un personnage découvre qu''il change, physiquement ou mentalement. Explorez cette transformation et ses conséquences sur son quotidien.', 450),
('2025-06-27', 'L''objet oublié', 'Dans un grenier poussiéreux, votre protagoniste trouve un objet qui réveille des souvenirs enfouis. Que révèle cette découverte ?', 400),
('2025-06-28', 'Dialogue nocturne', 'Deux inconnus se rencontrent dans un lieu improbable en pleine nuit. Leur conversation révèle plus qu''ils ne l''auraient voulu.', 500),
('2025-06-29', 'Le dernier train', 'Un voyage en train qui devait être ordinaire devient extraordinaire. Racontez ce qui transforme ce trajet en aventure mémorable.', 380),
('2025-06-30', 'Lettre à soi-même', 'Votre personnage écrit une lettre à la personne qu''il était il y a dix ans. Que lui dit-il ? Quels conseils, quels regrets ?', 350),
('2025-07-01', 'L''artisan du temps', 'Dans un petit atelier, quelqu''un répare des objets cassés, mais chaque réparation semble restaurer aussi des fragments de mémoire.', 480),
('2025-07-02', 'Rendez-vous manqué', 'Un rendez-vous important n''a pas eu lieu. Explorez les raisons de cette absence et ses répercussions sur les deux protagonistes.', 420),
('2025-07-03', 'La bibliothèque silencieuse', 'Dans une bibliothèque, votre personnage découvre un livre qui semble avoir été écrit spécialement pour lui. Que contient-il ?', 440),
('2025-07-04', 'Reflets', 'Devant un miroir, dans une vitrine ou à la surface de l''eau, un personnage voit quelque chose d''inattendu dans son reflet.', 360),
('2025-07-05', 'Le gardien de secrets', 'Votre protagoniste a pour métier de garder les secrets des autres. Aujourd''hui, il apprend un secret qui le concerne directement.', 520),
('2025-07-06', 'Tempête intérieure', 'Pendant qu''un orage gronde dehors, votre personnage vit sa propre tempête émotionnelle. Créez un parallèle entre les deux.', 390),
('2025-07-07', 'L''apprentissage', 'Un maître enseigne un savoir-faire ancestral à son dernier élève. Que se transmet-il au-delà de la technique ?', 460),
('2025-07-08', 'Le pire rendez-vous', 'Racontez le rendez-vous galant le plus catastrophique de l''histoire. Tout ce qui peut mal se passer arrive en même temps.', 420),
('2025-07-09', 'L''héritage inattendu', 'Un proche décédé lègue quelque chose d''surprenant à votre protagoniste. Ce n''est ni de l''argent, ni des biens matériels.', 410),
('2025-07-10', 'Entre chien et loup', 'À l''heure où le jour bascule vers la nuit, un événement troublant se produit. Explorez cette transition et son mystère.', 370),
('2025-07-11', 'Le collectionneur', 'Un personnage collectionne des objets singuliers. Aujourd''hui, il trouve la pièce qui manquait à sa collection depuis toujours.', 450),
('2025-07-12', 'Mélodie oubliée', 'Une chanson entendue par hasard transporte votre protagoniste dans un souvenir qu''il croyait avoir perdu à jamais.', 320),
('2025-07-13', 'Le photographe d''instants', 'Un photographe capture des moments ordinaires qui révèlent des vérités extraordinaires sur la nature humaine.', 490),
('2025-07-14', 'Manuel d''instructions absurde', 'Rédigez le mode d''emploi le plus ridicule qui soit : comment faire griller un toast, comment marcher, comment respirer... Soyez créatifs !', 380),
('2025-07-15', 'L''invité mystérieux', 'Un inconnu se présente à la porte et prétend être attendu. Votre protagoniste ne se souvient pas l''avoir invité, pourtant...', 430),
('2025-07-16', 'Langue des signes', 'Dans un monde où les mots ont perdu leur pouvoir, les gestes deviennent le seul moyen de communication véritable.', 340),
('2025-07-17', 'Le restaurateur de rêves', 'Votre personnage a le don étrange de réparer les rêves brisés des autres. Mais qui réparera les siens ?', 460),
('2025-07-18', 'Marché aux souvenirs', 'Dans un marché particulier, on vend et on achète des souvenirs. Que vient chercher votre protagoniste ?', 350),
('2025-07-19', 'La dernière danse', 'Un couple âgé danse une dernière fois sur leur chanson préférée. Racontez ce moment suspendu dans le temps.', 400),
('2025-07-20', 'Conversation avec un objet', 'Votre grille-pain, votre chaussette gauche ou votre plante verte prend soudain la parole. De quoi se plaint-il ou se vante-t-il ?', 450),
('2025-07-21', 'Le messager', 'Votre personnage doit délivrer un message important, mais il ne sait pas s''il doit le transmettre fidèlement ou le modifier.', 390),
('2025-07-22', 'Atlas émotionnel', 'Créez une carte géographique des émotions de votre personnage : où se trouvent sa joie, sa peur, sa nostalgie ?', 310),
('2025-07-23', 'L''heure dorée', 'Pendant une heure magique au coucher du soleil, votre protagoniste vit un moment de révélation personnelle.', 440),
('2025-07-24', 'Le superhéros du quotidien', 'Votre personnage a un super-pouvoir complètement inutile : plier parfaitement les draps, deviner le goût des yaourts... Comment l''utilise-t-il ?', 360),
('2025-07-25', 'Le guide invisible', 'Votre protagoniste sent qu''une présence bienveillante l''accompagne dans les moments difficiles. Qui ou quoi est-ce ?', 470),
('2025-07-26', 'Rituel du matin', 'Décrivez le rituel matinal de votre personnage le jour où sa vie va basculer, sans qu''il le sache encore.', 320);