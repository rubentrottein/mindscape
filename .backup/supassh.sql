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


-- Thèmes de 1er Niveau (15) Mai 2025 - Juin 2025

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
('2025-07-27', 'La voix intérieure', 'Votre personnage entend une voix dans sa tête qui n''est pas la sienne. Que lui dit-elle et comment réagit-il ?', 420),
('2025-07-28', 'Lettre non envoyée', 'Écrivez une lettre que votre protagoniste a rédigée mais n''a jamais eu le courage d''envoyer. À qui s''adresse-t-elle ?', 380),
('2025-07-29', 'L''apprenti magicien', 'Un sorcier débutant rate tous ses sortilèges. Racontez sa journée la plus catastrophique à l''école de magie.', 500),
('2025-07-30', 'Monologue d''un inconnu', 'Dans un café, votre personnage entend les pensées à voix haute d''un étranger. Que révèle ce monologue intérieur ?', 350),
('2025-07-31', 'Le carnet trouvé', 'En rangeant, votre protagoniste trouve le journal intime de l''ancien locataire. Une page particulière attire son attention.', 440),

-- Insertion des thèmes d'écriture pour août 2025
INSERT INTO themes (date, title, instructions, "charLimit") VALUES
('2025-08-01', 'Conversation téléphonique', 'Écrivez un dialogue où l''on n''entend qu''un seul côté de la conversation. Le lecteur doit deviner l''autre partie.', 320),
('2025-08-02', 'Le vendeur d''impossible', 'Dans une boutique étrange, on vend des choses impossibles : du temps perdu, des mots non dits, des chances ratées...', 480),
('2025-08-03', 'Micro-nouvelle', 'Racontez une histoire complète en exactement 100 mots. Chaque mot compte !', 100),
('2025-08-04', 'Le double maléfique', 'Votre personnage rencontre quelqu''un qui lui ressemble parfaitement mais qui est son opposé moral. Que se passe-t-il ?', 460),
('2025-08-05', 'Recette de bonheur', 'Rédigez une recette de cuisine pour préparer le bonheur. Quels sont les ingrédients et les étapes ?', 300),
('2025-08-06', 'La machine à souvenirs', 'Votre protagoniste utilise une machine qui peut effacer ou modifier ses souvenirs. Que choisit-il de changer ?', 520),
('2025-08-07', 'Dialogue dans l''ascenseur', 'Deux ennemis se retrouvent bloqués dans un ascenseur en panne. Leur conversation forcée révèle des vérités cachées.', 400),
('2025-08-08', 'L''antiquaire du futur', 'Dans sa boutique, un antiquaire vend des objets qui viennent du futur. Que découvre votre personnage en les touchant ?', 450),
('2025-08-09', 'Changement de perspective', 'Reprenez une scène banale (faire ses courses, attendre le bus) du point de vue d''un animal ou d''un objet.', 380),
('2025-08-10', 'Le traducteur d''émotions', 'Votre personnage comprend soudain le langage secret des émotions humaines. Que découvre-t-il sur son entourage ?', 470),
('2025-08-11', 'Nouvelle en une phrase', 'Écrivez une histoire complète en une seule phrase très longue. Utilisez tous les signes de ponctuation !', 200),
('2025-08-12', 'Le collectionneur de mots', 'Un personnage collectionne les mots rares et oubliés. Aujourd''hui, il découvre le plus beau mot qu''il ait jamais entendu.', 420),
('2025-08-13', 'Flashback mystérieux', 'Votre protagoniste revit soudain un souvenir qui n''est pas le sien. À qui appartient cette mémoire étrangère ?', 480),
('2025-08-14', 'Le cauchemar éveillé', 'La frontière entre rêve et réalité s''estompe. Votre personnage ne sait plus s''il dort ou s''il est réveillé.', 430),
('2025-08-15', 'Lettre d''amour absurde', 'Écrivez une déclaration d''amour à un objet du quotidien : votre café du matin, vos chaussettes préférées...', 250),
('2025-08-16', 'Le détective de l''ordinaire', 'Votre personnage enquête sur des mystères du quotidien : pourquoi les chaussettes disparaissent, où vont les stylos...', 500),
('2025-08-17', 'Monologue d''adieu', 'Un personnage fait ses adieux à quelque chose d''important qui va disparaître de sa vie. À quoi renonce-t-il ?', 360),
('2025-08-18', 'L''école des métiers impossibles', 'Décrivez une journée dans une école qui forme aux métiers les plus étranges : dompteur de nuages, réparateur de cœurs brisés...', 540),
('2025-08-19', 'Portrait en objets', 'Décrivez un personnage uniquement à travers les objets qu''il possède, sans jamais le mentionner directement.', 320),
('2025-08-20', 'Le voyage immobile', 'Votre protagoniste entreprend le voyage le plus important de sa vie sans quitter sa chambre. Où va-t-il ?', 450),
('2025-08-21', 'Conversation avec le temps', 'Le Temps en personne rend visite à votre personnage. De quoi discutent-ils ? Que négocie votre protagoniste ?', 480),
('2025-08-22', 'Le musée des regrets', 'Dans ce musée particulier, chaque salle expose les regrets d''une personne différente. Que vient voir votre personnage ?', 410),
('2025-08-23', 'Fin alternative', 'Reprenez un conte de fées classique et donnez-lui une fin complètement différente et inattendue.', 400),
('2025-08-24', 'L''inventeur de métaphores', 'Votre personnage a le don de créer des métaphores si parfaites qu''elles deviennent réalité. Attention aux conséquences !', 470),
('2025-08-25', 'Le gardien des souvenirs perdus', 'Quelqu''un collecte les souvenirs que les gens oublient. Dans son entrepôt, que découvre votre protagoniste ?', 520),
('2025-08-26', 'Épilogue d''une vie ordinaire', 'Racontez les dernières pensées d''un personnage à la fin d''une vie simple mais riche de petits bonheurs.', 350);

-- Thèmes d'écriture pour septembre 2025
INSERT INTO themes (date, title, instructions, "charLimit") VALUES
('2025-08-27', 'Trois couleurs', 'Écrivez un texte où dominent trois couleurs précises (au choix). Elles doivent structurer votre récit.', 380),
('2025-08-28', 'Journal du futur', 'Rédigez une page de journal intime datée dans 20 ans. Qu’écrit votre personnage ?', 420),
('2025-08-29', 'La rumeur', 'Décrivez une rumeur qui circule dans une ville ou une école. Montrez comment elle se transforme.', 450),
('2025-08-30', 'Le rêve inversé', 'Un personnage vit une journée normale... sauf qu’il se rend compte qu’il est le rêve de quelqu’un d’autre.', 480),
('2025-08-31', 'Inventaire poétique', 'Écrivez une liste poétique d’objets, comme un inventaire de sac, de chambre ou de mémoire.', 320),
('2025-09-01', 'Le faux souvenir', 'Votre narrateur raconte un souvenir très précis... mais qui n’a jamais existé.', 400),
('2025-09-02', 'Dialogue impossible', 'Faites dialoguer deux personnages qui ne devraient jamais se rencontrer (ex : un arbre et un astronaute).', 440),
('2025-09-03', 'Avis de recherche', 'Rédigez un avis de recherche pour un personnage ou un sentiment disparu.', 300),
('2025-09-04', 'Version minuscule', 'Écrivez un texte sans utiliser de majuscules ni de noms propres. Le ton doit rester littéraire.', 260),
('2025-09-05', 'La répétition', 'Construisez un récit où une phrase ou un mot revient plusieurs fois, comme un refrain obsédant.', 350),
('2025-09-06', 'La lettre croisée', 'Écrivez deux lettres opposées : l’une envoyée, l’autre jamais envoyée. Les deux doivent dialoguer.', 500),
('2025-09-07', 'Un jour sans fin', 'Votre protagoniste revit la même journée en boucle. Montrez deux versions différentes.', 470),
('2025-09-08', 'L’annonce', 'Rédigez une annonce (petite annonce, nécrologie, publicité) qui cache une vraie histoire derrière ses mots.', 280),
('2025-09-09', 'Le conte détourné', 'Reprenez un conte classique mais donnez-lui une forme moderne, urbaine ou décalée.', 430),
('2025-09-10', 'Le silence des mots', 'Écrivez un texte avec le moins de dialogues possible, mais qui donne pourtant l’impression qu’on a beaucoup parlé.', 460),
('2025-09-11', 'L’interrupteur', 'Votre protagoniste découvre un interrupteur mystérieux. À quoi sert-il ? Ose-t-il l’utiliser ?', 390),
('2025-09-12', 'Phrase unique', 'Composez une histoire complète en une seule phrase très longue, avec un rythme fluide.', 200),
('2025-09-13', 'Le témoin', 'Un personnage raconte une scène dont il n’a pas été l’acteur, mais seulement le témoin discret.', 420),
('2025-09-14', 'Les consignes', 'Rédigez un texte où la narration ressemble à un mode d’emploi ou des instructions officielles.', 340),
('2025-09-15', 'Portrait en cinq sens', 'Décrivez un personnage uniquement par ce qu’il voit, sent, entend, touche et goûte.', 500),
('2025-09-16', 'Le mot interdit', 'Écrivez un texte où un mot précis (au choix) ne peut jamais apparaître, mais où tout le récit tourne autour de lui.', 360),
('2025-09-17', 'Chanson écrite', 'Imaginez les paroles d’une chanson inventée. Le ton peut être poétique, humoristique ou dramatique.', 300),
('2025-09-18', 'La ville imaginaire', 'Inventez une ville où une règle étrange régit la vie quotidienne. Décrivez-la à travers une balade.', 470),
('2025-09-19', 'Deux versions', 'Racontez la même scène du point de vue de deux personnages différents.', 500),
('2025-09-20', 'Les marges', 'Écrivez le commentaire qu’un lecteur aurait pu griffonner en marge d’un vieux livre.', 280),
('2025-09-21', 'Souvenir collectif', 'Écrivez un souvenir raconté à plusieurs voix, comme si un groupe entier parlait en même temps.', 440),
('2025-09-22', 'Le message codé', 'Votre protagoniste découvre un message crypté. Reconstituez-le et imaginez sa signification.', 360),
('2025-09-23', 'Le corps qui parle', 'Décrivez une scène où les gestes, postures et silences comptent plus que les paroles.', 420),
('2025-09-24', 'Récit météorologique', 'Écrivez un texte où la météo est le narrateur et raconte ce qu’elle voit.', 380),
('2025-09-25', 'L’inachevé', 'Rédigez un texte qui s’interrompt volontairement au moment le plus crucial.', 260);
