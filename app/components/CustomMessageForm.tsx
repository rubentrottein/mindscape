'use client';

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Theme } from "../types/Theme";

type CustomMessageFormProps = {
  onSubmit: (pseudo: string, text: string, date: string) => void;
};

export default function CustomMessageForm({ onSubmit }: CustomMessageFormProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [pseudo, setPseudo] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const { data, error } = await supabase
          .from("themes")
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          throw error;
        }

        setThemes(data || []);
      } catch (err) {
        setError("Erreur lors du chargement des thèmes");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleThemeChange = (themeDate: string) => {
    const theme = themes.find(t => t.date === themeDate);
    setSelectedTheme(theme || null);
    setContent(""); // Reset content when theme changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTheme || !pseudo.trim() || !content.trim()) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (content.length > selectedTheme.charLimit) {
      alert(`Le texte dépasse la limite de ${selectedTheme.charLimit} caractères`);
      return;
    }

    try {
      // Sauvegarder dans Supabase
      const { error } = await supabase
        .from("messages")
        .insert({
          date: selectedTheme.date,
          pseudo: pseudo.trim(),
          text: content.trim()
        });

      if (error) {
        throw error;
      }

      // Callback pour mettre à jour l'UI locale
      onSubmit(pseudo.trim(), content.trim(), selectedTheme.date);
      
      // Reset form
      setPseudo("");
      setContent("");
      setSelectedTheme(null);
      
      alert("Message ajouté avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'ajout du message:", err);
      alert("Erreur lors de l'ajout du message");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (isLoading) {
    return <div className="p-4">Chargement des thèmes...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-xl font-bold">Écrire sur un thème passé</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 w-120">
        {/* Sélection du thème */}
        <div>
          <label htmlFor="theme-select" className="block text-sm font-medium mb-2">
            Choisir un thème :
          </label>
          <select
            id="theme-select"
            value={selectedTheme?.date || ""}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="w-full p-2 border rounded-md bg-white text-black"
            required
          >
            <option value="">-- Sélectionner un thème --</option>
            {themes.map((theme) => (
              <option key={theme.date} value={theme.date}>
                {formatDate(theme.date)} - {theme.title}
              </option>
            ))}
          </select>
        </div>

        {/* Affichage du thème sélectionné */}
        {selectedTheme && (
          <div className="p-4 bg-purple-600 rounded-md text-white">
            <h3 className="font-bold text-lg">{selectedTheme.title}</h3>
            <p className="text-sm text-orange-100 mb-2">
              {formatDate(selectedTheme.date)}
            </p>
            <p className="mb-2">{selectedTheme.instructions}</p>
            <p className="text-sm font-medium">
              Limite : {selectedTheme.charLimit} caractères
            </p>
          </div>
        )}

        {/* Champ pseudo */}
        <div>
          <label htmlFor="pseudo" className="block text-sm font-medium mb-2">
            Pseudo :
          </label>
          <input
            type="text"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Votre pseudo"
            required
            maxLength={50}
          />
        </div>

        {/* Champ texte */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Votre texte :
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md text-white"
            rows={6}
            placeholder="Écrivez votre texte ici..."
            required
            maxLength={selectedTheme?.charLimit || 1000}
          />
          {selectedTheme && (
            <div className="text-sm text-gray-600 mt-1">
              {content.length} / {selectedTheme.charLimit} caractères
              {content.length > selectedTheme.charLimit && (
                <span className="text-red-500 ml-2">
                  Dépassement de {content.length - selectedTheme.charLimit} caractères
                </span>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!selectedTheme || !pseudo.trim() || !content.trim() || content.length > (selectedTheme?.charLimit || 0)}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Publier mon texte
        </button>
      </form>
    </div>
  );
}