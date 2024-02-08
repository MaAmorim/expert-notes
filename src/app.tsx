import { ChangeEvent, useState } from 'react';
import logo from './assets/logo-nlw-expert.svg';
import { NewNoteCard } from './components/new- note-card';
import { NoteCard } from './components/note-card';
import { Search } from 'lucide-react';

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = { id: crypto.randomUUID(), date: new Date(), content };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(notesArray);

    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 ">
      <h1 className="font-mono text-lg">{'{ } Expert notes'}</h1>
      <form className="w-full relative">
        <Search className="absolute size-6 top-1 left-1 text-zinc-500" />
        <input
          className="w-full bg-transparent ring-2 ring-zinc-600 rounded-2xl text-2xl font-normal tracking-tight outline-none pl-8 placeholder:text-zinc-500"
          type="text"
          // placeholder="Busque em suas notas..."
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-zinc-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => {
          return (
            <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          );
        })}
      </div>
    </div>
  );
}
