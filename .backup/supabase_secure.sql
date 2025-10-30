-- Activation RLS sur les deux tables
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy : Tout le monde peut lire les themes
CREATE POLICY "Public can read themes" ON themes
  FOR SELECT USING (true);

-- Policy : Tout le monde peut lire les messages  
CREATE POLICY "Public can read messages" ON messages
  FOR SELECT USING (true);

-- Policy : Seuls les admins authentifiés peuvent écrire sur themes
CREATE POLICY "Only authenticated users can write themes" ON themes
  FOR ALL USING (auth.role() = 'authenticated');

-- Policy : Seuls les admins authentifiés peuvent écrire sur messages
CREATE POLICY "Only authenticated users can write messages" ON messages
  FOR ALL USING (auth.role() = 'authenticated');