'use client';
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * StoryHub — OTT-Style Storytelling (Single-File Component)
 * Tech: React + TailwindCSS + Framer Motion
 * - 6 portrait character tiles (3x2 responsive)
 * - Cinematic dark theme, subtle glows, 3D hover
 * - Character modal with chapters row
 * - Text-only reader modal with navigation
 * - Keyboard: Esc closes, ← → navigate chapters
 */

// --- Seed Content ----------------------------------------------------------
const charactersSeed = [
  {
    id: "Selah",
    name: "Selah",
    tagline: "Selah The AURAT",
    gradient: "from-sky-900 via-slate-900 to-slate-950",
    accent: "ring-sky-400",
    chapters: [
      {
        id: "c1",
        title: "Chapter 1 · Please mind the gap between the train and the platform",
        preview: "Doors opening",
        body:
          "A swarm of female passengers gushed into the women’s compartment of the Dubai Metro. Crushed by the crowd, Selah spotted a small space near the divider between the general and women’s compartments, a shaky spot to stand but enough room to breathe. She quickly rushed towards it, but a blank-faced woman carrying two tote bags full of monthly supplies took the spot first. The flow of the crowd pushed Selah back into the middle.
With slight annoyance on her face, she somehow managed to pull her Bluetooth earphones out of her blazer pocket and listened to songs she had downloaded three years ago. As the music played, she zoned out from the misery of her long journey back to her rented room after a job she hated.
Looking out of the window, her thoughts were barely coherent because one of her insecurities was her height, and the tall woman in front of her was wearing a broad-brimmed sunhat, blocking much of her view.
“Same bed but it feels just a little bigger now,” Bruno Mars sang softly in her ears. The melody was calm and soothing, but within seconds a radish was shoved up her nose because the woman with the sunhat had chosen to eat it for lunch.
Selah felt a gagging, nauseous sensation. It was as if her life was slipping through her fingers. Just then, a sudden jerk of the train pushed everyone to the right, and Selah felt relieved as the radish wind shifted away. She noticed a lady nearby covering her nose with a hand fan. Selah smiled, trying not to laugh.
Throughout the journey, she had felt the discomfort and frustration of not having luxurious resources. Selah had made a lot of bad decisions, one of the worst was now calling her. She answered, saying, “Hello? What is it?”
Zain, her ex, replied from the other end, “I found the ATM card you lost a month ago. Oh, and before I forget, I withdrew 100,000 but don’t worry, I’ve left 500 rupees for you to spend.”
Selah quickly checked her notifications and saw two transactions of 50,000 rupees each had gone through. Filled with rage and tears, she told him to return the money, but the call ended. When she tried calling back, there was no response.
Selah had no one to turn to. First, she was living three hours away by flight from her hometown, Mumbai. Second, Zain was the guilty secret she hid from her family. She could only rely on her friend, but recently, she had refused to lend her friend money for a family crisis.
Shame and guilt overtook her thoughts just as she heard the bell and the intercom announce, “Next station: Mall of the Emirates. Doors opening…”
Selah, still reeling from the loss of her savings, tried to think of someone, anyone, who might help her. The crowded metro from that day still lingered in her mind, the press of strangers, the blur of faces, and somewhere among those memories was an old college friend, Prithvi.
Prithvi once had a major crush on her, which she had rejected without remorse. She knew it, and so did he. But now, necessity outweighed pride. He was part of the police force in Mumbai, someone who could pull strings quietly, without her family knowing.
She called him. Her words tumbled out quickly, just like an eel slipping through your hands above water, but his replies were flat and emotionless. He brushed her off without even a sandgrain’s size of care. Selah was hurt and broken; her last strand of hope made her feel regret about the past choices she had made. Selah thought to herself, I should have been a bit kinder when I rejected him. A year’s worth of savings was gone. A year’s worth of skipped treats, less shopping, and extra hours at work. It felt as if the metro’s clattering wheels from that day were still carrying her further away from what she had lost.
She told herself to move on, but pain does not vanish on command.
Weeks later, Selah was lying on her bed, looking at the ceiling, fighting against the mattress to let her free. With zero will, she grabbed her phone and turned off DND mode, trying to think of an excuse to skip office. As notifications from unwanted apps flooded in, she read a message from her neighbour: Your brother has been attacked by a mob. He’s gone.
The world seemed to tilt. Her eyes grew heavy and her vision blurred. She had no money to make the journey home. The coins she had once guarded so fiercely had already gone. She grabbed her bag and knocked on her boss’s cabin door.
With trembling hands and a heavy throat, she went to her boss, hoping for compassion. He lent her only enough to cover a return ticket, nothing more. It would get her there and back, but not spare her family from the crushing expense of a burial. She had no time to grieve, no time to think of her twenty-three-year-old little brother, whom she had helped with school homework, fought for snacks with, whose T-shirt she had stolen all while also asking him for IT support.
When she finally landed back in Mumbai, the heat and bustle of the city hit her like a wave. The familiar streets felt both comforting and unbearably heavy, reminding her of all that had been lost. 
Meera, her dearest friend, hearing the news that Selah was back, rushed to pick her up at the airport. With tears in her eyes, she hugged her because Peter’s loss was tough for them both. Selah knowing that grief had met poverty in an unwanted truce had nothing but worry on her face. She was from a middle-class household already stretched thin, struggling to lay her brother Peter to rest with dignity. On the way home, when Meera heard the news about Selah’s savings, without a second thought, she offered the money Selah needed from her bonus she had received for her hard work at work. Selah accepted, not only for the help but for the kindness it carried.",
      },
      {
        id: "c2",
        title: "Chapter 2 · Tears that couldn’t hide behind the rain",
        preview: "Every favor has a seam that splits.",
        body:
          "There are maps for streets and none for people. He learned the turns by listening to the pauses between words...",
      },
      {
        id: "c3",
        title: "Chapter 3 · Undercurrent",
        preview: "What you bury grows roots.",
        body:
          "Rain stitched the night together. In the hush between thunderings, he recognized the shape of the thing he'd been avoiding...",
      },
    ],
  },
  {
    id: "isabella",
    name: "Isabella",
    tagline: "A quest for justice",
    gradient: "from-rose-900 via-zinc-900 to-black",
    accent: "ring-rose-400",
    chapters: [
      {
        id: "c1",
        title: "Chapter 1 · Petition",
        preview: "Ink, paper, and a promise to keep.",
        body:
          "The courthouse steps were slick with last night's rain, but Isabella's resolve held like iron warmed by breath...",
      },
      {
        id: "c2",
        title: "Chapter 2 · Witness",
        preview: "Truth is a hallway with many doors.",
        body:
          "She learned to listen for what was not said, to chart silence as if it were a river with hidden crossings...",
      },
    ],
  },
  {
    id: "mason",
    name: "Mason",
    tagline: "The underestimated",
    gradient: "from-fuchsia-900 via-neutral-900 to-black",
    accent: "ring-fuchsia-400",
    chapters: [
      {
        id: "c1",
        title: "Chapter 1 · Spark",
        preview: "He built from scraps what others threw away.",
        body:
          "The workshop smelled of pine and possibility. Mason tuned the small machine like a violinist seeking the note between notes...",
      },
    ],
  },
  {
    id: "james",
    name: "James",
    tagline: "A journey of redemption",
    gradient: "from-teal-900 via-slate-900 to-stone-950",
    accent: "ring-teal-400",
    chapters: [
      {
        id: "c1",
        title: "Chapter 1 · Debt",
        preview: "You can't pay yesterday with tomorrow.",
        body:
          "He counted the quiet costs—eye contact avoided, calls unanswered—and marked the ledger in his chest...",
      },
    ],
  },
  {
    id: "sahana",
    name: "Sahana",
    tagline: "Keeper of small miracles",
    gradient: "from-amber-900 via-neutral-900 to-black",
    accent: "ring-amber-400",
    chapters: [
      {
        id: "c1",
        title: "Chapter 1 · Harvest",
        preview: "Names of seeds are a kind of prayer.",
        body:
          "Sahana saved envelopes full of futures, each labeled in careful script: basil, okra, hope...",
      },
    ],
  },
  {
    id: "ravi",
    name: "Ravi",
    tagline: "Maps where roads don't go",
    gradient: "from-emerald-900 via-zinc-900 to-black",
    accent: "ring-emerald-400",
    chapters: [
      {
        id: "c1",
        title: "Chapter 1 · North",
        preview: "Compasses spin when he arrives.",
        body:
          "Ravi trusted horizons more than schedules. He walked until the city forgot its own edges...",
      },
    ],
  },
];

// --- Animations ------------------------------------------------------------
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const tileVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
};

// --- Hooks & Helpers -------------------------------------------------------
function useEsc(handler) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handler();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

function Backdrop({ onClick, children }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

function CardGlow({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute -inset-0.5 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
      aria-hidden
    />
  );
}

function CharacterTile({ character, onOpen }) {
  return (
    <motion.button
      variants={tileVariants}
      whileHover={{ y: -6, rotateX: 5, rotateY: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(character)}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-gradient-to-b p-px shadow-[0_10px_30px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-sky-400/60"
    >
      <div
        className={`relative h-full w-full rounded-[calc(theme(borderRadius.3xl)-1px)] bg-gradient-to-b ${character.gradient}`}
      >
        {/* Ring accent (thicker on hover) */}
        <div
          className={`absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-all group-hover:ring-2 ${character.accent}`}
        />

        {/* Content */}
        <div className="absolute inset-0 grid place-items-end p-5">
          <div className="w-full rounded-2xl bg-black/40 p-4 backdrop-blur-sm">
            <div className="text-left">
              <h3 className="text-xl font-extrabold tracking-wide text-white drop-shadow">
                {character.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-300">{character.tagline}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Soft outer glow */}
      <CardGlow className="bg-gradient-to-b from-white/10 to-transparent" />
    </motion.button>
  );
}

function ChaptersRow({ character, onRead }) {
  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
          Chapters
        </h4>
        <div className="text-xs text-zinc-400">{character.chapters.length} total</div>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
        {character.chapters.map((ch, i) => (
          <motion.button
            key={ch.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRead(ch, i)}
            className="min-w-[220px] rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-left shadow hover:border-white/20"
          >
            <div className="text-xs uppercase tracking-wide text-zinc-400">
              Chapter {i + 1}
            </div>
            <div className="mt-1 font-semibold text-zinc-100">{ch.title}</div>
            <p className="mt-1 line-clamp-2 text-sm text-zinc-300">{ch.preview}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function CharacterView({ character, onClose, onRead }) {
  useEsc(onClose);
  const stop = useCallback((e) => e.stopPropagation(), []);

  return (
    <Backdrop onClick={onClose}>
      <motion.div
        onClick={stop}
        className="absolute inset-4 z-50 mx-auto flex max-w-6xl flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950/95 to-black/80 p-6 shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-start gap-5">
          <div
            className={`relative aspect-[3/4] w-40 overflow-hidden rounded-2xl bg-gradient-to-b ${character.gradient}`}
          >
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black tracking-tight text-white">{character.name}</h2>
            <p className="mt-1 max-w-prose text-zinc-300">{character.tagline}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={onClose}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:border-white/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <ChaptersRow character={character} onRead={onRead} />
      </motion.div>
    </Backdrop>
  );
}

function ReaderView({ character, chapters, index, onClose, onPrev, onNext }) {
  useEsc(onClose);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPrev, onNext]);

  const chapter = chapters[index];

  return (
    <Backdrop onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-3 z-50 mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950 to-black shadow-2xl"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
      >
        {/* Header */}
        <div className="border-b border-white/10 p-5">
          <div className="text-xs uppercase tracking-wide text-zinc-400">{character.name}</div>
          <h3 className="text-xl font-extrabold text-white">{chapter.title}</h3>
        </div>

        {/* Body */}
        <div className="prose prose-invert max-w-none flex-1 overflow-y-auto p-6 text-zinc-200">
          <p className="leading-7">{chapter.body}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-200 enabled:hover:border-white/30 disabled:opacity-40"
          >
            ← Previous
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
          >
            Close Reader
          </button>
          <button
            onClick={onNext}
            disabled={index >= chapters.length - 1}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-200 enabled:hover:border-white/30 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default function StoryHub() {
  const [characters] = useState(charactersSeed);
  const [openCharacter, setOpenCharacter] = useState(null);
  const [reader, setReader] = useState(null); // { character, index }

  const palette = useMemo(
    () => ["#38b6ff", "#14b8a6", "#f43f5e", "#a78bfa", "#f59e0b", "#22c55e"],
    []
  );

  const onOpenCharacter = (c) => setOpenCharacter(c);
  const onCloseCharacter = () => setOpenCharacter(null);

  const closeReader = useCallback(() => setReader(null), []);
  const prevChapter = useCallback(
    () => setReader((r) => ({ ...r, index: Math.max(0, r.index - 1) })),
    []
  );
  const nextChapter = useCallback(
    () =>
      setReader((r) => ({
        ...r,
        index: Math.min((r.character?.chapters?.length ?? 1) - 1, r.index + 1),
      })),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-zinc-100">
      {/* Top Nav */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-black tracking-tight"
          >
            Story<span className="text-sky-400">Hub</span>
          </motion.h1>
          <div className="text-sm text-zinc-400">Text-only · Animated · OTT Style</div>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Six Characters. Infinite Chapters.
          </h2>
          <p className="mt-2 text-zinc-300">
            Explore evolving stories with cinematic tiles, buttery animations, and clean reading.
          </p>
        </motion.div>
      </section>

      {/* Grid of Portrait Tiles */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {characters.map((c) => (
            <CharacterTile key={c.id} character={c} onOpen={onOpenCharacter} />
          ))}
        </motion.div>

        {/* Palette chips (visual brand helpers) */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {palette.map((hex) => (
            <div key={hex} className="flex items-center gap-2">
              <span className="inline-block h-5 w-5 rounded-full" style={{ background: hex }} />
              <code className="text-xs text-zinc-400">{hex}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Character Modal */}
      <AnimatePresence>
        {openCharacter && (
          <CharacterView
            character={openCharacter}
            onClose={onCloseCharacter}
            onRead={(ch, idx) => setReader({ character: openCharacter, index: idx })}
          />
        )}
      </AnimatePresence>

      {/* Reader Modal */}
      <AnimatePresence>
        {reader && (
          <ReaderView
            character={reader.character}
            chapters={reader.character.chapters}
            index={reader.index}
            onClose={closeReader}
            onPrev={prevChapter}
            onNext={nextChapter}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        Built with <span className="text-white">React</span>, <span className="text-white">Tailwind</span>, and{" "}
        <span className="text-white">Framer Motion</span> · No images, just stories.
      </footer>
    </div>
  );
}
